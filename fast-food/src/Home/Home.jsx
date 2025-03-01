import React from 'react';
import Banner from './Banner';
import Catagory from './Catagory';
import Popularmenu from './PopularMenu/Popularmenu';
import FeaturedItem from './FeaturedItem/FeaturedItem';
import Testimonial from './Testimonial';


const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <Catagory></Catagory>
            <Popularmenu></Popularmenu>
            <FeaturedItem></FeaturedItem>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;