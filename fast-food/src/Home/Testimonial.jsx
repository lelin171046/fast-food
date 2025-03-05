import React, { useEffect, useState } from 'react';
import SectionTitle from '../Component/SectionTitle';
import { Rating } from "primereact/rating";
import 'swiper/css/navigation';
import 'swiper/css/pagination';



// import required modules
import { Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
const Testimonial = () => {

const [review, setReview] = useState([])

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/review`)
        .then(res => res.json())
        .then(data => setReview(data))
    },[])
    return (
        <section className='my-8'>
            <SectionTitle
                subHeading={'---What Our Clients Say---'}
                heading={'TESTIMONIALS'}
            ></SectionTitle>
            <Swiper
                dir="rtl"
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation, Pagination]}
                className="mySwiper"
            >
               
               {
                review.map(review => <SwiperSlide
                key={review._id}

                >
                    <div className="m-24 flex flex-col items-center">
                    <Rating className='text-orange-300 gap-2' value={review.rating} readOnly cancel={false} />
                        <p className='py-6'>{review.details}</p>
                        <h3 className="text-3xl text-orange-400">{review.name}</h3>
                    </div>
                </SwiperSlide>)
               }
            </Swiper>

        </section>
    );
};

export default Testimonial;