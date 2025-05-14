// routes/crismandos.js
const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// POST /api/crismandos
router.post('/', async (req, res) => {
  const { nome, id_turma } = req.body;

  if (!nome || !id_turma) {
    return res.status(400).json({ erro: 'Nome e id_turma são obrigatórios.' });
  }

  try {
    const { data, error } = await supabase
      .from('crismandos')
      .insert([{ nome, id_turma }])
      .select()
      .single(); // retorna um objeto em vez de array

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (err) {
    console.error('Erro ao inserir crismando:', err);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

module.exports = router;
