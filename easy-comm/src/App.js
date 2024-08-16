import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInForm from './features/auth/components/SignInForm';
import SignUpForm from './features/auth/components/SignUpForm';

function App() {
    return (
        <Router>
            <Routes>
                {/* Rota para a página de login (inicial) */}
                <Route path="/" element={<SignInForm />} />

                {/* Rota para a página de inscrição */}
                <Route path="/signup" element={<SignUpForm />} />
            </Routes>
        </Router>
    );
}

export default App;
