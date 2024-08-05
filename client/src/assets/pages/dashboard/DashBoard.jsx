import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import { authContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {

  const {dispatch} = useContext(authContext);
  const navigate = useNavigate();

    const handleLogout=()=>{
        dispatch({type:'LOGOUT'});
        toast.success("logged out")
        navigate('/login');
    }

  return (
    <div>
      Student DashBoard

      <button className='w-full text-white bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default DashBoard
