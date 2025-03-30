import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { Bookmark } from "lucide-react";

const UserMovies = ({ updateWatchlistCount }) => {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchMovies();
    fetchWatchlist();
    fetchGenres();
  }, []);

  // Fetch Movies
  const fetchMovies = async () => {
    try {
      const { data } = await axiosInstance.get("/movies");
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Fetch Watchlist
  const fetchWatchlist = async () => {
    try {
      const { data } = await axiosInstance.get("/watchlist");
      setWatchlist(data);

      if (typeof updateWatchlistCount === "function") {
        updateWatchlistCount(data.length);
      } else {
        console.error("updateWatchlistCount is not a function");
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  // Fetch Genres
  const fetchGenres = async () => {
    try {
      const { data } = await axiosInstance.get("/genres");
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Add to Watchlist
  const addToWatchlist = async (movieId) => {
    try {
      await axiosInstance.post(`/watchlist/${movieId}`);
      fetchWatchlist();
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      let response;
      const genreMatch = genres.find((g) => g.name.toLowerCase() === searchQuery.toLowerCase());

      if (genreMatch) {
        response = await axiosInstance.get(`/movies/genre/${genreMatch.name}`);
      } else {
        response = await axiosInstance.get(`/movies/search/${searchQuery}`);
      }

      setMovies(response.data);
      setError("");
    } catch (err) {
      setMovies([]);
      setError("No movies found");
    }
  };

// Function to get genre names from IDs (handles multiple genres)
const getGenreName = (genreArray) => {
  if (!Array.isArray(genreArray)) return "Unknown Genre";
  return genreArray.map((genre) => genre.name).join(", ") || "Unknown Genre";
};


  return (
    <div className="container mt-4 ">
      <h2 className="mb-3 text-center">Movies</h2>
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search movies by title or genre"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {movies.map((movie) => (
          <div key={movie._id} className="col-md-3 col-sm-6 d-flex align-items-stretch pt-4">
            <div className="card mb-3 w-100 " style={{ maxWidth: "220px", height: "100%" }}>
              <img src={movie.posterUrl} className="card-img-top" alt={movie.title} style={{ height: "300px", objectFit: "cover" }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title d-flex justify-center ">{movie.title}</h5>
                {/* Display Genre Names Correctly */}
                <p>
                  <strong>Genre:</strong>  {getGenreName(movie.genre)}
                </p>

                <p className="card-text flex-grow-1">
                  ⭐ {movie.averageRating?.toFixed(1)} ({movie.ratingCount} reviews)
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/movies/${movie._id}`} className="btn btn-sm btn-primary">View Details</Link>
                  <Bookmark
                    className="text-primary cursor-pointer"
                    size={20}
                    onClick={() => addToWatchlist(movie._id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMovies;