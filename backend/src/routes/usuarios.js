const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const supabase = require('../supabase');

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const { data: usuarios, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email);

  if (error || !usuarios || usuarios.length === 0) {
    return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
  }

  const usuario = usuarios[0];
  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      id_turma: usuario.id_turma
    },
    process.env.JWT_SECRET,
    { expiresIn: '6h' }
  );

  return res.json({
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      id_turma: usuario.id_turma
    }
  });
});

router.post('/register', async (req, res) => {
  const { nome, email, senha, idTurma } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  try {
    const { data: usuarios, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email);

    if (error) throw error;

    if (usuarios.length > 0) {
      return res.status(409).json({ erro: 'Usuário já existe' });
    }

    const hash = await bcrypt.hash(senha, 10);

    const { error: insertUserError } = await supabase
      .from('usuarios')
      .insert([{ nome, email, senha: hash, id_turma: idTurma }]);

    if (insertUserError) throw insertUserError;

    const { error: insertCatequistaError } = await supabase
      .from('catequistas')
      .insert([{ nome, id_turma: idTurma }]);

    if (insertCatequistaError) throw insertCatequistaError;

    return res.status(201).json({ mensagem: 'Usuário e catequista cadastrados com sucesso' });
  } catch (err) {
    console.error('Erro ao registrar usuário e catequista:', err);
    return res.status(500).json({ erro: 'Erro ao registrar usuário e catequista.' });
  }
});


module.exports = router;
