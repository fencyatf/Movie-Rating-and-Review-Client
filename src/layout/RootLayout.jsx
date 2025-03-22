import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import UserHeader from '../components/UserHeader';
import AdminHeader from "../components/AdminHeader";

export const RootLayout = () => {
    const [isUserAuth, setIsUserAuth] = useState(localStorage.getItem("role"));

    useEffect(() => {
        const checkAuth = () => {
            setIsUserAuth(localStorage.getItem("role"));
        };

        //window.addEventListener("storage", checkAuth);
        window.addEventListener("authChange", checkAuth); // 🔥 Listen for custom authChange event

        return () => {
           // window.removeEventListener("storage", checkAuth);
            window.removeEventListener("authChange", checkAuth);
        };
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100">
            {isUserAuth === "user" ? <UserHeader /> : isUserAuth === "admin" ? <AdminHeader /> : <Header />}
            <div className="flex-grow-1 container my-4">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default RootLayout;
