import React from 'react';
import useCart from '../../Hooks/useCart';
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import useAxios from '../../Hooks/useAxios';

const Cart = () => {

    const [cart, refetch] = useCart();
    const axiosSecure = useAxios()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    const handleDelete = id =>{
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

    
    axiosSecure.delete(`/carts/${id}`)
    .then(res =>{
        if(res.data.deletedCount > 0){
            Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
    refetch()
        }
    })
  }
});

    }
    return (
        <div>
            <div className="flex border-2 border-orange-400 flex-col max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800">
                <h2 className="text-xl font-semibold">Your cart</h2>
                <h2>Total item: {cart.length}</h2>
                <ul className="flex flex-col divide-y dark:divide-gray-300">
                    {
                        cart.map(item => <li key={item._id} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                            <div className="flex w-full space-x-2 sm:space-x-4">
                               <img
    className="flex-shrink-0 object-cover w-20 h-20 rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
    src={item.image}
    alt={item.name || 'Image'}
  />
                                <div className="flex flex-col justify-between w-full pb-4">
                                    <div className="flex justify-between w-full pb-2 space-x-2">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-semibold leading-snug sm:pr-8">{item.name}</h3>
                                            <p className="text-sm dark:text-gray-600">Classic</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold">{item.price}$</p>
                                            <p className="text-sm line-through dark:text-gray-400">75.50€</p>
                                        </div>
                                    </div>
                                    <div className="flex text-sm divide-x">
                                        <button onClick={()=>handleDelete(item._id)} type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                                <rect width="32" height="200" x="168" y="216"></rect>
                                                <rect width="32" height="200" x="240" y="216"></rect>
                                                <rect width="32" height="200" x="312" y="216"></rect>
                                                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                            </svg>
                                            <span>Remove</span>
                                        </button>
                                        <button type="button" className="flex items-center px-2 py-1 space-x-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                                <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                            </svg>
                                            <span>Add to favorites</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>)
                    }

                </ul>
                <div className="space-y-1 text-right">
                    <p>Total amount:
                        <span className="font-semibold">{totalPrice}$</span>
                    </p>
                    <p className="text-sm dark:text-gray-600">Not including taxes and shipping costs</p>
                </div>
                <div className="flex justify-end space-x-4">
                    <NavLink to={'/order/salad'} className="px-6 py-2 border rounded-md dark:border-violet-600">Back
                        <span className="sr-only sm:not-sr-only">to shop</span>
                    </NavLink>
               {cart.length ?  <Link to={'/dashboard/payment'}>
                    <button type="button" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                        <span className="relative px-6 py-3 transition-all ease-out bg-slate-500 rounded-md group-hover:bg-opacity-0 duration-400">
                            <span className="relative text-white"><span className="sr-only sm:not-sr-only">Continue to</span>Checkout</span>
                        </span>
                    </button>
                </Link> :
                <button disabled type="button" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                        <span className="relative px-6 py-3 transition-all ease-out bg-slate-500 rounded-md group-hover:bg-opacity-0 duration-400">
                            <span className="relative text-white"><span className="sr-only sm:not-sr-only">Continue to</span>Checkout</span>
                        </span>
                    </button>
                }


                  
                </div>
            </div>
        </div>
    );
};

export default Cart;