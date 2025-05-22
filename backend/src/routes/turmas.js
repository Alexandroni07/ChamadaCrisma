const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

router.get('/dados/:idTurma', async (req, res) => {
    const { idTurma } = req.params;

    try {
        const { data: turma, error: turmaError } = await supabase
            .from('turmas')
            .select('padroeiro, nome, id')
            .eq('id', Number(idTurma))
            .single();

        if (turmaError || !turma) {
            return res.status(404).json({ erro: 'Turma não encontrada.' });
        }

        const { data: catequistas, error: catequistaError } = await supabase
            .from('catequistas')
            .select('*')
            .eq('id_turma', Number(idTurma))
            .order('nome', { ascending: true });

        if (catequistaError) {
            throw catequistaError;
        }

        return res.status(200).json({
            status: 200,
            data: {
                idTurma: turma.id,
                nome: turma.nome,
                padroeiro: turma.padroeiro,
                catequistas: catequistas
            }
        });
    } catch (err) {
        console.error('Erro ao buscar catequistas e padroeiro:', err);
        return res.status(500).json({ erro: 'Erro interno ao buscar catequistas e padroeiro.' });
    }
});

module.exports = router;
