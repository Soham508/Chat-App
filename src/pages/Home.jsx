import React from 'react';
import Sidebar from '../components/Sidebar';
import Chat from '../components/chat';

const Home = () => {
  return (
    <div className='h-screen bg-indigo-300 items-center justify-center flex'>
       <div className='overflow-hidden border-[1px] rounded-lg h-[80%] w-[65%] flex'>
          <Sidebar/>
          <Chat/>
       </div>
    </div>
  )
}

export default Home
