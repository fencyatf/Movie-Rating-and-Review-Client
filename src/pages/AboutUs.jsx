import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const AboutUs = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center text-center">
        <Col md={8}>
          <h1 className="fw-bold mb-4">About Us 🎬✨</h1>
          <p className="lead">
            Welcome to <strong>Movie Hub</strong>, the ultimate destination for movie lovers!
            Whether you're a casual viewer or a die-hard film enthusiast, we bring you
            <strong> honest, in-depth, and unbiased movie ratings and reviews</strong> to help you choose your next great watch.
          </p>
        </Col>
      </Row>

      <Row className="my-4">
        <Col md={6}>
          <Card className="shadow border-0 p-3"style={{ height: "220px" }}>
            <Card.Body>
              <Card.Title className="fw-bold">🎯 Our Mission</Card.Title>
              <Card.Text>
                At <strong>Movie Hub</strong>, we believe that movies are more than just entertainment—they are experiences,
                stories, and emotions that deserve thoughtful critique. Our goal is to create a
                <strong> community-driven platform</strong> where users can <strong>rate, review, and discuss movies</strong> openly.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow border-0 p-3" style={{ height: "220px" }}>
            <Card.Body>
              <Card.Title className="fw-bold">🔥 What We Offer</Card.Title>
              <ul className="list-unstyled">
                <li>✅ <strong>Authentic Reviews</strong> – Honest opinions from real movie enthusiasts.</li>
                <li>✅ <strong>User Ratings</strong> – A dynamic rating system based on community feedback.</li>
                <li>✅ <strong>Latest Releases</strong> – Stay updated with trending and upcoming films.</li>
                <li>✅ <strong>Genre-Based Recommendations</strong> – Find movies that match your taste.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="my-4">
        <Col md={6}>
          <Card className="shadow border-0 p-3" style={{ height: "220px" }}>
            <Card.Body>
              <Card.Title className="fw-bold">💡 Why Choose Us?</Card.Title>
              <ul className="list-unstyled">
                <li>🎥 <strong>Diverse Movie Selection</strong> – From Hollywood blockbusters to indie gems.</li>
                <li>🌟 <strong>Unbiased Ratings</strong> – No paid promotions—just genuine user-driven reviews.</li>
                <li>💬 <strong>Interactive Community</strong> – Engage in discussions & connect with cinephiles.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow border-0 p-3 text-center" style={{ height: "220px" }}>
            <Card.Body>
              <Card.Title className="fw-bold">🚀 Join the Conversation</Card.Title>
              <Card.Text>
                Be a part of our growing movie-loving community! Rate movies, write reviews,
                and <strong>help others discover the best films out there.</strong>
              </Card.Text>
              <h3 className="fw-bold mt-3">🎭 Lights, Camera, Review! 🎬</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;