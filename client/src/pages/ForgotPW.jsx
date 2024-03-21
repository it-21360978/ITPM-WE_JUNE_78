import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import{validateEmail} from '../validations/AuthValidations';
import {forgotPwReq} from '../API/Auth.controller'

export default function ForgotPW() {

const [email,setEmail] = useState('');
const [emailError,setEmailError] = useState('');

const forgotPwHandler = async (req,res) =>{
  req.preventDefault();
  
  const emailCheck= validateEmail(email);
  //check email
  if(emailCheck){
    setEmailError(emailCheck);
  }else{
    setEmailError('');
  }

 //call the Api method
 try {
  const response = await forgotPwReq(email);
  console.log(response);
  if(response.status === 200){
    alert('Reset link has been sent to your email');
  }
  else{
    alert('Something went wrong');
  }
  
 } catch (error) {
    console.log(error);
    alert('Something went wrong');
  
 }
}



  return (
   <div className="relative h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover" style={{backgroundImage: 'url("https://img.freepik.com/free-photo/female-friends-out-shopping-together_53876-25041.jpg?t=st=1711013299~exp=1711016899~hmac=6d005360d9b2ef29d0acd8044a65e40b7de71047c587a8df30374ef0ae5206c0&w=1060")'}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Card Content */}
      <div className="h-full flex justify-center items-center">
        <div className="rounded-xl border border-gray-200 bg-white shadow-xl p-5 z-10">
        <h5 className="block text-sm font-sans font-bold text-orange-600 text-center">Envough</h5>
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <div className="mb-4 inline-block rounded-full bg-orange-200 p-2 text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h1 className="block text-2xl font-bold text-gray-800">Forgot password?</h1>
              <p className="mt-2 text-sm text-gray-600">Don't worry we'll send you reset instructions.</p>
            </div>

            <div className="mt-6">
              {/* Form */}
              <form onSubmit={forgotPwHandler}>
                <div className="grid gap-y-4">
                  {/* Form Group */}
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm text-gray-600">Email address</label>
                    <div className="relative">
                      <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} id="email" name="email" className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500" placeholder='Email Here'/>
                    </div>
                  </div>
                  {/* /Form Group */}

                  <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-orange-600 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-orange-700 hover:rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-md uppercase">Reset password</button>
                </div>
              </form>
              {/* /Form */}
            </div>
          </div>

          <p className="mt-3 flex items-center justify-center divide-x divide-gray-300 text-center mb-5">
            <span className="inline pr-3 text-sm text-gray-600">
              Remember your password?
           <Link to='/login'>  <button className="font-medium text-orange-700 decoration-2 hover:underline" > Sign in here </button></Link> 
            </span>
            <a className="pl-3 text-sm text-gray-600 decoration-2 hover:text-orange-700 hover:underline" href="#" target="_blank"> Contact Support </a>
          </p>
        </div>
      </div>
    </div>
  )
}
