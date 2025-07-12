import axios from 'axios';
import React from 'react';


const axiosPublic = axios.create({
    // baseURL: 'https://fast-food-server2-o8k9xfgg0-moniruzzaman-lelins-projects.vercel.app'
    // baseURL: 'https://localhost:5000'
        baseURL: import.meta.env.VITE_API_URL

})


const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;