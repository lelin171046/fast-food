import React from 'react';
import useAuth from './useAuth';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const {
    data: isAdmin ,
    isPending: isAdminLoading,
  } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    enabled: !!user?.email, // ✅ Don't run query if email is undefined
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data?.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
