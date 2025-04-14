import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { Bookmark } from "lucide-react";
import './UserMovies.css'

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

  const fetchMovies = async () => {
    try {
      const { data } = await axiosInstance.get("/movies");
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const { data } = await axiosInstance.get("/watchlist");
      setWatchlist(data);

      if (updateWatchlistCount && typeof updateWatchlistCount === "function") {
        updateWatchlistCount(data.length);
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const { data } = await axiosInstance.get("/genres");
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const addToWatchlist = async (movieId) => {
    try {
      await axiosInstance.post(`/watchlist/${movieId}`);
      fetchWatchlist();
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
      console.error(err);
      setMovies([]);
      setError("No movies found");
    }
  };

  const getGenreName = (genreArray) => {
    if (!Array.isArray(genreArray)) return "Unknown Genre";
    return genreArray.map((genre) => genre.name).join(", ") || "Unknown Genre";
  };

  return (
    <div className="container mt-4">
      {/* Search Bar */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <input
          type="text"
          className="form-control me-2 shadow-sm"
          placeholder="Search movies by title or genre"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="btn btn-warning text-white shadow-sm" onClick={handleSearch}>
          Search
        </button>
      </div>
      {error && <p className="text-danger">{error}</p>}

      {/* Movie Cards */}
      <div className="row">
        {movies.map((movie) => (
          <div key={movie._id} className="col-md-3 col-sm-6 d-flex align-items-stretch pt-4">
            {/* Apply the card-zoom class here */}
            <div className="card card-zoom shadow-lg rounded-3 w-100 h-100">
              <img
                src={movie.posterUrl}
                className="card-img-top"
                alt={movie.title}
                style={{ height: "300px", objectFit: "cover", borderRadius: "10px 10px 0 0" }}
              />
              <div className="card-body d-flex flex-column p-3">
                <h5 className="card-title text-center text-dark">{movie.title}</h5>
                <p className="text-muted">
                  <strong>Genre:</strong> {getGenreName(movie.genre)}
                </p>
                <p className="card-text flex-grow-1">
                  ⭐ {movie.averageRating?.toFixed(2)} ({movie.ratingCount} reviews)
                </p>

                {/* Action Buttons */}
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/movies/${movie._id}`} className="btn btn-sm btn-outline-primary">
                    View Details
                  </Link>
                  <Bookmark
                    className={`text-primary cursor-pointer ${watchlist.some((item) => item._id === movie._id) ? "text-success" : ""}`}
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