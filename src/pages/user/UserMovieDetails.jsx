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

        // const fetchReviews = async () => {
        //     try {
        //         const { data } = await axiosInstance.get(`/reviews/${id}`);
        //         console.log("Reviews API Response:", data);

        //         if (!Array.isArray(data)) {
        //             console.error("Expected an array but got:", data);
        //             throw new Error("Invalid reviews format received.");
        //         }

        //         setReviews(data);
        //     } catch (error) {
        //         console.error("Error fetching reviews:", error.response?.data || error.message);
        //         setReviews([]);
        //     }
        // };

        const fetchReviews = async () => {
            try {
                const data = await axiosInstance.get(`/reviews?movieId=${id}`);
                console.log("Reviews API Response:", data);

                if (Array.isArray(data)) {
                    setReviews(data); // ✅ Set state only if data is an array
                } else {
                    console.error("Expected an array but got:", data);
                    setReviews([]);
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
        <div className="container mt-4">
            {movie ? (
                <>
                    <h2>{movie.title}</h2>
                    <h5>Directed by: {movie.director}</h5>
                    <p>⭐ {movie.averageRating.toFixed(1)} ({movie.ratingCount} reviews)</p>
                    <img src={movie.posterUrl} alt={movie.title} className="img-fluid mb-3" />
                    <h3>Reviews</h3>
                    <Review movieId={id} setReviews={setReviews} />
                    <div className="mt-3">
                        {reviews.map((review) => (
                            <div key={review._id} className="border p-3 mb-2">
                                <strong>⭐ {review.rating}</strong>
                                <p>{review.review}</p>
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