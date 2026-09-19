import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import RoleSelection from './pages/RoleSelection'
import StudentDashboard from './pages/StudentDashboard'
import SkillGap from './pages/SkillGap'
import CourseRecommendations from './pages/CourseRecommendations'
import CompanyDashboard from './pages/CompanyDashboard'
import CompanyRequirements from './pages/CompanyRequirements'
import GovDashboard from './pages/GovDashboard'
import GovCourseGap from './pages/GovCourseGap'
import ProtectedRoute from './components/ProtectedRoute'
import { initializeStorage } from './utils/storage'

export default function App(){
  useEffect(() => {
    initializeStorage()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/roles" element={<RoleSelection/>}/>

        {/* Student Portal Routes */}
        <Route path="/student" element={
          <ProtectedRoute role="student">
            <StudentDashboard/>
          </ProtectedRoute>
        }/>
        <Route path="/student/skill-gap" element={
          <ProtectedRoute role="student">
            <SkillGap/>
          </ProtectedRoute>
        }/>
        <Route path="/student/recommendations" element={
          <ProtectedRoute role="student">
            <CourseRecommendations/>
          </ProtectedRoute>
        }/>

        {/* Company Portal Routes */}
        <Route path="/company" element={
          <ProtectedRoute role="company">
            <CompanyDashboard/>
          </ProtectedRoute>
        }/>
        <Route path="/company/requirements" element={
          <ProtectedRoute role="company">
            <CompanyRequirements/>
          </ProtectedRoute>
        }/>

        {/* Government Portal Routes */}
        <Route path="/government" element={
          <ProtectedRoute role="government">
            <GovDashboard/>
          </ProtectedRoute>
        }/>
        <Route path="/government/course-gaps" element={
          <ProtectedRoute role="government">
            <GovCourseGap/>
          </ProtectedRoute>
        }/>

        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </BrowserRouter>
  )
}
