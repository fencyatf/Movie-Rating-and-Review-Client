import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const Review = ({ movieId, setReviews }) => {
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post(`/reviews/${movieId}`, {
                rating: Number(rating),
                review: reviewText.trim(), // Prevent empty spaces being sent
            });

            setReviews((prevReviews) => [...prevReviews, data.review]); // Ensure 'review' is added
            setReviewText("");
            setRating(1);
        } catch (error) {
            console.error("Error submitting review:", error.response?.data || error.message);
        }
    };


    return (
        <div className="mb-3">
            <h4>Add a Review</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label>Rating: </label>
                    <select value={rating} onChange={(e) => setRating(e.target.value)} className="form-select">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num} Stars</option>
                        ))}
                    </select>
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
                <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
        </div>
    );
};

export default Review;

