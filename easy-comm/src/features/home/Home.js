import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import './Home.css';
import Groups from "./components/Groups";
import Integrations from "./components/Integrations";
import Members from "./components/Members";
import Settings from "./components/Settings";

const Home = () => {
    return (
        <div className="home-container">
            <Dashboard />
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
