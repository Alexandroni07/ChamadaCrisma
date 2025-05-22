// src/pages/Login.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarTurmas, register } from './services';
import { genericItem, LoginPayload } from './types';
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';

function Register() {
    const [turmas, setTurmas] = useState<genericItem[]>([]);
    const [turmaSelecionada, setTurmaSelecionada] = useState<number | ''>('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [erro, setErro] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarEncontros = async () => {
            const result = await listarTurmas();
            if (result && result.status === 200) {
                setTurmas(result.data);
            }
        };
        carregarEncontros();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email: email,
            senha: senha,
            nome: nome,
            idTurma: turmaSelecionada
        } as LoginPayload
        const resultado = await register(payload);
        if (resultado.sucesso) {
            navigate('/');
        } else {
            setErro(resultado.erro);
        }
    };

    return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={2} align="center">
          Cadastro
        </Typography>

        {erro && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {erro}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              fullWidth
            />
            <FormControl fullWidth required>
              <InputLabel id="turma-label">Turma</InputLabel>
              <Select
                labelId="turma-label"
                value={turmaSelecionada}
                label="Turma"
                onChange={(e) => setTurmaSelecionada(Number(e.target.value))}
              >
                {turmas.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Cadastrar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate('/login')}
            >
              Já tem uma conta? Entrar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default Register;
