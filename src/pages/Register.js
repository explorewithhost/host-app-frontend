import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE } from "../api"; // <- uses process.env.API_BASE in prod

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "traveler", // or "host"
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    setErr("");
    setOk("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/users/register`, {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role, // "host" | "traveler"
      });

      // optional toast message
      setOk(res.data?.message || "Registered!");
      // send to login so they can auth
      setTimeout(() => navigate("/login"), 600);
    } catch (error) {
      const msg =
        error?.response?.data?.error ||
        error?.message ||
        "Registration failed. Please try again.";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <h2>Create an account</h2>
      <form onSubmit={handleRegister}>
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            autoComplete="email"
            onChange={onChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            autoComplete="new-password"
            onChange={onChange}
            required
            minLength={8}
          />
        </label>

        <label>
          Role
          <select name="role" value={form.role} onChange={onChange}>
            <option value="traveler">Traveler</option>
            <option value="host">Host</option>
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

        {err && <p className="error">{err}</p>}
        {ok && <p className="success">{ok}</p>}
      </form>

      <p style={{ marginTop: 8 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
