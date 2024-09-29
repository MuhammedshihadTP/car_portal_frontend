
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {
  const adminToken = localStorage.getItem('adminToken'); 
  const userToken = localStorage.getItem('userToken');

 
  const isAuthorized = isAdmin ? adminToken : userToken;

  return isAuthorized ? children : <Navigate to={isAdmin ? '/login/admin' : '/login'} />;
};

export default ProtectedRoute;
