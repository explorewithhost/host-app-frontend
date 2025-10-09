import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE } from "../api"; // <- uses process.env.API_BASE in prod

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/users/login`, {
        email,
        password,
      });
      // persist token + basic user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      const msg =
        error?.response?.data?.error ||
        error?.message ||
        "Login failed. Please try again.";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input
            type="email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        {err && <p className="error">{err}</p>}
      </form>

      <p style={{ marginTop: 8 }}>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
