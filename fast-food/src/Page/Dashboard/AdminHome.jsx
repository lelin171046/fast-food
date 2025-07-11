import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxios';
import { FaBookOpen, FaDollarSign, FaMoneyBill, FaMoneyCheck, FaUser } from 'react-icons/fa';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Pie, PieChart, ResponsiveContainer, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];




const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
  const { data: chartData } = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/order-stats');

      return res.data
    }
  })

  //custom shape for barChart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  //pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieData = chartData?.map(data => {
    return { name: data.category, value: data.revenue }
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
      <div className="flex flex-col lg:flex-row gap-4 m-4">
  <div className="w-full lg:w-1/2 h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Bar dataKey="quantity" shape={<TriangleBar />} label={{ position: 'top' }}>
          {chartData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>

  <div className="w-full lg:w-1/2 h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius="80%"
          dataKey="value"
        >
          {pieData?.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>
    </div>
  );
};

export default AdminHome;