import React from 'react';
import Loader from '../Component/Loader';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import toast from 'react-hot-toast';

const AdminRoute = (children) => {
    const {user, loading} = useAuth()
    const location = useLocation();
    const[isAdminLoading, isAdmin] = useAdmin()

    if (loading || isAdminLoading) return <Loader></Loader>;

    if (user && isAdmin) return children;

    return toast.error('Login First') && <Navigate to="/login"  state={{ from: location }} replace /> ;
};

export default AdminRoute;