import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
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
      <section className="hero">
        <div className="overlay">
          <h1>Travel that feels like making a friend</h1>
          <p>Discover places through locals who open their world to you.</p>

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
