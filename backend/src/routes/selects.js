const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// GET /api/turmas
router.get('/turmas', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('turmas')
            .select('id, nome');

        if (error) throw error;

        res.status(200).json({ status: 200, data });
    } catch (err) {
        console.error('Erro ao buscar turmas:', err);
        res.status(500).json({ error: 'Erro ao buscar turmas.' });
    }
});

module.exports = router;
