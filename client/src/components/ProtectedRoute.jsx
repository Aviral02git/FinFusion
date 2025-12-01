import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Checks if user is authenticated before allowing access
 * Redirects to login if not authenticated
 */
const ProtectedRoute = ({ children }) => {
    // Check if user has a token in localStorage
    const token = localStorage.getItem('token');

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If token exists, render the protected component
    return children;
};

export default ProtectedRoute;
