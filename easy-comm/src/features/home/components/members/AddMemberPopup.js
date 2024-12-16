import React, { useState } from 'react';
import './AddMemberPopup.css';

const AddMemberPopup = ({ onClose, onAddMember }) => {
    const [newMember, setNewMember] = useState({ id: '', email: '', role: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMember((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddMember(newMember); // Envia os dados do novo membro para o componente pai
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>Add New Member</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="id"
                        placeholder="ID"
                        value={newMember.id}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newMember.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        value={newMember.role}
                        onChange={handleInputChange}
                        required
                    />
                    <div className="popup-actions">
                        <button type="submit" className="popup-btn save">
                            Save
                        </button>
                        <button type="button" className="popup-btn cancel" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMemberPopup;
