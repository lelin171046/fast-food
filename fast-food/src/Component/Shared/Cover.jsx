import React from 'react';
import {  ParallaxBanner } from 'react-scroll-parallax';

const Cover = ({ img, title }) => {
  return (



     
        <ParallaxBanner speed={-10}>
         <div
      className="hero h-[700px]"
      style={{
        backgroundImage: `url(${img})`,
      }}>
      <div className="hero-overlay"></div>
      <div className="hero-content text-white text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{title}</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          {/* <button className="btn btn-primary">Get Started</button> */}
        </div>
      </div>
    </div>
        </ParallaxBanner>
      );
    }
    
    

export default Cover;