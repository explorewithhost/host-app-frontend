import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";      // ✅ add footer import
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about">
      {/* HERO */}
      <section className="ab-hero">
        <div className="ab-hero-inner">
          <h1>Connecting travelers with local hosts</h1>
          <p>
            We’re building a world where authentic, meaningful travel is possible for everyone —
            powered by locals who open their world to you.
          </p>
        </div>
      </section>

      {/* WHAT WE STAND FOR */}
      <section className="ab-section">
        <h2 className="ab-title">What we stand for</h2>
        <div className="ab-3grid">
          <div className="ab-card">
            <div className="ab-icon" aria-hidden>🤝</div>
            <h3>Meaningful connections</h3>
            <p>Real friendships across cultures, not just transactions.</p>
          </div>
          <div className="ab-card">
            <div className="ab-icon" aria-hidden>🗺️</div>
            <h3>Real experiences</h3>
            <p>Immersive, local-led travel that feels personal and true.</p>
          </div>
          <div className="ab-card">
            <div className="ab-icon" aria-hidden>🌱</div>
            <h3>Community support</h3>
            <p>Empowering local hosts and supporting neighborhood economies.</p>
          </div>
        </div>
      </section>

      {/* STORY / TIMELINE */}
      <section className="ab-section">
        <h2 className="ab-title">Our story</h2>
        <ol className="ab-timeline">
          <li>
            <span className="ab-dot" />
            <div>
              <h4>2020 · Founded with a vision</h4>
              <p>We started Host to make travel feel like making a friend.</p>
            </div>
          </li>
          <li>
            <span className="ab-dot" />
            <div>
              <h4>2021 · First traveler–host match</h4>
              <p>Early pilots proved that small moments create big memories.</p>
            </div>
          </li>
          <li>
            <span className="ab-dot" />
            <div>
              <h4>2023 · 100,000+ trips booked</h4>
              <p>Our community grew across 50+ countries and keeps expanding.</p>
            </div>
          </li>
        </ol>
      </section>

      {/* IMPACT */}
      <section className="ab-section">
        <h2 className="ab-title">Our impact</h2>
        <div className="ab-stats">
          <div><span className="num">10K+</span><span className="lbl">verified hosts</span></div>
          <div><span className="num">50+</span><span className="lbl">countries represented</span></div>
          <div><span className="num">2M+</span><span className="lbl">connections made</span></div>
        </div>
      </section>

      {/* VALUES */}
      <section className="ab-section">
        <h2 className="ab-title">Our values</h2>
        <ul className="ab-values">
          <li>Empathy</li>
          <li>Integrity</li>
          <li>Diversity</li>
          <li>Sustainability</li>
        </ul>
      </section>

      {/* TEAM SECTION */}
      <section className="ab-section">
        <h2 className="ab-title">Meet the Founders</h2>
        <div className="ab-team">
          <div className="ab-member">
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=600"
              alt="Rio Rodrigues"
            />
            <h4>Rio Rodrigues</h4>
            <p>Co-Founder & CEO</p>
          </div>
          <div className="ab-member">
            <img
              src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=600"
              alt="Andrew Green"
            />
            <h4>Andrew Green</h4>
            <p>Co-Founder & CTO</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta">
        <div className="ab-cta-inner">
          <h2>Ready to host travelers from around the world?</h2>
          <Link to="/host/profile-builder" className="ab-btn">Become a Host</Link>
        </div>
      </section>

      {/* ✅ Global footer */}
      <Footer />
    </div>
  );
}
