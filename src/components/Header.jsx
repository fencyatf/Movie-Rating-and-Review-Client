import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BsFilm } from "react-icons/bs";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" className="px-5" style={{ background: "linear-gradient(90deg, #000000, #8B0000, #FF4500)" }}>
      <Container fluid>
        
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold text-white">
          <BsFilm className="me-2 fs-4 text-warning" /> MOVIE HUB
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile */}
        <Navbar.Toggle aria-controls="navbarScroll" className="border-0 bg-light" />

        {/* Collapsible Navbar */}
        <Navbar.Collapse id="navbarScroll" className="justify-content-center">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-white mx-2 fw-semibold">Home</Nav.Link>
            <Nav.Link as={Link} to="/movies" className="text-white mx-2 fw-semibold">Movies</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Buttons */}
        <div>
          <Button as={Link} to="/login" variant="outline-light" className="me-2 fw-semibold">
            Login
          </Button>
          <Button as={Link} to="/signup" variant="warning" className="fw-semibold">
            Signup
          </Button>
        </div>

      </Container>
    </Navbar>
  );
}

export default Header;
