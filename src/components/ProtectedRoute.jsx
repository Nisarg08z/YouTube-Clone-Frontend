import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const { isLogedin, isInitializing } = useContext(UserContext);
  const location = useLocation();

  if (isInitializing) {
    return <div className="py-10 text-center text-gray-400">Loading...</div>;
  }

  if (!isLogedin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;


