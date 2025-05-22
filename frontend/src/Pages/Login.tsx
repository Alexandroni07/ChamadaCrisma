// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscarChamada, login } from './services';
import { LoginPayload } from './types';
import { useCatequista } from '../context/CatequistaContext';

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
        <div style={{ padding: '2rem' }}>
            <h2>Login</h2>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label><br />
                    <input
                        type="password"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
            <p>Não possui Login? <strong><button onClick={handleRegistrar}>Registre-se</button></strong></p>
        </div>
    );
}

export default Login;
