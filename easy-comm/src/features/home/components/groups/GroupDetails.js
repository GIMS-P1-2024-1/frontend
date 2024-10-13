import React, { useState, useEffect } from 'react';
import GmailIcon from '../../assets/gmail_icon.svg';
import DiscordIcon from '../../assets/discord_icon.svg';
import './Groups.css';
import groupService from "./GroupService";


const GroupDetails = ({ selectedGroup, onSaveGroup }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [groupName, setGroupName] = useState(selectedGroup.name);
    const [groupDescription, setGroupDescription] = useState(selectedGroup.description);
    const [emailIntegration, setEmailIntegration] = useState(selectedGroup.emailIntegration || 'Not Connected');
    const [discordIntegration, setDiscordIntegration] = useState(selectedGroup.discordIntegration || 'Not Connected');
    const [members, setMembers] = useState(selectedGroup.members || []);
    const [newMember, setNewMember] = useState('');
    const [membersToRemove, setMembersToRemove] = useState([]); // Membros removidos
    const [error, setError] = useState('');

    const originalGroupName = selectedGroup.name;

    useEffect(() => {
        setGroupName(selectedGroup.name);
        setGroupDescription(selectedGroup.description);
        setEmailIntegration(selectedGroup.emailIntegration || 'Not Connected');
        setDiscordIntegration(selectedGroup.discordIntegration || 'Not Connected');
        setMembers(selectedGroup.members || []);
    }, [selectedGroup]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 5000); // Limpa a mensagem de erro após 5 segundos
            return () => clearTimeout(timer); // Limpa o timer ao desmontar ou quando o erro muda
        }
    }, [error]);

    const handleSaveClick = async () => {
        setIsEditing(false);

        // Não permitir null ou string vazia para name e description
        const updatedGroup = {
            original_name: originalGroupName,
            name: groupName,
            description: groupDescription,
            discord_integration: discordIntegration !== 'Not Connected' ? discordIntegration : null,
            g_groups_integration: emailIntegration !== 'Not Connected' ? emailIntegration : null,
            members: members.length > 0 ? members : null,
            members_remove: membersToRemove.length > 0 ? membersToRemove : null,
        };

        console.log("Members to send:", updatedGroup.members);
        console.log("Members to remove:", updatedGroup.members_remove);

        try {
            const response = await groupService.updateGroup(originalGroupName, updatedGroup);
            if (response.success) {
                onSaveGroup(updatedGroup);
                window.location.reload();
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError('Erro ao atualizar o grupo.');
        }
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

    const handleRemoveMember = (memberToRemove) => {
        // Atualiza a lista de membros a remover e remove da lista de membros
        setMembers(members.filter(member => member !== memberToRemove));
        setMembersToRemove([...membersToRemove, memberToRemove]);
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

            {error && <p style={{ color: 'red' }}>{error}</p>}

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
                        <img src={GmailIcon} alt="Gmail Icon" />
                        <input
                            type="text"
                            value={emailIntegration}
                            readOnly
                        />
                    </div>
                    <div className="integration-item">
                        <img src={DiscordIcon} alt="Discord Icon" />
                        {isEditing ? (
                            <input
                                type="text"
                                value={discordIntegration}
                                readOnly
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
                                <div className="member-item">
                                    <input
                                        type="text"
                                        value={member}
                                        readOnly
                                    />
                                    <button
                                        className="remove-member-button"
                                        onClick={() => handleRemoveMember(member)}
                                    >
                                        Remover
                                    </button>
                                </div>
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
