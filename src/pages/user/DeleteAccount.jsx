import { useState } from "react";
import { Container, Button, Alert, Spinner, Modal } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.delete("/user/delete-my-account");
      setSuccess(response.data.message);

      // Clear user authentication data from storage (JWT tokens, session data, etc.)
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      // Simulating logout and redirecting to login page after  
      setTimeout(() => {
        navigate("/login");
        window.location.reload(); // Force reloading to reset authentication state
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete account.");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <Container className="mt-4 text-center">
      <h2 className="text-danger">Delete Account</h2>
      <p className="text-muted">Once deleted, your account cannot be recovered.</p>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Button variant="danger" onClick={() => setShowModal(true)} disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : "Delete My Account"}
      </Button>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete your account? This action is irreversible.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DeleteAccount;
