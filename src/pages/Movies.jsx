import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const [reviews, setReviews] = useState({});
  const [showReviews, setShowReviews] = useState({});

  // Fetch movies and genres on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get("/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await axiosInstance.get("/genres");
        setGenres(response.data);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };

    fetchMovies();
    fetchGenres();
  }, []);

  // Fetch reviews for a given movie
  const fetchReviews = async (movieId) => {
    try {
      const response = await axiosInstance.get(`/reviews/${movieId}`);
      setReviews((prevReviews) => ({
        ...prevReviews,
        [movieId]: response.data.reviews || [],
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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      let response;

      // Check if the search query matches a genre name
      const genreMatch = genres.find((g) => g.name.toLowerCase() === searchQuery.toLowerCase());

      if (genreMatch) {
        response = await axiosInstance.get(`/movies/genre/${genreMatch.name}`);
      } else {
        response = await axiosInstance.get(`/movies/search/${searchQuery}`);
      }

      setMovies(response.data);
      setError("");

      // Fetch reviews for the retrieved movies
      response.data.forEach((movie) => fetchReviews(movie._id));
    } catch (err) {
      setMovies([]);
      setError("No movies found");
    }
  };

  // Function to get genre names from IDs (handles multiple genres)

  const getGenreName = (genreArray) => {
    if (!Array.isArray(genreArray)) return "Unknown Genre";
    return genreArray.map((genre) => genre.name).join(", ") || "Unknown Genre";
  };



  if (loading) return <h3 className="text-center mt-5">Loading...</h3>;
  if (error) return <h3 className="text-danger text-center mt-5">{error}</h3>;

  return (
    <Container>
      <h2 className="text-center my-4">Movie List</h2>

      {/* Search Bar */}
      <section className="py-4 bg-light">
        <Container>
          <Form className="d-flex justify-content-center">
            <Form.Control
              type="text"
              placeholder="Search movies or genres..."
              className="w-50 me-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button variant="primary" onClick={handleSearch}>
              <FaSearch />
            </Button>
          </Form>
        </Container>
      </section>

      {/* Movie Cards */}
      <section className="py-5">
        <Container>
          <Row>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <Col key={movie._id} md={3} sm={6} className="mb-4">
                  <Card className="shadow h-100">
                    <Card.Img
                      variant="top"
                      src={movie.posterUrl || "https://via.placeholder.com/400x600?text=No+Image"}
                      alt={movie.title || "Movie Poster"}
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fw-bold">{movie.title}</Card.Title>

                      {/* Display Genre Names Correctly */}
                      <Card.Text>
                        <strong>Genre:</strong>  {getGenreName(movie.genre)}
                      </Card.Text>

                      {/* Display Movie Rating */}
                      <Card.Text className="text-warning">
                        ⭐ {movie.averageRating ? movie.averageRating.toFixed(1) : "No rating"} ({movie.ratingCount || 0} reviews)
                      </Card.Text>

                      <Card.Text className="flex-grow-1">
                        {movie.description || "No description available"}
                      </Card.Text>
                    </Card.Body>

                    {/* Reviews Section */}
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
              <h3 className="text-center text-muted">No movies found.</h3>
            )}
          </Row>
        </Container>
      </section>
    </Container>
  );
};

export default Movies;
