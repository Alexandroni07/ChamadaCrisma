// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from './services';
import { LoginPayload } from './types';

function Register() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [erro, setErro] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email: email,
            senha: senha,
            nome: nome
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
