import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) return <p>Loading...</p>;

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#007BFF", marginBottom: "20px" }}>Dashboard</h1>
      <p style={{ textAlign: "center", fontSize: "1.2rem" }}>{dashboardData.message}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {dashboardData.role === "host" && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ color: "#007BFF" }}>Host Features</h2>
            <p><strong>Bio:</strong> {dashboardData.hostFeatures.bio || "No bio provided"}</p>
            <p><strong>Offerings:</strong> {dashboardData.hostFeatures.offerings.length > 0 ? "Available" : "No offerings available"}</p>
            <p><strong>Ratings:</strong> {dashboardData.hostFeatures.ratings || "No ratings yet"}</p>
            <Link to="/host/profile-builder">
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Build/Edit Profile
              </button>
            </Link>
          </div>
        )}

        {dashboardData.role === "traveler" && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ color: "#28A745" }}>Traveler Features</h2>
            <p><strong>Trips:</strong> {dashboardData.travelerFeatures.trips.length > 0 ? "Available" : "No trips yet"}</p>
            <p><strong>Wishlist:</strong> {dashboardData.travelerFeatures.wishlist.length > 0 ? "Available" : "No wishlist yet"}</p>
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#DC3545",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
