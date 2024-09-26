import React from 'react';
import './IntegrationList.css'; 


import { FaDiscord, FaEnvelope } from 'react-icons/fa'; 

const IntegrationList = ({ integrations }) => {
    return (
        <div className="integration-list">
            {integrations.map((integration, index) => (
                <div key={index} className="integration-item">
                    <div className="integration-info">
                        <h3>{integration.title}</h3>
                        <p>{integration.main_communication}</p>
                        <p>{integration.type}</p>
                        <span className={`status ${integration.status}`}>{integration.status}</span>
                    </div>
                    <div className="integration-icon">
                        {integration.title.includes('Gmail') ? (
                            <FaEnvelope size={30} />
                        ) : integration.title.includes('Discord') ? (
                            <FaDiscord size={30} />
                        ) : null}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default IntegrationList;
