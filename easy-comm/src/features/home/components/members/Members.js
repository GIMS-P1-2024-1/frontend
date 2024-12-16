import React, { useEffect, useState } from 'react';
import './Members.css';
import AddMemberPopup from './AddMemberPopup'; // Importe o popup
import { fetchWithAuth } from '../../../auth/components/authService';

const Members = () => {
    const [members, setMembers] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Controla o popup

    const fetchMembers = async () => {
        try {
            const response = await fetchWithAuth(`${process.env.REACT_APP_API_URL}/members`);
            if (response.ok) {
                const data = await response.json();
                setMembers(data.members);
            } else {
                console.error('Failed to fetch members.');
            }
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleAddMemberClick = () => {
        setIsPopupOpen(true); // Abre o popup
    };

    const handleAddMember = async (newMember) => {
        try {
            const response = await fetchWithAuth(`${process.env.REACT_APP_API_URL}/members`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMember),
            });

            if (response.ok) {
                // Fecha o popup
                setIsPopupOpen(false);

                // Recarrega a lista diretamente da API
                fetchMembers();
            } else {
                throw new Error('Failed to add member.');
            }
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };


    return (
        <div className="members-container">
            <div className="members-header">
                <h2>Members</h2>
                <button className="add-member-btn" onClick={handleAddMemberClick}>
                    +
                </button>
            </div>
            <div className="members-list">
                {members.map((member, index) => (
                    <div key={index} className="member-card">
                        <h3>{member.email}</h3>
                        <p><strong>ROLE:</strong> {member.role}</p>
                        <p><strong>ID:</strong> {member.id}</p>
                    </div>
                ))}
            </div>
            {isPopupOpen && (
                <AddMemberPopup
                    onClose={() => setIsPopupOpen(false)}
                    onAddMember={handleAddMember}
                />
            )}
        </div>
    );
};

export default Members;
