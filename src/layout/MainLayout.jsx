import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { CrumbsProvider } from "../Hooks/CrumbsContext";


export default function MainLayout() {
    return (
        // 1. Outer Container: d-flex (column) for stacking and min-vh-100 for full height
        <div className="d-flex flex-column min-vh-100">
            <CrumbsProvider>
                
                {/* 2. Header: Stays at the top, full width */}
                <Header />
                
                {/* 3. Main Content Area: flex-grow-1 ensures it takes all remaining vertical space */}
                <main className="flex-grow-1 p-0 bg-light">
                    
                    {/* 4. Inner Content Wrapper (The crucial addition for centering content)
                         This creates the max-width (e.g., 1200px) and centers it.
                         All page content (<Outlet />) should go inside this centered container.
                    */}
                    <div className="container-fluid container-xl py-4 px-3 px-md-5">
                        <Outlet />
                    </div>
                    
                </main>
                
                {/* 5. Footer: Stays at the bottom, full width (p-0 removes the outer padding) */}
                <Footer />
                
            </CrumbsProvider>
        </div>
    );
}
