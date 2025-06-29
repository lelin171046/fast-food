import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../Hooks/useAxios';

const AllUser = () => {
    const axiosSecure = useAxios()


    const { data: users = [] } = useQuery({
  queryKey: ['users'],
  queryFn: async () => {
    const res = await axiosSecure.get('/users');
    console.log(res.data);
    return res.data;
  }
});
    return (
        <div className="overflow-x-auto">
          <label className='text-center'>
            <p>Total user: {users.length}</p>
          </label>
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
      users.map((user, index) =>  <tr key={user._id}>

        <th>
          <label>
           {index + 1}
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user.image} />
              </div>
            </div>
            <div>
              <div className="font-bold">{user.name || user.displayName}</div>
              {/* <div className="text-sm opacity-50">United States</div> */}
            </div>
          </div>
        </td>
        <td>
         
         
          <span className="badge badge-ghost badge-sm">{user.email}</span>
        </td>
        <td>Purple</td>
        <th>
          <button onClick={()=>handleDelete(user)} type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                                <rect width="32" height="200" x="168" y="216"></rect>
                                                <rect width="32" height="200" x="240" y="216"></rect>
                                                <rect width="32" height="200" x="312" y="216"></rect>
                                                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                            </svg>
                                           
                                        </button>
        </th>
      </tr>)
     }
 
     
    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        
        <th></th>
      </tr>
    </tfoot>
  </table>
</div>
    );
};

export default AllUser;