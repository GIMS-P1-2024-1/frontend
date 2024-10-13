import React, { useEffect, useState } from 'react';
import GroupList from './GroupsList';
import GroupDetails from './GroupDetails';
import AddGroupPopup from './Popup'; // Importe o popup
import './Groups.css';
import { fetchWithAuth } from '../../../auth/components/authService';

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para controlar o popup

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetchWithAuth(`${process.env.REACT_APP_API_URL}/groups`);
                if (!response.ok) {
                    throw new Error('API response was not OK.');
                }

                const data = await response.json();
                const transformedGroups = data.groups.map(group => ({
                    name: group.name,
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
        setGroups(prevGroups =>
            prevGroups.map(group =>
                group.name === updatedGroup.name ? updatedGroup : group
            )
        );
        setSelectedGroup(updatedGroup);
    };

    const handleAddGroupClick = () => {
        setIsPopupOpen(true); // Abre o popup ao clicar em "+"
    };

    const handleAddGroup = async (newGroup) => {
        try {
            const response = await fetchWithAuth(`${process.env.REACT_APP_API_URL}/groups`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGroup),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar o grupo.');
            }

            const addedGroup = await response.json();
            setGroups([...groups, addedGroup]);
            setSelectedGroup(addedGroup);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao adicionar o grupo:', error);
        }
    };

    return (
        <div className="main-group-management">
            <h1>Group management</h1>
            <div className="group-management-box-container">
                {groups.length > 0 ? (
                    <div className="group-management">
                        <GroupList
                            groups={groups}
                            selectedGroup={selectedGroup}
                            handleGroupClick={handleGroupClick}
                            handleAddGroup={handleAddGroupClick} // Abre o popup ao adicionar grupo
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
                {isPopupOpen && (
                    <AddGroupPopup
                        onClose={() => setIsPopupOpen(false)}
                        onAddGroup={handleAddGroup} // Função chamada ao adicionar grupo
                    />
                )}
            </div>
        </div>
    );
};

export default Groups;
