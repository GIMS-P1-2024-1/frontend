import React from 'react';
import './Groups.css'; // Para manter o estilo dos componentes
import Gmail from '../../assets/gmail_icon.svg';
import Discord from '../../assets/discord_icon.svg'

const GroupList = ({ groups, selectedGroup, handleGroupClick, handleAddGroup }) => {  // Altere handleAddClick para handleAddGroup
    return (
        <div className="group-list">
            <div className="group-header">
                <h2>Existing Groups</h2>
                <button className="add-group-button" onClick={handleAddGroup}>+</button> {/* Aqui, também chamamos handleAddGroup */}
            </div>
            <ul>
                {groups.map((group, index) => (
                    <li
                        key={index}
                        className={`group-item ${selectedGroup.title === group.title ? 'selected' : ''}`}
                        onClick={() => handleGroupClick(group)}
                    >
                        <div className="group-info">
                            <h3>{group.title}</h3>
                            <p>{group.description}</p>
                        </div>
                        <div className="group-icons">
                            <img src={Gmail} alt="Ícone do Gmail" />
                            <img src={Discord} alt="Ícone do Discord" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupList;
