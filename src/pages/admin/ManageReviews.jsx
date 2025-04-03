import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const ManageReviews = ({ user, admin }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axiosInstance.get("/reviews");
                setReviews(response.data);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch reviews");
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const handleDelete = async (reviewId) => {
        try {
            await axiosInstance.delete(`/reviews/${reviewId}`);
            setReviews(reviews.filter(review => review._id !== reviewId));
        } catch (error) {
            console.error(error);
            alert("Failed to delete review");
        }
    };

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div >
            <h2>Manage Reviews</h2>
        
            <ul>
                {reviews.map((review) => (
                    <li key={review._id}>
                        <p><strong>{review.username}</strong>: {review.content}</p>
                        {(admin || user?.id === review.userId) && (
                            <button onClick={() => handleDelete(review._id)}>Delete</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageReviews;