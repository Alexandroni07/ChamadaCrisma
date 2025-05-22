// GET /api/catequistas
const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

router.get('/:idTurma', async (req, res) => {
  const { idTurma } = req.params;

  try {
    const { data, error } = await supabase
      .from('catequistas')
      .select('*')
      .eq('id_turma', Number(idTurma))
      .order('nome', { ascending: true });

    if (error) {
      throw error;
    }

    res.status(200).json({
      status: 200,
      data: data
    });
  } catch (err) {
    console.error('Erro ao buscar catequista:', err);
    res.status(500).json({ erro: 'Erro ao buscar catequista.' });
  }
});

module.exports = router;
