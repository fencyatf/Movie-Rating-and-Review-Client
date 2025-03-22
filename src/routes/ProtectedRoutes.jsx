import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const [isUserAuth, setIsUserAuth] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const checkAuth = () => {
            setIsUserAuth(!!localStorage.getItem("token"));
        };

        window.addEventListener("storage", checkAuth); // Listen for changes in localStorage

        if (!localStorage.getItem("token")) {
            navigate('/login');
        }

        return () => window.removeEventListener("storage", checkAuth);
    }, [navigate]); // Added navigate as dependency

    return isUserAuth ? <Outlet /> : null;
};

export default ProtectedRoutes;
