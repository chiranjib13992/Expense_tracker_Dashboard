// Header.jsx (Revised)
import React, { useState } from 'react';
import { logout, getUserPayload } from '../services/global.service';

export default function Header() {
const [userName, setUserName] = useState('Guest');
  useState(()=> {
  const userDetails = getUserPayload();
  console.log(userDetails, 'userDetails in header')
  setUserName(userDetails ? userDetails.name : 'Guest');
  }, [])

    return (
        // The key is adding d-flex and justify-content-between here!
        <header className="app-header d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
            
            {/* 1. Brand/Logo (Left) */}
            <div className="header-brand">
                {/* ... your BudgetBuddy link/logo ... */}
                <span className="h4 mb-0 fw-bold">💰 BudgetBuddy</span>
            </div>

            {/* 2. Primary Navigation (Center) */}
            <nav className="header-nav d-flex gap-4">
                {/* Use Link/NavLink here */}
                <a href="#" className="text-decoration-none">Dashboard</a>
                <a href="#" className="text-decoration-none">Reports</a>
                <a href="#" className="text-decoration-none">Add Expense</a>
                <a href="#" className="text-decoration-none">Settings</a>
            </nav>

            {/* 3. User Actions (Right) */}
            <div className="header-user-actions d-flex align-items-center gap-3">
                <span className="text-muted">Hello, **{userName}**!</span>
                <button className="btn btn-outline-secondary btn-sm" onClick={logout}>Log Out</button>
            </div>
            
        </header>
    );
}