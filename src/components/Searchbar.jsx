
import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Searchbar = () => {

   const [username, setUsername] = useState("");
   const [user, setUser] = useState(null);
   const [err, setErr] = useState(false);
 
   const { currentUser } = useContext(AuthContext);

   const handleSearch = async () => {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", username)
      );
  
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (err) {
        setErr(true);
      }
    };
    
   const handleKey = (e) => {
      e.code === "Enter" && handleSearch();
    }; 

    const handleSelect = async () => {
      //check whether the group(chats in firestore) exists, if not create
      const combinedId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;
      try {
        const res = await getDoc(doc(db, "chats", combinedId));
  
        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });
  
          //create user chats
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
  
          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      } catch (err) {}
  
      setUser(null);
      setUsername("")
    };

  return (
    <div className='w-full flex gap-2 p-2 flex-col border-b-[1px] border-b-gray-500'>
       <div>
          <input type="text" placeholder='Find a user'
          onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} value={username}
          className='w-full bg-transparent outline-none text-white placeholder-gray-400'/>
       </div>

      { err && <span> user not found</span>}

      { user && (<div onClick={handleSelect} className='w-full p-2 flex items-center gap-2 cursor-pointer text-white hover:bg-violet-900 rounded-lg'>
          <img src={user.photoURL} alt="" className='w-12 h-12 rounded-[50%]'/>
          <div className=''>
              <span>{user.displayName}</span>
          </div>
       </div>
      )}
    </div>
    
  )
}

export default Searchbar
