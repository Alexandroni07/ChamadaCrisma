const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

require('dotenv').config();
const crismandoRoutes = require('./src/routes/crismandos');
const encontroRoutes = require('./src/routes/encontros');
const chamadaRoutes = require('./src/routes/chamada');
const usuarioRoutes = require('./src/routes/usuarios');
const turmaRoutes = require('./src/routes/turmas');
const selectRoutes = require('./src/routes/selects');
const presencaRoutes = require('./src/routes/presencas');
const authMiddleware = require('./src/authMiddleware');

app.use(express.json());
app.use('/api/crismandos', authMiddleware, crismandoRoutes);
app.use('/api/encontros', authMiddleware, encontroRoutes);
app.use('/api/chamada', authMiddleware, chamadaRoutes);
app.use('/api/presenca', authMiddleware, presencaRoutes);
app.use('/api/turmas', authMiddleware, turmaRoutes);
app.use('/api/selects', selectRoutes);
app.use('/api', usuarioRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
