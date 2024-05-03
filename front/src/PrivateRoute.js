import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ path, element }) => {
    const { user } = useAuth();

    return user ? (
        path === '/login' || path === '/signup' ? (
            <Navigate to="/myprofile" replace />
        ) : (
            <Route path={path} element={element} />
        )
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;
