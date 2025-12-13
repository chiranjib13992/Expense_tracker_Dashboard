import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { CrumbsProvider } from "../Hooks/CrumbsContext";


export default function MainLayout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <CrumbsProvider>
                <Header />
                <main className="flex-grow-1 p-0 bg-light">
                    <div className="container-fluid container-xl py-4 px-3 px-md-5">
                        <Outlet />
                    </div>

                </main>
                <Footer />

            </CrumbsProvider>
        </div>
    );
}
