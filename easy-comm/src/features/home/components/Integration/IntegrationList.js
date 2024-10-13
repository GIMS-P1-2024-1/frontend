import React, { useState } from 'react';
import { FaDiscord, FaEnvelope } from 'react-icons/fa';
import { MdWarning } from 'react-icons/md';
import CreateIntegrationModal from './CreateIntegrationModal '; // Importa o modal
import './IntegrationList.css';

const IntegrationList = ({ integrations }) => {
    const [showModal, setShowModal] = useState(false);

    // Função para abrir o modal ao clicar no botão de criar integração
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="integration-list">
            <div className="integration-list-header">
                <h3>Existing Integrations</h3>
                <button className="add-integration-button" onClick={handleShowModal}>
                    <i className="material-icons">add</i>
                </button>
            </div>

            {/* Lista de integrações */}
            {integrations.map((integration, index) => (
                <div key={index} className="integration-item">
                    <div className="integration-content">
                        <div className="integration-info">
                            <h3>{integration.title}</h3>
                            <div className="status-container">
                                <span className={`status ${integration.status}`}>
                                    STATUS: {integration.status.toUpperCase()}
                                </span>
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

            {/* Renderizando o modal */}
            {showModal && (
                <CreateIntegrationModal
                    show={showModal}
                    handleClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default IntegrationList;
