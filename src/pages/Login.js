import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login form submitted with email:", email);

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
      console.log("Login successful! Response:", response.data);

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);
      setErrorMessage(""); // Clear previous errors
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Login failed. Please try again.";
      setErrorMessage(errorMsg);
      console.error("Login failed. Error message:", errorMsg);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "10px 0" }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "10px 0" }}
          />
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
