import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="homepage">
      {/* NAVBAR */}
      <header className="navbar">
        <h1 className="logo">Host</h1>
        <nav>
          <Link to="/search">Destinations</Link>
          <Link to="/search">Experiences</Link>
          <Link to="/host/profile-builder">Become a Host</Link>
          <Link to="/about">About</Link>
        </nav>
        <div className="auth-buttons">
          <Link className="login" to="/login">Log In</Link>
          <Link className="signup" to="/register">Sign Up</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="overlay">
          <h1>Travel that feels like making a friend</h1>
          <p>Discover places through locals who open their world to you.</p>

          <div className="search-bar">
            <input type="text" placeholder="Where to?" aria-label="Destination" />
            <input type="date" aria-label="Start date" />
            <input type="number" min="1" placeholder="Travelers" aria-label="Number of travelers" />
            <Link className="search-btn" to="/search">Search</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2>How it works</h2>
        <div className="steps">
          <div>
            <div className="icon" aria-hidden>🧭</div>
            <h3>Discover hosts</h3>
            <p>Find locals offering stays, experiences, and rides.</p>
          </div>
          <div>
            <div className="icon" aria-hidden>🤝</div>
            <h3>Match your vibe</h3>
            <p>Our AI pairs you with the most compatible hosts.</p>
          </div>
          <div>
            <div className="icon" aria-hidden>🌍</div>
            <h3>Stay & explore</h3>
            <p>Book authentic experiences and make memories.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
