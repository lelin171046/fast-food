import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import slider1 from '../assets/home/slide1.jpg'
import slider2 from '../assets/home/slide2.jpg'
import slider3 from '../assets/home/slide3.jpg'
import slider4 from '../assets/home/slide4.jpg'
import slider5 from '../assets/home/slide5.jpg'
import SectionTitle from '../Component/SectionTitle';

const Catagory = () => {
    return (
        <div>
           <section>
            <SectionTitle  subHeading={'From 10am to 11pm'}
                            heading={'Order Online'}
             >
               
            </SectionTitle>
           <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-10"
            >
                <SwiperSlide>
                    <img src={slider1} alt="" />
                    <h3 className='text-4xl text-white -mt-16 text-center uppercase '>Salads</h3>
                </SwiperSlide>
                <SwiperSlide><img src={slider2} alt="" />
                    <h3 className='text-4xl text-white -mt-16 text-center uppercase '>sOUPS</h3></SwiperSlide>
                <SwiperSlide><img src={slider3} alt="" />
                    <h3 className='text-4xl text-white -mt-16 text-center uppercase '>PIZZAS</h3>
                </SwiperSlide>
                <SwiperSlide><img src={slider4} alt="" />
                    <h3 className='text-4xl text-white -mt-16 text-center uppercase '>DESSERTs</h3>
                </SwiperSlide>
                <SwiperSlide><img src={slider5} alt="" />
                    <h3 className='text-4xl text-white -mt-16 text-center uppercase '>Salads</h3>
                </SwiperSlide>

            </Swiper>
           </section>
        </div>
    );
};

export default Catagory;