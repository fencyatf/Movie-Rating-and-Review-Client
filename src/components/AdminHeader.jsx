import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { House, UserPen } from "lucide-react";

function AdminHeader() {
    const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("token") && localStorage.getItem("role") === "admin");
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const isAuthenticated =
                !!localStorage.getItem("token") && localStorage.getItem("role") === "admin";
            setIsAdmin(isAuthenticated);

            if (!isAuthenticated) {
                navigate("/login"); // Redirect to login when the admin logs out
            }
        };

        checkAuth(); // Check authentication status on mount

        window.addEventListener("authChange", checkAuth);
        window.addEventListener("storage", checkAuth);

        return () => {
            window.removeEventListener("authChange", checkAuth);
            window.removeEventListener("storage", checkAuth);
        };
    }, [navigate]);

    if (!isAdmin) return null; // Hide the header if the admin is logged out

    return (
        <Navbar expand="lg" className="px-4 py-2" style={{ background: "linear-gradient(90deg, #8B0000, #FF4500)" }}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/admin-dashboard" className="fw-bold text-white">
                    🎬 Admin Panel
                </Navbar.Brand>

                <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/admin-dashboard" className="text-white mx-2 fw-semibold">
                        <House size={20} />
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin-profile" className="text-white mx-2 fw-semibold">
                        <UserPen size={20} />
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default AdminHeader;
