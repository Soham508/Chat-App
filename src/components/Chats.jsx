import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };


  return (
    <div>
    { Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
      <div key={chat[0]}
      onClick={() => handleSelect(chat[1].userInfo)} 
      className='w-full p-2 flex items-center gap-3 cursor-pointer text-white hover:bg-violet-900 rounded-lg'>
          <img src={chat[1].userInfo.photoURL} alt="" className='w-12 h-12 rounded-[50%]'/>
          <div className=''>
              <span className='font-semibold text-lg'>{chat[1].userInfo.displayName}</span>
              <p className='text-base text-gray-300'>{chat[1].lastMessage?.text}</p>
          </div>
       </div>
      ))}    
    </div>
  )
}

export default Chats
