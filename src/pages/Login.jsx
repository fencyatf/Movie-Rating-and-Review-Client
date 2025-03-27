// import React, { useState } from "react";
// import { Form, Button, Container, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { axiosInstance } from "../config/axiosInstance";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();


//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const apiEndpoint = email === "admin@gmail.com" ? "/admin/login" : "/user/login";
//       const response = await axiosInstance.post(apiEndpoint, { email, password });

//       console.log("API Response:", response.data);

//       const { token, role, user, message } = response.data;

//       if (!token || !(role || user?.role)) {
//         throw new Error(message || "Invalid response. Check API.");
//       }

//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role || user.role); // Handle both user & admin roles

//       window.dispatchEvent(new Event("authChange"));

//       navigate((role || user.role) === "admin" ? "/admin-dashboard" : "/");

//     } catch (err) {
//       console.error("Login Error:", err);
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };


//   return (
//     <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//       <Card style={{ width: "400px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
//         <h3 className="text-center">Login</h3>
//         {error && <p className="text-danger text-center">{error}</p>}
//         <Form onSubmit={handleLogin}>
//           <Form.Group controlId="formEmail" className="mb-3">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="formPassword" className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Button type="submit" className="w-100 mt-2" style={{ background: "linear-gradient(90deg, #000000, #8B0000, #FF4500" }}>Login</Button>
//         </Form>

//         <p className="text-center mt-3">
//           Don't have an account? <span onClick={() => navigate("/signup")} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>Sign Up</span>
//         </p>
//         <p className="text-center mt-1">
//           Forgot your password? <span onClick={() => navigate("/forgot-password")} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>Forgot Password</span>
//         </p>
//       </Card>
//     </Container>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap"; // Added Spinner
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Added loading state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setLoading(true); // Start loading

        try {
            const apiEndpoint = email === "admin@gmail.com" ? "/admin/login" : "/user/login";
            const response = await axiosInstance.post(apiEndpoint, { email, password });

            console.log("API Response:", response.data);

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
            console.error("Login Error:", err);
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false); // Stop loading
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
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>

                    <Button type="submit" className="w-100 mt-2" style={{ background: "linear-gradient(90deg, #000000, #8B0000, #FF4500" }} disabled={loading}>
                        {loading ? <Spinner size="sm" animation="border" /> : "Login"}
                    </Button>
                </Form>

                <p className="text-center mt-3">
                    Don't have an account? <span onClick={() => navigate("/signup")} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>Sign Up</span>
                </p>
                <p className="text-center mt-1">
                    Forgot your password? <span onClick={() => navigate("/forgot-password")} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>Forgot Password</span>
                </p>
            </Card>
        </Container>
    );
};

export default Login;