import React, {useContext} from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from "../context/ChatContext";
import person from "../img/person.png";
import video from "../img/video.png";
import dots from "../img/dots.jpg"

const chat = () => {

  const { data } = useContext(ChatContext);

  return (
    <div className='flex w-[70%] flex-col'>
       <div className='w-full h-[50px]  bg-violet-600 flex items-center justify-between px-5 text-slate-100'>
          <div className='flex cursor-pointer items-center space-x-2'>
           <img src={data.user.photoURL} alt="" className='h-9 w-9 rounded-[50%]'/>
 
           <span>{data.user?.displayName}</span>
         </div>
         <div className='flex gap-2 space-x-2 items-center justify-center max-h-10'>
            <img src={video} alt="" className='h-10 object-center object-cover w-10 rounded-[50%] cursor-pointer'/>
            <img src={person} alt="" className='h-10 w-10 rounded-[50%] cursor-pointer'/>
            <div className='flex flex-col p-2  items-center gap-[6px] cursor-pointer'>
              <div className='bg-slate-300 h-[5px] w-[5px] rounded-[50%]'></div>
              <div className='bg-slate-300 h-[5px] w-[5px] rounded-[50%]'></div>
              <div className='bg-slate-300 h-[5px] w-[5px] rounded-[50%]'></div>
            </div>
         </div>

       </div>
       <Messages/>
       <Input/>
    </div>
  )
}

export default chat
