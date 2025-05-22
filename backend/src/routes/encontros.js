// routes/crismandos.js
const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// GET /api/encontros
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('encontros')
      .select('data')
      .eq('in_tipo', 1)

    if (error) {
      throw error;
    }

    const apenasDatas = data.map((item) => item.data);


    res.status(200).json({
      status: 200,
      data
    });
  } catch (err) {
    console.error('Erro ao buscar crismandos:', err);
    res.status(500).json({ erro: 'Erro ao buscar crismandos.' });
  }
});

module.exports = router;
