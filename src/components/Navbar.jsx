import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GraduationCap, Building2, Landmark, Menu, X, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getCurrentUser, logoutUser, setCurrentUser } from '../utils/storage'

export default function Navbar({ showSwitch = true }) {
  const loc = useLocation()
  const nav = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currentUser, setUserState] = useState(getCurrentUser())

  useEffect(() => {
    const handleUpdate = () => {
      setUserState(getCurrentUser())
    }
    window.addEventListener('skillsync_storage_update', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('skillsync_storage_update', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  const isLanding = loc.pathname === '/'
  const isLogin = loc.pathname === '/login'
  const isRoles = loc.pathname === '/roles'
  const isGov = loc.pathname.startsWith('/government')
  const isCompany = loc.pathname.startsWith('/company')
  const isStudent = loc.pathname.startsWith('/student')

  const handleLogout = () => {
    logoutUser()
    nav('/login')
  }

  const handleSwitchRole = (targetRole) => {
    const defaultUsers = {
      student: { role: 'student', email: 'student@example.com', name: 'Rahul Sharma', title: 'B.Tech CS Student', avatar: 'RS' },
      company: { role: 'company', email: 'company@example.com', name: 'ABC Technologies', title: 'Enterprise Recruiter', avatar: 'ABC' },
      government: { role: 'government', email: 'government@example.com', name: 'Govt. of Maharashtra', title: 'Skill Development Directorate', avatar: 'MH' },
    }
    setCurrentUser(defaultUsers[targetRole])
    nav(`/${targetRole}`)
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0B2447] flex items-center justify-center">
            <span className="text-white font-bold text-[13px] tracking-widest">SS</span>
          </div>
          <div className="leading-none">
            <div className="font-bold text-[15px] text-[#0B2447] tracking-tight">SkillSync AI</div>
            <div className="text-[10px] tracking-[0.14em] text-slate-500 font-semibold">GOVTECH • MAHARASHTRA</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {isLanding || isRoles ? (
            <>
              <a href="/#how" className="hover:text-slate-900">How It Works</a>
              <a href="/#stakeholders" className="hover:text-slate-900">For Students</a>
              <a href="/#stakeholders" className="hover:text-slate-900">For Companies</a>
              <a href="/#stakeholders" className="hover:text-slate-900">For Government</a>
            </>
          ) : (
            <>
              {isStudent && (
                <>
                  <Link to="/student" className={loc.pathname==='/student' ? 'text-[#0B2447] border-b-2 border-[#0B2447] pb-1' : 'hover:text-slate-900'}>Dashboard</Link>
                  <a href="/student#skills-section" className="hover:text-slate-900">My Skills</a>
                  <a href="/student#industry-jobs" className="hover:text-slate-900">Jobs</a>
                  <Link to="/student/skill-gap" className={loc.pathname.includes('skill-gap') ? 'text-[#0B2447] border-b-2 border-[#0B2447] pb-1' : 'hover:text-slate-900'}>Skill Gap</Link>
                  <a href="/student#gov-camps" className="hover:text-slate-900">Camps</a>
                  <a href="/student#gov-opportunities" className="hover:text-slate-900">Gov Opportunities</a>
                  <a href="/student#my-applications" className="hover:text-slate-900">Applications</a>
                </>
              )}
              {isCompany && (
                <>
                  <Link to="/company" className={loc.pathname==='/company' ? 'text-[#0B2447] border-b-2 border-[#0B2447] pb-1' : 'hover:text-slate-900'}>Dashboard</Link>
                  <a href="/company#my-jobs" className="hover:text-slate-900">My Jobs</a>
                  <Link to="/company/requirements" className={loc.pathname.includes('requirements') ? 'text-[#0B2447] border-b-2 border-[#0B2447] pb-1' : 'hover:text-slate-900'}>Skill Requirements</Link>
                </>
              )}
              {isGov && (
                <>
                  <Link to="/government" className={loc.pathname==='/government' ? 'text-[#0B2447] border-b-2 border-[#0B2447] pb-1' : 'hover:text-slate-900'}>Dashboard</Link>
                  <a href="/government#skill-camps" className="hover:text-slate-900">Skill Camps</a>
                  <a href="/government#gov-opportunities" className="hover:text-slate-900">Opportunities</a>
                  <Link to="/government/course-gaps" className={loc.pathname.includes('course-gaps') ? 'text-[#0B2447] border-b-2 border-[#0B2447] pb-1' : 'hover:text-slate-900'}>Course Gaps</Link>
                </>
              )}
            </>
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {showSwitch && !isLanding && !isLogin && (
            <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1">
              <button 
                onClick={()=>handleSwitchRole('student')} 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${isStudent ? 'bg-white shadow text-[#0B2447]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <GraduationCap size={14}/>Student
              </button>
              <button 
                onClick={()=>handleSwitchRole('company')} 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${isCompany ? 'bg-white shadow text-[#0B2447]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Building2 size={14}/>Company
              </button>
              <button 
                onClick={()=>handleSwitchRole('government')} 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${isGov ? 'bg-white shadow text-[#0B2447]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Landmark size={14}/>Government
              </button>
            </div>
          )}

          {/* User profile & auth buttons */}
          {currentUser && !isLanding && !isLogin ? (
            <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
                <div className="w-5 h-5 rounded-full bg-[#0B2447] text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.avatar || currentUser.role.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-semibold text-slate-800 max-w-[120px] truncate">
                  {currentUser.name || currentUser.email}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">
                  {currentUser.role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : isLanding ? (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-xs font-semibold text-slate-600 border border-slate-200 px-4 py-2 rounded-full hover:bg-slate-50 transition">
                Sign In
              </Link>
              <Link to="/roles" className="bg-[#0B2447] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#12325f] transition">
                Explore Platform
              </Link>
            </div>
          ) : isLogin ? (
            <Link to="/roles" className="text-xs font-semibold text-slate-600 border border-slate-200 px-4 py-2 rounded-full hover:bg-slate-50">
              Explore All Portals
            </Link>
          ) : (
            <Link to="/login" className="bg-[#0B2447] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-[#12325f]">
              Log In
            </Link>
          )}
        </div>

        <button className="lg:hidden p-2" onClick={()=>setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          {isLanding ? (
            <>
              <a href="/#how" className="block text-sm font-medium">How It Works</a>
              <Link to="/login" className="block border border-slate-200 text-center px-5 py-2.5 rounded-full text-sm font-semibold">Sign In</Link>
              <Link to="/roles" className="block bg-[#0B2447] text-white text-center px-5 py-3 rounded-full text-sm font-semibold">Explore Platform</Link>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2 text-sm font-medium">
                {isStudent && (
                  <>
                    <Link to="/student" onClick={()=>setMobileOpen(false)}>Dashboard</Link>
                    <a href="/student#skills-section" onClick={()=>setMobileOpen(false)}>My Skills</a>
                    <a href="/student#industry-jobs" onClick={()=>setMobileOpen(false)}>Jobs</a>
                    <Link to="/student/skill-gap" onClick={()=>setMobileOpen(false)}>Skill Gap Analysis</Link>
                    <Link to="/student/recommendations" onClick={()=>setMobileOpen(false)}>Recommendations</Link>
                    <a href="/student#my-applications" onClick={()=>setMobileOpen(false)}>My Applications</a>
                  </>
                )}
                {isCompany && (
                  <>
                    <Link to="/company" onClick={()=>setMobileOpen(false)}>Dashboard</Link>
                    <a href="/company#my-jobs" onClick={()=>setMobileOpen(false)}>My Job Postings</a>
                    <Link to="/company/requirements" onClick={()=>setMobileOpen(false)}>Requirements</Link>
                  </>
                )}
                {isGov && (
                  <>
                    <Link to="/government" onClick={()=>setMobileOpen(false)}>Dashboard</Link>
                    <a href="/government#skill-camps" onClick={()=>setMobileOpen(false)}>Skill Camps</a>
                    <a href="/government#gov-opportunities" onClick={()=>setMobileOpen(false)}>Government Opportunities</a>
                    <Link to="/government/course-gaps" onClick={()=>setMobileOpen(false)}>Course Gaps</Link>
                  </>
                )}
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button onClick={()=>{handleSwitchRole('student'); setMobileOpen(false)}} className="flex-1 border rounded-full py-2 text-xs font-semibold">Student</button>
                <button onClick={()=>{handleSwitchRole('company'); setMobileOpen(false)}} className="flex-1 border rounded-full py-2 text-xs font-semibold">Company</button>
                <button onClick={()=>{handleSwitchRole('government'); setMobileOpen(false)}} className="flex-1 border rounded-full py-2 text-xs font-semibold">Gov</button>
              </div>

              {currentUser && (
                <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                  <div className="font-semibold text-slate-700">Logged in as {currentUser.name}</div>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-red-600 font-bold flex items-center gap-1">
                    <LogOut size={14} /> Log Out
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </header>
  )
}
