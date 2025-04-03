import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminProtectedRoutes = () => {
  const navigate = useNavigate();
  const [isAdminAuth, setIsAdminAuth] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "admin") {
      navigate("/login");  // Redirect if not authenticated
    } else {
      setIsAdminAuth(true);
    }
  }, [navigate]);

  return isAdminAuth ? <Outlet /> : null; // Wait until authentication check is complete
};

export default AdminProtectedRoutes;
