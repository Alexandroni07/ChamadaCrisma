import { turmaData, historicoData } from './Shared/data';
import { Box, Card, Divider, MenuItem, Stack, Typography, Collapse, CardContent, FormControl, InputLabel, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { ListarCatequistas, ListarEncontros, listarChamada } from './services';
import { Catequista, Encontros, Crismando } from './types';
import { formatarData } from './commons';
import { useCatequista } from '../context/CatequistaContext';

const Historico = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState<string>("");
  const [catequistas, setCatequistas] = useState<Catequista[]>([]);
  const [encontros, setEncontros] = useState<Encontros[]>([]);
  const [membros, setMembros] = useState<Crismando[]>([]);
  const { catequista } = useCatequista();

  const handleClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
console.log(catequista)
  const carregarCatequista = async () => {
    const result = await ListarCatequistas(catequista?.id_turma);
    if (result && result.status === 200) {
      setCatequistas(result.data);
    }
  };

  const carregarMembros = async () => {
    const result = await listarChamada(catequista?.id_turma);
    if (result && result.status === 200) {
      setMembros(result.data);
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
    carregarMembros();
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
          <Typography>catequistas: {catequistas.length > 0
            ? ' ' + catequistas.map((c) => c.nome).join(', ')
            : ' carregando...'}</Typography>
          <Typography>Encontros: {turmaData.encontros}</Typography>
        </Stack>

        <Card style={{
          padding: 10,
          marginTop: 10,
          maxHeight: 'calc(73vh - 15px)', // Ajuste este valor conforme necessário
          overflow: 'auto'
        }}>
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

          {membros.map((membro) => ( // Alterado de turmaData.membros para membros
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