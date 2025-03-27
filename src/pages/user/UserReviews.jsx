import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get("/reviews", { withCredentials: true });
        setReviews(response.data.reviews);
      } catch (err) {
        setError("Failed to fetch reviews. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Your Reviews</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && reviews.length === 0 && <p>No reviews found.</p>}
      
      <ul className="list-group">
        {reviews.map((review) => (
          <li key={review._id} className="list-group-item">
            <h5>{review.movieId?.title || "Unknown Movie"}</h5>
            <p>{review.comment}</p>
            <small>Rated: {review.rating} ⭐</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserReviews;
