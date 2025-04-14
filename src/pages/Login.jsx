import React, { useState } from "react";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiEndpoint = email === "admin@gmail.com" ? "/admin/login" : "/user/login";
      const response = await axiosInstance.post(apiEndpoint, { email, password });

      const { token, role, user, message } = response.data;
      const userRole = role || user?.role;

      if (!token || !userRole) {
        throw new Error(message || "Invalid login credentials.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);
      window.dispatchEvent(new Event("authChange"));

      navigate(userRole === "admin" ? "/admin-dashboard" : "/");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Card className="login-card">
        <h3 className="text-center login-title mb-4">Welcome Back</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label className="text-white">Email address</Form.Label>
            <div className="input-wrapper">
              <FaEnvelope className="text-muted me-2" />
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label className="text-white">Password</Form.Label>
            <div className="input-wrapper">
              <FaLock className="text-muted me-2" />
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </Form.Group>

          <Button type="submit" className="login-button" disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : "Login"}
          </Button>
        </Form>

        <p className="text-center login-link" onClick={() => navigate("/signup")}>
          Don't have an account? Sign Up
        </p>
        {/* <p className="text-center login-link" onClick={() => navigate("/forgot-password")}>
          Forgot password? Reset
        </p> */}
      </Card>
    </div>
  );
};

export default Login;
