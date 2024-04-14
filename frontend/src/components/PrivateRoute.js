import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element: Element, requiresAuth, ...rest }) {
  const token = localStorage.getItem('token');

  if (!requiresAuth) {
    return <Route {...rest} element={<Element />} />;
  }

  return token ? <Route {...rest} element={<Element />} /> : <Navigate to="/login" />;
}

export default PrivateRoute;
