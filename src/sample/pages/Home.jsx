import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Home = () => {
  return (
    <Container fluid className="bg-dark text-white py-4">
      {/* Main Featured Section */}
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <Card className="bg-dark text-white border-0">
            <Card.Img
              src="https://via.placeholder.com/900x500" // Replace with actual image
              alt="Movie Poster"
            />
            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
              <Card.Title className="fs-3 fw-bold">"Dupahiya" Cast's Favourite Scenes and Exclusive Stories</Card.Title>
              <Card.Text>Watch the Interview</Card.Text>
              <Button variant="warning" className="w-25">▶ Play</Button>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>

      {/* Up Next Section */}
      <Row className="mt-4">
        <Col md={3} className="bg-secondary p-3 rounded">
          <h5 className="text-warning">Up Next</h5>
          <Card className="bg-dark text-white my-2">
            <Card.Body>
              <Card.Title>Allison Brie and Dave Franco are 'Together'</Card.Title>
              <Button variant="light" size="sm">▶ Watch</Button>
            </Card.Body>
          </Card>

          <Card className="bg-dark text-white my-2">
            <Card.Body>
              <Card.Title>"White Lotus" Season 3 Cast Sing Praises for Mike White</Card.Title>
              <Button variant="light" size="sm">▶ Watch</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
