const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// GET /api/historico/:idTurma
router.post('/historico/:idTurma', async (req, res) => {
    try {
        const { idTurma } = req.params;
        const { data } = req.body;

        const { data: encontros, error: errorEncontros } = await supabase
            .from('encontros')
            .select('id, in_tipo')
            .eq('id_turma', idTurma)
            .eq('data', data);

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
            data: presencasFormatadas });

    } catch (err) {
        console.error('Erro ao buscar histórico de presenças:', err);
        res.status(500).json({ error: 'Erro ao buscar histórico de presenças.' });
    }
});


module.exports = router;
