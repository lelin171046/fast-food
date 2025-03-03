import React from 'react';
import SectionTitle from '../../Component/SectionTitle';
import featuredImg from '../../assets/home/featured.jpg'
import './Featured.css';

const FeaturedItem = () => {
    return (
       <section className='bg-img bg-fixed pt-2 text-white'>
        <SectionTitle
        subHeading={'---Check it out---'}
        heading={'FROM OUR MENU'}
        ></SectionTitle>
        <div className="md:flex items-center bg-slate-500 bg-opacity-50 justify-center pb-20 pt-10 px-36">
            <div className="">
            <img src={featuredImg} alt="" />
            </div>
            <div className="md:ml-10">
                <p>March 20, 2023</p>
                <h3 className='uppercase text-3xl'>WHERE CAN I GET SOME?</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam saepe obcaecati cum blanditiis expedita fuga molestias beatae. Deleniti necessitatibus enim voluptas aperiam qui, quos natus sint atque quia quaerat tempora.</p>
                <button className="btn btn-outline bg-white border-0 border-b-4">Read More</button>
            </div>
        </div>
       </section>
    );
};

export default FeaturedItem;