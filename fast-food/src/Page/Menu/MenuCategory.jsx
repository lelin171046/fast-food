import React from 'react';
import MenuItem from '../../Component/MenuItem/MenuItem';
import Cover from '../../Component/Shared/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({item, title, img}) => {
    return (
        <div className="pt-8">
            {
              title && <Cover img={img} title={title}></Cover>
            }
            <div className="my-16 grid md:grid-cols-2 gap-4 mb-3">
                {
                    item.map(item => <MenuItem
                    key={item._id}
                    item={item}
                    >
                    </MenuItem>)
                    
                }
            </div>
            <Link to={`/order/${title}`}> <button className="btn btn-outline bg-white border-0 border-b-4">Read More</button></Link>
        </div>
    );
};

export default MenuCategory;