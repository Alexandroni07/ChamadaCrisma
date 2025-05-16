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
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (err) {
    console.error('Erro ao inserir crismando:', err);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

// GET /api/crismandos
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('crismandos')
      .select('*')
      .order('nome', { ascending: true });

    if (error) {
      throw error;
    }

res.status(200).json({
  status: 200,
  data: data
});
  } catch (err) {
    console.error('Erro ao buscar crismandos:', err);
    res.status(500).json({ erro: 'Erro ao buscar crismandos.' });
  }
});

// GET /api/catequistas
router.get('/catequistas', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('catequistas')
      .select('*')
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
