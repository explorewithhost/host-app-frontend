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
    if (where) qs.set("q", where.trim());
    if (arrival) qs.set("arrival", arrival);
    if (departure) qs.set("departure", departure);
    if (travelers) qs.set("t", travelers.trim());
    navigate(`/search?${qs.toString()}`);
  }

  return (
    <div className="homepage">
      <section className="hero">
        <div className="overlay">
          <h1>Travel that feels like making a friend</h1>
          <p>Discover places through locals who open their world to you.</p>

          {/* SEARCH BAR */}
          <form className="hp-search" onSubmit={onSearch}>
            <div className="hp-field">
              <label htmlFor="hp-where">Where to?</label>
              <input
                id="hp-where"
                type="text"
                placeholder="Kyoto, Japan"
                value={where}
                onChange={(e) => setWhere(e.target.value)}
              />
            </div>

            <div className="hp-field">
              <label htmlFor="hp-arrive">Arrival</label>
              <input
                id="hp-arrive"
                type="date"
                inputMode="none"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
              />
            </div>

            <div className="hp-field">
              <label htmlFor="hp-depart">Departure</label>
              <input
                id="hp-depart"
                type="date"
                inputMode="none"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              />
            </div>

            <div className="hp-field">
              <label htmlFor="hp-travelers">Travelers</label>
              <input
                id="hp-travelers"
                type="text"
                placeholder="2 adults"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
              />
            </div>

            <button className="hp-searchBtn" type="submit">
              Search
            </button>
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
