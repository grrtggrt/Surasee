import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../services/authorize';

const PrivateRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
