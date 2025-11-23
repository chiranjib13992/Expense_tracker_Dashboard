import React from 'react';
import AuthRouting from './modules/Auth/routing/AuthRouting';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './modules/dashboard/Dashboard';
import AuthGuard from './Guards/AuthGuard';
import ExpensesRouting from './modules/Expenses/routings/ExpensesRouting'


export default function AppRouting() {
    return (
         <Routes>
      {AuthRouting()}
        <Route path="/" element={<MainLayout />}>
        {ExpensesRouting()}
        <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Route>
    </Routes>
    )
}