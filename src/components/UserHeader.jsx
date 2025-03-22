import { useState, useEffect } from "react";
import { Container, Nav, Navbar, Offcanvas, Dropdown } from "react-bootstrap";
import { BsFilm, BsList } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Settings, Bookmark, LogOut, Home } from "lucide-react";

function UserHeader() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="px-4 py-2" style={{ background: "linear-gradient(90deg, #0D47A1, #1976D2)" }}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold text-white">
            <BsFilm className="me-2 fs-4 text-warning" /> MOVIE HUB
          </Navbar.Brand>

          {/* Hamburger Menu - Positioned Right */}
          <BsList
            size={30}
            className="text-white ms-auto"
            style={{ cursor: "pointer" }}
            onClick={() => setShowSidebar(true)}
          />
        </Container>
      </Navbar>

      {/* Sidebar - Positioned Right */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">Hey!</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {/* Home Link */}
            <Nav.Link as={Link} to="/" className="d-flex align-items-center text-primary">
              <Home className="me-2" size={20} /> Home
            </Nav.Link>

            {isLoggedIn && (
              <>
                {/* Watchlist */}
                <Nav.Link as={Link} to="/watchlist" className="d-flex align-items-center text-primary">
                  <Bookmark className="me-2" size={20} /> Watchlist
                </Nav.Link>

                {/* Profile Dropdown */}
                <Dropdown className="mt-2">
                  <Dropdown.Toggle variant="light" className="text-primary text-start d-flex align-items-center">
                    <Bookmark className="me-2" size={20} /> Profile
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile" className="text-primary">
                      View Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/edit-profile" className="text-primary">
                      Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/review" className="text-primary">
                      My Reviews
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Settings Dropdown */}
                <Dropdown className="mt-2">
                  <Dropdown.Toggle variant="light" className="text-primary text-start d-flex align-items-center">
                    <Settings className="me-2" size={20} /> Settings
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/change-password" className="text-primary">
                      Change Password
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/delete-account" className="text-danger">
                      Delete Account
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>



                {/* Logout */}
                <Nav.Link onClick={handleLogout} className="d-flex align-items-center text-danger mt-2" style={{ cursor: "pointer" }}>
                  <LogOut className="me-2" size={20} /> Logout
                </Nav.Link>
              </>
            )}

            {!isLoggedIn && (
              <Nav.Link as={Link} to="/login" className="d-flex align-items-center fw-bold text-dark">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default UserHeader;
