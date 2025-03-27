import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import Review from "./Review";


const UserMovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);

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
                const { data } = await axiosInstance.get(`/reviews/${id}`);
        
                if (!Array.isArray(data)) {
                    throw new Error("Invalid reviews format received.");
                }
        
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error.response?.data || error.message);
                setReviews([]); // Ensure reviews is always an array
            }
        };
        

        fetchMovieDetails();
        fetchReviews();
    }, [id]);

    // const handleLike = async (reviewId) => {
    //     try {
    //         await axiosInstance.post(`/reviews/${reviewId}/like`);
    //         setReviews((prevReviews) =>
    //             prevReviews.map((r) =>
    //                 r._id === reviewId ? { ...r, likes: [...(r.likes || []), "userId"] } : r
    //             )
    //         );
    //     } catch (error) {
    //         console.error("Error liking review:", error);
    //     }
    // };

    // const handleDislike = async (reviewId) => {
    //     try {
    //         await axiosInstance.post(`/reviews/${reviewId}/dislike`);
    //         setReviews((prevReviews) =>
    //             prevReviews.map((r) =>
    //                 r._id === reviewId ? { ...r, dislikes: [...(r.dislikes || []), "userId"] } : r
    //             )
    //         );
    //     } catch (error) {
    //         console.error("Error disliking review:", error);
    //     }
    // };


    return (
        <div className="container mt-4">
            {movie ? (
                <>
                    <h2>{movie.title}</h2>
                    <p>Directed by: {movie.director}</p>
                    <p>⭐ {movie.averageRating.toFixed(1)} ({movie.ratingCount} reviews)</p>
                    <img src={movie.posterUrl} alt={movie.title} className="img-fluid mb-3" />
                    <h3>Reviews</h3>
                    <Review movieId={id} setReviews={setReviews} />
                    <div className="mt-3">
                        {reviews.map((review) => (
                            <div key={review._id} className="border p-3 mb-2">
                                <strong>⭐ {review.rating}</strong>
                                <p>{review.review}</p>
                                {/* <button className="btn btn-sm btn-success" onClick={() => handleLike(review._id)}>👍 {review.likes?.length || 0}</button>
                                <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDislike(review._id)}>👎 {review.dislikes?.length || 0}</button> */}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Loading movie details...</p>
            )}
        </div>
    );
};

export default UserMovieDetails;