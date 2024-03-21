import React,{useState} from "react";
import { Link } from "react-router-dom";
import {validateFirstName,validateLastName,validateEmail,validatePassword,validateConfirmPassword} from '../validations/AuthValidations';
import {register} from '../API/Auth.controller';

export default function Register() {

  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error,setError] = useState('');
  const [success,setSuccess] = useState('');


  const registerHandler = async (req,res)=>{
    req.preventDefault();
    const firstNameCheck = validateFirstName(firstName);
    const lastNameCheck = validateLastName(lastName);
    const emailCheck = validateEmail(email);
    const passwordCheck = validatePassword(password);
    const confirmPasswordCheck = validateConfirmPassword(password,confirmPassword);

    if(firstNameCheck){
      setError(firstNameCheck);
    }else if(lastNameCheck){
      setError(lastNameCheck);
    }else if(emailCheck){
      setError(emailCheck);
    }else if(passwordCheck){
      setError(passwordCheck);
    }else if(confirmPasswordCheck){
      setError(confirmPasswordCheck);
    }else if(!acceptTerms){
      setError('Please accept the terms and conditions');
    } 
    else{
      setError('');
    }

    try {
      const response = await register(firstName,lastName,email,password);
      console.log(response);
      if(response.status === 200){
        setSuccess('Account created successfully');
      }else{
        setError('Something went wrong');
      }
    } catch (error) {
      console.log(error);
      setError('Something went wrong');
    }
  }

  const handleCheckboxChange = () => {
    setAcceptTerms(!acceptTerms); 
  }


  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-5 sm:px-12 lg:col-span-7 lg:px-16 lg:py-10 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to{" "}
                <span className=" font-bold text-orange-600 "> Envough </span>
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Let's embark on this style journey together—register today and
                unlock a world of fashion possibilities with Envough!
              </p>

              <form action="#" className="mt-8 grid grid-cols-6 gap-6 md:mt-10" onSubmit={registerHandler}>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e)=> setFirstName(e.target.value)}
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full border-b py-2 border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-orange-600 transition duration-150 ease-in-out shadow-sm"
                    autoComplete="given-name"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id="LastName"
                    name="last_name"
                    className="mt-1 w-full border-b py-2 border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-orange-600 transition duration-150 ease-in-out shadow-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Email{" "}
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="Email"
                    name="email"
                    className="mt-1 w-full border-b py-2 border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-orange-600 transition duration-150 ease-in-out shadow-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Password{" "}
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="Password"
                    name="password"
                    className="mt-1 w-full border-b py-2 border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-orange-600 transition duration-150 ease-in-out shadow-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password Confirmation
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    className="mt-1 w-full border-b py-2 border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-orange-600 transition duration-150 ease-in-out shadow-sm"
                  />
                </div>

                <div className="col-span-6 mt-2">
                  <div className=" flex flex-row gap-5">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      id="Accept"
                      name="accept_terms"
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />

                    <p className="text-sm text-gray-500">
                      By creating an account, you agree to our
                      <a href="#" className="text-gray-700 underline mr-2 ml-2">
                        {" "}
                        terms and conditions{" "}
                      </a>
                      and{""}
                      <a href="#" className="text-gray-700 underline ml-2">
                        privacy policy
                      </a>
                      .
                    </p>
                  </div>
                </div>

                <div className="col-span-6 sm:flex sm:items-center gap-6 mt-4">
                  <button type="submit" className="inline-block shrink-0 rounded-md border border-gray-600 bg-orange-600 shadow-lg px-16 py-3 text-sm font-medium text-white transition  hover:bg-orange-700 hover:rounded-full  focus:outline-none focus:ring active:text-orange-500 uppercase">
                    Create an account
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                 <Link to='/login'><button className="text-orange-700 underline ml-3">
                      Log in
                    </button></Link> 
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
