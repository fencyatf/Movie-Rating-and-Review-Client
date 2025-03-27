import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { UserPen, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminProfile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.dispatchEvent(new Event("authChange"));

    navigate("/login");
  };

  return (
    <Container className="my-4">
      {/* <h2 className="text-center text-dark"> Admin Profile</h2> */}

      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="bg-dark text-white p-4">
            <Card.Body>
              <h4 className="text-center mb-3">Admin</h4>
              <p><strong>Email:</strong> admin@gmail.com</p>
              <p><strong>Joined:</strong> January 2025</p>
              <p><strong>Role:</strong> Super Admin</p>

              <hr />

              <div className="d-flex justify-content-between">
                <Button variant="outline-warning" className="d-flex align-items-center">
                  <UserPen size={20} className="me-2" /> Edit Profile
                </Button>
                <Button variant="outline-danger" className="d-flex align-items-center" onClick={handleLogout}>
                  <Lock size={20} className="me-2" /> Logout
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminProfile;