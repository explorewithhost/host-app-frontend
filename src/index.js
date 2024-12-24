import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage"; // Replacing App.js with SearchPage
import HostProfilePage from "./pages/HostProfilePage"; // Newly added page
import Login from "./pages/Login"; // Existing login page
import Register from "./pages/Register"; // Existing register page
import Dashboard from "./pages/Dashboard"; // Existing dashboard page
import ProtectedRoute from "./components/ProtectedRoute"; // Protects routes requiring authentication

const Main = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SearchPage />} /> {/* Home/Search Page */}
      <Route path="/hosts/:id" element={<HostProfilePage />} /> {/* Host Profile Page */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Main />);
