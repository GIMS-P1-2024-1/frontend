import React from 'react';
import './Groups.css'; // Para manter o estilo dos componentes
import Gmail from '../../assets/gmail_icon.svg';
import Discord from '../../assets/discord_icon.svg';

const GroupList = ({ groups, selectedGroup, handleGroupClick, handleAddGroup }) => {
    return (
        <div className="group-list">
            <div className="main-header">
                <h2>Existing Groups</h2>
                <button className="main-button" onClick={handleAddGroup}>
                    <i className="material-icons">add</i>
                </button> {/* Aqui, chamamos handleAddGroup */}
            </div>
            <ul className="group-list-items">
                {groups.map((group, index) => (
                    <li
                        key={index}
                        className={`group-item ${selectedGroup.name === group.name ? 'selected' : ''}`} // Substituído title por name
                        onClick={() => handleGroupClick(group)}
                    >
                        <div className="group-info">
                            <h3>{group.name}</h3> {/* Substituído title por name */}
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
