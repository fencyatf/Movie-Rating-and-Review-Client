import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { Container, Row, Col, Card } from "react-bootstrap";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get("/movies"); // Fetch all movies
        console.log("Movies Data:", response.data); // Debugging
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to load movies.");
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;
  if (error) return <h3 className="text-danger text-center mt-5">{error}</h3>;

  return (
    <Container>
      <h2 className="text-center my-4">Movie List</h2>
      <Row>
        {movies.map((movie) => (
          <Col key={movie._id} md={4} sm={6} xs={12} className="mb-4">
            <Card className="shadow">
              <Card.Img
                variant="top"
                src={movie.posterUrl}
                alt={movie.title}
                style={{ height: "300px", objectFit: "cover" }}
                onError={(e) => (e.target.src = "/fallback.jpg")} // Use fallback image if not found
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Card.Text><strong>Genre:</strong> {movie.genre.join(", ")}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Movies;
