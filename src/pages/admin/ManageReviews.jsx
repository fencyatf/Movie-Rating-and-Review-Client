import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Card, Button, ListGroup, Spinner, Alert, Container } from "react-bootstrap";

const ManageReviews = ({ user, admin }) => {
    const [movies, setMovies] = useState([]);
    const [expandedMovie, setExpandedMovie] = useState(null);
    const [reviews, setReviews] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axiosInstance.get("/movies");
                setMovies(response.data);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch movies");
            }
        };
        fetchMovies();
    }, []);

    const toggleReviews = async (movieId) => {
        if (expandedMovie === movieId) {
            setExpandedMovie(null);
        } else {
            setExpandedMovie(movieId);
            if (!reviews[movieId]) {
                setLoading(true);
                try {
                    const response = await axiosInstance.get(`/reviews/movie/${movieId}`);
                    setReviews({ ...reviews, [movieId]: response.data });
                } catch (error) {
                    console.error(error);
                    setError("Failed to fetch reviews");
                } finally {
                    setLoading(false);
                }
            }
        }
    };

    const handleDelete = async (reviewId, movieId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this review?");
        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`/reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setReviews({
                ...reviews,
                [movieId]: reviews[movieId].filter(review => review._id !== reviewId)
            });
        } catch (error) {
            console.error(error);
            alert("Failed to delete review");
        }
    };

    return (
        <Container className="py-4">
            <h3 className="mb-4">Movies List</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {movies.length === 0 && <Alert variant="info">No Movies Found</Alert>}

            {movies.map((movie) => (
                <Card key={movie._id} className="mb-3">
                    <Card.Header
                        onClick={() => toggleReviews(movie._id)}
                        style={{ cursor: "pointer" }}
                        className={expandedMovie === movie._id ? "bg-success text-white" : ""}
                    >
                        {movie.title}
                    </Card.Header>

                    {expandedMovie === movie._id && (
                        <Card.Body>
                            {loading ? (
                                <Spinner animation="border" variant="primary" />
                            ) : (reviews[movie._id]?.length === 0) ? (
                                <Alert variant="info">No Reviews Found</Alert>
                            ) : (
                                <ListGroup>
                                    {reviews[movie._id]?.map((review) => (
                                        <ListGroup.Item key={review._id} className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>{review.userId?.name || "Unknown User"}:</strong> {review.review}
                                            </div>
                                            {(admin || user?.id === review.userId?._id) && (
                                                <Button variant="danger" size="sm" onClick={() => handleDelete(review._id, movie._id)}>
                                                    Delete
                                                </Button>
                                            )}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                    )}
                </Card>
            ))}
        </Container>
    );
};

export default ManageReviews;
