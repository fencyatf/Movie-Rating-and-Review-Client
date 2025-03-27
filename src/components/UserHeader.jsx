// import { useState, useEffect } from "react";
// import { Container, Nav, Navbar, Offcanvas, Dropdown } from "react-bootstrap";
// import { BsFilm, BsList } from "react-icons/bs";
// import { Link, useNavigate } from "react-router-dom";
// import { Settings, Bookmark, LogOut, Home, UserRoundPen, Popcorn } from "lucide-react";

// function UserHeader() {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
//   const [role, setRole] = useState(localStorage.getItem("role"));
//   const [showSidebar, setShowSidebar] = useState(false);

//   useEffect(() => {
//     if (role === "admin") {
//       navigate("/admin-dashboard");
//     }
//   }, [role, navigate]);

//   useEffect(() => {
//     const checkAuth = () => {
//       setIsLoggedIn(!!localStorage.getItem("token"));
//       setRole(localStorage.getItem("role"));
//     };

//     window.addEventListener("authChange", checkAuth);
//     window.addEventListener("storage", checkAuth);

//     return () => {
//       window.removeEventListener("authChange", checkAuth);
//       window.removeEventListener("storage", checkAuth);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setIsLoggedIn(false);
//     setRole(null);
//     window.dispatchEvent(new Event("authChange"));
//     setTimeout(() => {
//       navigate("/login");
//     }, 0);
//   };

//   return (
//     <>
//       {role === "admin" ? navigate("/admin-dashboard") : null}

//       {/* Navbar */}
//       <Navbar expand="lg" className="px-4 py-2" style={{ background: "linear-gradient(90deg, #000000, #8B0000, #FF4500)" }}>
//         <Container fluid>
//           <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold text-white">
//             <BsFilm className="me-2 fs-4 text-warning" /> MOVIE HUB
//           </Navbar.Brand>

//           <BsList
//             size={30}
//             className="text-white ms-auto"
//             style={{ cursor: "pointer" }}
//             onClick={() => setShowSidebar(true)}
//           />
//         </Container>
//       </Navbar>

//       {/* Sidebar */}
//       <Offcanvas
//         show={showSidebar}
//         onHide={() => setShowSidebar(false)}
//         placement="end"
//         style={{ background: "#121212", color: "#FFFFFF" }}
//       >
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title className="fw-bold text-warning">Hey!</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <Nav className="flex-column">
//             <Nav.Link as={Link} to="/" className="d-flex align-items-center text-white" onClick={() => setShowSidebar(false)}>
//               <Home className="me-2 text-warning" size={20} /> Home
//             </Nav.Link>

//             {isLoggedIn && role === "user" && (
//               <>
//               <Nav.Link as={Link} to="/user-movies" className="d-flex align-items-center text-white" onClick={() => setShowSidebar(false)}>
//               <Popcorn className="me-2 text-warning" size={20} /> Movies
//                 </Nav.Link>

//                 <Nav.Link as={Link} to="/watchlist" className="d-flex align-items-center text-white" onClick={() => setShowSidebar(false)}>
//                   <Bookmark className="me-2 text-warning" size={20} /> Watchlist
//                 </Nav.Link>

//                 {/* Profile Dropdown */}
//                 <Dropdown className="mt-2">
//                   <Dropdown.Toggle variant="dark" className="text-white text-start d-flex align-items-center">
//                     <UserRoundPen className="me-2 text-warning" size={20} /> Profile
//                   </Dropdown.Toggle>
//                   <Dropdown.Menu className="bg-dark">
//                     <Dropdown.Item as={Link} to="/profile" className="text-light" onClick={() => setShowSidebar(false)}>
//                       View Profile
//                     </Dropdown.Item>
//                     <Dropdown.Item as={Link} to="/edit-profile" className="text-light" onClick={() => setShowSidebar(false)}>
//                       Edit Profile
//                     </Dropdown.Item>
//                     {/* <Dropdown.Item as={Link} to="/review" className="text-light" onClick={() => setShowSidebar(false)}>
//                       My Reviews
//                     </Dropdown.Item> */}
//                   </Dropdown.Menu>
//                 </Dropdown>

//                 {/* Settings Dropdown */}
//                 <Dropdown className="mt-2">
//                   <Dropdown.Toggle variant="dark" className="text-white text-start d-flex align-items-center">
//                     <Settings className="me-2 text-warning" size={20} /> Settings
//                   </Dropdown.Toggle>
//                   <Dropdown.Menu className="bg-dark">
//                     <Dropdown.Item as={Link} to="/change-password" className="text-light" onClick={() => setShowSidebar(false)}>
//                       Change Password
//                     </Dropdown.Item>
//                     <Dropdown.Item as={Link} to="/delete-account" className="text-danger" onClick={() => setShowSidebar(false)}>
//                       Delete Account
//                     </Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown>

