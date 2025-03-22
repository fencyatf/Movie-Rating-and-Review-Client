import React from "react";
import { Navbar, Nav, Container, Card, Row, Col, Button } from "react-bootstrap";

const UserDashboard = () => {
  // Sample data (Replace with API data)
  const trendingMovies = [
    { title: "Inception", image: "https://via.placeholder.com/150" },
    { title: "Interstellar", image: "https://via.placeholder.com/150" },
    { title: "The Dark Knight", image: "https://via.placeholder.com/150" }
  ];

  const userReviews = [
    { movie: "Avatar", rating: "⭐⭐⭐⭐", review: "Amazing visuals!" },
    { movie: "Titanic", rating: "⭐⭐⭐⭐⭐", review: "A classic masterpiece." }
  ];

  const recommendedMovies = [
    { title: "Shutter Island", image: "https://via.placeholder.com/150" },
    { title: "The Prestige", image: "https://via.placeholder.com/150" }
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        
      </Navbar>

      <Container className="mt-4">
        {/* Welcome Message */}
        <h2>Welcome, User! 🎥</h2>

        {/* Trending Movies */}
        <h4 className="mt-4">🔥 Trending Movies</h4>
        <Row>
          {trendingMovies.map((movie, index) => (
            <Col key={index} md={4} className="mb-3">
              <Card>
                <Card.Img variant="top" src={movie.image} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* My Reviews */}
        <h4 className="mt-4">📝 My Reviews</h4>
        <Row>
          {userReviews.map((review, index) => (
            <Col key={index} md={6} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{review.movie}</Card.Title>
                  <Card.Text>{review.rating}</Card.Text>
                  <Card.Text>"{review.review}"</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Recommended Movies */}
        <h4 className="mt-4">🎬 Recommended for You</h4>
        <Row>
          {recommendedMovies.map((movie, index) => (
            <Col key={index} md={4} className="mb-3">
              <Card>
                <Card.Img variant="top" src={movie.image} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Write a Review Button */}
        <div className="text-center mt-4">
          <Button variant="primary" href="#write-review">✍️ Write a Review</Button>
        </div>
      </Container>
    </>
  );
};

export default UserDashboard;