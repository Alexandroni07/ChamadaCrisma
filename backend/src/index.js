const express = require('express');
const app = express();
require('dotenv').config();
const crismandoRoutes = require('./routes/crismandos');

app.use(express.json());
app.use('/api/crismandos', crismandoRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
