const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

require('dotenv').config();
const crismandoRoutes = require('./routes/crismandos');
const catequistaRoutes = require('./routes/catequistas');
const encontroRoutes = require('./routes/encontros');
const chamadaRoutes = require('./routes/chamada');
const usuarioRoutes = require('./routes/usuarios');
const authMiddleware = require('./authMiddleware');


app.use(express.json());
app.use('/api/crismandos', authMiddleware, crismandoRoutes);
app.use('/api/catequistas', authMiddleware, catequistaRoutes);
app.use('/api/encontros', authMiddleware, encontroRoutes);
app.use('/api/chamada', authMiddleware, chamadaRoutes);
app.use('/api', usuarioRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
