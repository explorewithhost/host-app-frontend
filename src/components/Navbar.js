import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">Host</Link>

        <nav className="nav-desktop">
          <NavLink to="/search" className="nav-link">Explore</NavLink>
          <NavLink to="/host/profile-builder" className="nav-link">Become a Host</NavLink>
        </nav>

        <div className="nav-cta">
          <Link to="/login" className="btn ghost">Log In</Link>
          <Link to="/register" className="btn primary">Sign Up</Link>
        </div>

        <button
          className="hamburger"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {open && <div className="nav-overlay" onClick={() => setOpen(false)} />}
      <aside className={`nav-drawer ${open ? "open" : ""}`}>
        <button className="drawer-close" onClick={() => setOpen(false)}>✕</button>
        <Link to="/search" className="drawer-link" onClick={() => setOpen(false)}>Explore</Link>
        <Link to="/host/profile-builder" className="drawer-link" onClick={() => setOpen(false)}>Become a Host</Link>
        <div className="drawer-sep" />
        <Link to="/login" className="drawer-link" onClick={() => setOpen(false)}>Log In</Link>
        <Link to="/register" className="drawer-link" onClick={() => setOpen(false)}>Sign Up</Link>
      </aside>
    </header>
  );
}
