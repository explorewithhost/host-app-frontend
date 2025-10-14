// src/main.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";           // ✅ use the shared layout

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import HostProfilePage from "./pages/HostProfilePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HostProfileBuilder from "./pages/HostProfileBuilder";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutPage from "./pages/AboutPage";

export default function Main() {
  return (
    <Router>
      <Routes>
        {/* Everything below gets Navbar + Footer from Layout */}
        <Route element={<Layout />}>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/hosts/:id" element={<HostProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutPage />} />

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
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
