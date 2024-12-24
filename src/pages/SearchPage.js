import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [results, setResults] = useState([
    // Mocked host data for "Popular Destinations" section
    {
      id: "64a7bcf19e1e4a5e6f6a7f91",
      name: "Cozy Mountain Retreat",
      location: "Bangkok, Thailand",
      ratings: 4.8,
      image: "https://via.placeholder.com/300", // Placeholder image
    },
    {
      id: "64a7bcf19e1e4a5e6f6a7f92",
      name: "Beachside Villa",
      location: "Phuket, Thailand",
      ratings: 4.5,
      image: "https://via.placeholder.com/300", // Placeholder image
    },
  ]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header with Login/Register */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
        }}
      >
        <h1 style={{ margin: 0 }}>Host</h1>
        <div>
          <Link
            to="/login"
            style={{
              marginRight: "10px",
              color: "#fff",
              textDecoration: "none",
              padding: "5px 15px",
              backgroundColor: "#0056b3",
              borderRadius: "20px",
            }}
          >
            Login
          </Link>
          <Link
            to="/register"
            style={{
              color: "#fff",
              textDecoration: "none",
              padding: "5px 15px",
              backgroundColor: "#28a745",
              borderRadius: "20px",
            }}
          >
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          backgroundImage: "url('https://via.placeholder.com/1920x500')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          textAlign: "center",
          padding: "50px 20px",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Welcome to Host</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
          Discover authentic experiences with local hosts.
        </p>
        {/* Search Bar */}
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Location"
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              width: "200px",
            }}
          />
          <input
            type="date"
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              width: "150px",
            }}
          />
          <input
            type="text"
            placeholder="Host Name"
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              width: "200px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </form>
      </section>

      {/* Popular Destinations Section */}
      <section style={{ padding: "50px 20px", backgroundColor: "#f8f9fa" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Popular Destinations</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {results.map((host) => (
            <div
              key={host.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                width: "250px",
                textAlign: "center",
                overflow: "hidden",
                backgroundColor: "#fff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={host.image}
                alt={host.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <div style={{ padding: "10px" }}>
                <h4>{host.name}</h4>
                <p>{host.location}</p>
                <p>Rating: {host.ratings}</p>
                <Link
                  to={`/hosts/${host.id}`}
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    padding: "10px 15px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "5px",
                  }}
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Services Section */}
      <section style={{ padding: "50px 20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Services Our Hosts Offer</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {/* Service Card */}
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              width: "200px",
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://via.placeholder.com/100"
              alt="Airport Pickup"
              style={{ marginBottom: "10px" }}
            />
            <h4>Airport Pickup</h4>
            <p>Convenient pickup services from your arrival point.</p>
          </div>
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              width: "200px",
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://via.placeholder.com/100"
              alt="Guided Tours"
              style={{ marginBottom: "10px" }}
            />
            <h4>Guided Tours</h4>
            <p>Explore the best spots with local expertise.</p>
          </div>
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              width: "200px",
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src="https://via.placeholder.com/100"
              alt="Cooking Classes"
              style={{ marginBottom: "10px" }}
            />
            <h4>Cooking Classes</h4>
            <p>Learn to prepare authentic local dishes.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
 