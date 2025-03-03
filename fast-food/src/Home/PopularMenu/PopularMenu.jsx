import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Component/SectionTitle';
import MenuItem from '../../Component/MenuItem/MenuItem';
import useMenu from '../../Hooks/useMenu';

const Popularmenu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular')



    return (
        <div>
            <SectionTitle subHeading={'---Check it out---'} heading={'FROM OUR MENU'}></SectionTitle>
            <div className=" grid md:grid-cols-2 gap-4 mb-3">
                {
                    popular.map(item => <MenuItem
                    key={item._id}
                    item={item}
                    >
                    </MenuItem>)
                }
            </div>

        </div>
    );
};

export default Popularmenu;