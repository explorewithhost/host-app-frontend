import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const HostProfilePage = () => {
  const { id } = useParams(); // Get host ID from URL
  const [host, setHost] = useState(null);

  useEffect(() => {
    const fetchHost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hosts/${id}`);
        setHost(response.data);
      } catch (error) {
        console.error("Error fetching host details:", error);
      }
    };

    fetchHost();
  }, [id]);

  if (!host) return <p>Loading...</p>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h1>Host Profile</h1>
        <Link to="/" style={{ textDecoration: "none", color: "#007BFF" }}>
          Back to Search
        </Link>
      </header>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Host Details */}
        <div style={{ flex: 2, padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h2>{host.name}</h2>
          <p><strong>Bio:</strong> {host.bio}</p>
          <h3>Hosting Preferences</h3>
          <p>{host.hostingPreferences || "Not specified"}</p>
          <h3>Location</h3>
          <p>{host.location.generalAddress}</p>
          {host.airportPickup && <p style={{ color: "green" }}>Airport Pickup Available</p>}
          <h3>Lifestyle</h3>
          <p><strong>Hobbies:</strong> {host.lifestyle.hobbies.join(", ") || "Not specified"}</p>
          <p><strong>Dietary Preferences:</strong> {host.lifestyle.dietaryPreferences}</p>
          <p><strong>Smoking Policy:</strong> {host.lifestyle.smokingPolicy}</p>
          <p><strong>Drinking Policy:</strong> {host.lifestyle.drinkingPolicy}</p>
          <p><strong>Values:</strong> {host.lifestyle.values.join(", ") || "Not specified"}</p>
          <p><strong>Activities:</strong> {host.lifestyle.activities.join(", ") || "Not specified"}</p>
          <h3>Ratings</h3>
          <p>{host.ratings || "No ratings yet"}</p>
        </div>

        {/* Interaction Options */}
        <div style={{ flex: 1 }}>
          <button style={{ padding: "10px 20px", margin: "10px 0", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" }}>
            Add to Itinerary
          </button>
          <button style={{ padding: "10px 20px", margin: "10px 0", backgroundColor: "#28A745", color: "#fff", border: "none", borderRadius: "5px" }}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostProfilePage;
