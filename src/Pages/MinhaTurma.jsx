import { turmaData } from './Shared/data'
import { Box, Card, Divider, MenuItem, Stack, Typography } from '@mui/material';

const MinhaTurma = () => {
    return (
        <Box >
            <Card style={{ padding: 8, margin: "10px 32px" }} >
            <Typography style={{ fontSize: 28, textAlign: 'center', marginBottom: 16 }}>Minha Turma</Typography>
            </Card>
            <Box style={{ margin: "0px 32px" }} justifyContent={"space-between"}>
                <Stack spacing={1}>
                    <Typography>{turmaData.nome}</Typography>
                    <Typography>Catequista: {turmaData.catequista}</Typography>
                    <Typography>Encontros: {turmaData.encontros}</Typography>
                </Stack>
                <Card style={{ padding: 10, marginTop: 10 }}>
                    <Typography style={{ fontWeight: 700 }}>Membros:</Typography>
                    {turmaData.membros.map((membro, index) => (
                        <Box key={index}>
                            <MenuItem>{membro}</MenuItem>
                            {index < turmaData.membros.length - 1 && <Divider />}
                        </Box>
                    ))}
                </Card>
            </Box>
        </Box>
    )
}

export default MinhaTurma;