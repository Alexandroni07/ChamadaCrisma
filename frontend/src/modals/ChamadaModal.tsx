import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, Modal, Stack, Typography } from '@mui/material';
import { ChamadaModalProps } from './types';
import { useEffect, useState } from 'react';
import { Presenca, TipoPresenca } from '../Pages/types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { registrarChamada } from '../Pages/services';
import { turmaData } from '../Pages/Shared/data';

const ChamadaModal = ({
    modalAberto,
    setModalAberto,
    crismandos,
    isPresente,
    handleGetPresenca
}: ChamadaModalProps) => {
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [presenca, setPresenca] = useState<Presenca[]>([]);

    useEffect(() => {
        if (presenca) {
            handleGetPresenca(presenca);
        }
    }, [presenca]);

    const handleAvancar = () => {
    const idsComPresenca = new Set(
        presenca.map((p) => p.idCrismando)
    );

    const proximoIndice = crismandos.findIndex(
        (c, index) => index > indiceAtual && !idsComPresenca.has(c.id!)
    );

    if (proximoIndice !== -1) {
        setIndiceAtual(proximoIndice);
    } else {
        setModalAberto(false);
    }
};

    const handleVoltar = () => {
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

    const salvarChamada = async () => {
        try {
            const sucesso = await registrarChamada(turmaData.id_turma, presenca);
            if (sucesso) {
                alert('Chamada registrada com sucesso!');
                setModalAberto(false);
            } else {
                alert('Erro ao registrar chamada.');
            }
        } catch (error) {
            alert('Erro ao registrar chamada.');
            console.error(error);
        }
    };

    useEffect(() => {
        const crismandoAtual = crismandos[indiceAtual];

        if (!crismandoAtual?.id) return;

        const temCatequese = presenca.some(
            (p) =>
                p.idCrismando === crismandoAtual.id &&
                p.tipoPresenca === TipoPresenca.CATEQUESE
        );

        const temMissa = presenca.some(
            (p) =>
                p.idCrismando === crismandoAtual.id &&
                p.tipoPresenca === TipoPresenca.MISSA
        );

        if (temCatequese && temMissa) {
            const timeout = setTimeout(() => {
                handleAvancar();
            }, 300);

            return () => clearTimeout(timeout);
        }
    }, [presenca, indiceAtual, crismandos]);

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
                    <Button
                        onClick={handleVoltar}
                        disabled={indiceAtual === 0}
                    >
                        <FaChevronLeft size={30} />
                    </Button>
                    <Typography variant="h6" alignItems={"end"}>
                        {crismandos[indiceAtual]?.nome}
                    </Typography>
                    <Button
                        onClick={handleAvancar}
                        disabled={indiceAtual === crismandos.length}
                    >
                        <FaChevronRight size={30} />
                    </Button>
                </Box>

                <Grid container direction={"column"} style={{ margin: "10px 0px" }} gap={2}>
                    <Stack spacing={1} style={{ border: '2px solid', borderRadius: 6, borderColor: "#bae4f9", padding: 6 }}>
                        <Typography variant="subtitle1">Catequese</Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            isPresente(crismandos[indiceAtual]?.id, TipoPresenca.CATEQUESE) === true
                                        }
                                        onChange={() =>
                                            handlePresencaChange(
                                                crismandos[indiceAtual]?.id,
                                                TipoPresenca.CATEQUESE,
                                                true
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
                                            isPresente(
                                                crismandos[indiceAtual]?.id,
                                                TipoPresenca.CATEQUESE
                                            ) === false
                                        }
                                        onChange={() =>
                                            handlePresencaChange(
                                                crismandos[indiceAtual]?.id,
                                                TipoPresenca.CATEQUESE,
                                                false
                                            )
                                        }
                                    />
                                }
                                label="Falta"
                            />

                        </Stack>
                    </Stack>

                    <Stack spacing={1} style={{ border: '2px solid', borderRadius: 6, borderColor: "#bae4f9", padding: 6 }}>
                        <Typography variant="subtitle1">Missa</Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            isPresente(
                                                crismandos[indiceAtual]?.id,
                                                TipoPresenca.MISSA
                                            ) === true
                                        }
                                        onChange={() =>
                                            handlePresencaChange(
                                                crismandos[indiceAtual]?.id,
                                                TipoPresenca.MISSA,
                                                true
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
                                            isPresente(
                                                crismandos[indiceAtual]?.id,
                                                TipoPresenca.MISSA
                                            ) === false
                                        }
                                        onChange={() =>
                                            handlePresencaChange(
                                                crismandos[indiceAtual]?.id,
                                                TipoPresenca.MISSA,
                                                false
                                            )
                                        }
                                    />
                                }
                                label="Falta"
                            />

                        </Stack>
                    </Stack>
                </Grid>

                <Box display="flex" justifyContent="space-between">
                    <Button
                        onClick={() => setModalAberto(false)}
                        variant="contained"
                    >
                        {'Fechar'}
                    </Button>

                    <Button
                        onClick={salvarChamada}
                        disabled={indiceAtual !== crismandos.length}
                        variant="contained"
                    >
                        {'Finalizar'}
                    </Button>

                </Box>
            </Box>
        </Modal>
    )
}

export default ChamadaModal;