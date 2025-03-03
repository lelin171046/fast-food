import React from 'react';
import { Helmet } from 'react-helmet';
import Cover from '../../Component/Shared/Cover';
import cvrImg from '../../assets/menu/banner3.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import SectionTitle from '../../Component/SectionTitle';
import useMenu from '../../Hooks/useMenu';
import MenuCategory from './MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
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
            {/*main cover*/}
            <MenuCategory item={offered}></MenuCategory>
            {/*dessert*/}
            <MenuCategory
            item={desserts}
            title={'Desserts'}
            img={dessertImg}
            
            ></MenuCategory>
            <MenuCategory
            item={pizza}
            title={'Pizza'}
            img={pizzaImg}
            
            ></MenuCategory>
            <MenuCategory item={salad} img={saladImg} title={'Salads'}></MenuCategory>
            <MenuCategory item={soup} img={soupImg} title={'Soups'}></MenuCategory>
        </div>
    );
};

export default Menu;