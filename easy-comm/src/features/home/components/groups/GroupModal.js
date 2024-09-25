// GroupModal.js
import React, { useState } from 'react';
import './GroupModal.css';

const GroupModal = ({ onClose, onAddGroup }) => {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (groupName && groupDescription) {
            onAddGroup({ title: groupName, description: groupDescription });
            onClose(); // Fecha o modal após adicionar o grupo
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Group</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Group Name:
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Group Description:
                        <input
                            type="text"
                            value={groupDescription}
                            onChange={(e) => setGroupDescription(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Add Group</button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GroupModal;
