import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../api";
import "./HostProfilePage.css";

const TABS = ["Lodging", "Experiences", "Transport"];

export default function HostProfilePage() {
  const { id } = useParams();
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [tab, setTab] = useState(TABS[0]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setErr("");
      try {
        const res = await axios.get(`${API_BASE}/api/hosts/${id}`);
        if (mounted) setHost(res.data);
      } catch (e) {
        if (mounted) setErr(e?.response?.data?.error || "Failed to load host");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [id]);

  const { lodging = [], experiences = [], transport = [] } =
    useMemo(() => host?.offerings || {}, [host]);

  const items = useMemo(() => {
    if (tab === "Lodging") return lodging;
    if (tab === "Experiences") return experiences;
    return transport;
  }, [tab, lodging, experiences, transport]);

  return (
    <div className="hostpage">
      {/* Top bar */}
      <header className="hp-nav">
        <Link to="/" className="hp-logo">Host</Link>
        <nav>
          <Link to="/search">Search</Link>
          <Link to="/host/profile-builder">Become a Host</Link>
          <Link to="/about">About</Link>
        </nav>
        <div className="hp-auth">
          <Link to="/login">Log In</Link>
          <Link to="/register" className="primary">Sign Up</Link>
        </div>
      </header>

      <main className="hp-container">
        {/* Loading / error */}
        {loading && (
          <section className="hp-state">
            <div className="spinner" aria-label="Loading" />
            <p>Loading host…</p>
          </section>
        )}

        {!loading && err && (
          <section className="hp-state">
            <p className="error">{err}</p>
            <Link to="/search" className="btn">Back to search</Link>
          </section>
        )}

        {/* Content */}
        {!loading && !err && host && (
          <>
            {/* Header card */}
            <section className="hp-header">
              <div className="hp-photos">
                <img
                  src={
                    host?.photos?.[0] ||
                    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={`${host?.name || "Host"} cover`}
                />
              </div>

              <div className="hp-meta">
                <div className="hp-avatar" aria-hidden>
                  {(host?.name || "H").slice(0, 1).toUpperCase()}
                </div>
                <div className="hp-title">
                  <h1>{host?.name || "Host"}</h1>
                  <p className="muted">
                    {host?.city ? `${host.city}, ` : ""}
                    {host?.country || ""}
                  </p>
                  {typeof host?.rating === "number" && (
                    <p className="rating">★ {host.rating.toFixed(1)}</p>
                  )}
                </div>
                <div className="hp-actions">
                  <a href="#inquire" className="btn">Message</a>
                  <a href="#book" className="btn primary">Book</a>
                </div>
              </div>

              {host?.bio && <p className="hp-bio">{host.bio}</p>}
            </section>

            {/* Tabs */}
            <section className="hp-tabs">
              {TABS.map((t) => (
                <button
                  key={t}
                  className={`tab ${tab === t ? "active" : ""}`}
                  onClick={() => setTab(t)}
                >
                  {t}
                </button>
              ))}
            </section>

            {/* Items grid */}
            <section className="hp-grid">
              {items.length === 0 ? (
                <div className="hp-empty">
                  <p>
                    No {tab.toLowerCase()} listed yet. Check back soon or{" "}
                    <Link to="/search">explore more hosts</Link>.
                  </p>
                </div>
              ) : (
                items.map((it, idx) => (
                  <article key={idx} className="hp-card">
                    <div className="hp-card-media">
                      <img
                        src={
                          it?.photo ||
                          "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1200&auto=format&fit=crop"
                        }
                        alt={it?.title || "Offering"}
                      />
                    </div>
                    <div className="hp-card-body">
                      <h3>{it?.title || "Untitled"}</h3>
                      {it?.price != null && (
                        <p className="price">${Number(it.price).toLocaleString()}</p>
                      )}
                      {it?.description && (
                        <p className="desc">{it.description}</p>
                      )}
                      <div className="hp-card-actions">
                        <a href="#details" className="btn">Details</a>
                        <a href="#book" className="btn primary">Book</a>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
