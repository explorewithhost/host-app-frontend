// src/layout/Layout.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "./Layout.css";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-header" role="banner">
        <div className="brand">
          <Link to="/" aria-label="Host home">Host</Link>
        </div>

        {/* Desktop nav */}
        <nav className="nav-links" aria-label="Primary">
          <Link to="/search">Explore</Link>
          <Link to="/host-profile-builder">Become a Host</Link>
          <div className="auth-actions">
            <Link to="/login" className="btn btn-ghost">Log In</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="hamburger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </header>

      {/* Mobile drawer */}
      <aside className={`mobile-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <button
          className="menu-close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <nav className="mobile-nav" aria-label="Mobile">
          <Link to="/search" onClick={() => setOpen(false)}>Explore</Link>
          <Link to="/host-profile-builder" onClick={() => setOpen(false)}>Become a Host</Link>
          <hr />
          <Link to="/login" onClick={() => setOpen(false)}>Log In</Link>
          <Link to="/register" onClick={() => setOpen(false)}>Sign Up</Link>
        </nav>
      </aside>

      {/* Backdrop when drawer is open */}
      {open && <div className="backdrop" onClick={() => setOpen(false)} />}

      {/* Main content */}
      <main className="app-main" role="main">
        {children}
      </main>

      <Footer />
    </>
  );
}
