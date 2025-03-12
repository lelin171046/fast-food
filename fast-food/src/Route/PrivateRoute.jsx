import React from 'react';
import Loader from '../Component/Loader';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import toast from 'react-hot-toast';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loader></Loader>;

    if (user) return children;

    return toast.error('Login First') && <Navigate to="/login"  state={{ from: location }} replace /> ;
};

export default PrivateRoute;