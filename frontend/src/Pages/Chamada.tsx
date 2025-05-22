import {
    Box,
    Button,
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    MenuItem,
    Stack,
    Typography
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useCatequista } from '../context/CatequistaContext';
import ChamadaModal from '../modals/ChamadaModal';
import { listarChamada, recuperarDadosTurma } from './services';
import { Crismando, Presenca, TipoPresenca, TurmaData } from './types';

const Chamada = () => {
    const [presenca, setPresenca] = useState<Presenca[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [turma, setTurma] = useState<TurmaData>({ id: 1, padroeiro: '', catequistas: [], nome: '' });
    const [membros, setMembros] = useState<Crismando[]>([]);
    const { catequista } = useCatequista();
    const chamadaString = localStorage.getItem('chamada');
    const chamadaSalva = chamadaString ? JSON.parse(chamadaString) : null;

    const carregarDadosTurma = async () => {
        const result = await recuperarDadosTurma(catequista?.id_turma);
        if (result && result.status === 200) {
            setTurma(result.data)
        }
    };

    const carregarMembros = async () => {
        const result = await listarChamada(catequista?.id_turma);
        if (result && result.status === 200) {
            setMembros(result.data);
        }
    };

    useEffect(() => {
        carregarMembros();
        carregarDadosTurma();

        if (chamadaSalva && Array.isArray(chamadaSalva)) {
            setPresenca(chamadaSalva);
        }
    }, []);

    const isPresente = (
        idCrismando: number,
        tipoPresenca: TipoPresenca
    ): boolean | null => {
        const registro = presenca.find(
            (p) => p.idCrismando === idCrismando && p.tipoPresenca === tipoPresenca
        );
        return registro?.isPresente ?? null;
    };

    const iniciarChamada = () => {
        setModalAberto(true);
    };

    const handleGetPresenca = useCallback((presencaParam: Presenca[]) => {
        setPresenca(presencaParam);
    }, [modalAberto]);

    return (
        <Box>
            <ChamadaModal
                modalAberto={modalAberto}
                setModalAberto={setModalAberto}
                crismandos={membros}
                isPresente={isPresente}
                handleGetPresenca={handleGetPresenca}
            />
            <Card style={{ padding: 8, margin: '10px 32px' }}>
                <Typography style={{ fontSize: 28, textAlign: 'center', marginBottom: 16 }}>
                    Chamada
                </Typography>
            </Card>

            <Box style={{ margin: '0px 32px' }}>
                <Stack spacing={1} mb={3}>
                    <Typography>Turma: {turma.nome}</Typography>
                    <Typography>catequistas: {turma.catequistas.length > 0
                        ? ' ' + turma.catequistas.map((c) => c.nome).join(', ')
                        : ' carregando...'}</Typography>
                    <Typography>Padroeiro: {turma.padroeiro}</Typography>
                </Stack>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={iniciarChamada}
                    disabled={presenca.length > 0}
                    fullWidth
                    sx={{ mb: 3 }}
                >
                    Iniciar Chamada
                </Button>

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
            </Box>
        </Box>
    );
};

export default Chamada;
