import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Table, Button, Modal, Form, Card, Container, Row, Col } from "react-bootstrap";
import { PencilSquare, Trash, StarFill } from "react-bootstrap-icons";

const UserReview = () => {
    const [reviews, setReviews] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [updatedReview, setUpdatedReview] = useState({ rating: "", review: "" });

    useEffect(() => {
        fetchUserReviews();
    }, []);

    const fetchUserReviews = async () => {
        try {
            const response = await axiosInstance.get("/reviews/user");
            setReviews(response.data.reviews);
        } catch (error) {
            console.error("Error fetching user reviews:", error);
        }
    };

    const handleDelete = async (reviewId) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                await axiosInstance.delete(`/reviews/${reviewId}`);
                setReviews(reviews.filter((review) => review._id !== reviewId));
            } catch (error) {
                console.error("Error deleting review:", error);
            }
        }
    };

    const handleEdit = (review) => {
        setSelectedReview(review);
        setUpdatedReview({ rating: review.rating, review: review.review });
        setShowEditModal(true);
    };

    const handleUpdate = async () => {
        try {
            await axiosInstance.put(`/reviews/${selectedReview._id}`, updatedReview);
            fetchUserReviews();
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating review:", error);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">My Reviews</h2>
            {reviews.length === 0 ? (
                <Card className="p-4 text-center">
                    <p className="text-muted">No reviews found.</p>
                </Card>
            ) : (
                <Table striped bordered hover responsive className="shadow">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th>#</th>
                            <th>Movie</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={review._id}>
                                <td>{index + 1}</td>
                                <td>{review.movieId?.title || "Unknown"}</td>
                                <td >
                                    <div className="d-flex  gap-1">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <StarFill key={i} className="text-warning" />
                                        ))}
                                    </div>
                                </td>
                                <td>{review.review}</td>
                                <td>
                                    <Button variant="warning" size="sm" className="me-2 d-flex align-items-center" onClick={() => handleEdit(review)}>
                                        <PencilSquare className="me-1" style={{ width: "30px" }} /> Edit
                                    </Button>
                                    <Button variant="danger" size="sm" className="d-flex align-items-center" onClick={() => handleDelete(review._id)}>
                                        <Trash className="me-1" style={{ width: "15px" }} /> Delete
                                    </Button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>Edit Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="5"
                                value={updatedReview.rating}
                                onChange={(e) => setUpdatedReview({ ...updatedReview, rating: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={updatedReview.review}
                                onChange={(e) => setUpdatedReview({ ...updatedReview, review: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default UserReview;
