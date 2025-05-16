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
import { turmaData } from './Shared/data';
import { useCallback, useRef, useState } from 'react';
import { Presenca, TipoPresenca } from './types';
import ChamadaModal from '../modals/ChamadaModal';

const Chamada = () => {
    const [presenca, setPresenca] = useState<Presenca[]>([]);
    const [modalAberto, setModalAberto] = useState(false);

    const isPresente = (idParam: number, tipoPresencaParam: TipoPresenca) => {
        return presenca.find(
            (p) => p.idCrismando === idParam && p.tipoPresenca === tipoPresencaParam
        )?.isPresente ?? false;
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
                turmaData={turmaData}
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
                    <Typography>Catequista: {turmaData.catequista}</Typography>
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

                    {turmaData.membros.map((membro) => (
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
                                                    checked={isPresente(membro.id, TipoPresenca.catequese)}
                                                    name="presencaCatequese"
                                                    disabled={true}
                                                />
                                            }
                                            label="Presença Catequese"
                                        />

                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={isPresente(membro.id, TipoPresenca.missa)}
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
                    ))}
                </Card>
            </Box>
        </Box>
    );
};

export default Chamada;
