import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";




const Input = () => {

    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
  
  
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
  

  const handleSend = async () => {

    if (img) {
      const storageRef = ref(storage, uuid());
  
      const uploadTask = uploadBytesResumable(storageRef, img);
  
      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
  
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  
    setText("");
    setImg(null);
  };


  return (
    <div className='w-full flex justify-between p-2 h-[50px] bg-white'>
 
      <input type="text " onChange={(e) => setText(e.target.value)} className='w-[40%]  p-2 rounded-lg '
      placeholder='type something' value={text}/>

      <div className='flex flex-row gap-4 items-center mr-2 space-x-3'>
        
         <input type="file" id="upload_file" onChange={(e) => setImg(e.target.files[0])} className='hidden'/>
         <label htmlFor="upload_file" className='cursor-pointer p-2 hover:bg-slate-300 rounded-[50%]'>  <img src="/image.png" alt="attach" className='h-7 w-7 rounded-lg' htmlFor='upload_file'/></label>
         <button onClick={handleSend} className='rounded-lg bg-violet-700 duration-500 active:bg-violet-400 text-slate-50 px-5 hover:bg-violet-800 h-8 text-sm text-center'>  Send</button>
      </div>
    </div>
  )
}

export default Input
