import React, { useState } from 'react';
import './Popup.css';

const AddGroupPopup = ({ onClose, onAddGroup }) => {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupMembers, setGroupMembers] = useState(''); // Expansível, separado por vírgula

    const handleSubmit = () => {
        // Tratamento dos membros como uma lista de strings
        const membersArray = groupMembers.split(',').map(member => member.trim()).filter(member => member !== '');

        const newGroup = {
            name: groupName,
            description: groupDescription,
            members: membersArray
        };

        onAddGroup(newGroup);
        onClose(); // Fecha o popup após adicionar o grupo
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>Adicionar Novo Grupo</h3>
                <label>Nome do Grupo:</label>
                <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />

                <label>Descrição do Grupo:</label>
                <textarea
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    placeholder="Adicione a descrição do grupo"
                />

                <label>Membros (separados por vírgula):</label>
                <textarea
                    value={groupMembers}
                    onChange={(e) => setGroupMembers(e.target.value)}
                    placeholder="Adicione os e-mails dos membros separados por vírgula"
                />

                <div className="popup-actions">
                    <button onClick={handleSubmit}>Adicionar Grupo</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default AddGroupPopup;
