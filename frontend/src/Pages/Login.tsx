// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscarChamada, login } from './services';
import { LoginPayload } from './types';
import { useCatequista } from '../context/CatequistaContext';
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState<string>("");
    const navigate = useNavigate();
    const { catequista, setCatequista } = useCatequista();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email: email,
            senha: senha
        } as LoginPayload
        const { sucesso, usuario } = await login(payload);
        if (sucesso && usuario) {
            setCatequista({
                id: usuario?.id,
                nome: usuario?.nome,
                id_turma: usuario?.id_turma
            });
            const fetchPresencas = async () => {
                const response = await buscarChamada(usuario?.id_turma);
                if (response.data) {
                    localStorage.setItem('chamada', JSON.stringify(response.data));
                }
            };
            fetchPresencas();
            navigate('/');
        } else {
            setErro("Erro ao processar login");
        }
    };

    const handleRegistrar = () => {
        navigate("/register");
    }

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
          Login
        </Typography>

        {erro && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {erro}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Entrar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate('/register')}
            >
              Registre-se
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
