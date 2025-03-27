import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageMovies = () => {
    const [movies, setMovies] = useState([]);
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

    useEffect(() => {
        axiosInstance.get("/movies")
            .then(response => setMovies(response.data))
            .catch(error => console.error(error));
        axiosInstance.get("/genres")
            .then(response => setGenres(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleShow = (movie = null) => {
        setEditMovie(movie);
        setNewMovie(movie || {
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setNewMovie(prevState => ({
                ...prevState,
                genre: Array.isArray(prevState.genre) 
                  ? (checked ? [...prevState.genre, value] : prevState.genre.filter(g => g !== value)) 
                  : [value]
              }));
              
        } else {
            setNewMovie({ ...newMovie, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = editMovie
            ? axiosInstance.put(`/movies/${editMovie._id}`, newMovie)
            : axiosInstance.post("/movies", newMovie);

        request.then(() => {
            axiosInstance.get("/movies").then(response => setMovies(response.data));
            handleClose();
        }).catch(error => console.error(error));
    };

    const handleDelete = (id) => {
        axiosInstance.delete(`/movies/${id}`).then(() => {
            setMovies(movies.filter(movie => movie._id !== id));
        }).catch(error => console.error(error));
    };

    return (
        <Container>
            <h2 className="my-4 text-center">Manage Movies</h2>
            <Button className="border-1 rounded px-3 py-2 d-flex align-items-center gap-2 bg-dark text-white ms-auto" onClick={() => navigate(-1)} > <ArrowLeft size={20} />Back</Button>
            <Button onClick={() => handleShow()} className="mb-3">Add Movie</Button>

            <div className="d-flex flex-wrap justify-content-center">
                {movies.map(movie => (
                    <Card key={movie._id} style={{ width: "18rem", margin: "10px" }}>
                        <Card.Img variant="top" src={movie.posterUrl} style={{ height: "300px", objectFit: "cover" }} />
                        <Card.Body>
                            <Card.Title className="fw-bolder">{movie.title} </Card.Title>
                            <Card.Subtitle className="mb-2 fw-bold">
                                {Array.isArray(movie.genre)
                                    ? movie.genre.map(g => genres.find(genre => genre._id === g)?.name).filter(Boolean).join(", ")
                                    : "Unknown Genre"}
                            </Card.Subtitle >

                            <Card.Text>{movie.description}</Card.Text>
                            <div className="d-flex justify-content-between">
                                <Button variant="primary" onClick={() => handleShow(movie)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(movie._id)}>Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

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
        </Container>
    );
};

export default ManageMovies;