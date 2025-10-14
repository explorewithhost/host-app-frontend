import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter */}
      <div className="ft-wrap">
        <div className="ft-news">
          <h3>Stay in the loop</h3>
          <p>Get stories from local hosts and travel tips. No spam—ever.</p>
          <form
            className="ft-form"
            onSubmit={(e) => {
              e.preventDefault();
              // UI-only for now
              alert("Thanks for subscribing!");
            }}
          >
            <input type="email" placeholder="Your email" aria-label="Email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="ft-wrap">
        <div className="ft-grid">
          <div className="ft-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><a href="#" aria-label="Careers">Careers</a></li>
            </ul>
          </div>

          <div className="ft-col">
            <h4>For Hosts</h4>
            <ul>
              <li><Link to="/host/profile-builder">Become a Host</Link></li>
              <li><a href="#" aria-label="Host Resources">Host Resources</a></li>
              <li><a href="#" aria-label="Safety">Safety</a></li>
            </ul>
          </div>

          <div className="ft-col">
            <h4>Help</h4>
            <ul>
              <li><a href="#" aria-label="Support">Support</a></li>
              <li><a href="#" aria-label="FAQs">FAQs</a></li>
              <li><a href="#" aria-label="Cancellations">Cancellations</a></li>
              <li><a href="#" aria-label="Accessibility">Accessibility</a></li>
            </ul>
          </div>

          <div className="ft-col">
            <h4>Policies</h4>
            <ul>
              {/* point to your PDFs once hosted */}
              <li><a href="#" aria-label="Privacy Policy">Privacy</a></li>
              <li><a href="#" aria-label="Terms of Use">Terms</a></li>
              <li><a href="#" aria-label="Cookies Policy">Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="ft-wrap">
        <div className="ft-bottom">
          <div className="ft-left">
            <span className="brand">Host</span>
            <span className="legal">© 2025 Host, Inc. All rights reserved.</span>
          </div>

          <div className="ft-right">
            <div className="selectors">
              <label className="sr-only" htmlFor="lang">Language</label>
              <select id="lang" defaultValue="en-US" aria-label="Language">
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-ES">Español</option>
                <option value="fr-FR">Français</option>
              </select>

              <label className="sr-only" htmlFor="region">Region</label>
              <select id="region" defaultValue="US" aria-label="Region">
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
              </select>
            </div>

            <div className="social">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 16.8 2.8 2.8 0 0 0 12 9.2zm5.6-.9a1 1 0 1 1 0 2.1 1 1 0 0 1 0-2.1z"/></svg>
              </a>
              {/* TikTok */}
              <a href="#" aria-label="TikTok" className="icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16 3a6 6 0 0 0 6 6v3.1a8.4 8.4 0 0 1-5.2-1.8l-.1 6.7a6.8 6.8 0 1 1-6.8-6.8 6.9 6.9 0 0 1 1.7.2v3.2a3.7 3.7 0 1 0 3.2 3.6l.1-13.2H16z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.1 4 12 4 12 4s-6.1 0-8.2.7A4 4 0 0 0 1 7.5 42.5 42.5 0 0 0 1 12a42.5 42.5 0 0 0 .8 4.5 4 4 0 0 0 2.8 2.8C5.9 20 12 20 12 20s6.1 0 8.2-.7a4 4 0 0 0 2.8-2.8c.6-2 .8-4.5.8-4.5s-.2-2.5-.8-4.5zM10 15V9l5 3-5 3z"/></svg>
              </a>
              {/* X (Twitter) */}
              <a href="#" aria-label="X" className="icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.2 2H21l-6.5 7.4L22 22h-6.9l-4.4-5.7L5.6 22H3l7-8.1L2 2h7l4 5.3L18.2 2zm-1.2 18h1.4L7.2 4H5.7l11.3 16z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
