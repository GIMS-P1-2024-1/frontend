import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import './Home.css';

// Componentes para diferentes seções
const Groups = () => (
    <div className="content-section">
        <h2>Groups</h2>
        <ul>
            <li className="group-item">Grupo 1</li>
            <li className="group-item">Grupo 2</li>
            <li className="group-item">Grupo 3</li>
        </ul>
    </div>
);

const Integrations = () => (
    <div className="content-section">
        <h2>Integrations</h2>
        <p>Aqui ficam as integrações do sistema.</p>
    </div>
);

const Members = () => (
    <div className="content-section">
        <h2>Members</h2>
        <p>Lista de membros do sistema.</p>
    </div>
);

const Settings = () => (
    <div className="content-section">
        <h2>Settings</h2>
        <p>Configurações do sistema.</p>
    </div>
);

const Home = () => {
    return (
        <div className="home-container">
            <Dashboard /> {/* O Navbar fixo */}

            <div className="home-content">
                <Routes>
                    <Route path="groups" element={<Groups />} />
                    <Route path="integrations" element={<Integrations />} />
                    <Route path="members" element={<Members />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="/" element={<Groups />} />
                </Routes>
            </div>
        </div>
    );
};

export default Home;
