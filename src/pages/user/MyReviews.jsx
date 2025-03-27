import { useEffect, useState } from "react";
import { Container, Card, Spinner } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";

function MyReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                console.log("Fetching user reviews...");
                const response = await axiosInstance.get("/reviews", {
                    withCredentials: true, 
                });
        
                console.log("API Response:", response.data);
                setReviews(response.data.reviews);
            } catch (error) {
                console.error("Error fetching user reviews:", error);
                if (error.response) {
                    setError(error.response.data.message || `Error: ${error.response.status}`);
                } else if (error.request) {
                    setError("No response from server. Please try again.");
                } else {
                    setError("Unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };
        

        fetchUserReviews();
    }, []);

    return (
        <Container className="my-4">
            <h2 className="text-center text-white">My Reviews</h2>
            {loading && <Spinner animation="border" className="d-block mx-auto my-3" />}
            {error && <p className="text-danger text-center">{error}</p>}
            {!loading && reviews.length === 0 && <p className="text-center text-warning">No reviews found.</p>}
            {reviews.map((review) => (
                <Card key={review._id} className="my-3 p-3 bg-dark text-white">
                    <Card.Body>
                        <Card.Title>{review.movieId?.title || "Unknown Movie"}</Card.Title>
                        <Card.Text>{review.review}</Card.Text>
                        <Card.Subtitle className="text-muted">Rating: {review.rating} / 5</Card.Subtitle>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}

export default MyReviews;
