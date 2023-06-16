import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({message}) => {
   const { currentUser } = useContext(AuthContext);
   const { data } = useContext(ChatContext);
 
   const ref = useRef();
 
   useEffect(() => {
     ref.current?.scrollIntoView({ behavior: "smooth" });
   }, [message]);
 

  return (
    <div className='flex gap-5 w-full' ref={ref}> 

       <div className='flex flex-col text-gray-400 text-sm'>
          <img src={message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL} alt="" 
          className='w-10 h-10 rounded-[50%]' />

          <span>just now</span>
       </div>
       <div className='max-w-[80%] flex flex-col gap-2'>
          <p className='bg-slate-50 p-3 rounded-lg'>{message.text}</p>
          { message.img && <img src={message.img}  className='h-auto w-auto'/>}
       </div>
    </div>
  )
}

export default Message
