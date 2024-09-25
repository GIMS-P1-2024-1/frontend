import React from 'react';
import './GroupsList.css';
import Discord from'./discord_icon.svg'
import Gmail from './gmail_icon.svg'

const GroupList = ({ groups }) => {
    return (
        <div className="group-list">
            <h2>Existing Groups</h2>
            <ul>
                {groups.map((group, index) => (
                    <li key={index} className="group-item">
                        <div className="group-info">
                            <h3>{group.title}</h3>
                            <p>{group.description}</p>
                        </div>
                        <div className="group-icons">
                            <img src={Gmail} alt="Gmail Icon" />
                            <img src={Discord} alt="Discord Icon" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupList;