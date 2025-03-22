import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import UserHeader from '../components/UserHeader';

export const RootLayout = () => {
    const [isUserAuth, setIsUserAuth] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const checkAuth = () => {
            setIsUserAuth(!!localStorage.getItem("token"));
        };

        window.addEventListener("storage", checkAuth);
        window.addEventListener("authChange", checkAuth); // 🔥 Listen for custom authChange event

        return () => {
            window.removeEventListener("storage", checkAuth);
            window.removeEventListener("authChange", checkAuth);
        };
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100">
            {isUserAuth ? <UserHeader /> : <Header />}
            <div className="flex-grow-1 container my-4">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default RootLayout;
