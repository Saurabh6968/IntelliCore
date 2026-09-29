import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Profile from './pages/Profile'
import Register from './pages/Register'

import Landing from './pages/Landing'
import Introduction from './pages/Introduction'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ResumeAnalysis from './pages/ResumeAnalysis'
import ResumeResults from './pages/ResumeResults'
import ATSScore from './pages/ATSScore'
import SkillGap from './pages/SkillGap'
import LearningRoadmap from './pages/LearningRoadmap'
import Interview from './pages/Interview'
import Readiness from './pages/Readiness'
import CareerGuidance from './pages/CareerGuidance'

import './App.css'


function AppLayout() {
  const location = useLocation()

  const publicPages = ['/', '/login', '/register', '/introduction', '/profile']

  const isPublicPage = publicPages.includes(location.pathname)

  if (isPublicPage) {
    return (
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/introduction" element={<Introduction />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        

      </Routes>
    )
  }

  return (
    <div className="app">

      <Sidebar />

      <main key={location.pathname} className="main-content">

        <Routes>

          <Route path="/dashboard" element={<Dashboard />} />
           

          <Route path="/resume" element={<ResumeAnalysis />} />

          <Route
            path="/resume-results"
            element={<ResumeResults />}
          />

          <Route path="/ats" element={<ATSScore />} />

          <Route path="/skills" element={<SkillGap />} />

          <Route
            path="/roadmap"
            element={<LearningRoadmap />}
          />

          <Route
            path="/interview"
            element={<Interview />}
          />

          <Route
            path="/readiness"
            element={<Readiness />}
          />

          <Route
            path="/career"
            element={<CareerGuidance />}
          />

        </Routes>

      </main>

    </div>
  )
}


function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App