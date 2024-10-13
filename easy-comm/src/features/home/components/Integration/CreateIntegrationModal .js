import React, { useState } from 'react';
import './CreateIntegrationModal.css';
import {fetchWithAuth} from "../../../auth/components/authService";

const CreateIntegrationModal = ({ handleClose, handleCreateIntegration }) => {
    const [groupName, setGroupName] = useState('');
    const [emailDomain, setEmailDomain] = useState('Inactive');
    const [discordEnabled, setDiscordEnabled] = useState(false);
    const [gmailEnabled, setGmailEnabled] = useState(false);

    const handleToggleDiscord = () => setDiscordEnabled(!discordEnabled);
    const handleToggleGmail = () => {
        setGmailEnabled(!gmailEnabled);
        if (!gmailEnabled) {
            setEmailDomain('computacao.ufcg.edu.br');
        } else {
            setEmailDomain('gmail not activated');
        }
    };

    const handleSubmit = async () => {
        const requests = [];

        if (discordEnabled) {
            const discordData = {
                group_name: groupName,
                service: 'discord',
                email_domain: null,
            };
            requests.push(discordData);
        }

        if (gmailEnabled) {
            const gmailData = {
                group_name: groupName,
                service: 'gmail',
                email_domain: emailDomain,
            };
            requests.push(gmailData);
        }

        try {
            const results = await Promise.all(requests.map(async (requestData) => {
                console.log('Enviando requisição:', requestData);
                const response = await fetchWithAuth(`${process.env.REACT_APP_API_URL}/groups/integrate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });

                if (!response.ok) {
                    throw new Error(`Failed to create integration for ${requestData.service}`);
                }

                const data = await response.json();
                return data;
            }));

            results.forEach(data => handleCreateIntegration(data));
            handleClose();
        } catch (error) {
        }
    };


    return (
        <div className="modal show">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Create Integration</h2>
                </div>

                <div className="modal-body">
                    <label>Group Name:</label>
                    <input
                        type="text"
                        placeholder="Enter group name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />

                    <label>Email Domain:</label>
                    <input
                        type="text"
                        value={emailDomain}
                        onChange={(e) => setEmailDomain(e.target.value)}
                        className={gmailEnabled ? 'active' : 'input-disabled'}
                        disabled={!gmailEnabled}
                    />

                    <div className="toggle-options">
                        <label>Discord:</label>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={discordEnabled}
                                onChange={handleToggleDiscord}
                            />
                            <span className="slider"></span>
                        </label>

                        <label>Gmail:</label>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={gmailEnabled}
                                onChange={handleToggleGmail}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="confirm-button" onClick={handleSubmit}>Create Integration</button>
                    <button className="cancel-button" onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateIntegrationModal;
