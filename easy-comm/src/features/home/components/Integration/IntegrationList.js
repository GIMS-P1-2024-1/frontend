import React, { useState } from 'react';
import { FaDiscord, FaEnvelope } from 'react-icons/fa';
import { MdWarning } from 'react-icons/md';
import IntegrationModal from './IntegrationModal'; // Importa o modal
import './IntegrationList.css';

const IntegrationList = ({ integrations }) => {
    const [selectedIntegration, setSelectedIntegration] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = (integration) => {
        setSelectedIntegration(integration);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="integration-list">
            {integrations.map((integration, index) => (
                <div
                    key={index}
                    className="integration-item"
                    onClick={() => handleShowModal(integration)} // Abre o modal ao clicar
                >
                    <div className="integration-content">
                        <div className="integration-info">
                            <h3>{integration.title}</h3>
                            <p>MAIN COMMUNICATION: {integration.main_communication} {integration.type}</p>
                            <div className="status-container">
                                <span className={`status ${integration.status}`}>STATUS: {integration.status.toUpperCase()}</span>
                                <span className="last-updated">LAST UPDATED: {integration.last_updated}</span>
                            </div>
                        </div>
                        <div className="integration-icon">
                            {integration.title.includes('Gmail') ? (
                                <FaEnvelope size={40} />
                            ) : integration.title.includes('Discord') ? (
                                <FaDiscord size={40} />
                            ) : null}
                        </div>
                    </div>
                    {integration.hasWarning && (
                        <div className="warning-icon">
                            <MdWarning size={30} color="red" />
                        </div>
                    )}
                </div>
            ))}

            {selectedIntegration && (
                <IntegrationModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    integration={selectedIntegration} // Passa a integração selecionada para o modal
                />
            )}
        </div>
    );
};

export default IntegrationList;
