import React, { useState, useEffect } from 'react';
import IntegrationList from './IntegrationList';
import { fetchWithAuth } from '../../../auth/components/authService';

const Integrations = () => {
    const [discordStatus, setDiscordStatus] = useState('offline');
    const [gmailStatus, setGmailStatus] = useState('offline');

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetchWithAuth(`${process.env.REACT_APP_API_URL}/groups`);
                if (response.ok) {
                    const data = await response.json();

                    let discordFound = false;
                    let gmailFound = false;

                    data.groups.forEach(group => {
                        if (group.discord_integration) {
                            discordFound = true;
                        }
                        if (group.g_groups_integration) {
                            gmailFound = true;
                        }
                    });

                    setDiscordStatus(discordFound ? 'active' : 'offline');
                    setGmailStatus(gmailFound ? 'active' : 'offline');
                } else {
                    console.error("Failed to fetch groups.");
                }
            } catch (error) {
                console.error("Error fetching groups:", error);
            }
        };

        fetchGroups();
    }, []);

    const integrations = [
        { title: 'Discord', status: discordStatus },
        { title: 'Gmail - Google Workspaces', status: gmailStatus }
    ];

    return (
        <div className="integrations-container">
            <h2>Integrations</h2>
            <IntegrationList integrations={integrations} />
        </div>
    );
};

export default Integrations;
