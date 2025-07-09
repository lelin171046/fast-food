import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useCart from '../../../Hooks/useCart';
import useAxios from '../../../Hooks/useAxios';

const CheckoutForm = () => {
      const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState()
  const cart = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0) ;
  const useAxiosSecure = useAxios();
  const [clientSecret, setClientSecret] = useState('')

  useEffect(()=>{
    useAxiosSecure.post('/create-checkout-session', {price: totalPrice})
    .then(res => {
      console.log(res.data.clientSecret)
      setClientSecret(res.data.clientSecret)
    }
      
    )
  }, [useAxiosSecure, totalPrice])

     const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
     if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

     const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setError(error.message)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('')
    }


     }


    return (
        <form onSubmit={handleSubmit} action="">
               <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
        <button type="submit" className='btn btn-primary m-4' disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className='text-red-600'>{error}</p>
        </form>
    );
};

export default CheckoutForm;