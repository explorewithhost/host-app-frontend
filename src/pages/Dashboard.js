import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the JWT token
    navigate("/login"); // Redirect to login
  };

  useEffect(() => {
    // Fetch dashboard data based on user role
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users/dashboard", {
          headers: { Authorization: `Bearer ${token}` }, // Attach token for authorization
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
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>Dashboard</h2>
      <p>{dashboardData.message}</p>

      {/* Host-Specific Features */}
      {dashboardData.role === "host" && (
        <div>
          <h3>Host Features</h3>
          <p><strong>Bio:</strong> {dashboardData.hostFeatures.bio || "No bio provided."}</p>
          <h4>Offerings</h4>
          <ul>
            {dashboardData.hostFeatures.offerings?.length > 0 ? (
              dashboardData.hostFeatures.offerings.map((offering, idx) => (
                <li key={idx}>{offering}</li>
              ))
            ) : (
              <p>No offerings available.</p>
            )}
          </ul>
          <h4>Ratings</h4>
          <p>{dashboardData.hostFeatures.ratings || "No ratings yet."}</p>
          
          {/* NEW: "View Public Profile" button added */}
          <Link
            to={`/hosts/${dashboardData.id}`} // Navigate to HostProfilePage
            style={{
              display: "inline-block",
              padding: "10px 20px",
              margin: "10px 0",
              backgroundColor: "#FFC107",
              color: "#000",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            View Public Profile
          </Link>

          {/* NEW: Buttons for host-specific actions */}
          <button
            style={{
              padding: "10px 20px",
              margin: "10px 0",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Manage Offerings
          </button>
          <button
            style={{
              padding: "10px 20px",
              margin: "10px 0",
              backgroundColor: "#28A745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            View Bookings
          </button>
        </div>
      )}

      {/* Traveler-Specific Features */}
      {dashboardData.role === "traveler" && (
        <div>
          <h3>Traveler Features</h3>
          <h4>Upcoming Trips</h4>
          <ul>
            {dashboardData.travelerFeatures.trips?.length > 0 ? (
              dashboardData.travelerFeatures.trips.map((trip, idx) => (
                <li key={idx}>{trip}</li>
              ))
            ) : (
              <p>No trips booked yet.</p>
            )}
          </ul>
          <h4>Wishlist</h4>
          <ul>
            {dashboardData.travelerFeatures.wishlist?.length > 0 ? (
              dashboardData.travelerFeatures.wishlist.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))
            ) : (
              <p>No items in your wishlist.</p>
            )}
          </ul>
          
          {/* NEW: Button for travelers to explore hosts */}
          <button
            style={{
              padding: "10px 20px",
              margin: "10px 0",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Explore More Hosts
          </button>
        </div>
      )}

      {/* Shared Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#FF5733",
          color: "#FFF",
          border: "none",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
