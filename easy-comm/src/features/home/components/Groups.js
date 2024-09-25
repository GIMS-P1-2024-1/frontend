import React, { useState } from 'react';

import './Groups.css';
import Discord from'./discord_icon.svg'
import Gmail from './gmail_icon.svg'


const groups = [
    { title: 'ativos', description: 'Alunos ativos do curso' },
    { title: 'periodo24.1', description: 'Alunos ingressantes do período 24.1' },
    { title: 'periodo23.2', description: 'Alunos ingressantes do período 23.2' },
    { title: 'grafos24.2-t1', description: 'Alunos matriculados em Grafos 24.2 (turma 1)' },
    { title: 'eda24.2-t1', description: 'Alunos matriculados em EDA 24.2 (turma 1)' },
    { title: 'eda24.2-t2', description: 'Alunos matriculados em EDA 24.2 (turma 2)' }

    // Adicione mais grupos se necessário...
];

const Groups = () => {
    const [selectedGroup, setSelectedGroup] = useState(groups[0]);

    const handleGroupClick = (group) => {
        setSelectedGroup(group);
    };

    return (
        <div className="group-management">
            <div className="group-list">
                <h2>Existing Groups</h2>
                <ul>
                    {groups.map((group, index) => (
                        <li key={index} className={`group-item ${selectedGroup.title === group.title ? 'selected' : ''}`} onClick={() => handleGroupClick(group)}>
                            <div className="group-info">
                                <h3>{group.title}</h3>
                                <p>{group.description}</p>
                            </div>
                            <div className="group-icons">
                                <img src={Gmail} alt="Gmail Icon" />
                                <img src={Discord} alt="Discord Icon" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="group-details">
                <h2>Details</h2>
                <p><strong>Name:</strong> {selectedGroup.title}</p>
                <p><strong>Description:</strong> {selectedGroup.description}</p>
                <p><strong>Integrations:</strong></p>
                <p>Email: example@email.com</p>
                <p>Discord: Not Connected</p>
                <p><strong>Members:</strong></p>
                <ul>
                    <li>member1@example.com</li>
                    <li>member2@example.com</li>
                </ul>
            </div>
        </div>
    );
};

export default Groups;

