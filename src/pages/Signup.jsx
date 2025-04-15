import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { axiosInstance } from "../config/axiosInstance";
import "./Signup.css";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/user/signup", {
        name,
        email,
        password,
      });
      setSuccess(response.data.message);
      setError("");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      setSuccess("");
    }
  };

  return (
    <Container className="signup-page">
      <Card className="signup-card">
        <h3 className="text-center mb-3 signup-title">Sign Up</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}

        <Form onSubmit={handleSignup}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <div className="input-wrapper">
            <FaUser className="text-muted me-2" />
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="custom-input"
              required
            />
            </div>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <div className="input-wrapper">
            <FaEnvelope className="text-muted me-2" />
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="custom-input"
              required
            />
            </div>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="input-wrapper">
              <FaLock className="text-muted me-2" />
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="custom-input"
                required
              />
            </div>
          </Form.Group>

          <Button type="submit" className="signup-button w-100 mt-2">
            Sign Up
          </Button>
        </Form>

        <p className="text-center mt-3 signup-link" onClick={() => navigate("/login")}>
        Already have an account? Login
        </p>
      </Card>
    </Container>
  );
};

export default Signup;
