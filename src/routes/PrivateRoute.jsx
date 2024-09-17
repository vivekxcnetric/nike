import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token || sessionStorage.getItem('token'));

  return token ? children : <Navigate to="/auth/signin" />;
};

export default PrivateRoute;
