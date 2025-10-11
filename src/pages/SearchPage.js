import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../api";
import "./SearchPage.css";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [mode, setMode] = useState(params.get("type") || "destinations"); // destinations | experiences
  const [q, setQ] = useState(params.get("q") || "");
  const [travelers, setTravelers] = useState(params.get("t") || "");
  const [page, setPage] = useState(Number(params.get("page") || 1));
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const limit = 20;

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr("");
      try {
        const res = await axios.get(`${API_BASE}/api/hosts`, {
          params: { q, type: mode, page, limit },
        });
        setData(res.data || { items: [], total: 0 });
      } catch (e) {
        setErr(e?.response?.data?.error || "Failed to load results");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [q, mode, page]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (mode) next.set("type", mode);
    if (travelers) next.set("t", travelers);
    if (page > 1) next.set("page", String(page));
    setParams(next, { replace: true });
  }, [q, mode, travelers, page, setParams]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((data.total || 0) / limit)),
    [data.total]
  );

  return (
    <div className="searchpage">
      <header className="sp-nav">
        <Link to="/" className="logo">Host</Link>
        <div className="sp-auth">
          <Link to="/login">Log In</Link>
          <Link to="/register" className="primary">Sign Up</Link>
        </div>
      </header>

      <section className="sp-filters">
        <div className="sp-toggle">
          <button
            className={`chip ${mode === "destinations" ? "active" : ""}`}
            onClick={() => { setMode("destinations"); setPage(1); }}
          >
            Destinations
          </button>
          <button
            className={`chip ${mode === "experiences" ? "active" : ""}`}
            onClick={() => { setMode("experiences"); setPage(1); }}
          >
            Experiences
          </button>
        </div>

        <div className="sp-inputs">
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder={mode === "experiences" ? "Search experiences or places" : "Search destinations or city"}
            aria-label="Search"
          />
          <input
            type="number"
            min="1"
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            placeholder="Travelers"
            aria-label="Number of travelers"
          />
          <button className="apply" onClick={() => setPage(1)}>Search</button>
        </div>
      </section>

      <main className="sp-grid">
        {loading && (
          <div className="sp-empty">
            <div className="spinner" /> <p>Loading…</p>
          </div>
        )}
        {!loading && err && (
          <div className="sp-empty"><p className="error">{err}</p></div>
        )}
        {!loading && !err && data.items.length === 0 && (
          <div className="sp-empty"><p>No results. Try a different place or switch tabs.</p></div>
        )}
        {!loading && !err && data.items.map((h) => (
          <article key={h._id} className="sp-card">
            <div className="media">
              <img
                src={h?.photos?.[0] || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"}
                alt={h.name}
              />
              {typeof h?.rating === "number" && (
                <span className="badge">{Math.round(h.rating * 20)}% Match</span>
              )}
            </div>
            <div className="body">
              <h3>{h.name}</h3>
              <p className="muted">{[h.city, h.country].filter(Boolean).join(", ")}</p>
              <div className="meta">
                <span>
                  {(() => {
                    const prices = [
                      ...(h.offerings?.lodging || []),
                      ...(h.offerings?.experiences || []),
                      ...(h.offerings?.transport || []),
                    ]
                      .map((x) => x.price)
                      .filter((x) => x != null);
                    if (prices.length) {
                      const p = Math.min(...prices);
                      return `From $${p}/day`;
                    }
                    return "See details";
                  })()}
                </span>
              </div>
              <div className="actions">
                <Link to={`/hosts/${h._id}`} className="btn">View Journey</Link>
              </div>
            </div>
          </article>
        ))}
      </main>

      {!loading && !err && data.total > limit && (
        <div className="sp-pager">
          <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
          <span>Page {page} / {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
        </div>
      )}
    </div>
  );
}
