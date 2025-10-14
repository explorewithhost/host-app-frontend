import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <Link to="/" className="logo">Host</Link>

      {/* desktop */}
      <nav className="nav-links">
        <NavLink to="/search" className={({isActive}) => isActive ? "active" : ""}>Explore</NavLink>
        <NavLink to="/host/profile-builder" className={({isActive}) => isActive ? "active" : ""}>Become a Host</NavLink>
        {/* About lives in footer now – intentionally removed from navbar */}
      </nav>

      <div className="auth-buttons">
        <Link className="login" to="/login">Log In</Link>
        <Link className="signup" to="/register">Sign Up</Link>
      </div>

      {/* hamburger */}
      <button
        className={`hamburger ${open ? "active" : ""}`}
        aria-label="Menu"
        onClick={() => setOpen(v => !v)}
      >
        <span/><span/><span/>
      </button>

      {/* drawer */}
      <div className={`drawer ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
        <div className="drawer-panel" onClick={e => e.stopPropagation()}>
          <Link to="/search" onClick={() => setOpen(false)}>Explore</Link>
          <Link to="/host/profile-builder" onClick={() => setOpen(false)}>Become a Host</Link>
          <div className="drawer-auth">
            <Link className="login" to="/login" onClick={() => setOpen(false)}>Log In</Link>
            <Link className="signup" to="/register" onClick={() => setOpen(false)}>Sign Up</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
