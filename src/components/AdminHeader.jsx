import { useNavigate } from "react-router-dom";

const AdminLogout = () => {
    const navigate = useNavigate();

    const handleAdminLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role"); // Ensure role is also removed
        window.dispatchEvent(new Event("authChange")); // Notify other components
        navigate("/login"); // Redirect to login page
    };

    return (
        <button onClick={handleAdminLogout} className="btn btn-danger">
            Logout
        </button>
    );
};

export default AdminLogout;
