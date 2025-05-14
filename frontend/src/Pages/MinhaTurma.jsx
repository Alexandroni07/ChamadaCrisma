import { turmaData } from './Shared/data';
import { Box, Button, Card, Divider, MenuItem, Stack, TextField, Typography, Collapse, CardContent } from '@mui/material';
import { useState } from 'react';

const MinhaTurma = () => {
  const [novoNome, setNovoNome] = useState('');
  const [status, setStatus] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const handleClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
          id_turma: turmaData.id_turma ?? 1,
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
          {turmaData.membros.map((membro) => (
            <Box key={membro.id}>
              <MenuItem 
                onClick={() => handleClick(membro.id)}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography>{membro.nome}</Typography>
                <Typography>{expandedId === membro.id ? '▲' : '▼'}</Typography>
              </MenuItem>
              
              <Collapse in={expandedId === membro.id} timeout="auto" unmountOnExit>
                <Card style={{ margin: '8px 0', backgroundColor: '#f5f5f5' }}>
                  <CardContent>
                    <Typography><strong>Nome:</strong> {membro.nome}</Typography>
                    <Typography><strong>Telefone:</strong> {membro.telefone}</Typography>
                    <Typography><strong>Email:</strong> {membro.email}</Typography>
                    <Typography><strong>Responsável:</strong> {membro.responsavel}</Typography>
                  </CardContent>
                </Card>
              </Collapse>
              
              <Divider />
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
              fullWidth
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