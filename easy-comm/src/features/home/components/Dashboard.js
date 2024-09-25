import React from 'react';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <header>
            <nav className="nav-bar">
                <div className="logo">
                    <h1>GIMS</h1>
                </div>
                <div className="nav-list">
                    <ul>
                        <li className="nav-item">
                            <NavLink to={"groups"} className="nav-link" activeClassName="active">Groups</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"integrations"} className="nav-link" activeClassName="active">Integrations</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"members"} className="nav-link" activeClassName="active">Members</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"settings"} className="nav-link" activeClassName="active">Settings</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Dashboard;
