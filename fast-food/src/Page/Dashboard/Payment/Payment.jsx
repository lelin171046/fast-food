import SectionTitle from "../../../Component/SectionTitle";
import { Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_STRIPE);


const Payment = () => {
    return (
        <div>
            <SectionTitle heading='Payment' subHeading={'Please Pay First'}></SectionTitle>
            <div className="">
            <Elements stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>
            </Elements>
            </div>
        </div>

    );
};

export default Payment;