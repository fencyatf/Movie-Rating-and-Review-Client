import { useState, useEffect } from "react";
import { Form, Button, Container, Card, Spinner, Alert } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", email: "", profilePic: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [profilePicFile, setProfilePicFile] = useState(null);

    // Fetch user profile on load
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axiosInstance.get("/user/profile");
                setUser(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);

        // Append profilePic with correct field name
        if (profilePicFile) {
            formData.append("profilePic", profilePicFile);
        }

        try {
            const response = await axiosInstance.put("/user/profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSuccess(response.data.message);
            navigate("/profile"); // Redirect after success
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile.");
        }
    };


    return (
        <Container className="mt-4">
            <h2 className="text-primary">Edit Profile</h2>

            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            {!loading && (
                <Card className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type="file" onChange={(e) => setProfilePicFile(e.target.files[0])} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Update Profile
                        </Button>
                    </Form>
                </Card>
            )}
        </Container>
    );
};

export default EditProfile;
