import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import SignInForm from './features/auth/components/SignInForm';
import SignUpForm from './features/auth/components/SignUpForm';
import Home from "./features/home/components/Home";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignInForm />} />
                <Route path="/signup" element={<SignUpForm />} />

                <Route path="/home/*" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
