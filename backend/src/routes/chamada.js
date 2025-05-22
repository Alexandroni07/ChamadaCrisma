const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

router.post('/registrar', async (req, res) => {
    try {
        const { idTurma, presencas } = req.body;
        const hoje = new Date().toISOString().split('T')[0];

        const { data: encontrosExistentes, error: errorEncontros } = await supabase
            .from('encontros')
            .select('id, in_tipo')
            .eq('id_turma', idTurma)
            .eq('data', hoje);

        if (errorEncontros) throw errorEncontros;

        let encontroCatequeseId, encontroMissaId;

        const encontroCatequeseExistente = encontrosExistentes?.find(e => e.in_tipo === 1);
        const encontroMissaExistente = encontrosExistentes?.find(e => e.in_tipo === 2);

        if (encontroCatequeseExistente) {
            encontroCatequeseId = encontroCatequeseExistente.id;
        } else {
            const { data, error } = await supabase
                .from('encontros')
                .insert([{ data: hoje, in_tipo: 1, id_turma: idTurma }])
                .select('id')
                .single();
            if (error) throw error;
            encontroCatequeseId = data.id;
        }

        if (encontroMissaExistente) {
            encontroMissaId = encontroMissaExistente.id;
        } else {
            const { data, error } = await supabase
                .from('encontros')
                .insert([{ data: hoje, in_tipo: 2, id_turma: idTurma }])
                .select('id')
                .single();
            if (error) throw error;
            encontroMissaId = data.id;
        }

        const tipoParaEncontro = {
            1: encontroCatequeseId,
            2: encontroMissaId
        };

        const presencasFormatadas = presencas.map(p => ({
            id_encontro: tipoParaEncontro[p.tipoPresenca],
            id_crismando: p.idCrismando,
            presente: p.isPresente
        }));

        const { error: errorInsert } = await supabase
            .from('presencas')
            .upsert(presencasFormatadas, {
                onConflict: ['id_encontro', 'id_crismando']
            });

        if (errorInsert) throw errorInsert;

        res.status(201).json({ message: 'Presenças registradas com sucesso.' });

    } catch (err) {
        console.error('Erro ao registrar chamadas:', err);
        res.status(500).json({ error: 'Erro ao registrar chamadas.' });
    }
});

router.get('/:idTurma', async (req, res) => {
    try {
        const { idTurma } = req.params;
        const hoje = new Date().toISOString().split('T')[0];

        const { data: encontros, error: errorEncontros } = await supabase
            .from('encontros')
            .select('id, in_tipo')
            .eq('id_turma', idTurma)
            .eq('data', hoje);

        if (errorEncontros) throw errorEncontros;

        if (!encontros || encontros.length === 0) {
            return res.status(200).json({ presencas: [] });
        }

        const encontrosIds = encontros.map(e => e.id);
        const tipoPorId = Object.fromEntries(encontros.map(e => [e.id, e.in_tipo]));

        const { data: presencas, error: errorPresencas } = await supabase
            .from('presencas')
            .select('id_encontro, id_crismando, presente')
            .in('id_encontro', encontrosIds);

        if (errorPresencas) throw errorPresencas;

        const presencasFormatadas = presencas.map(p => ({
            idCrismando: p.id_crismando,
            tipoPresenca: tipoPorId[p.id_encontro],
            isPresente: p.presente
        }));

        res.status(200).json({
            status: 200,
            data: presencasFormatadas
        });

    } catch (err) {
        console.error('Erro ao buscar presenças:', err);
        res.status(500).json({ error: 'Erro ao buscar presenças.' });
    }
});


module.exports = router;
