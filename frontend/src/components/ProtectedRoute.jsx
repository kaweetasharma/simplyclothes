import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../store';

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
