import { useState } from "react";
import { Container, Form, Button, Alert, Card, Spinner } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!oldPassword || !newPassword) {
      setError("Both fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.put("/user/profile/change-password", {
        oldPassword,
        newPassword,
      });

      setSuccess(response.data.message);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-primary text-center">Change Password</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Card className="p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Update Password"}
            </Button>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default ChangePassword;
