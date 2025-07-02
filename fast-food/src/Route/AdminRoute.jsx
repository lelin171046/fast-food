import React from 'react';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
import Loader from '../Component/Loader';
import { Navigate, replace, useLocation, useNavigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin();
    const navigate = useNavigate();
    const location = useLocation();
    
    if(loading || isAdminLoading){
        return <Loader></Loader>
    }
    if(user && isAdmin){
        return children;
    }
  return  <Navigate to={'/login'} state={{from: location}} replace></Navigate>
};

export default AdminRoute;