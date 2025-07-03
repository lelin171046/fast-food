import React from 'react';
import useMenu from '../../Hooks/useMenu';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ManageItem = () => {
    const [menu] = useMenu();
    const axiosSecure = useAxios();
  const {user} = useAuth()

  const { refetch, data: menus = [] } = useQuery({
    queryKey: ['menu'],
    queryFn: async () => {
      const res = await axiosSecure.get('/menu', 
        // { headers: {
        //   authorization : `Bearer ${localStorage.getItem('access-token')}`
        // }}
      );
     
      return res.data;
    }
  });
      const handleDelete = menu => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
    
    
            axiosSecure.delete(`/menu/${menu._id}`)
              .then(res => {
                if (res.data.deletedCount > 0) {
                  toast.success(`${menu.name} Deleted successfully!`)
                  refetch()
                }
              })
          }
        });
    
      }

    return (
        <div>
            <div className="overflow-x-auto">
                  <label className='text-center'>
                    <p>Total user: {menus.length}</p>
                  </label>
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Update</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {
                        menus.map((menu, index) => <tr className='' key={menu._id}>
            
                          <th>
                            <label>
                              {index + 1}
                            </label>
                          </th>
                          <td>
                            <div className="flex items-center gap-2 ">
                              <div className="avatar">
                                <div className="mask mask-squircle h-8 w-8">
                                  <img
                                    src={menu?.image || 'image'} />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{menu?.name || 'User'}</div>
                                {/* <div className="text-sm opacity-50">United States</div> */}
                              </div>
                            </div>
                          </td>
                          <td>
            
            
                            <span className="badge badge-ghost badge-sm">{menu.category}</span>
                          </td>
                          <td>
                            <p>{menu.price}</p>
                          </td>
                          <td className='items-end text-orange-400 text-center'>
                            <button><FaEdit></FaEdit></button>
                          </td>
                          <th>
                            <button onClick={() => handleDelete(menu)} type="button" className="flex text-orange-400 items-center px-2 py-1 pl-0 space-x-1">
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
                       
                      </tr>
                    </tfoot>
                  </table>
                </div>
        </div>
    );
};

export default ManageItem;