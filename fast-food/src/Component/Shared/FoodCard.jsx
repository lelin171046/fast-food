import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';

const FoodCard = ({ item }) => {
    const { image, name, price, _id } = item;
    const { user } = useAuth()
    const navigate = useNavigate()
    const axiosSecure = useAxios()
    const location = useLocation()


    const handleAddToCart = (food) => {
        if (user && user.email) {
            //store cart  data
            const CartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price


            }
            axiosSecure.post('/cart', CartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Your ${name} has been add to cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
        else{
             Swal.fire({
                title: "You are Not Login",
                text: "Please Login",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            })
            .then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
           
        
    }

    return (
        <div>
            <div className="">
                <div className="max-w-xs overflow-hidden rounded-lg shadow-lg dark:bg-gray-50 dark:text-gray-800">
                    <div
                        className="flex items-end justify-end h-32 p-4 dark:bg-gray-500 bg-center bg-cover"

                    >
                        <img src={image} alt="" />
                        <p className="px-2 py-1 text-sm tracking-widest dark:text-gray-800 uppercase dark:bg-gray-100 bg-opacity-75 rounded shadow-lg">{price}$</p>
                    </div>

                    <div className="flex justify-between p-4">
                        <div className="flex flex-col flex-1 gap-4">
                            <div className="flex justify-between">

                            </div>

                            <p className="text-xl font-bold">
                                {name}.

                            </p>
                        </div>

                        <div className="text-sm leading-loose">
                            <div className="flex items-center"></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-8 p-4 border-t dark:text-gray-600 dark:border-gray-300">
                        <div className="flex items-center space-x-1">
                            <span className="font-bold">8</span>
                            <span className="text-sm">UV</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="font-bold">5%</span>
                            <span className="text-sm">Precip</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <button onClick={handleAddToCart}><a
  href="#_"
  className="relative inline-flex items-center px-2 py-2 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50"
>
  <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>

  <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  </span>

  <span className="relative">Add Cart</span>
</a>
</button>
                        </div>
                    </div>
                </div>

            </div>
            {/* <div className="card bg-base-100 w-96 border-2 border-white shadow-sm">
                <figure>
                    <img
                        src={image}
                    />
                </figure>
                <p className='absolute bg-black right-0 text-white px-2 mr-4 rounded-lg mt-4'>${price}</p>
                <div className="card-body">
                    <h2 className="card-title">
                        {name}
                    </h2>
                    <p className='text-white'>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions justify-end">
                        <button onClick={() => handleAddToCart(item)}
                            className="btn btn-primary">Add to card</button>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default FoodCard;