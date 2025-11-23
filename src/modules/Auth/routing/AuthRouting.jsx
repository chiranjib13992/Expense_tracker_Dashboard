import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

export default function AuthRouting() {
    return (
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Navigate to="/login" replace />}/>
        </>
    )
}
