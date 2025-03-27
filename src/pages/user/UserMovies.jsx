// import React, { useEffect, useState } from "react";
// import {axiosInstance} from "../../config/axiosInstance"; // Use your axios instance
// import { FaStar } from "react-icons/fa";

// const UserMovies = () => {
//     const [movies, setMovies] = useState([]);
//     const [ratings, setRatings] = useState({});
//     const [reviews, setReviews] = useState({});

//     useEffect(() => {
//         // Fetch movies from backend
//         const fetchMovies = async () => {
//             try {
//                 const response = await axiosInstance.get("/movies"); // API route for getting movies
//                 setMovies(response.data);
//             } catch (error) {
//                 console.error("Error fetching movies:", error);
//             }
//         };
//         fetchMovies();
//     }, []);

//     const handleRating = (movieId, rating) => {
//         setRatings({ ...ratings, [movieId]: rating });
//     };

//     const handleReviewChange = (movieId, comment) => {
//         setReviews({ ...reviews, [movieId]: comment });
//     };

//     const submitReview = async (movieId) => {
//         try {
//             const response = await axiosInstance.post(`/movies/${movieId}/review`, {
//                 rating: ratings[movieId] || 0, // Default to 0 if no rating is selected
//                 comment: reviews[movieId] || "", // Default to empty comment if not entered
//             });

//             alert("Review submitted successfully!");
//             console.log("Response:", response.data);
//         } catch (error) {
//             console.error("Error submitting review:", error);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h2 className="text-center">Movies List</h2>
//             <div className="row">
//                 {movies.map((movie) => (
//                     <div key={movie._id} className="col-md-4 mb-4">
//                         <div className="card">
//                             <img
//                                 src={movie.image} // Assuming there's an image field in movie schema
//                                 alt={movie.title}
//                                 className="card-img-top"
//                                 style={{ height: "300px", objectFit: "cover" }}
//                             />
//                             <div className="card-body">
//                                 <h5 className="card-title">{movie.title}</h5>
//                                 <p className="card-text"><strong>Genre:</strong> {movie.genre}</p>
                                
//                                 {/* Star Rating */}
//                                 <div>
//                                     <strong>Rate this movie:</strong>
//                                     <div>
//                                         {[1, 2, 3, 4, 5].map((star) => (
//                                             <FaStar
//                                                 key={star}
//                                                 size={25}
//                                                 color={star <= (ratings[movie._id] || 0) ? "gold" : "gray"}
//                                                 onClick={() => handleRating(movie._id, star)}
//                                                 style={{ cursor: "pointer", marginRight: "5px" }}
//                                             />
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Review Input */}
//                                 <div className="mt-3">
//                                     <textarea
//                                         className="form-control"
//                                         placeholder="Write a review..."
//                                         rows="3"
//                                         value={reviews[movie._id] || ""}
//                                         onChange={(e) => handleReviewChange(movie._id, e.target.value)}
//                                     />
//                                     <button
//                                         className="btn btn-primary mt-2"
//                                         onClick={() => submitReview(movie._id)}
//                                     >
//                                         Submit Review
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };


// export default UserMovies



































import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {axiosInstance} from "../../config/axiosInstance";

const UserMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axiosInstance.get("/movies");
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Movies</h2>
      <div className="row">
        {movies.map((movie) => (
          <div key={movie._id} className="col-md-4">
            <div className="card mb-4">
              <img src={movie.posterUrl} className="card-img-top" alt={movie.title} />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">⭐ {movie.averageRating.toFixed(1)} ({movie.ratingCount} reviews)</p>
                <Link to={`/movies/${movie._id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMovies;
