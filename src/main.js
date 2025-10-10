// src/main.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";            // ✅ new hero homepage
import SearchPage from "./pages/SearchPage";        // existing search
import HostProfilePage from "./pages/HostProfilePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HostProfileBuilder from "./pages/HostProfileBuilder";
import ProtectedRoute from "./components/ProtectedRoute";

export default function Main() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/hosts/:id" element={<HostProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/host/profile-builder" element={<HostProfileBuilder />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
