import React, { useState } from "react";
import { Link } from "react-router-dom";
import {validateEmail,validatePassword} from '../validations/AuthValidations';
import {signIn} from '../API/Auth.controller'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const loginHandler = async (e)=>{
    e.preventDefault();

    const EmailCheck = validateEmail(email);
    const PasswordCheck = validatePassword(password);

    if(EmailCheck){
      setError(EmailCheck);
    }else if(!PasswordCheck) {
      setError(PasswordCheck);
    } else{
      setError('');
    }
    
    try {
      const response = await signIn(email,password);
      console.log(response);
      sessionStorage.setItem('User',JSON.stringify(response));
      setEmail('');
      setPassword('');
      setError('');
      setSuccess(`Welcome ${response.data.firstName} ${response.data.lastName}`);
      if(response.status === 200 && response){
        setSuccess(response.data.message);
      }else{
        setError('Something went wrong');
      }
    } catch (error) {
      console.log(error);
      setError('Something went wrong');
    }
  
  }


  return (
    <div className=" min-h-screen">
      <div className="flex flex-wrap ">
        <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
          <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
            <p className="mb-8 text-3xl font-semibold leading-10 opacity-90">
              Unlock your style journey with Envough! Step into a world where
              every login is a doorway to personalized fashion experiences.{" "}
            </p>
            <p className="mb-7 text-sm opacity-70 uppercase">
              envough corperation
            </p>
          </div>
          <img
            className="-z-1 absolute top-0 h-full w-full object-cover opacity-50"
            src="https://i.postimg.cc/Ls2BXpjg/download-image-1711003829431.png"
            alt="Background"
          />
        </div>
        <div className="flex w-full flex-col md:w-1/2">
          <div className="flex justify-center pt-12 md:-mb-24  md:pl-12">
            <a
              href="#"
              className="border-b-gray-700 md:text-left  pb-2 md:pb-8 text-2xl font-bold text-orange-600 2xl:hidden"
            >
              Envough
            </a>
          </div>
          <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-5 md:justify-start md:px-6 md:pt-16 xl:mt-auto">
            <p className="text-left text-3xl font-bold">Welcome back</p>
            <p className="mt-2 text-left text-gray-500">
              {" "}
              please enter your details.
            </p>
            <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-3 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent shadow-sm hover:bg-black hover:text-white">
              <img
                className="mr-2 h-5"
                src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
                alt="Google Icon"
              />{" "}
              Log in with Google
            </button>
            <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
              <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
                or
              </div>
            </div>

            {/**form field */}
            <form className="flex flex-col pt-3 md:pt-10" onSubmit={loginHandler}>
              <div className="flex flex-col pt-4">
                <div className="focus-within:border-b-orange-500 relative flex overflow-hidden border-b-2 transition">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="login-email"
                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="mb-4 flex flex-col pt-6">
                <div className="focus-within:border-b-orange-500 relative flex overflow-hidden border-b-2 transition">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="login-password"
                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Password"
                  />
                </div>
              </div>
            <Link to= '/forgot-password'> <button className=" flex float-right mx-auto mr-2 text text-sm mb-12 text-orange-700 hover:underline">
                forgot Password ?
              </button></Link> 
              <button
                type="submit"
                className="w-full rounded-lg bg-orange-600 hover:bg-orange-700 hover:rounded-full px-4 py-3 text-center text-base font-semibold uppercase text-white shadow-xl ring-gray-500 ring-offset-2 transition focus:ring-2"
              >
                Log in
              </button>
            </form>
            <div className="py-12 text-center gap-3">
              <p className="whitespace-nowrap text-gray-600">
                Don't have an account?
           <Link to='/register'> <button
                  className="underline-offset-4 font-semibold text-orange-900 underline ml-3"
                >
                  Sign up for free.
                </button></Link>  
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
