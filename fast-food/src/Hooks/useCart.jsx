import {
  
  useQuery,
} from '@tanstack/react-query'

import useAxios from './useAxios';
import useAuth from './useAuth';

const useCart = () => {
    const axiosSecure = useAxios();
    const{user} = useAuth()

   //use tanstack qery
   const {data : cart=[]} = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async () =>{
        const res = await axiosSecure.get(`/carts?email=${user.email}`)
        return res.data
    }

   })
   return [cart]
};

export default useCart;