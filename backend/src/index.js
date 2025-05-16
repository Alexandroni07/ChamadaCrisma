const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

require('dotenv').config();
const crismandoRoutes = require('./routes/crismandos');
const catequistaRoutes = require('./routes/catequistas');

app.use(express.json());
app.use('/api/crismandos', crismandoRoutes);
app.use('/api/catequistas', catequistaRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

