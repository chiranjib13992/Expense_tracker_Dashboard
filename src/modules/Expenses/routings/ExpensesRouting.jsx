import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AllExpenses from '../components/AllExpenses';
import AuthGuard from '../../../Guards/AuthGuard'
import AddExpense from '../components/AddExpense';
import AddIncome from '../components/AddIncome';
export default function ExpensesRouting() {
    return (
        <>
            <Route path="/allExpenses" element={<AuthGuard><AllExpenses /></AuthGuard>} />
            <Route path="/addExpenses" element={<AuthGuard><AddExpense /></AuthGuard>} />
            <Route path="/addIncome" element={<AuthGuard><AddIncome /></AuthGuard>} />
        </>
    )
}
