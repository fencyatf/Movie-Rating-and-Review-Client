import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const Review = ({ movieId, setReviews }) => {
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting review for movieId:", movieId); // Debug log

        if (!reviewText.trim()) {
            setErrorMessage("Review text is required.");
            return;
        }

        try {
            const { data } = await axiosInstance.post(`/reviews/${movieId}`, {
                rating: Number(rating),
                review: reviewText.trim(),
            });

            if (!data || !data.review || !data.review._id) {
                throw new Error("Review submission failed, invalid response.");
            }

            setReviews((prevReviews) => [...prevReviews, data.review]);
            setReviewText("");
            setRating(1);
            setErrorMessage(""); // Clear error on successful submission
        } catch (error) {
            console.error("Error submitting review:", error.response?.data || error.message);
            setErrorMessage("Failed to submit review. Please try again.");
        }
    };

    return (
        <div className="mb-3">
            <h4>Add a Review</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <span
                            key={num}
                            onClick={() => setRating(num)}
                            style={{
                                cursor: "pointer",
                                color: num <= rating ? "gold" : "gray",
                                fontSize: "24px",
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <div className="mb-2">
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Write a review..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
        </div>
    );
};

export default Review;
