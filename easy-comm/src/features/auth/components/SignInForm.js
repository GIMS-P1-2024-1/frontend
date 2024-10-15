import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css';
import { ReactComponent as Art } from '../assets/Art.svg';
import { login } from "./authService";

const SignInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await login(username, password);
            if (response.success) {
                localStorage.setItem('authToken', response.token);
                navigate('/home');
            } else {
                setError(response.message || 'Erro desconhecido.');
            }
        } catch (error) {
            setError('Ocorreu um erro. Tente novamente mais tarde.');
        }
    };

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <div className="decorative-side">
                    <Art />
                </div>
                <div className="form">
                    <h2>GIMS</h2>
                    <h4>Sign In</h4>
                    <p>or <Link to="/signup">create an account</Link></p>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <i className="material-icons">person</i>
                            <input
                                type="username"
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
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
