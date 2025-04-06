import { useState, useEffect } from "react";
import { Container, Card, Button, Alert, Spinner } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";

const Watchlist = ({ updateWatchlistCount }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWatchlist();
  }, []);

  // Fetch Watchlist
  const fetchWatchlist = async () => {
    try {
      const { data } = await axiosInstance.get("/watchlist");
      //console.log("Watchlist Data:", data);

      // Check if posterUrl is present
      data.forEach(movie => {
        // console.log("Movie:", movie);
        //console.log("Poster URL:", movie.movieId?.posterUrl);
      });

      setWatchlist(data);
      updateWatchlistCount(data.length);
    } catch (err) {
      setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };


  // Remove from Watchlist
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
              <Card key={movie._id} className="m-3" style={{ width: "200px", height: "400px" }}>
                <Card.Img variant="top" src={movie.movieId.posterUrl} alt={movie.movieId.title} style={{ height: "250px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title
                    className="text-center"
                    style={{
                      fontSize: "16px",
                      height: "40px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}
                  >{movie.movieId.title}</Card.Title>

                  {/* Show "In Watchlist" only if the movie is present in the watchlist */}
                  {watchlist.some((item) => item.movieId._id === movie.movieId._id) && (
                    <span className="text-success d-block text-center">In Watchlist</span>
                  )}

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
