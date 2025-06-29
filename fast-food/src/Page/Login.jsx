import React, { useEffect,  useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate,  validateCaptcha } from 'react-simple-captcha';
import img from '../assets/others/authentication1.png'
import useAuth from '../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SoicalLogIn from '../Component/Shared/SocialLogIn';
import SocialLogIn from '../Component/Shared/SocialLogIn';
const Login = () => {

  const [disabled, setDisabled] = useState(true);
  const { signIn, user} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [navigate, user])

  useEffect(()=>{
    loadCaptchaEnginge(6); 
  },[])

  const handleCaptcha = (e)=>{
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)==true) {
      setDisabled(false)
  }

  else {
      alert('Captcha Does Not Match');
  }
  }
const handleLogin = (e) =>{
  e.preventDefault()
  const form = e.target
  const email = form.email.value
  const password = form.password.value
  // console.log({ email, pass })
  signIn(email, password)
  .then(result =>{
    const user = result.user;
    console.log(user, 'here')
     Swal.fire({
            title: "Login Successful!",
            icon: "success",
            draggable: true
          });
          navigate(from, { replace: true })
  })
  
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-10 my-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl flex">
        {/* Left Section - Illustration */}
        <div className="hidden md:flex w-1/2 bg-gray-200 items-center justify-center p-6">
          <img
            src={img}
            alt="Illustration"
            className="max-w-xs"
          />
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full text-black md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name='email'
                className="w-full p-2 text-white border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Type here"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name='password'
                className="w-full text-white p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your password"
              />
            </div>
            <div className='text-center '>
             
                <label className="fieldset-label"><LoadCanvasTemplate /></label>
                <input type="text " onBlur={handleCaptcha}  name='captcha' className="input  text-green-600" placeholder="type the captcha" />
                {/* <button type="button"   className="px-2 py-1 m-2 text-sm rounded-full dark:bg-gray-800 dark:text-gray-100">Verify captcha</button> */}
            </div>
            <div className="">
              <input disabled={disabled} className={disabled? 'bg-white p-2 rounded w-full border-2 border-black text-gray-500' : 'w-full  bg-yellow-300  text-white p-2 rounded'} type="submit" value="Login" />
            </div>
            
          </form>

          <p className="text-center text-black text-sm mt-4">
            New here? <Link to={'/sign-in'} className="text-yellow-600">Create a New Account</Link>
          </p>

          <SocialLogIn></SocialLogIn>
          </div>
      </div>
    </div>
  );
};

export default Login;