import { useState, useEffect } from "react";
import { Container, Card, Spinner, Alert, Image } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/profile");
        setUser(response.data); // Store user data
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (

    <Container className="mt-4 d-flex justify-content-center">
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-primary text-center">User Profile</h2>

        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}

        {user && (
          <Card className="p-4 text-center ">
            {/* Profile Picture Display */}
            {user.profilePic ? (
              <Image
                src={user.profilePic}
                alt="Profile"
                roundedCircle
                className="mb-3"
                width={150}
                height={150}
              />
            ) : (
              <p>No profile picture uploaded</p>
            )}

            <h4>Name: {user.name}</h4>
            <h5>Email: {user.email}</h5>
            <h6>Joined: {new Date(user.createdAt).toLocaleDateString()}</h6>
          </Card>
        )}
      </div>
    </Container>


  );
};

export default Profile;
