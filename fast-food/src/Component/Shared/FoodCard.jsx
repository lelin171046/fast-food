import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';

const FoodCard = ({ item }) => {
    const { image, name, price, _id } = item;
    const { user } = useAuth()
    const navigate = useNavigate()
    const axiosSecure = useAxios()
    

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
        else (
            Swal.fire({
                title: "You are Not Login",
                text: "Please Login",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        )
    }

    return (
        <div>
            <div className="card bg-base-100 w-96 border-2 border-white shadow-sm">
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
            </div>
        </div>
    );
};

export default FoodCard;