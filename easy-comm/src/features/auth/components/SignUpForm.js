import React, {useState} from 'react';
import './Form.css'; 
import { ReactComponent as Art } from '../assets/Art.svg';
import {useNavigate} from "react-router-dom";
import {validateEmail, validatePassword, validateUsername} from "./RegisterService";

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('O email deve pertencer a um dos domínios permitidos: copin.ufcg.edu.br, ccc.ufcg.edu.br, estudante.ufcg.edu.br, computacao.ufcg.edu.br.');
            return;
        }

        if (!validateUsername(username)) {
            setError('Nome de usuário deve ter no mínimo 3 caracteres e não pode conter espaços.');
            return;
        }

        if (!validatePassword(password)) {
            setError('A senha deve ter pelo menos 8 caracteres, incluindo um número, uma letra maiúscula e uma letra minúscula');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        // Se todas as validações passarem, faz a requisição para o backend
        /*
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    name,
                    username,
                    password
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Cadastro realizado com sucesso!');
                navigate('/'); // Redireciona para a tela de login após o cadastro
            } else {
                setError('Erro no cadastro. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao realizar cadastro:', error);
            setError('Ocorreu um erro. Tente novamente mais tarde.');
        }
        */

        // Por enquanto, redireciona para a tela de login após cadastro bem-sucedido
        alert('Cadastro realizado com sucesso!');
        navigate('/'); // Redireciona para a tela de login
    };

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <div className="decorative-side">
                    <Art />
                </div>
                <div className="form">
                    <h2>EasyComm</h2>
                    <h4>Sign Up</h4>
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe mensagem de erro */}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <i className="material-icons">email</i>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <i className="material-icons">person</i>
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <i className="material-icons">account_circle</i>
                            <input
                                type="text"
                                placeholder="Username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <i className="material-icons">lock</i>
                            <input
                                type="password"
                                placeholder="New Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <i className="material-icons">lock</i>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;