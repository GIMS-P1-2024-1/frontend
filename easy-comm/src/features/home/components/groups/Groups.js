import React, { useState } from 'react';
import GroupList from './GroupsList';
import GroupDetails from './GroupDetails';
import './Groups.css';

const initialGroups = [
    { title: 'ativos', description: 'Alunos ativos do curso', emailIntegration: 'ativos@ccc.ufcg.edu.br', discordIntegration: 'ccc@ufcg - #ativos', members: ['zorak.stellar@ccc.ufcg.edu.br', 'tina.morph@ccc.ufcg.edu.br', 'alden.nyrek@ccc.ufcg.edu.br'] },
    { title: 'perio24.1', description: 'Alunos ingressantes do período 24.1', emailIntegration: 'periodo24.1@ccc.ufcg.edu.br', discordIntegration: 'ccc@ufcg - #periodo24-1', members: ['phorak.motrin@ccc.ufcg.edu.br', 'velmar.zenith@ccc.ufcg.edu.br'] },
    { title: 'periodo23.2', description: 'Alunos ingressantes do período 23.2', emailIntegration: 'periodo23.2@ccc.ufcg.edu.br', discordIntegration: 'ccc@ufcg - #periodo23-2', members: ['aldren.morph@ccc.ufcg.edu.br', 'tyler.zenith@ccc.ufcg.edu.br'] },
    { title: 'grafos24.2-t1', description: 'Alunos matriculados em Grafos 24.2 (turma 1)', emailIntegration: 'grafos24.2-t1@ccc.ufcg.edu.br', discordIntegration: 'ccc@ufcg - #grafos24-2-t1', members: ['zorak.stellar@ccc.ufcg.edu.br', 'tina.morph@ccc.ufcg.edu.br'] },
    { title: 'eda24.2-t1', description: 'Alunos matriculados em EDA 24.2 (turma 1)', emailIntegration: 'eda24.2-t1@ccc.ufcg.edu.br', discordIntegration: 'ccc@ufcg - #eda24-2-t1', members: ['alden.nyrek@ccc.ufcg.edu.br', 'kernok.tyll@ccc.ufcg.edu.br'] },
    { title: 'eda24.2-t2', description: 'Alunos matriculados em EDA 24.2 (turma 2)', emailIntegration: 'eda24.2-t2@ccc.ufcg.edu.br', discordIntegration: 'ccc@ufcg - #eda24-2-t2', members: ['zorak.stellar@ccc.ufcg.edu.br', 'velmar.zenith@ccc.ufcg.edu.br'] },
];


const Groups = () => {
    const [groups, setGroups] = useState(initialGroups);
    const [selectedGroup, setSelectedGroup] = useState(groups[0]);

    const handleGroupClick = (group) => {
        setSelectedGroup(group);
    };

    const handleSaveGroup = (updatedGroup) => {
        // Atualiza o grupo localmente
        setGroups(prevGroups =>
            prevGroups.map(group =>
                group.title === updatedGroup.title ? updatedGroup : group
            )
        );
        setSelectedGroup(updatedGroup);

        // Aqui é onde a API seria chamada para salvar os dados
        /*
        fetch(`https://sua-api.com/grupos/${updatedGroup.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedGroup),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Grupo atualizado com sucesso:', data);
                // Atualiza o estado com os grupos atualizados da API (se necessário)
                setGroups(data.grupos); // Exemplo: caso a API retorne todos os grupos atualizados
            })
            .catch(error => {
                console.error('Erro ao atualizar o grupo:', error);
            });
        */
    };

    const handleAddGroup = () => {
        const newGroup = {
            title: 'Novo Grupo',
            description: 'Grupo recém-adicionado',
            emailIntegration: '',
            discordIntegration: '',
            members: []
        };
        setGroups([...groups, newGroup]);
        setSelectedGroup(newGroup);
    };

    return (
        <div className="group-page-container">
            <h1 className="group-page-title">Group Management</h1> {/* Adiciona o título */}
            <div className="group-management">
                <GroupList
                    groups={groups}
                    selectedGroup={selectedGroup}
                    handleGroupClick={handleGroupClick}
                    handleAddGroup={handleAddGroup}
                />
                <GroupDetails
                    selectedGroup={selectedGroup}
                    onSaveGroup={handleSaveGroup}
                />
            </div>
        </div>
    );
};

export default Groups;
