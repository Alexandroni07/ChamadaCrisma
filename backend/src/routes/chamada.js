const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

router.post('/registrar', async (req, res) => {
    try {
        const { idTurma, presencas } = req.body;
        const hoje = new Date().toISOString().split('T')[0];

        const { data: encontroCatequese, error: errorCatequese } = await supabase
            .from('encontros')
            .insert([{ data: hoje, in_tipo: 1, id_turma: idTurma }])
            .select('id')
            .single();

        if (errorCatequese) throw errorCatequese;

        const { data: encontroMissa, error: errorMissa } = await supabase
            .from('encontros')
            .insert([{ data: hoje, in_tipo: 2, id_turma: idTurma }])
            .select('id')
            .single();

        if (errorMissa) throw errorMissa;

        const tipoParaEncontro = {
            1: encontroCatequese.id,
            2: encontroMissa.id
        };

        // Monta os dados para inserção
        const presencasFormatadas = presencas.map(p => ({
            id_encontro: tipoParaEncontro[p.tipoPresenca],
            id_crismando: p.idCrismando,
            presente: p.isPresente
        }));

        // Inserção em lote
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

module.exports = router;
