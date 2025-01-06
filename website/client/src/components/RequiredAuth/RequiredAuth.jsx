import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RequiredAuth = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); // Get auth state and loading status
  const navigate = useNavigate();

  // Show a loading spinner while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    <Navigate to="/" replace />;
    // return null; // Prevent rendering protected content
  }

  return children; // Render the protected content if authenticated
};

export default RequiredAuth;
