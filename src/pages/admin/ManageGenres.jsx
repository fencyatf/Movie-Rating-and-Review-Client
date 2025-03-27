import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageGenres = () => {
    const [genres, setGenres] = useState([]);
    const [genreName, setGenreName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await axiosInstance.get("/genres");
            setGenres(response.data);
        } catch (err) {
            console.error("Error fetching genres", err);
        }
    };

    const createGenre = async () => {
        if (!genreName) return;
        try {
            const response = await axiosInstance.post("/genres", { name: genreName });
            setGenres([...genres, response.data.genre]);
            setGenreName("");
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Error creating genre");
        }
    };

    const deleteGenre = async (id) => {
        try {
            await axiosInstance.delete(`/genres/${id}`);
            setGenres(genres.filter(genre => genre._id !== id));
        } catch (err) {
            console.error("Error deleting genre", err);
        }
    };

    return (
        <div className="container mt-4 text-center">
            <h2>Manage Genres</h2>
            {error && <p className="text-danger">{error}</p>}
            <div>
                <button className="border-1 rounded px-3 py-2 d-flex align-items-center gap-2 bg-dark text-white ms-auto" onClick={() => navigate(-1)} > <ArrowLeft size={20} />Back</button>
            </div>
            <div className="mb-3 d-flex">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter genre name"
                    value={genreName}
                    onChange={(e) => setGenreName(e.target.value)}
                />
                <button className="btn btn-primary ms-2" onClick={createGenre}>Add Genre</button>
            </div>
            <ul className="list-group">
                {genres.map(genre => (
                    <li key={genre._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {genre.name}
                        <button className="btn btn-danger" onClick={() => deleteGenre(genre._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageGenres;