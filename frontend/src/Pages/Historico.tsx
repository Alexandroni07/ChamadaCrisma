import { turmaData, historicoData } from './Shared/data';
import { Box, Card, Divider, MenuItem, Stack, Typography, Collapse, CardContent, FormControl, InputLabel, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { ListarCatequistas, ListarEncontros } from './services';
import { Catequista, Encontros } from './types';
import { formatarData } from './commons';

const Historico = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState<string>("");
  const [catequista, setCatequista] = useState<Catequista[]>([]);
  const [encontros, setEncontros] = useState<Encontros[]>([]);

  const carregarCatequista = async () => {
    const result = await ListarCatequistas();
    if (result && result.status === 200) {
      setCatequista(result.data);
    }
  };

  const carregarEncontros = async () => {
    const result = await ListarEncontros();
    if (result && result.status === 200) {
      setEncontros(result.data);
    }
  };

  useEffect(() => {
    carregarCatequista();
    carregarEncontros();
  }, []);

  return (
    <Box>
      <Card style={{ padding: 8, margin: '10px 32px' }}>
        <Typography style={{ fontSize: 28, textAlign: 'center', marginBottom: 16 }}>
          Histórico
        </Typography>
      </Card>

      <Box style={{ margin: '0px 32px' }}>
        <Stack spacing={1}>
          <Typography>Turma: {turmaData.turma}</Typography>
          <Typography>catequistas: {catequista.length > 0
            ? ' ' + catequista.map((c) => c.nome).join(', ')
            : ' carregando...'}</Typography>
          <Typography>Encontros: {turmaData.encontros}</Typography>        </Stack>

        <Card style={{ padding: 10, marginTop: 10 }}>
          <FormControl size="small" sx={{ minWidth: 120, mb: 2 }}>
            <InputLabel>Data</InputLabel>
            <Select
              value={dataSelecionada}
              onChange={(e) => setDataSelecionada(e.target.value)}
              label="Data"
            >
              {encontros.map((item) => (
                <MenuItem key={item.data} value={item.data}>
                  {item.data ? formatarData(item.data) : 'Data inválida'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {turmaData.membros.map((membro) => (
            <Box key={membro.id}>
              <MenuItem
                onClick={() => setExpandedId(expandedId === membro.id ? null : membro.id)}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography>{membro.nome}</Typography>
                <Typography>{expandedId === membro.id ? '▲' : '▼'}</Typography>
              </MenuItem>

              <Collapse in={expandedId === membro.id} timeout="auto" unmountOnExit>
                <Card style={{ margin: '8px 0', backgroundColor: '#f5f5f5' }}>
                  <CardContent>
                    <Typography><strong>Data selecionada:</strong> {dataSelecionada}</Typography>
                    <Typography><strong>Nome:</strong> {membro.nome}</Typography>
                    <Typography><strong>Telefone:</strong> {membro.telefone}</Typography>
                  </CardContent>
                </Card>
              </Collapse>

              <Divider />
            </Box>
          ))}
        </Card>
      </Box>
    </Box>
  );
};

export default Historico;