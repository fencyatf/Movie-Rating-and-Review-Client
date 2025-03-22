import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/user/login", { email, password });
    
      console.log("API Response:", response.data); // Debugging API response
    
      if (!response.data || !response.data.token) {
        throw new Error(response.data.message || "Token not received. Check API response.");
      }
    
      localStorage.setItem("token", response.data.token);
      window.dispatchEvent(new Event("authChange"));
      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };
  

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Card style={{ width: "400px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
        <h3 className="text-center">Login</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-2">Login</Button>
        </Form>
        
        <p className="text-center mt-3">
          Don't have an account? <span onClick={() => navigate("/signup")} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>Sign Up</span>
        </p>
        <p className="text-center mt-0.5">
          Forgot your password? <span onClick={() => navigate("/forgot-password")} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>Forgot Password</span>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
