import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "traveler", // Default to 'traveler'
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", formData);
      console.log("Registration successful:", response.data);
      setErrorMessage(""); // Clear any previous errors
      navigate("/login"); // Redirect to login
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Registration failed. Please try again.";
      setErrorMessage(errorMsg);
      console.error("Registration error:", errorMsg);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", margin: "10px 0" }}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", margin: "10px 0" }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", margin: "10px 0" }}
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", margin: "10px 0" }}
          >
            <option value="traveler">Traveler</option>
            <option value="host">Host</option>
          </select>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
