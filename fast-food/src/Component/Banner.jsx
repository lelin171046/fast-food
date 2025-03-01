
import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import { Carousel } from 'react-responsive-carousel';
import img1 from '../../src/assets/1.jpg'
import img2 from '../../src/assets/2.jpg'
import img3 from '../../src/assets/3.jpg'
import img4 from '../../src/assets/4.jpg'
const Banner = () => {
    return (
        <Carousel>
                <div>
                    <img src={img1} />
                   
                </div>
                <div>
                    <img src={img2} />
                </div>
                <div>
                    <img src={img3} />
                </div>
                <div>
                    <img src={img4} />
                </div>
               
            </Carousel>
    );
};

export default Banner;