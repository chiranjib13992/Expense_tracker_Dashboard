import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AllExpenses from '../components/AllExpenses';
import AuthGuard from '../../../Guards/AuthGuard'
import AddExpense from '../components/AddExpense';
import AddIncome from '../components/AddIncome';
import AddSavings from '../components/AddSavings';
import AllSavings from '../components/AllSavings';
import Blog from '../components/blog';
import MonthlyBudget from '../components/MonthlyBudget';
import TripPlan from '../components/TripPlan';
import CreateTrip from '../components/CreateTrip';
export default function ExpensesRouting() {
    return (
        <>
            <Route path="/allExpenses" element={<AuthGuard><AllExpenses /></AuthGuard>} />
            <Route path="/addExpenses" element={<AuthGuard><AddExpense /></AuthGuard>} />
            <Route path="/addIncome" element={<AuthGuard><AddIncome /></AuthGuard>} />
            <Route path="/addSavings" element={<AuthGuard><AddSavings /></AuthGuard>} />
            <Route path="/allSavings" element={<AuthGuard><AllSavings /></AuthGuard>} />
            <Route path="/blog" element={<AuthGuard><Blog /></AuthGuard>} />
            <Route path="/monthlyBudegt" element={<AuthGuard><MonthlyBudget /></AuthGuard>} />
            <Route path="/tripPlan" element={<AuthGuard><TripPlan /></AuthGuard>} />
            <Route path="/createTrip" element={<AuthGuard><CreateTrip /></AuthGuard>} />
            <Route path="/editExpenses/:id" element={<AuthGuard><AddExpense /></AuthGuard>} />
            <Route path="/editIncome/:id" element={<AuthGuard><AddIncome /></AuthGuard>} />
            <Route path="/editSavings/:id" element={<AuthGuard><AddSavings /></AuthGuard>} />
        </>
    )
}
