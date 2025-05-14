import { turmaData } from './Shared/data';
import { Box, Button, Card, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const MinhaTurma = () => {
  const [novoNome, setNovoNome] = useState('');
  const [status, setStatus] = useState('');

  const adicionarCrismando = async () => {
    if (!novoNome) {
      setStatus('Nome não pode estar vazio.');
      return;
    }

    try {
      const response = await fetch('/api/crismandos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: novoNome,
          id_turma: turmaData.id_turma ?? 1, // use um id_turma real
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao adicionar crismando');
      }

      setStatus(`Crismando "${data.nome}" adicionado com sucesso!`);
      setNovoNome('');
    } catch (err) {
      setStatus(`Erro: ${err.message}`);
    }
  };

  return (
    <Box>
      <Card style={{ padding: 8, margin: '10px 32px' }}>
        <Typography style={{ fontSize: 28, textAlign: 'center', marginBottom: 16 }}>
          Minha Turma
        </Typography>
      </Card>
      <Box style={{ margin: '0px 32px' }}>
        <Stack spacing={1}>
          <Typography>Turma: {turmaData.turma}</Typography>
          <Typography>Catequista: {turmaData.catequista}</Typography>
          <Typography>Encontros: {turmaData.encontros}</Typography>
        </Stack>

        <Card style={{ padding: 10, marginTop: 10 }}>
          <Typography style={{ fontWeight: 700 }}>Membros:</Typography>
          {turmaData.membros.map((membro, index) => (
            <Box key={index}>
              <MenuItem>{membro}</MenuItem>
              {index < turmaData.membros.length - 1 && <Divider />}
            </Box>
          ))}
        </Card>

        <Card style={{ padding: 10, marginTop: 16 }}>
          <Typography style={{ fontWeight: 700, marginBottom: 8 }}>Adicionar Crismando</Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Nome do crismando"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              size="small"
            />
            <Button variant="contained" onClick={adicionarCrismando}>
              Adicionar
            </Button>
          </Stack>
          {status && <Typography style={{ marginTop: 8 }}>{status}</Typography>}
        </Card>
      </Box>
    </Box>
  );
};

export default MinhaTurma;
