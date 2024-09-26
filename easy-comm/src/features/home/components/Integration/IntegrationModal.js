import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaLink, FaCheck, FaClock, FaExclamationCircle } from 'react-icons/fa';

const IntegrationModal = ({ show, handleClose, integration }) => {
    const [mainCommunication, setMainCommunication] = useState(integration.main_communication);
    const [status, setStatus] = useState(integration.status);
    const [lastUpdated, setLastUpdated] = useState(integration.last_updated);

    // Controle de ativação/desativação através do switch
    const handleToggleStatus = () => {
        setStatus(status === 'active' ? 'inactive' : 'active');
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{integration.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Campo de Comunicação Principal */}
                    <Form.Group controlId="formMainCommunication">
                        <Form.Label>MAIN COMMUNICATION</Form.Label>
                        <div className="d-flex align-items-center">
                            <Form.Control
                                type="text"
                                value={mainCommunication}
                                onChange={(e) => setMainCommunication(e.target.value)}
                            />
                            <FaLink className="ms-2" />
                        </div>
                    </Form.Group>

                    {/* Status - Agora controlado pelo switch, não editável */}
                    <Form.Group controlId="formStatus">
                        <Form.Label>STATUS</Form.Label>
                        <div className="d-flex align-items-center">
                            <Form.Control
                                type="text"
                                value={status.toUpperCase()}
                                readOnly
                            />
                            <FaCheck className="ms-2" />
                        </div>
                    </Form.Group>

                    {/* Última Atualização */}
                    <Form.Group controlId="formLastUpdated">
                        <Form.Label>LAST UPDATED</Form.Label>
                        <div className="d-flex align-items-center">
                            <Form.Control
                                type="text"
                                value={lastUpdated}
                                readOnly
                            />
                            <FaClock className="ms-2" />
                        </div>
                    </Form.Group>

                    {/* Alerta se a última atualização for maior que 24 horas */}
                    <div className="text-danger mt-3 d-flex align-items-center">
                        {new Date() - new Date(lastUpdated) > 24 * 60 * 60 * 1000 && (
                            <>
                                <FaExclamationCircle className="me-2" />
                                MORE THAN 24 HOURS SINCE LAST UPDATE
                            </>
                        )}
                    </div>

                    {/* Switch para controlar o status de habilitado/desabilitado */}
                    <Form.Group controlId="formDisable" className="mt-4">
                        <Form.Check
                            type="switch"
                            label="DISABLE/ENABLE"
                            checked={status === 'active'}
                            onChange={handleToggleStatus}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => console.log('Force update')}>
                    FORCE UPDATE
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default IntegrationModal;
