import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../store';

const AdminRoute = ({ children }) => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo?.isAdmin ? children : <Navigate to="/signin" />;
};

export default AdminRoute;
