import React, { useState } from 'react'
import Chatbot from './ChatBot'
import chatIcon from '../../images/chaticon.jpg'


const Bot = () => {

  const [chatbotOpen,setChatbotOpen] = useState(false)
  const handleChatClick = () =>{
    setChatbotOpen(!chatbotOpen)
  }

  return (
    <div >
     <div className=' w-16 h-16 rounded-full fixed bottom-10 right-5 shadow-md shadow-purple-500 z-40 bg-purple-950 cursor-pointer m-2 md:w-20 md:h-20' onClick={handleChatClick}>
            <img src={chatIcon} alt=""  className='w-full h-full rounded-full'/>
    </div>
    {chatbotOpen ? <Chatbot /> : ""}
    </div>
  )
}

export default Bot
