import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashBoard from '../assets/pages/dashboard/DashBoard'
import ProtectedRoutes from './ProtectedRoutes'
import Signup from '../assets/pages/Signup'
import Admin from '../assets/pages/Admin'
import Mentor from '../assets/pages/Mentor'
import Recruitor from '../assets/pages/Recruitor'
import Home from '../assets/pages/Home'
import Login from '../assets/pages/Login'
import AtsScanner from '../assets/pages/AtsScanner'
import PlayLists from '../assets/pages/youtube/PlayLists'
import PlaylistContent from '../assets/pages/youtube/PlayListContent'
import InterviewPrep from '../assets/pages/InterviewPrep'
import PlacementResources from '../assets/pages/PlacementResources'
import JobSearch from '../assets/pages/JobSearch'
import AddJob from '../assets/pages/AddJobForm'
import Lobby from '../assets/pages/mockinterview/Lobby'
import Room from '../assets/pages/mockinterview/Room'
import LandingPage from '../assets/pages/landing/Landingpage'
import AptitudeTest from '../assets/pages/mockinterview/AptitudeTest'
import Dashboard from '../assets/pages/Dashboard'


const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/student' element={<ProtectedRoutes allowedRoles={["student"]}><DashBoard/></ProtectedRoutes>}/>
        <Route path='/admin' element={<ProtectedRoutes allowedRoles={["admin"]}><Admin/></ProtectedRoutes>}/>
        <Route path='/mentor' element={<ProtectedRoutes allowedRoles={["mentor"]}><Mentor/></ProtectedRoutes>}/>
        <Route path='/recruitor' element={<ProtectedRoutes allowedRoles={["recruitor"]}><Recruitor/></ProtectedRoutes>}/>
        <Route path="/ats" element={<AtsScanner />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/room" element={<Lobby />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/resources" element={<PlacementResources />} />
          <Route path="/jobs" element={<JobSearch />} />
          <Route path="/playlist" element={<PlayLists />} />
          <Route path="/playlist/:id" element={<PlaylistContent />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/AptitudeTest" element={<AptitudeTest />} />

    </Routes>
  )
}

export default Routers
