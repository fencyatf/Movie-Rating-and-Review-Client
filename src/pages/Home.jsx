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
    } catch (error) {
      console.error(error);
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


      <section className="py-4 bg-info ">
        <Container>
          <Form className="d-flex justify-content-center">
            <Form.Control type="text" placeholder="Search movies or genres..." className="w-50 me-2" value={searchQuery} onChange={handleSearchChange} />
            <Button variant="primary" onClick={handleSearch}><FaSearch /></Button>
          </Form>
        </Container>
      
        <Container className="mt-4 ">
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
              <h3 className="text-center text-muted">Start searching for your favourite movies!</h3>
            )}
          </Row>
        </Container>
      </section>
      <section className="text-center py-5 ">
        <Container>
          <Row className="align-items-center">
            {/* Left Column - Carousel */}
            <Col md={8}>
              <Carousel>
                <Carousel.Item>
                  <img className="d-block w-100" src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/l2-empuraan-et00305698-1742987562.jpg" alt="First slide" />
                  <Carousel.Caption>
                    <h3>L2: Empuraan</h3>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/officer-on-duty-et00431676-1738321341.jpg" alt="Second slide" />
                  <Carousel.Caption>
                    <h3>Officer on Duty</h3>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/get-set-baby-et00430189-1737530759.jpg" alt="Third slide" />
                  <Carousel.Caption>
                    <h3>Get-Set Baby</h3>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/abhilasham-et00438997-1742543253.jpg" alt="Forth slide" />
                  <Carousel.Caption>
                    <h3>Abhilasham</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
            {/* Right Column - Small Cards */}
            <Col md={4}>
              <div style={{ border: "1px solid #ddd", borderRadius: ".5rem", padding: "10px", marginBottom: "10px" }}>
                <Row className="d-flex align-items-center">
                  <Col xs={5}>
                    <img
                      src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/veera-dheera-sooran--part-2-et00423507-1742972468.jpg"
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: ".3125rem" }}
                      alt="Veera Dheera Sooran"
                    />
                  </Col>
                  <Col xs={7}>
                    <h5 style={{ fontSize: "1rem", marginBottom: "5px" }}>Veera Dheera Sooran</h5>
                    <p style={{ fontSize: "0.8rem", marginBottom: "0" }}>
                      On a fateful night, Kaali's peaceful life is disrupted by SP's thirst for revenge.
                    </p>
                  </Col>
                </Row>
              </div>

              <div style={{ border: "1px solid #ddd", borderRadius: ".5rem", padding: "10px" }}>
                <Row className="d-flex align-items-center">
                  <Col xs={5}>
                    <img
                      src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/disneys-snow-white-et00408154-1723536682.jpg"
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: ".3125rem" }}
                      alt="Snow White"
                    />
                  </Col>
                  <Col xs={7}>
                    <h5 style={{ fontSize: "1rem", marginBottom: "5px" }}>Snow White</h5>
                    <p style={{ fontSize: "0.8rem", marginBottom: "0" }}>
                      Disney’s Snow White is a live-action musical reimagining of the classic 1937 film.
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>



          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;