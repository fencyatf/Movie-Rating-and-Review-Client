import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const ManageGenres = () => {
    const [genres, setGenres] = useState([]);
    const [genreName, setGenreName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await axiosInstance.get("/genres");
            setGenres(response.data);
        } catch (err) {
            console.error("Error fetching genres", err);
            setError("Failed to load genres. Please try again.");
        }
    };

    const createGenre = async () => {
        if (!genreName.trim()) {
            setError("Genre name cannot be empty.");
            return;
        }
        try {
            const response = await axiosInstance.post("/genres", { name: genreName.trim() });
            setGenres([...genres, response.data.genre]);
            setGenreName("");
            setError("");
            showSuccessMessage("Genre added successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Error creating genre");
        }
    };

    const deleteGenre = async (id) => {
        try {
            await axiosInstance.delete(`/genres/${id}`);
            setGenres(genres.filter(genre => genre._id !== id));
            showSuccessMessage("Genre deleted successfully!");
        } catch (err) {
            console.error("Error deleting genre", err);
            setError("Failed to delete genre. Please try again.");
        }
    };

    const showSuccessMessage = (msg) => {
        setMessage(msg);
        setShowModal(true);
    };

    return (
        <div className="container mt-4 text-center">
            <h2>Manage Genres</h2>
            {error && <p className="text-danger">{error}</p>}
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-dark d-flex align-items-center gap-2" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} /> Back
                </button>
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
                {genres.length > 0 ? (
                    genres.map(genre => (
                        <li key={genre._id} className="list-group-item d-flex justify-content-between align-items-center">
                            {genre.name}
                            <button className="btn btn-danger" onClick={() => deleteGenre(genre._id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item text-muted">No genres available.</li>
                )}
            </ul>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center"> {message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => setShowModal(false)}>OK</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageGenres;
