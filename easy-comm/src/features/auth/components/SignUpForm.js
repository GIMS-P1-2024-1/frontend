import React from 'react';
import './Form.css'; 
import { ReactComponent as Art } from '../assets/Art.svg';

const SignUpForm = () => {
    return (
        <div className="form-container">
            <div className="form-wrapper">
                <div className="decorative-side">
                    <Art />
                </div>
                <div className="form">
                    <h2>EasyComm</h2>
                    <h4>Sign Up</h4>
                    <form>
                        <div className="input-group">
                            <i className="material-icons">email</i>
                            <input type="email" placeholder="Email" required />
                        </div>
                        <div className="input-group">
                            <i className="material-icons">person</i>
                            <input type="text" placeholder="Name" required />
                        </div>
                        <div className="input-group">
                            <i className="material-icons">account_circle</i>
                            <input type="text" placeholder="Username" required />
                        </div>
                        <div className="input-group">
                            <i className="material-icons">lock</i>
                            <input type="password" placeholder="New Password" required />
                        </div>
                        <div className="input-group">
                            <i className="material-icons">lock</i>
                            <input type="password" placeholder="Confirm Password" required />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
