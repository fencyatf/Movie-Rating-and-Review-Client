import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Container, Card, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import './ManageMovies.css'

const ManageMovies = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [show, setShow] = useState(false);
    const [editMovie, setEditMovie] = useState(null);
    const [newMovie, setNewMovie] = useState({
        title: "",
        genre: [],
        releaseDate: "",
        director: "",
        duration: "",
        description: "",
        posterUrl: "",
    });
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axiosInstance.get("/movies")
            .then(response =>
                setMovies(response.data))
            .catch(error => console.error(error));
        axiosInstance.get("/genres")
            .then(response => setGenres(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleSearch = (e) => {
        if (e) e.preventDefault(); // Prevent default only when triggered by form submission
    
        const value = searchTerm.toLowerCase().trim();
        if (!value) {
            setFilteredMovies(movies); // Reset to all movies if search is empty
            return;
        }
    
        const filtered = movies.filter(movie =>
            movie.title.toLowerCase().includes(value) ||
            (Array.isArray(movie.genre) && movie.genre.some(g => (g.name || "").toLowerCase().includes(value)))
        );
    
        setFilteredMovies(filtered);
    };

    const handleShow = (movie = null) => {
        setEditMovie(movie);
        setNewMovie(movie ? {
            title: movie.title || "",
            genre: Array.isArray(movie.genre) ? movie.genre.map(g => g._id) : [],
            releaseDate: movie.releaseDate || "",
            director: movie.director || "",
            duration: movie.duration || "",
            description: movie.description || "",
            posterUrl: movie.posterUrl || "",
        }
            : {
                title: "",
                genre: [],
                releaseDate: "",
                director: "",
                duration: "",
                description: "",
                posterUrl: "",
            });
        setShow(true);
    };

    const handleClose = () => setShow(false);
    const showSuccessMessage = (msg) => {
        setMessage(msg);
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setNewMovie(prevState => ({
                ...prevState,
                genre: checked
                    ? [...(prevState.genre || []), value]
                    : (prevState.genre || []).filter(g => g !== value)
            }));

        } else {
            setNewMovie({ ...newMovie, [name]: value });
        }
    };

    const getGenreName = (genreArray) => {
        if (!Array.isArray(genreArray)) return "Unknown Genre";
        return genreArray
            .map((genre) => {
                if (genre.name) return genre.name;
                const foundGenre = genres.find((g) => String(g._id) === String(genre));
                return foundGenre ? foundGenre.name : null;
            })
            .filter(Boolean)
            .join(", ") || "Unknown Genre";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedMovie = {
            ...newMovie,
            genre: newMovie.genre.map(id => String(id))
        };

        const request = editMovie
            ? axiosInstance.put(`/movies/${editMovie._id}`, formattedMovie)
            : axiosInstance.post("/movies", formattedMovie);

        request.then(() => {
            axiosInstance.get("/movies")
                .then(response => {
                    setMovies(response.data)
                    setFilteredMovies(response.data);
                });
            showSuccessMessage(editMovie ? "Movie updated successfully!" : "Movie added successfully!");
            handleClose();
        }).catch(error => {
            showSuccessMessage("Error processing request.");
        });
    };

    const handleDelete = (id) => {
        axiosInstance.delete(`/movies/${id}`).then(() => {
            setMovies(movies.filter(movie => movie._id !== id));
            showSuccessMessage("Movie deleted successfully!");
        }).catch(error => {
            showSuccessMessage("Error deleting movie.");
        });
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2 className="text-center">Manage Movies</h2>
                <Button className="d-flex align-items-center gap-2 bg-dark text-white" onClick={() => navigate(-1)}> 
                    <ArrowLeft size={20} /> Back
                </Button>
            </div>

            <div className="d-flex justify-content-between mb-3 gap-2">
                <Form className="d-flex gap-2 flex-grow-1" onSubmit={handleSearch}>
                    <Form.Control
                        type="text"
                        placeholder="Search movies by name or genre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="primary" type="submit">Search</Button>
                </Form>
                <Button variant="success" onClick={() => handleShow()}>+ Add Movie</Button>
            </div>

            <Row className="g-4 justify-content-center">
                {(filteredMovies.length ? filteredMovies : movies).map(movie => (
                    <Col key={movie._id} md={4} lg={3}>
                        <Card className="shadow-sm h-100 card-hover-effect">
                            <Card.Img variant="top" src={movie.posterUrl} style={{ height: "300px", objectFit: "cover" }} />
                            <Card.Body className="d-flex flex-column">
                                <h4 className="text-primary">{movie.title}</h4>
                                <Card.Subtitle className="text-muted mb-2"><strong>Genres:</strong> {getGenreName(movie.genre)}</Card.Subtitle>
                                <Card.Subtitle className="text-muted mb-2"><strong>Director:</strong> {movie.director || "Unknown"}</Card.Subtitle>
                                <Card.Text className="flex-grow-1"><strong>About the movie:</strong> {movie.description}</Card.Text>
                                <Card.Text><strong>Average Rating:</strong> {movie.averageRating || "Not Rated"}</Card.Text>
                                <Card.Text><strong>Rating Count:</strong> {movie.ratingCount || 0}</Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button variant="outline-primary" onClick={() => handleShow(movie)}>Edit</Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(movie._id)}>Delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMovie ? "Edit Movie" : "Add Movie"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={newMovie.title} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            {genres.map(genre => (
                                <Form.Check
                                    key={genre._id}
                                    type="checkbox"
                                    label={genre.name}
                                    value={genre._id}
                                    checked={Array.isArray(newMovie.genre) && newMovie.genre.includes(genre._id)}
                                    onChange={handleChange}
                                />
                            ))}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control type="date" name="releaseDate" value={newMovie.releaseDate} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Director</Form.Label>
                            <Form.Control type="text" name="director" value={newMovie.director} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration (minutes)</Form.Label>
                            <Form.Control type="number" name="duration" value={newMovie.duration} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" value={newMovie.description} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Poster URL</Form.Label>
                            <Form.Control type="text" name="posterUrl" value={newMovie.posterUrl} onChange={handleChange} />
                        </Form.Group>

                        <Button type="submit" className="mt-3">{editMovie ? "Update" : "Add"} Movie</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => setShowModal(false)}>OK</Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

export default ManageMovies;
