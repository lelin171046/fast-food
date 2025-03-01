import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='mx-auto md:w-3/12 text-center my-6'>
            <p className='text-yellow-600 mb-4'>---{subHeading}---</p>
            <h3 className='uppercase text-3xl py-4 border-y-4'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;