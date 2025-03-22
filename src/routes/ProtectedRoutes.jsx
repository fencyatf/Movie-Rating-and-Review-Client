import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const [isUserAuth, setIsUserAuth] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "user") {
      navigate("/login");  // Redirect if not authenticated
    } else {
      setIsUserAuth(true);
    }
  }, []);

  return isUserAuth ? <Outlet /> : null; // Wait until authentication check is complete
};

export default ProtectedRoutes;
