// src/pages/Login.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarTurmas, register } from './services';
import { genericItem, LoginPayload } from './types';
import { MenuItem, Select } from '@mui/material';

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
        <div style={{ padding: '2rem' }}>
            <h2>Registre-se</h2>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label><br />
                    <input
                        type="name"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Turma:</label><br />
                    <Select
                        value={turmaSelecionada || ""}
                        onChange={(e) => setTurmaSelecionada(e.target.value)}
                        required>
                        {turmas.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
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
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default Register;
