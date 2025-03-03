import React from 'react';

const FoodCard = ({item}) => {
    const {image, name, price }= item
    return (
        <div>
            <div className="card bg-base-100 w-96 border-2 border-white shadow-sm">
                <figure>
                    <img
                        src={image}
                        alt="Shoes" />
                </figure>
                        <p className='absolute bg-black right-0 text-white px-2 mr-4 rounded-lg mt-4'>${price}</p>
                <div className="card-body">
                    <h2 className="card-title">
                        {name}
                    </h2>
                    <p className='text-white'>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Add to card</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;