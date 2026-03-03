import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AllExpenses from '../components/AllExpenses';
import AuthGuard from '../../../Guards/AuthGuard'
import AddExpense from '../components/AddExpense';
import AddIncome from '../components/AddIncome';
import AddSavings from '../components/AddSavings';
import AllSavings from '../components/AllSavings';
export default function ExpensesRouting() {
    return (
        <>
            <Route path="/allExpenses" element={<AuthGuard><AllExpenses /></AuthGuard>} />
            <Route path="/addExpenses" element={<AuthGuard><AddExpense /></AuthGuard>} />
            <Route path="/addIncome" element={<AuthGuard><AddIncome /></AuthGuard>} />
            <Route path="/addSavings" element={<AuthGuard><AddSavings /></AuthGuard>} />
            <Route path="/editExpenses/:id" element={<AuthGuard><AddExpense /></AuthGuard>} />
            <Route path="/allSavings" element={<AuthGuard><AllSavings /></AuthGuard>} />
            <Route path="/editIncome/:id" element={<AuthGuard><AddIncome /></AuthGuard>} />
        </>
    )
}
