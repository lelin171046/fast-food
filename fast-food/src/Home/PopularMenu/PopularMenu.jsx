import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Component/SectionTitle';
import MenuItem from '../../Component/MenuItem/MenuItem';

const Popularmenu = () => {
    const [menu, setMenu] = useState([]);


    useEffect(()=>{
        fetch('menu.json')
        .then(res => res.json())
        .then(data => {
            const popularItem = data.filter(item => item.category === 'popular' )
            setMenu(popularItem)
        })
    }, [])


    return (
        <div>
            <SectionTitle subHeading={'---Check it out---'} heading={'FROM OUR MENU'}></SectionTitle>
            <div className=" grid md:grid-cols-2 gap-4 mb-3">
                {
                    menu.map(item => <MenuItem
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