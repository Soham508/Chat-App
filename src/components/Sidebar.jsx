import React from 'react'
import Navbar from './Navbar'
import Searchbar from './Searchbar'
import Chats from './Chats'

const Sidebar = () => {
  return (
    <div className='w-[30%] flex bg-violet-800 flex-col'>
      <Navbar/>
      <Searchbar/>
      <Chats/>
    </div>
  )
}

export default Sidebar
