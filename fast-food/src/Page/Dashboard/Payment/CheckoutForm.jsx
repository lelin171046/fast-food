import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useCart from '../../../Hooks/useCart';
import useAxios from '../../../Hooks/useAxios';
import useAuth from '../../../Hooks/useAuth';

const CheckoutForm = () => {
      const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState()
  const [cart, refetch] = useCart();
  const {transactionId, setTransactionId} = useState('')
  const {user} = useAuth()
const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);
  console.log(totalPrice, 'cart', cart)
  const useAxiosSecure = useAxios();
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
  if (totalPrice > 0) {
    useAxiosSecure.post('/create-checkout-session', { price: totalPrice })
      .then(res => {
        setClientSecret(res.data.clientSecret);
      });
  }
}, [useAxiosSecure, totalPrice]);

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
//confirm payment
     const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
      clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
          }
        }
      }
     )
     if(confirmError){
      console.log('confirm error')
     }
     else{
      console.log('payment intent', paymentIntent)
      if(paymentIntent.status === 'succeeded'){
        console.log('tc ID:', paymentIntent.id)
        setTransactionId(paymentIntent.id)
      }
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
      {transactionId && <p className='text-green-500'>Paid Successfully your Transaction ID{transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;