import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // simple controlled fields so we can pass to /search
  const [where, setWhere] = useState("");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [travelers, setTravelers] = useState("");

  const navigate = useNavigate();

  function onSearch(e) {
    e.preventDefault();
    const qs = new URLSearchParams();
    if (where) qs.set("q", where);
    if (arrival) qs.set("arrival", arrival);
    if (departure) qs.set("departure", departure);
    if (travelers) qs.set("t", travelers);
    navigate(`/search?${qs.toString()}`);
  }

  return (
    <div className="homepage">
      {/* NAVBAR */}
      <header className="navbar">
        <h1 className="logo">Host</h1>

        {/* desktop links */}
        <nav className="nav-links">
          <Link to="/search">Find a Host</Link>
          <Link to="/host/profile-builder">Become a Host</Link>
          <Link to="/about">About</Link>
        </nav>

        <div className="auth-buttons">
          <Link className="login" to="/login">Log In</Link>
          <Link className="signup" to="/register">Sign Up</Link>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          aria-label="Menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span /><span /><span />
        </button>

        {/* Drawer (mobile) */}
        <div className={`drawer ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <Link to="/search" onClick={() => setMenuOpen(false)}>Find a Host</Link>
            <Link to="/host/profile-builder" onClick={() => setMenuOpen(false)}>Become a Host</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <div className="drawer-auth">
              <Link className="login" to="/login" onClick={() => setMenuOpen(false)}>Log In</Link>
              <Link className="signup" to="/register" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="overlay">
          <h1>Travel that feels like making a friend</h1>
          <p>Discover places through locals who open their world to you.</p>

          {/* SEARCH BAR */}
          <form className="search-bar" onSubmit={onSearch}>
            <input
              type="text"
              placeholder="Where to?"
              aria-label="Destination"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
            />
            <input
              type="date"
              aria-label="Arrival"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
            />
            <input
              type="date"
              aria-label="Departure"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
            <input
              type="number"
              min="1"
              placeholder="Travelers"
              aria-label="Number of travelers"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
            />
            <button className="search-btn" type="submit">Search</button>
          </form>
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
