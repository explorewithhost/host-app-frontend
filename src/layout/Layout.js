import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./Layout.css";
import Footer from "../components/Footer";
import HostLogo from "../assets/HostLogo.png"; // use this import

export default function Layout() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* Header */}
      <header
        className={`site-header ${open ? "is-opaque" : ""}`} // darker when menu open
        aria-label="Primary"
      >
        <div className="nav-inner">
          <Link to="/" className="brand" onClick={closeMenu}>
            <img
              src={HostLogo}                 // <— use the import
              alt="Host Logo"
              className="brand-logo"
              height={80}
              width="auto"
            />
            <span className="brand-text">Host</span>
          </Link>

          {/* Desktop nav */}
          <nav className="nav-desktop">
            <NavLink to="/search" className="nav-link">Explore</NavLink>

            {/* If your route is named differently, change this href accordingly */}
            <NavLink to="/host-profile-builder" className="nav-link">Become a Host</NavLink>

            <div className="nav-ctas">
              <NavLink to="/login" className="btn btn-ghost">Log In</NavLink>
              <NavLink to="/register" className="btn btn-primary">Sign Up</NavLink>
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`hamburger ${open ? "is-open" : ""}`}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile menu panel */}
        <div className={`mobile-panel ${open ? "open" : ""}`} role="dialog" aria-modal="true">
          <button className="panel-close" aria-label="Close menu" onClick={closeMenu}>×</button>
          <nav className="panel-links" onClick={closeMenu}>
            <NavLink to="/search">Explore</NavLink>
            <NavLink to="/host-profile-builder">Become a Host</NavLink>
            <hr />
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/register">Sign Up</NavLink>
          </nav>
        </div>

        {/* Scrim */}
        <button
          className={`scrim ${open ? "show" : ""}`}
          aria-hidden={!open}
          tabIndex={-1}
          onClick={closeMenu}
        />
      </header>

      {/* Page content */}
      <main className="page-wrap">
        <Outlet />
      </main>

      {/* Global footer */}
      <Footer />
    </>
  );
}
