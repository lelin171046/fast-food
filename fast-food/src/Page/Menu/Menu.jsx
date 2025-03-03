import React from 'react';
import { Helmet } from 'react-helmet';
import Cover from '../../Component/Shared/Cover';
import cvrImg from '../../assets/menu/dessert-bg.jpeg'
import SectionTitle from '../../Component/SectionTitle';
import useMenu from '../../Hooks/useMenu';

const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'desserts')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')




    return (
        <div>
        <Helmet>
            <title>Fast Food | Menu</title>
        </Helmet>
          <Cover img={cvrImg} title={'OUR MENU'}></Cover>

          <SectionTitle heading={"TODAY'S OFFER"} subHeading={"---Don't miss---"}></SectionTitle>


        </div>
    );
};

export default Menu;