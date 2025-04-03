import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import Review from "./Review";
import { StarFill, PersonCircle } from "react-bootstrap-icons";
import { Card, Container, Row, Col, Alert, Image } from "react-bootstrap";

const UserMovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const { data } = await axiosInstance.get(`/movies/${id}`);
                setMovie(data);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axiosInstance.get(`/reviews/${id}`);
                let { reviews } = response.data;

                // Filter out reviews where userId is missing (deleted users)
                reviews = reviews.filter(review => review.userId && review.userId.name);

                setReviews(reviews);

                // Get actual logged-in user ID (Replace with your auth logic)
                const userId = localStorage.getItem("userId");

                if (userId) {
                    const existingReview = reviews.find(
                        (review) => review.userId?._id === userId
                    );
                    setUserReview(existingReview);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error.response?.data || error.message);
                setReviews([]);
            }
        };

        fetchMovieDetails();
        fetchReviews();
    }, [id]);

    return (
        <Container className="mt-4">
            {movie ? (
                <Card className="shadow-lg p-4">
                    <Row className="align-items-center">
                        {/* Left Side - Movie Poster */}
                        <Col md={4} className="text-center">
                            <Image
                                src={movie.posterUrl}
                                alt={movie.title}
                                fluid
                                rounded
                                style={{ width: "100%", height: "400px", objectFit: "cover" }}
                            />
                        </Col>

                        {/* Right Side - Movie Details */}
                        <Col md={8}>
                            <h2 className="fw-bold">{movie.title}</h2>
                            <h5 className="text-muted">Directed by: {movie.director}</h5>
                            <p className="mt-3 d-flex">
                                {[...Array(5)].map((_, i) => (
                                    <StarFill key={i} className={i < movie.averageRating ? "text-warning" : "text-secondary"} />
                                ))}
                                <span className="ms-2 text-muted">
                                    {movie?.averageRating?.toFixed(1) || "N/A"} ({movie?.ratingCount || 0} reviews)
                                </span>
                            </p>
                            <p>{movie.description}</p>
                        </Col>
                    </Row>
                </Card>
            ) : (
                <p>Loading movie details...</p>
            )}

            {/* Review Form (Only if user hasn't reviewed) */}
            {!userReview ? (
                <div className="mt-4">
                    <Review movieId={id} setReviews={setReviews} />
                </div>
            ) : (
                <Alert variant="danger" className="mt-4">
                    <strong>⚠ You have already reviewed this movie.</strong>
                </Alert>
            )}

            {/* Reviews Section */}
            <h4 className="mt-5">User Reviews</h4>
            <div className="mt-3">
                {reviews.length === 0 ? (
                    <Alert variant="info">No reviews yet. Be the first to add a review!</Alert>
                ) : (
                    reviews.map((review) => (
                        <Card key={review._id} className="mb-3 shadow-sm p-3">
                            <Row className="align-items-center">
                                <Col md={1} className="text-center">
                                    <PersonCircle size={40} className="text-secondary" />
                                </Col>
                                <Col md={11}>
                                    <h6 className="fw-bold">{review.userId?.name}</h6>
                                    <p className="mb-1 d-flex">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <StarFill key={i} className="text-warning" />
                                        ))}
                                    </p>
                                    <p className="text-muted">{review.review}</p>
                                </Col>
                            </Row>
                        </Card>
                    ))
                )}
            </div>
        </Container>
    );
};

export default UserMovieDetails;
