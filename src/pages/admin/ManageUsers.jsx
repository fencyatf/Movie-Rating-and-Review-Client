import React, { useEffect, useState } from "react";
import { Table, Button, Container, Spinner, Form } from "react-bootstrap";
import { Trash2, Ban, ArrowLeft, Search } from "lucide-react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all users
  useEffect(() => {
    axiosInstance
      .get("/admin/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  // Handle User Ban / Unban
  const handleBan = async (id, isBanned) => {
    try {
      await axiosInstance.put(`/admin/users/${isBanned ? "unban" : "ban"}/${id}`);
      setUsers(users.map(user => user._id === id ? { ...user, isBanned: !isBanned } : user));
    } catch (err) {
      console.error("Error updating ban status:", err);
    }
  };

  // Handle User Deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosInstance.delete(`/admin/users/${id}`);
        setUsers(users.filter(user => user._id !== id));
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-dark mb-4"> Manage Users</h2>
      <div>
        <button className="border-1 rounded px-3 py-2 d-flex align-items-center gap-2 bg-dark text-white ms-auto" onClick={() => navigate(-1)} > <ArrowLeft size={20} />Back</button>
      </div>

      <div>
        <Form className="d-flex justify-content-center ms-auto">
          <Form.Control
            type="search"
            placeholder="Search by Email"
            className="me-2"
            style={{ width: "300px" }}
            aria-label="Search"
            value={searchQuery} // Bind to state
            onChange={(e) => setSearchQuery(e.target.value)} // Update state
          />
          <Button variant="outline-dark">
            <Search />
          </Button>
        </Form>
      </div>
      <div>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="bg-dark text-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.isBanned ? "bg-danger" : "bg-success"}`}>
                      {user.isBanned ? "Banned" : "Active"}
                    </span>
                  </td>
                  <td className="text-center d-flex align-items-center gap-2">
                    <Button variant="outline-danger" className="me-2 d-flex align-items-center gap-2" onClick={() => handleDelete(user._id)}>
                      <Trash2 size={10} /> Delete
                    </Button>
                    <Button variant={user.isBanned ? "success" : "warning"} className="d-flex align-items-center gap-2" onClick={() => handleBan(user._id, user.isBanned)}>
                      <Ban size={10} /> {user.isBanned ? "Unban" : "Ban"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </Container>
  );
};

export default ManageUsers;
