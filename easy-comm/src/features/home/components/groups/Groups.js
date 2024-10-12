import React, { useEffect, useState } from 'react';
import GroupList from './GroupsList';
import GroupDetails from './GroupDetails';
import './Groups.css';
import { fetchWithAuth } from '../../../auth/components/authService';


const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetchWithAuth(`${process.env.REACT_APP_API_URL}/groups`);
                if (!response.ok) {
                    throw new Error('API response was not OK.');
                }

                const data = await response.json();
                console.log('API Response:', data);

                // Usar 'name' em vez de 'title' para consistência com o backend
                const transformedGroups = data.groups.map(group => ({
                    name: group.name,  // Alterado para 'name' em vez de 'title'
                    description: group.description,
                    emailIntegration: group.g_groups_integration || '',
                    discordIntegration: group.discord_integration || '',
                    members: group.members.map(member => member.email)
                }));

                setGroups(transformedGroups);

                if (transformedGroups.length > 0) {
                    setSelectedGroup(transformedGroups[0]);
                }

            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, []);

    const handleGroupClick = (group) => {
        setSelectedGroup(group);
    };

    const handleSaveGroup = (updatedGroup) => {
        // Comparação feita por 'name' em vez de 'title'
        setGroups(prevGroups =>
            prevGroups.map(group =>
                group.name === updatedGroup.name ? updatedGroup : group
            )
        );
        setSelectedGroup(updatedGroup);
    };

    const handleAddGroup = () => {
        const newGroup = {
            name: 'Novo Grupo',
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
            {groups.length > 0 ? (
                <div className="group-management">
                    <GroupList
                        groups={groups}
                        selectedGroup={selectedGroup}
                        handleGroupClick={handleGroupClick}
                        handleAddGroup={handleAddGroup}
                    />
                    {selectedGroup && (
                        <GroupDetails
                            selectedGroup={selectedGroup}
                            onSaveGroup={handleSaveGroup}
                        />
                    )}
                </div>
            ) : (
                <p>Loading groups...</p>
            )}
        </div>
    );
};

export default Groups;
