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
  },  [navigate]);

  if (isUserAuth === null) return null; // Prevent flicker

  return <Outlet />;
};

export default ProtectedRoutes;
