import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Cards from "./pages/Cards";
import Notifications from "./pages/Notifications";
import Transactions from "./pages/Transactions";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />

        {/* Protected Routes - Require Authentication */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/insights" element={
          <ProtectedRoute>
            <Insights />
          </ProtectedRoute>
        } />
        <Route path="/cards" element={
          <ProtectedRoute>
            <Cards />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
        <Route path="/transactions" element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        } />
      </Routes>

    </Router>
  )
}
export default App;