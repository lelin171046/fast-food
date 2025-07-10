import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxios';
import { FaBookOpen, FaDollarSign, FaMoneyBill, FaMoneyCheck, FaUser } from 'react-icons/fa';

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data
        }
    })
    return (
        <div>
            <h2 className='text-3xl m-4'>
                <span>Hi Welcome </span>
                {
                    user?.displayName ? user?.displayName : 'Back'
                }
            </h2>
            <div className="stats  m-4 shadow">

<div className="stats shadow">
  <div className="stat place-items-center">
    <div className="stat-title">Total Revenue</div>
    <div className="stat-value text-green-400 flex gap-2"><p>{stats?.revenue}</p>
    <p><FaDollarSign className=' mt-1'></FaDollarSign></p></div>
    
    <div className="stat-desc">21% more than last month</div>
  </div>

  <div className="stat place-items-center">
    <div className="stat-title">Total Users</div>
    <div className="stat-value text-secondary flex gap-2"><p>{stats?.users}</p>
    <p><FaUser className=' mt-1'></FaUser></p></div>
    <div className="stat-desc text-secondary">↗︎ 21% growth</div>
  </div>

  <div className="stat place-items-center">
    <div className="stat-title">Menu Items</div>
    <div className="stat-value">{stats?.menuItems}</div>
    <div className="stat-desc">Updated this month</div>
  </div>
  <div className="stat place-items-center">
    <div className="stat-title">Orders</div>
    <div className="stat-value">{stats?.orders}</div>
    <div className="stat-desc">Updated this month</div>
  </div>
</div>


</div>

        </div>
    );
};

export default AdminHome;