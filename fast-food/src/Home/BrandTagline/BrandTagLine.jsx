import React from 'react';
import './Tagline.css'
const BrandTagLine = () => {
    return (
        <section className='brand-bg'>
            <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-cover bg-center px-4"
                style={{ backgroundImage: ('../../assets/home/chef-service.jpg') }}>
                <div className="bg-white p-6 md:p-10 lg:p-16 max-w-lg md:max-w-2xl lg:max-w-3xl text-center shadow-lg w-full">
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Fast Food</h2>
                    <p className="text-gray-600 text-sm md:text-base">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero
                        accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam
                        dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default BrandTagLine;