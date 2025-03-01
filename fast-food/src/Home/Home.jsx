import React from 'react';
import Banner from './Banner';
import Catagory from './Catagory';
import Popularmenu from './PopularMenu/Popularmenu';


const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <Catagory></Catagory>
            <Popularmenu></Popularmenu>
        </div>
    );
};

export default Home;