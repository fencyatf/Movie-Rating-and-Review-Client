import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Carousel from "react-bootstrap/Carousel";
import { axiosInstance } from "../config/axiosInstance";

const Home = () => {
  // State variables for search, movies, errors, genres, and reviews
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [genres, setGenres] = useState([]);
  const [reviews, setReviews] = useState({});
  const [showReviews, setShowReviews] = useState({});

  useEffect(() => {
    // Fetch genres from the API
    const fetchGenres = async () => {
      try {
        const response = await axiosInstance.get('/genres');
        setGenres(response.data);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };

    fetchGenres();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      let response;
      const genreMatch = genres.find(g => g.name.toLowerCase() === searchQuery.toLowerCase());

      if (genreMatch) {
        response = await axiosInstance.get(`/movies/genre/${genreMatch.name}`);
      } else {
        response = await axiosInstance.get(`/movies/search/${searchQuery}`);
      }

      setMovies(response.data);
      setError("");
    } catch (err) {
      setMovies([]);
      setError("No movies found");
    }
  };

  // Function to get genre names from IDs
  const getGenreName = (genreArray) => {
    if (!Array.isArray(genreArray)) return "Unknown Genre";
    return genreArray.map((genre) => genre.name).join(", ") || "Unknown Genre";
  };

  // Function to fetch reviews for a specific movie
  const fetchReviews = async (movieId) => {
    try {
      const response = await axiosInstance.get(`/reviews/${movieId}`);
      console.log("Reviews response:", response);
      setReviews(prevReviews => ({
        ...prevReviews,
        [movieId]: response.data.reviews || []
      }));
    } catch (err) {
      console.error("Error fetching reviews:", err.response ? err.response.data : err.message);
    }
  };

  // Function to toggle the visibility of reviews
  const toggleReviews = (movieId) => {
    if (!showReviews[movieId]) {
      fetchReviews(movieId);
    }
    setShowReviews(prev => ({
      ...prev,
      [movieId]: !prev[movieId]
    }));
  };

  return (
    <>
      <section className="text-center py-5 bg-dark text-white">
        <Container>
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src="https://www.metacritic.com/a/img/resize/b7768de584471cee11e2ba1fe1c90af03285c973/catalog/provider/2/13/2-8bf95b5035fb009338ff590ab90c705d.jpg?auto=webp&fit=crop&height=675&width=1200" alt="First slide" />
              <Carousel.Caption>
                <h3>2018</h3>
                <p>A survival thriller depicting the Kerala floods of 2018 and the resilience of its people.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="https://images.indianexpress.com/2023/08/rdx.jpg" alt="Second slide" />
              <Carousel.Caption>
                <h3>RDX</h3>
                <p>An action-packed drama about three friends and their fight against injustice.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="https://totalreporter.com/wp-content/uploads/2024/02/Manjummel-Boys-1024x512.jpg" alt="Third slide" />
              <Carousel.Caption>
                <h3>Manjummel Boys</h3>
                <p>A thrilling story of friendship and survival, inspired by real events.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>
      </section>

      <section className="py-4 bg-light">
        <Container>
          <Form className="d-flex justify-content-center">
            <Form.Control type="text" placeholder="Search movies or genres..." className="w-50 me-2" value={searchQuery} onChange={handleSearchChange} />
            <Button variant="primary" onClick={handleSearch}><FaSearch /></Button>
          </Form>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          {error && <p className="text-center text-danger">{error}</p>}
          <Row>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <Col key={movie._id} md={3} sm={6} className="mb-4">
                  <Card className="shadow h-100">
                    <Card.Img variant="top" src={movie.posterUrl || "https://via.placeholder.com/400x600?text=No+Image"} alt={movie.title || "Movie Poster"} style={{ height: "400px", objectFit: "cover" }} />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fw-bold">{movie.title}</Card.Title>
                      <Card.Text>
                        <strong>Genre:</strong>  {getGenreName(movie.genre)}
                      </Card.Text>
                      <Card.Text className="text-warning">
                        ⭐ {movie.averageRating ? movie.averageRating.toFixed(1) : "No rating"} ({movie.ratingCount || 0} reviews)
                      </Card.Text>
                      <Card.Text className="flex-grow-1">{movie.description || "No description available"}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Button variant="link" onClick={() => toggleReviews(movie._id)}>
                        {showReviews[movie._id] ? "Hide Reviews" : "Show Reviews"}
                      </Button>
                      {showReviews[movie._id] && (
                        <>
                          <h6>Reviews:</h6>
                          {reviews[movie._id]?.length > 0 ? (
                            reviews[movie._id].map((review, index) => (
                              <div key={index} className="border-bottom py-1">
                                <strong>{review.userId?.name || "Anonymous"}</strong>: {review.review}
                              </div>
                            ))
                          ) : (
                            <p className="text-muted">No reviews yet.</p>
                          )}
                        </>
                      )}
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            ) : (
              <h3 className="text-center text-muted">Start searching for movies!</h3>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;