import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  const {currentUser} = useContext(AuthContext);

  return (
    <div className='flex items-center h-[50px] p-3  bg-violet-900 justify-between w-full text-white'>
       <span className='font-semibold'> ChatApp</span>
        <div className='gap-3 flex items-center'>

          <img src={currentUser.photoURL} alt="" className='bg-white h-6 w-6 rounded-[50%]'/>
          <span> {currentUser.displayName} </span>
          <button  onClick={() => signOut(auth)}  className='bg-violet-600 hover:bg-violet-700 p-1 text-[15px] rounded-md'> <span className='p-1'>Logout</span></button>

       </div>
    </div>
  )
}

export default Navbar
