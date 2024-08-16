import React from 'react';
import { Link } from 'react-router-dom'; // Importando o Link do React Router
import './Form.css'; 
import { ReactComponent as Art } from '../assets/Art.svg';

const SignInForm = () => {
    return (
        <div className="form-container">
            <div className="form-wrapper">
                <div className="decorative-side">
                    <Art />
                </div>
                <div className="form">
                    <h2>EasyComm</h2>
                    <h4>Sign In</h4>
                    <p>or <Link to="/signup">create an account</Link></p>
                    <form>
                        <div className="input-group">
                            <i className="material-icons">email</i>
                            <input type="email" placeholder="Email" required />
                        </div>
                        <div className="input-group">
                            <i className="material-icons">lock</i>
                            <input type="password" placeholder="Password" required />
                        </div>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
