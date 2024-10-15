import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove o token de autenticação do localStorage (ou de onde estiver armazenado)
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        // Redireciona o usuário para a página de login que está na rota "/"
        navigate('/');
    };

    return (
        <div className="content-section">
            <h2>Settings</h2>
            <p>Configurações do sistema.</p>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
    );
};

export default Settings;
