import React, { useState } from 'react';
import IntegrationList from './IntegrationList'; 

const initialIntegrations = [
    { title: 'Gmail - Google Workspaces', main_communication: '@ccc', type: '(workspace)', status: 'active', last_updated: '' },
    { title: 'Discord', main_communication: 'CCC@UFCG', type: '(server)', status: 'active', last_updated: '' },
];

const Integrations = () => {
    const [integrations, setIntegrations] = useState(initialIntegrations);

    return (
        <div className="integrations-container">
            <h2>Integrations</h2>
            <IntegrationList integrations={integrations} />
        </div>
    );
};

export default Integrations;
