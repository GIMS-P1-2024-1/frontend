import React, {useState, useEffect} from 'react';
import GmailIcon from '../../assets/gmail_icon.svg';
import DiscordIcon from '../../assets/discord_icon.svg';
import './Groups.css';
import groupService from "./GroupService"


const GroupDetails = ({selectedGroup, onSaveGroup}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [groupName, setGroupName] = useState(selectedGroup.title);
    const [groupDescription, setGroupDescription] = useState(selectedGroup.description);
    const [emailIntegration, setEmailIntegration] = useState(selectedGroup.emailIntegration || 'Not Connected');
    const [discordIntegration, setDiscordIntegration] = useState(selectedGroup.discordIntegration || 'Not Connected');
    const [members, setMembers] = useState(selectedGroup.members || []);
    const [membersToRemove, setMembersToRemove] = useState([]); // Armazena membros a serem removidos
    const [newMember, setNewMember] = useState('');
    const [error, setError] = useState('');

    const originalGroupName = selectedGroup.title;

    useEffect(() => {
        setGroupName(selectedGroup.title);
        setGroupDescription(selectedGroup.description);
        setEmailIntegration(selectedGroup.emailIntegration || 'Not Connected');
        setDiscordIntegration(selectedGroup.discordIntegration || 'Not Connected');
        setMembers(selectedGroup.members || []);
    }, [selectedGroup]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);
        const updatedGroup = {
            name: groupName,
            original_name: originalGroupName,
            description: groupDescription,
            discord_integration: discordIntegration,
            g_groups_integration: emailIntegration,
            members: members.filter(member => member.trim() !== ''), // Membros atualizados
            members_remove: membersToRemove, // Lista de membros a serem removidos
        };

        try {
            const response = await groupService.updateGroup(originalGroupName, updatedGroup); // Usando o nome original
            if (response.success) {
                onSaveGroup(updatedGroup);
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError('Erro ao atualizar o grupo.');
        }
    };

    const handleMemberChange = (index, newValue) => {
        const updatedMembers = [...members];
        if (newValue.trim() === '') {
            // Adiciona à lista de membros a serem removidos
            setMembersToRemove([...membersToRemove, updatedMembers[index]]);
            updatedMembers.splice(index, 1); // Remove o membro da lista de membros
        } else {
            updatedMembers[index] = newValue;
        }
        setMembers(updatedMembers);
    };

    const handleAddMembers = () => {
        const newMembersList = newMember
            .split(',')
            .map(member => member.trim())
            .filter(member => member !== '');
        if (newMembersList.length > 0) {
            setMembers([...members, ...newMembersList]);
            setNewMember('');
        }
    };

    return (
        <div className="group-details">
            <div className="main-header">
                <h2>Details</h2>
                {isEditing ? (
                    <button className="main-button save-button" onClick={handleSaveClick}>Salvar</button>
                ) : (
                    <button className="main-button edit-button" onClick={handleEditClick}>
                        <i className="material-icons">edit</i>
                    </button>
                )}
            </div>

            {error && <p style={{color: 'red'}}>{error}</p>}

            <div className="details-content">
                <label>Name:</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                ) : (
                    <p>{groupName}</p>
                )}

                <label>Description:</label>
                {isEditing ? (
                    <textarea
                        value={groupDescription}
                        onChange={(e) => setGroupDescription(e.target.value)}
                    />
                ) : (
                    <p>{groupDescription}</p>
                )}

                <label>Integrations:</label>
                <div className="integrations">
                    <div className="integration-item">
                        <img src={GmailIcon} alt="Gmail Icon"/>
                        {isEditing ? (
                            <input
                                type="text"
                                value={emailIntegration}
                                onChange={(e) => setEmailIntegration(e.target.value)}
                            />
                        ) : (
                            <p>{emailIntegration}</p>
                        )}
                    </div>
                    <div className="integration-item">
                        <img src={DiscordIcon} alt="Discord Icon"/>
                        {isEditing ? (
                            <input
                                type="text"
                                value={discordIntegration}
                                onChange={(e) => setDiscordIntegration(e.target.value)}
                            />
                        ) : (
                            <p>{discordIntegration}</p>
                        )}
                    </div>
                </div>

                <label>Members:</label>
                <ul className="members-list">
                    {members.map((member, index) => (
                        <li key={index}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={member}
                                    onChange={(e) => handleMemberChange(index, e.target.value)}
                                />
                            ) : (
                                <span>{member}</span>
                            )}
                        </li>
                    ))}
                </ul>
                {isEditing && (
                    <div className="add-member-section">
                        <input
                            type="text"
                            value={newMember}
                            onChange={(e) => setNewMember(e.target.value)}
                            placeholder="Adicionar novos membros, separados por vírgula"
                        />
                        <button onClick={handleAddMembers} className="add-member-button">Adicionar Membros</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupDetails;
