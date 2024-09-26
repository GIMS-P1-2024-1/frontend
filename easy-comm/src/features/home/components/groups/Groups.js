import React, { useEffect, useState } from 'react';
import GroupList from './GroupsList';
import GroupDetails from './GroupDetails';
import './Groups.css';


const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/groups`);
                if (!response.ok) {
                    throw new Error('API reponse was not OK.');
                }

                const data = await response.json();
                console.log('API Response:', data);

                const transformedGroups = data.groups.map(group => ({
                    title: group.name,
                    description: group.description,    // TODO: add description field in backend
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
                group.title === updatedGroup.title ? updatedGroup : group
            )
        );
        setSelectedGroup(updatedGroup);
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
        <div className="group-management">
            {/* Render GroupList and GroupDetails only if groups are loaded */}
            {groups.length > 0 && (
                <>
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
                </>
            )}
            {groups.length === 0 && <p>Loading groups...</p>}
        </div>
    );
};

export default Groups;
