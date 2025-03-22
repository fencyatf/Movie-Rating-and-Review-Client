import { useState, useEffect } from "react";
import { Container, Card, Button, Alert, Spinner } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWatchlist();
  }, []);

  // Fetch user's watchlist
  const fetchWatchlist = async () => {
    try {
      const response = await axiosInstance.get("/watchlist");
      setWatchlist(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch watchlist.");
    } finally {
      setLoading(false);
    }
  };

  // Add a movie to watchlist
  const addToWatchlist = async (movieId) => {
    try {
      await axiosInstance.post(`/watchlist/${movieId}`);
      fetchWatchlist(); // Refresh watchlist
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add movie.");
    }
  };

  // Remove a movie from watchlist
  const removeFromWatchlist = async (movieId) => {
    try {
      await axiosInstance.delete(`/watchlist/${movieId}`);
      fetchWatchlist(); // Refresh watchlist
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove movie.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-primary text-center">My Watchlist</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? <Spinner animation="border" className="d-block mx-auto" /> : null}

      {watchlist.length === 0 && !loading ? (
        <p className="text-center">Your watchlist is empty.</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {watchlist.map((movie) => (
            movie.movieId ? ( 
              <Card key={movie._id} className="m-3" style={{ width: "200px" }}>
                <Card.Img variant="top" src={movie.movieId.poster_url} alt={movie.movieId.title} />
                <Card.Body>
                  <Card.Title className="text-center">{movie.movieId.title}</Card.Title>
                  <Button variant="danger" size="sm" onClick={() => removeFromWatchlist(movie.movieId._id)}>
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            ) : null
          ))}

        </div>
      )}
    </Container>
  );
};

export default Watchlist;
