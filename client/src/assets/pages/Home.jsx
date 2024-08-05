import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignupClick = () => {
    navigate('/signup')
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <button onClick={handleLoginClick} className='text-purple-700 border border-purple-700  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 my-7 ml-2'>Login</button>
      <button onClick={handleSignupClick} className='text-purple-700 border border-purple-700  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 my-7 ml-2'>SignUp</button>
    </div>
  )
}

export default Home
