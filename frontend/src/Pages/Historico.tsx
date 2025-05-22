import { turmaData, historicoData } from './Shared/data';
import { Box, Card, Divider, MenuItem, Stack, Typography, Collapse, CardContent, FormControl, InputLabel, Select, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { ListarCatequistas, ListarEncontros, buscarHistorico, listarChamada } from './services';
import { Catequista, Encontros, Crismando, TipoPresenca, Presenca } from './types';
import { formatarData } from './commons';
import { useCatequista } from '../context/CatequistaContext';

const Historico = () => {
  const [dataSelecionada, setDataSelecionada] = useState<string>("");
  const [presenca, setPresenca] = useState<Presenca[]>([]);
  const [catequistas, setCatequistas] = useState<Catequista[]>([]);
  const [encontros, setEncontros] = useState<Encontros[]>([]);
  const [membros, setMembros] = useState<Crismando[]>([]);
  const { catequista } = useCatequista();

  const carregarCatequista = async () => {
    const result = await ListarCatequistas(catequista?.id_turma);
    if (result && result.status === 200) {
      setCatequistas(result.data);
    }
  };
console.log(catequistas)
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

  const fetchHistorico = useCallback(async () => {
    const result = await buscarHistorico(catequista?.id_turma, dataSelecionada);
    if (result && result.status === 200) {
      setPresenca(result.data);
    }
  }, [dataSelecionada]);

  useEffect(() => {
    carregarCatequista();
    carregarEncontros();
    carregarMembros();
  }, []);

  useEffect(() => {
  if (dataSelecionada && catequista?.id_turma) {
    fetchHistorico();
  }
}, [dataSelecionada, catequista?.id_turma, fetchHistorico]);

  const isPresente = (
    idCrismando: number,
    tipoPresenca: TipoPresenca
  ): boolean | null => {
    const registro = presenca.find(
      (p) => p.idCrismando === idCrismando && p.tipoPresenca === tipoPresenca
    );
    return registro?.isPresente ?? null;
  };

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
          maxHeight: 'calc(73vh - 15px)',
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

          <Card style={{
            padding: 10,
            marginTop: 8,
            maxHeight: 'calc(60vh - 15px)',
            overflow: 'auto'
          }}>
            <Typography style={{ fontWeight: 700, marginBottom: 2 }}>Membros:</Typography>

            {membros.length > 0 ? membros.map((membro) => (
              <Box key={membro.id}>
                <MenuItem
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: '#f0f0f0'
                  }}
                >
                  <Grid container alignItems={"center"} justifyContent={""} spacing={2}>
                    <Grid size={7}>
                      <Typography>{membro.nome}</Typography>
                    </Grid>

                    <Grid size={5} justifyContent="flex-end" spacing={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isPresente(membro.id!, TipoPresenca.CATEQUESE) === true}
                            name="presencaCatequese"
                            disabled={true}
                          />
                        }
                        label="Presença Catequese"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isPresente(membro.id!, TipoPresenca.MISSA) === true}
                            name="presencaMissa"
                            disabled={true}
                          />
                        }
                        label="Presença Missa"
                      />
                    </Grid>
                  </Grid>
                </MenuItem>
                <Divider />
              </Box>
            )) : <Typography>Carregando...</Typography>} {/*Colocar componente de loading aqui */}
          </Card>
        </Card>
      </Box>
    </Box>
  );
};

export default Historico;