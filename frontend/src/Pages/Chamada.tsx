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
import { useEffect, useCallback, useState } from 'react';
import ChamadaModal from '../modals/ChamadaModal';
import { turmaData } from './Shared/data';
import { Crismando, Presenca, TipoPresenca } from './types';
import { Catequista } from './types';
import { ListarCatequistas, listarChamada } from './services';

const Chamada = () => {
    const [presenca, setPresenca] = useState<Presenca[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [catequista, setCatequista] = useState<Catequista[]>([]);
    const [membros, setMembros] = useState<Crismando[]>([]);

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
        }
    };

    useEffect(() => {
        carregarMembros();
        carregarCatequista();
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
                    <Typography>Turma: {turmaData.turma}</Typography>
                    <Typography>catequistas: {catequista.length > 0
                        ? ' ' + catequista.map((c) => c.nome).join(', ')
                        : ' carregando...'}</Typography>
                    <Typography>Encontros: {turmaData.encontros}</Typography>
                </Stack>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={iniciarChamada}
                    fullWidth
                    sx={{ mb: 3 }}
                >
                    Iniciar Chamada
                </Button>

                <Card style={{ padding: 10 }}>
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
