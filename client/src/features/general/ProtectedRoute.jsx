import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const loggedIn = useSelector(state => state.user.loggedIn);

    if (!loggedIn) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
