import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">Host</Link>

        <nav className="nav-desktop">
          <NavLink to="/search" className="nav-link">Explore</NavLink>
          <NavLink to="/host/profile-builder" className="nav-link">Become a Host</NavLink>
          {/* About lives in footer now */}
        </nav>

        <div className="nav-cta">
          <Link to="/login" className="btn ghost">Log In</Link>
          <Link to="/register" className="btn primary">Sign Up</Link>
        </div>

        <button
          className="hamburger"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Overlay */}
      {open && <div className="nav-overlay" onClick={() => setOpen(false)} />}

      {/* Drawer */}
      <aside id="mobile-menu" className={`nav-drawer ${open ? "open" : ""}`} role="dialog" aria-modal="true">
        <button className="drawer-close" aria-label="Close menu" onClick={() => setOpen(false)}>✕</button>
        <Link to="/search" className="drawer-link" onClick={() => setOpen(false)}>Explore</Link>
        <Link to="/host/profile-builder" className="drawer-link" onClick={() => setOpen(false)}>Become a Host</Link>
        <div className="drawer-sep" />
        <Link to="/login" className="drawer-link" onClick={() => setOpen(false)}>Log In</Link>
        <Link to="/register" className="drawer-link" onClick={() => setOpen(false)}>Sign Up</Link>
      </aside>
    </header>
  );
}
