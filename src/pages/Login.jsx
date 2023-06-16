import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/")
      } catch (err) {
        setErr(true);
      }
    };

    return (
        <div className='h-screen bg-indigo-300 flex justify-center items-center'>
            <div className=' space-y-5 bg-white p-12 rounded-lg justify-center items-center flex flex-col w-[22%]'>
                <div className='items-center flex flex-col '>
                    <h2 className='text-xl font-semibold text-indigo-400'>ChatApp</h2>
                    <h3 className='text-lg'>Login</h3>
                </div>
                <form action="" className='flex flex-col gap-8 w-full drop-shadow-xl' onSubmit={handleSubmit}>

                
                    <input type="email" className='border-b-[1px] border-gray-500 p-2 rounded-md' placeholder='email' />
                    <input type="password" className='border-b-[1px] border-gray-500 p-2 rounded-md' placeholder='password' />

                    <button className='bg-indigo-400 rounded-lg text-white h-10'> Sign up</button>
                </form>
                <p>Don't have a account? <button className="text-blue-500 underline" onClick={() => {navigate("/Register")}}> Register</button></p> 
            </div>
        </div>
    )
}

export default Login
