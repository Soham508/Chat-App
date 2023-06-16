import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {storage, auth, db} from '../firebase';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
   

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
    
        try {
          //Create user
          const res = await createUserWithEmailAndPassword(auth, email, password);
    
          //Create a unique image name
          const date = new Date().getTime();
          const storageRef = ref(storage, `${displayName + date}`);
    
          await uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              try {
                //Update profile
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                });
                //create user on firestore
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });
    
                //create empty user chats on firestore
                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/");
              } catch (err) {
                console.log(err);
                setErr(true);
                setLoading(false);
              }
            });
          });
        } catch (err) {
          setErr(true);
          setLoading(false);
        }
      };

   

    return (
        <div className='h-screen bg-indigo-300 flex justify-center items-center'>
            <div className=' space-y-5 bg-white p-12 rounded-lg justify-center items-center flex flex-col w-[22%]'>
                <div className='items-center flex flex-col '>
                    <h2 className='text-xl font-semibold text-indigo-400'>ChatApp</h2>
                    <h3 className='text-lg'>Register</h3>
                </div>
                <form action="" className='flex flex-col gap-8 w-full drop-shadow-xl' onSubmit={handleSubmit}>

                    <input type="text" className='border-b-[1px] border-gray-500 p-2 rounded-md' placeholder='display name' />
                    <input type="email" className='border-b-[1px] border-gray-500 p-2 rounded-md' placeholder='email' />
                    <input type="password" className='border-b-[1px] border-gray-500 p-2 rounded-md' placeholder='password' />

                    <input type="file" id="file" className='hidden'/>
                    <label htmlFor="file" className='self-center cursor-pointer'> upload image (logo)</label>

                    <button className='bg-indigo-400 rounded-lg text-white h-10'> Sign up</button>
                    {err && <span> Something went wrong</span>}

                </form>
                <p>Already have a account? <a onClick={() => {navigate("/Login")}} className='text-blue-600 underline'> Login</a></p>
            </div>
        </div>
    )
}

export default Register
