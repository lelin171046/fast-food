import React from 'react';
import Banner from './Banner';
import Catagory from './Catagory';
import Popularmenu from './PopularMenu/Popularmenu';
import FeaturedItem from './FeaturedItem/FeaturedItem';
import Testimonial from './Testimonial';
import BrandTagLine from './BrandTagline/BrandTagLine';
import Contact from './Contact';


const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <Catagory></Catagory>
            <BrandTagLine></BrandTagLine>
            <Popularmenu></Popularmenu>
            <Contact></Contact>
            <FeaturedItem></FeaturedItem>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;