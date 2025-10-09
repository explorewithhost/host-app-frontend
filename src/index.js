import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage"; 
import HostProfilePage from "./pages/HostProfilePage";
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import Dashboard from "./pages/Dashboard";
import HostProfileBuilder from "./pages/HostProfileBuilder"; 
import ProtectedRoute from "./components/ProtectedRoute"; 

const Main = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/hosts/:id" element={<HostProfilePage />} />
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
      <Route path="/host/profile-builder" element={<HostProfileBuilder />} />
    </Routes>
  </Router>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Main />);
