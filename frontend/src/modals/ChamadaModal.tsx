import { Box, Button, Checkbox, FormControlLabel, Modal, Stack, Typography } from '@mui/material';
import { ChamadaModalProps } from './types';
import { useEffect, useState } from 'react';
import { Presenca, TipoPresenca } from '../Pages/types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ChamadaModal = ({
    modalAberto,
    setModalAberto,
    turmaData,
    isPresente,
    handleGetPresenca
}: ChamadaModalProps) => {
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [presenca, setPresenca] = useState<Presenca[]>([]);

    const avancar = () => {
        if (indiceAtual < turmaData.membros.length - 1) {
            setIndiceAtual((prev) => prev + 1);
        } else {
            setModalAberto(false);
        }
    };

    useEffect(() => {
        if (presenca) {
            handleGetPresenca(presenca);
        }
    }, [presenca]);

    const voltar = () => {
        if (indiceAtual > 0) {
            setIndiceAtual((prev) => prev - 1);
        }
    };

    const handlePresencaChange = (
        idCrismando,
        tipoPresenca,
        isChecked
    ) => {
        setPresenca((prev) => {
            const existingIndex = prev.findIndex(
                (p) => p.idCrismando === idCrismando && p.tipoPresenca === tipoPresenca
            );

            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex] = { ...updated[existingIndex], isPresente: isChecked };
                return updated;
            } else {
                return [
                    ...prev,
                    {
                        idCrismando,
                        tipoPresenca,
                        isPresente: isChecked
                    }
                ];
            }
        });
    };

    return (
        <Modal open={modalAberto} onClose={() => setModalAberto(false)}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    width: 400
                }}
            >
                <Box display="flex" alignItems="center" justifyContent={"space-between"} >
                    <FaChevronLeft style={{ marginRight: 8 }} />
                    <Typography variant="h6" alignItems={"end"}>
                        {turmaData.membros[indiceAtual]?.nome}
                    </Typography>
                    <FaChevronRight style={{ marginRight: 8 }} />
                </Box>
                <Stack spacing={1}>
                    <Typography variant="subtitle1">Catequese</Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isPresente(
                                        turmaData.membros[indiceAtual].id,
                                        TipoPresenca.catequese
                                    )}
                                    onChange={(e) =>
                                        handlePresencaChange(
                                            turmaData.membros[indiceAtual].id,
                                            TipoPresenca.catequese,
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Presente"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={
                                        !isPresente(
                                            turmaData.membros[indiceAtual].id,
                                            TipoPresenca.catequese
                                        )
                                    }
                                    onChange={(e) =>
                                        handlePresencaChange(
                                            turmaData.membros[indiceAtual].id,
                                            TipoPresenca.catequese,
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Falta"
                        />
                    </Stack>
                </Stack>

                <Stack spacing={1}>
                    <Typography variant="subtitle1">Missa</Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isPresente(
                                        turmaData.membros[indiceAtual].id,
                                        TipoPresenca.missa
                                    )}
                                    onChange={(e) =>
                                        handlePresencaChange(
                                            turmaData.membros[indiceAtual].id,
                                            TipoPresenca.missa,
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Presente"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={
                                        !isPresente(
                                            turmaData.membros[indiceAtual].id,
                                            TipoPresenca.missa
                                        )
                                    }
                                    onChange={(e) =>
                                        handlePresencaChange(
                                            turmaData.membros[indiceAtual].id,
                                            TipoPresenca.missa,
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Falta"
                        />
                    </Stack>
                </Stack>

                <Box display="flex" justifyContent="space-between">
                    <Button
                        onClick={voltar}
                        disabled={indiceAtual === 0}
                        variant="outlined"
                    >
                        Voltar
                    </Button>

                    <Button onClick={avancar} variant="contained">
                        {indiceAtual === turmaData.membros.length - 1 ? 'Finalizar' : 'Avançar'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ChamadaModal;