import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { Container, Alert, Spinner } from "react-bootstrap";

const Review = () => {
    const { movieId } = useParams();  // ✅ Get movieId from URL
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (!movieId) {  // ✅ Prevent API call if movieId is missing
                    setError("Movie ID is missing");
                    setLoading(false);
                    return;
                }

                const response = await axiosInstance.get(`/reviews/${movieId}`);
                setReviews(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch reviews");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [movieId]);

    return (
        <Container className="mt-4">
            <h3>Movie Reviews</h3>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}

            {Array.isArray(reviews) && reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review._id} className="review-card">
                        <p><strong>{review.userId?.name || "Anonymous"}:</strong> {review.text}</p>
                    </div>
                ))
            ) : (
                !loading && <p>No reviews available</p>
            )}
        </Container>
    );
};

export default Review;