//                 {/* Logout */}
//                 <Nav.Link onClick={handleLogout} className="d-flex align-items-center text-danger mt-2" style={{ cursor: "pointer" }}>
//                   <LogOut className="me-2 text-danger" size={20} /> Logout
//                 </Nav.Link>
//               </>
//             )}

//             {!isLoggedIn && (
//               <Nav.Link as={Link} to="/login" className="d-flex align-items-center fw-bold text-warning" onClick={() => setShowSidebar(false)}>
//                 Login
//               </Nav.Link>
//             )}
//           </Nav>
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// }

// export default UserHeader;



import { useState, useEffect } from "react";
import { Container, Nav, Navbar, Offcanvas, Dropdown } from "react-bootstrap";
import { BsFilm, BsList } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Settings, Bookmark, LogOut, Home, UserRoundPen, Popcorn, Star } from "lucide-react";

function UserHeader() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (role === "admin") {
      navigate("/admin-dashboard");
    }
  }, [role, navigate]);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("authChange", checkAuth);
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("authChange", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    window.dispatchEvent(new Event("authChange"));
    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  return (
    <>
      {role === "admin" ? navigate("/admin-dashboard") : null}

      {/* Navbar */}
      <Navbar expand="lg" className="px-4 py-2" style={{ background: "linear-gradient(90deg, #000000, #8B0000, #FF4500)" }}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold text-white">
            <BsFilm className="me-2 fs-4 text-warning" /> MOVIE HUB
          </Navbar.Brand>

          <BsList
            size={30}
            className="text-white ms-auto"
            style={{ cursor: "pointer" }}
            onClick={() => setShowSidebar(true)}
          />
        </Container>
      </Navbar>

      {/* Sidebar */}
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="end"
        style={{ background: "#121212", color: "#FFFFFF" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold text-warning">Hey!</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" className="d-flex align-items-center text-white" onClick={() => setShowSidebar(false)}>
              <Home className="me-2 text-warning" size={20} /> Home
            </Nav.Link>

            {isLoggedIn && role === "user" && (
              <>
                <Nav.Link as={Link} to="/user-movies" className="d-flex align-items-center text-white" onClick={() => setShowSidebar(false)}>
                  <Popcorn className="me-2 text-warning" size={20} /> Movies
                </Nav.Link>

                <Nav.Link as={Link} to="/watchlist" className="d-flex align-items-center text-white" onClick={() => setShowSidebar(false)}>
                  <Bookmark className="me-2 text-warning" size={20} /> Watchlist
                </Nav.Link>

                <Nav.Link as={Link} to="/user-reviews" className="d-flex align-items-center text-white" onClick={() => setShowSidebar(false)}>
                  <Star className="me-2 text-warning" size={20} /> My Reviews
                </Nav.Link>

                {/* Profile Dropdown */}
                <Dropdown className="mt-2">
                  <Dropdown.Toggle variant="dark" className="text-white text-start d-flex align-items-center">
                    <UserRoundPen className="me-2 text-warning" size={20} /> Profile
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="bg-dark">
                    <Dropdown.Item as={Link} to="/profile" className="text-light" onClick={() => setShowSidebar(false)}>
                      View Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/edit-profile" className="text-light" onClick={() => setShowSidebar(false)}>
                      Edit Profile
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Settings Dropdown */}
                <Dropdown className="mt-2">
                  <Dropdown.Toggle variant="dark" className="text-white text-start d-flex align-items-center">
                    <Settings className="me-2 text-warning" size={20} /> Settings
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="bg-dark">
                    <Dropdown.Item as={Link} to="/change-password" className="text-light" onClick={() => setShowSidebar(false)}>
                      Change Password
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/delete-account" className="text-danger" onClick={() => setShowSidebar(false)}>
                      Delete Account
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Logout */}
                <Nav.Link onClick={handleLogout} className="d-flex align-items-center text-danger mt-2" style={{ cursor: "pointer" }}>
                  <LogOut className="me-2 text-danger" size={20} /> Logout
                </Nav.Link>
              </>
            )}

            {!isLoggedIn && (
              <Nav.Link as={Link} to="/login" className="d-flex align-items-center fw-bold text-warning" onClick={() => setShowSidebar(false)}>
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
