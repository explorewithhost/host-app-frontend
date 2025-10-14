import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../api";
import "./SearchPage.css";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();

  const [q, setQ] = useState(params.get("q") || "");
  const [arrival, setArrival] = useState(params.get("arrival") || "");
  const [departure, setDeparture] = useState(params.get("departure") || "");
  const [travelers, setTravelers] = useState(params.get("t") || "");
  const [page, setPage] = useState(Number(params.get("page") || 1));

  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const limit = 20;

  // Load results
  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr("");
      try {
        const res = await axios.get(`${API_BASE}/api/hosts`, {
          params: { q, page, limit },
        });
        setData(res.data || { items: [], total: 0 });
      } catch (e) {
        setErr(e?.response?.data?.error || "Failed to load results");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [q, page]);

  // Keep URL in sync
  useEffect(() => {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (arrival) next.set("arrival", arrival);
    if (departure) next.set("departure", departure);
    if (travelers) next.set("t", travelers);
    if (page > 1) next.set("page", String(page));
    setParams(next, { replace: true });
  }, [q, arrival, departure, travelers, page, setParams]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((data.total || 0) / limit)),
    [data.total]
  );

  const applySearch = () => setPage(1);

  return (
    <div className="searchpage">
      {/* Sticky search (matches HomePage look & labels) */}
      <section className="sp-filters" role="search">
        <div className="sp-inputs">
          <div className="sp-field">
            <label htmlFor="sp-where">Where to?</label>
            <input
              id="sp-where"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="City or country"
              aria-label="Destination"
            />
          </div>

          <div className="sp-field">
            <label htmlFor="sp-arrival">Arrival</label>
            <input
              id="sp-arrival"
              type="date"
              inputMode="none"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
            />
          </div>

          <div className="sp-field">
            <label htmlFor="sp-departure">Departure</label>
            <input
              id="sp-departure"
              type="date"
              inputMode="none"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
          </div>

          <div className="sp-field">
            <label htmlFor="sp-travelers">Travelers</label>
            <input
              id="sp-travelers"
              type="number"
              min="1"
              placeholder="2"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
            />
          </div>

          <button className="apply" onClick={applySearch}>Search</button>
        </div>
      </section>

      {/* Results */}
      <main className="sp-grid" aria-live="polite">
        {loading && (
          <div className="sp-empty">
            <div className="spinner" />
            <p>Loading…</p>
          </div>
        )}

        {!loading && err && (
          <div className="sp-empty">
            <p className="error">{err}</p>
          </div>
        )}

        {!loading && !err && data.items.length === 0 && (
          <div className="sp-empty">
            <p>No results. Try another place or different dates.</p>
          </div>
        )}

        {!loading && !err && data.items.map((h) => (
          <article key={h._id} className="sp-card">
            <div className="media">
              <img
                src={
                  h?.photos?.[0] ||
                  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
                }
                alt={h.name}
                loading="lazy"
              />
              {typeof h?.rating === "number" && (
                <span className="badge">{Math.round(h.rating * 20)}% Match</span>
              )}
            </div>
            <div className="body">
              <h3>{h.name}</h3>
              <p className="muted">
                {[h.city, h.country].filter(Boolean).join(", ")}
              </p>
              <div className="meta">
                <span>
                  {
                    (() => {
                      const prices = [
                        ...(h.offerings?.lodging || []),
                        ...(h.offerings?.experiences || []),
                        ...(h.offerings?.transport || []),
                      ]
                        .map(x => x.price)
                        .filter(x => x != null);
                      if (prices.length) return `From $${Math.min(...prices)}/day`;
                      return "See details";
                    })()
                  }
                </span>
              </div>
              <div className="actions">
                <Link to={`/hosts/${h._id}`} className="btn">
                  View Journey
                </Link>
              </div>
            </div>
          </article>
        ))}
      </main>

      {!loading && !err && data.total > limit && (
        <nav className="sp-pager" aria-label="Pagination">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
