import React, {useEffect, useState} from 'react';
import './Members.css';
import {fetchWithAuth} from '../../auth/components/authService'; // Importar o fetchWithAuth

const Members = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetchWithAuth(`${process.env.REACT_APP_API_URL}/members`); // Usando o fetchWithAuth
                if (response.ok) {
                    const data = await response.json();
                    setMembers(data.members); // Supondo que a API retorna {members: [...] }
                } else {
                    console.error("Failed to fetch members.");
                }
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };

        fetchMembers();
    }, []);

    return (
        <div className="ola">
            <h2>Members</h2>
            <div className="members-container">
                <h3>Existing Members</h3>
                <div className="members-list">
                    {members.map((member, index) => (
                        <div key={index} className="member-card">
                            <h3>{member.email}</h3>
                            <p><strong>ROLE:</strong> {member.role}</p>
                            <p><strong>ID:</strong> {member.id}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Members;
