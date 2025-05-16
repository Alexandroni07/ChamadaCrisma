import { Box, Button, Card, CardContent, Collapse, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { adicionarCrismando, ListarCatequistas, listarChamada } from './services';
import { turmaData } from './Shared/data';
import { Catequista, Crismando } from './types';

const MinhaTurma = () => {
  const [novoNome, setNovoNome] = useState('');
  const [status, setStatus] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [membros, setMembros] = useState<Crismando[]>([]);
  const [catequista, setCatequista] = useState<Catequista[]>([]);

  const handleClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const carregarCatequista = async () => {
    const result = await ListarCatequistas();
    if (result && result.status === 200) {
      setCatequista(result.data);
    }
  };

  const carregarMembros = async () => {
    const result = await listarChamada();
    console.log(result)
    if (result && result.status === 200) {
      setMembros(result.data);
    } else {
      setStatus('Erro ao carregar membros.');
    }
  };

  useEffect(() => {
    carregarMembros();
    carregarCatequista();
  }, []);

  const handleAdicionar = async () => {
    console.log("adicionado")
    if (!novoNome.trim()) {
      setStatus('Nome não pode estar vazio.');
      return;
    }
    const payload = {
      nome: novoNome,
      id_turma: turmaData.id_turma,
      responsavel: "",
      email: "",
      telefone: "",
    }
    const crismando = await adicionarCrismando(payload);

    if (crismando) {
      setStatus(`Crismando "${crismando.nome}" adicionado com sucesso!`);
      setNovoNome('');
      await carregarMembros();
    } else {
      setStatus('Erro ao adicionar crismando.');
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
          <Typography>catequistas: {catequista.length > 0
            ? ' ' + catequista.map((c) => c.nome).join(', ')
            : ' carregando...'}</Typography>
          <Typography>Encontros: {turmaData.encontros}</Typography>
        </Stack>

        <Card style={{ padding: 10, marginTop: 10 }}>
          <Typography style={{ fontWeight: 700 }}>Membros:</Typography>
          {membros.map((membro) => (
            <Box key={`${membro.id}-${membro.nome}`}>               <MenuItem
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
            <Button variant="contained" onClick={handleAdicionar}>
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