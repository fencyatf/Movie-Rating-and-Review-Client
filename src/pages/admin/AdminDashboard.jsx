import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Users, Star, MessageSquare, Film, List } from "lucide-react";
import { Link } from "react-router-dom";
import './AdminDashboard.css'

function AdminDashboard() {
  return (
    <Container className="my-5">
      <Card className="p-4 rounded-4 border-0 shadow-lg">
        <h2 className="text-center text-dark fw-bold mb-4">Admin Dashboard</h2>

        <Row className="g-4 mt-4 justify-content-center">
          {/* First Row (3 items) */}
          <Col md={6} lg={4}>
            <Card className="border shadow-sm text-center p-4 rounded-4 hover-card">
              <div className="p-3 bg-primary bg-opacity-10 rounded-circle mx-auto shadow-sm hover-icon">
                <Users size={40} className="text-primary" />
              </div>
              <h5 className="mt-3 text-dark">Manage Users</h5>
              <Button
                as={Link}
                to="/manage-users"
                variant="primary"
                className="mt-3 rounded-pill px-4 hover-btn"
              >
                View Users
              </Button>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="border shadow-sm text-center p-4 rounded-4 hover-card">
              <div className="p-3 bg-success bg-opacity-10 rounded-circle mx-auto shadow-sm hover-icon">
                <Film size={40} className="text-success" />
              </div>
              <h5 className="mt-3 text-dark">Manage Movies</h5>
              <Button
                as={Link}
                to="/manage-movies"
                variant="success"
                className="mt-3 rounded-pill px-4 hover-btn"
              >
                View Movies
              </Button>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="border shadow-sm text-center p-4 rounded-4 hover-card">
              <div className="p-3 bg-info bg-opacity-10 rounded-circle mx-auto shadow-sm hover-icon">
                <List size={40} className="text-info" />
              </div>
              <h5 className="mt-3 text-dark">Manage Genres</h5>
              <Button
                as={Link}
                to="/manage-genres"
                variant="info"
                className="mt-3 rounded-pill px-4 hover-btn"
              >
                View Genres
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Second Row (Centered 2 items) */}
        {/* <Row className="g-4 mt-4 justify-content-center">
          <Col md={6} lg={4}>
            <Card className="border shadow-sm text-center p-4 rounded-4 hover-card">
              <div className="p-3 bg-warning bg-opacity-10 rounded-circle mx-auto shadow-sm hover-icon">
                <Star size={40} className="text-warning" />
              </div>
              <h5 className="mt-3 text-dark">Manage Reviews</h5>
              <Button
                as={Link}
                to="/manage-reviews"
                variant="warning"
                className="mt-3 rounded-pill px-4 hover-btn"
              >
                View Reviews
              </Button>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card className="border shadow-sm text-center p-4 rounded-4 hover-card">
              <div className="p-3 bg-danger bg-opacity-10 rounded-circle mx-auto shadow-sm hover-icon">
                <MessageSquare size={40} className="text-danger" />
              </div>
              <h5 className="mt-3 text-dark">User Reports</h5>
              <Button
                as={Link}
                to="/manage-reports"
                variant="danger"
                className="mt-3 rounded-pill px-4 hover-btn"
              >
                View Reports
              </Button>
            </Card>
          </Col>
        </Row> */}
      </Card>
    </Container>
  );
}

export default AdminDashboard;
