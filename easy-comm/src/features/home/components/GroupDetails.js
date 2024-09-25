import React from 'react';
import './GroupDetails.css'

const GroupDetails = ({ selectedGroup }) => {
    if (!selectedGroup) {
        return <div className="group-details">Selecione um grupo para ver os detalhes</div>;
    }

    return (
        <div className="group-details">
            <h4>Details</h4>
            <div className="detail-item">
                <label>Name:</label>
                <input type="text" value={selectedGroup.name} disabled />
            </div>
            <div className="detail-item">
                <label>Description:</label>
                <input type="text" value={selectedGroup.description} disabled />
            </div>
            <div className="detail-item">
                <label>Integrations:</label>
                <p>Email: {selectedGroup.email}</p>
                <p>Discord: {selectedGroup.discord ? selectedGroup.discord : 'Not Connected'}</p>
            </div>
            <div className="detail-item">
                <label>Members:</label>
                <ul className="members-list">
                    {selectedGroup.members.map((member, index) => (
                        <li key={index}>{member}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GroupDetails;
