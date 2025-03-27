import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axiosInstance.get("/reports");
      setReports(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching reports");
      setLoading(false);
    }
  };

  const updateStatus = async (reportId, newStatus) => {
    try {
      await axiosInstance.put(`/reports/${reportId}`, { status: newStatus });
      fetchReports(); // Refresh after update
    } catch (err) {
      console.error("Error updating report status", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4 text-center">
      <h2>Maange Reports</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Review</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{report.userId.name}</td>
              <td>{report.reason}</td>
              <td>
                <input type="date" value={formatDate(report.createdAt)} readOnly />
              </td>
              <td>{report.status}</td>
            </tr>
          ))}
        </tbody>

      </Table>
    </div>
  );
};

export default ManageReports;
