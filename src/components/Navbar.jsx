import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  GraduationCap, Building2, Landmark, Menu, X, LogOut, 
  LayoutDashboard, Briefcase, Award, Sparkles, BookOpen, 
  FileText, CheckCircle2, ChevronRight, Layers, Users
} from 'lucide-react'
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

  // Auto-close mobile menu on route or hash change
  useEffect(() => {
    setMobileOpen(false)
  }, [loc.pathname, loc.hash])

  // Accessibility: Close on Escape key & manage body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all duration-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#0B2447] to-[#19376D] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            <span className="text-white font-extrabold text-[12px] sm:text-[13px] tracking-widest">SS</span>
          </div>
          <div className="leading-tight">
            <div className="font-extrabold text-[14px] sm:text-[15px] text-[#0B2447] tracking-tight group-hover:text-blue-700 transition">
              SkillSync AI
            </div>
            <div className="hidden xs:block text-[9px] sm:text-[10px] tracking-[0.14em] text-slate-500 font-semibold uppercase">
              GOVTECH • MAHARASHTRA
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium text-slate-600">
          {isLanding || isRoles ? (
            <>
              <a href="/#how" className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition whitespace-nowrap">
                How It Works
              </a>
              <a href="/#stakeholders" className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition whitespace-nowrap">
                For Students
              </a>
              <a href="/#stakeholders" className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition whitespace-nowrap">
                For Companies
              </a>
              <a href="/#stakeholders" className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition whitespace-nowrap">
                For Government
              </a>
            </>
          ) : (
            <>
              {isStudent && (
                <>
                  <Link 
                    to="/student" 
                    className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition ${loc.pathname === '/student' && !loc.hash ? 'text-[#0B2447] font-bold bg-slate-100' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    Dashboard
                  </Link>
                  <a 
                    href="/student#skills-section" 
                    className="px-2.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition whitespace-nowrap"
                  >
                    My Skills
                  </a>
                  <a 
                    href="/student#industry-jobs" 
                    className="px-2.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition whitespace-nowrap"
                  >
                    Jobs
                  </a>
                  <Link 
                    to="/student/skill-gap" 
                    className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition ${loc.pathname.includes('skill-gap') ? 'text-[#0B2447] font-bold bg-slate-100' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    Skill Gap
                  </Link>
                  <Link 
                    to="/student/recommendations" 
                    className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition ${loc.pathname.includes('recommendations') ? 'text-[#0B2447] font-bold bg-slate-100' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    Recommendations
                  </Link>
                  <a 
                    href="/student#gov-camps" 
                    className="px-2.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition whitespace-nowrap"
                  >
                    Camps
                  </a>
                  <a 
                    href="/student#gov-opportunities" 
                    className="px-2.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition whitespace-nowrap"
                  >
                    Gov Opps
                  </a>
                  <a 
                    href="/student#my-applications" 
                    className="px-2.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition whitespace-nowrap"
                  >
                    Applications
                  </a>
                </>
              )}
              {isCompany && (
                <>
                  <Link 
                    to="/company" 
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${loc.pathname === '/company' && !loc.hash ? 'text-[#0B2447] font-bold bg-slate-100' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    Dashboard
                  </Link>
                  <a 
                    href="/company#my-jobs" 
                    className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition whitespace-nowrap"
                  >
                    My Jobs
                  </a>
                  <Link 
                    to="/company/requirements" 
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${loc.pathname.includes('requirements') ? 'text-[#0B2447] font-bold bg-slate-100' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    Skill Requirements
                  </Link>
                </>
              )}
              {isGov && (
                <>
                  <Link 
                    to="/government" 
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${loc.pathname === '/government' && !loc.hash ? 'text-[#0B2447] font-bold bg-slate-100' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    Dashboard
                  </Link>
                  <a 
                    href="/government#skill-camps" 
                    className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition whitespace-nowrap"
                  >
                    Skill Camps
                  </a>
                  <a 
                    href="/government#gov-opportunities" 
                    className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition whitespace-nowrap"
                  >
                    Opportunities
                  </a>
                  <Link 
                    to="/government/course-gaps" 
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${loc.pathname.includes('course-gaps') ? 'text-[#0B2447] font-bold bg-slate-100' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    Course Gaps
                  </Link>
                </>
              )}
            </>
          )}
        </nav>

        {/* Desktop Controls (Role Switcher & User Profile) */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
          {showSwitch && !isLanding && !isLogin && (
            <div className="flex items-center gap-0.5 bg-slate-100/90 p-1 rounded-full border border-slate-200/80">
              <button 
                onClick={() => handleSwitchRole('student')} 
                title="Switch to Student Portal"
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1 rounded-full text-xs font-semibold transition ${isStudent ? 'bg-white shadow-xs text-[#0B2447]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <GraduationCap size={14} className="shrink-0" />
                <span className="hidden xl:inline">Student</span>
              </button>
              <button 
                onClick={() => handleSwitchRole('company')} 
                title="Switch to Company Portal"
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1 rounded-full text-xs font-semibold transition ${isCompany ? 'bg-white shadow-xs text-[#0B2447]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Building2 size={14} className="shrink-0" />
                <span className="hidden xl:inline">Company</span>
              </button>
              <button 
                onClick={() => handleSwitchRole('government')} 
                title="Switch to Government Portal"
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1 rounded-full text-xs font-semibold transition ${isGov ? 'bg-white shadow-xs text-[#0B2447]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Landmark size={14} className="shrink-0" />
                <span className="hidden xl:inline">Government</span>
              </button>
            </div>
          )}

          {/* User profile & auth buttons */}
          {currentUser && !isLanding && !isLogin ? (
            <div className="flex items-center gap-1.5 sm:gap-2 pl-1 border-l border-slate-200">
              <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-full">
                <div className="w-5 h-5 rounded-full bg-[#0B2447] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  {currentUser.avatar || currentUser.role?.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-semibold text-slate-800 max-w-[80px] xl:max-w-[120px] truncate">
                  {currentUser.name || currentUser.email}
                </span>
                <span className="hidden sm:inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 uppercase tracking-wider">
                  {currentUser.role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                aria-label="Logout"
                className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : isLanding ? (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-xs font-semibold text-slate-600 border border-slate-200 px-3.5 py-1.5 rounded-full hover:bg-slate-50 transition">
                Sign In
              </Link>
              <Link to="/roles" className="bg-[#0B2447] text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-[#12325f] transition shadow-xs">
                Explore Platform
              </Link>
            </div>
          ) : isLogin ? (
            <Link to="/roles" className="text-xs font-semibold text-slate-600 border border-slate-200 px-3.5 py-1.5 rounded-full hover:bg-slate-50 transition">
              Explore All Portals
            </Link>
          ) : (
            <Link to="/login" className="bg-[#0B2447] text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#12325f] transition">
              Log In
            </Link>
          )}
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {currentUser && !isLanding && !isLogin && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-700">
              <div className="w-5 h-5 rounded-full bg-[#0B2447] text-white flex items-center justify-center text-[10px] font-bold">
                {currentUser.avatar || currentUser.role?.charAt(0).toUpperCase()}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 hidden xs:inline">
                {currentUser.role}
              </span>
            </div>
          )}

          <button 
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition active:scale-95 focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 top-16 bg-slate-900/40 backdrop-blur-xs z-30 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer Container */}
      {mobileOpen && (
        <div className="fixed top-16 inset-x-0 z-40 bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-64px)] overflow-y-auto lg:hidden px-4 py-5 space-y-4">
          {/* Switch Role on Mobile */}
          {showSwitch && !isLanding && !isLogin && (
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-2">
                Switch Portal Role
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => { handleSwitchRole('student'); setMobileOpen(false); }} 
                  className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl text-xs font-bold border transition ${isStudent ? 'bg-[#0B2447] text-white border-[#0B2447] shadow-xs' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'}`}
                >
                  <GraduationCap size={15} /> Student
                </button>
                <button 
                  onClick={() => { handleSwitchRole('company'); setMobileOpen(false); }} 
                  className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl text-xs font-bold border transition ${isCompany ? 'bg-[#0B2447] text-white border-[#0B2447] shadow-xs' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'}`}
                >
                  <Building2 size={15} /> Company
                </button>
                <button 
                  onClick={() => { handleSwitchRole('government'); setMobileOpen(false); }} 
                  className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl text-xs font-bold border transition ${isGov ? 'bg-[#0B2447] text-white border-[#0B2447] shadow-xs' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'}`}
                >
                  <Landmark size={15} /> Gov
                </button>
              </div>
            </div>
          )}

          {/* Navigation Links on Mobile */}
          <div className="space-y-1">
            {isLanding || isRoles ? (
              <div className="space-y-2">
                <a 
                  href="/#how" 
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <span>How It Works</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </a>
                <a 
                  href="/#stakeholders" 
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <span>Stakeholders</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </a>
                <div className="pt-2 flex flex-col gap-2">
                  <Link 
                    to="/login" 
                    onClick={() => setMobileOpen(false)}
                    className="w-full border border-slate-200 text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/roles" 
                    onClick={() => setMobileOpen(false)}
                    className="w-full bg-[#0B2447] text-white text-center px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#12325f] transition shadow-xs"
                  >
                    Explore Platform
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1 text-sm font-medium">
                {isStudent && (
                  <>
                    <Link 
                      to="/student" 
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition ${loc.pathname === '/student' && !loc.hash ? 'bg-blue-50 text-[#0B2447] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <LayoutDashboard size={16} className="text-[#0B2447]" />
                        <span>Dashboard</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </Link>
                    <a 
                      href="/student#skills-section" 
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <Award size={16} className="text-slate-500" />
                        <span>My Skills</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </a>
                    <a 
                      href="/student#industry-jobs" 
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <Briefcase size={16} className="text-slate-500" />
                        <span>Industry Jobs</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </a>
                    <Link 
                      to="/student/skill-gap" 
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition ${loc.pathname.includes('skill-gap') ? 'bg-blue-50 text-[#0B2447] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles size={16} className="text-[#0B2447]" />
                        <span>Skill Gap Analysis</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </Link>
                    <Link 
                      to="/student/recommendations" 
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition ${loc.pathname.includes('recommendations') ? 'bg-blue-50 text-[#0B2447] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <BookOpen size={16} className="text-[#0B2447]" />
                        <span>Course Recommendations</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </Link>
                    <a 
                      href="/student#gov-camps" 
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <Users size={16} className="text-slate-500" />
                        <span>Government Skill Camps</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </a>
                    <a 
                      href="/student#gov-opportunities" 
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <Landmark size={16} className="text-slate-500" />
                        <span>Gov Opportunities</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </a>
                    <a 
                      href="/student#my-applications" 
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText size={16} className="text-slate-500" />
                        <span>My Applications</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </a>
                  </>
                )}

                {isCompany && (
                  <>
                    <Link 
                      to="/company" 
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition ${loc.pathname === '/company' && !loc.hash ? 'bg-blue-50 text-[#0B2447] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <LayoutDashboard size={16} className="text-[#0B2447]" />
                        <span>Dashboard</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </Link>
                    <a 
                      href="/company#my-jobs" 
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <Briefcase size={16} className="text-slate-500" />
                        <span>My Job Postings</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </a>
                    <Link 
                      to="/company/requirements" 
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition ${loc.pathname.includes('requirements') ? 'bg-blue-50 text-[#0B2447] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Layers size={16} className="text-[#0B2447]" />
                        <span>Skill Requirements</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </Link>
                  </>
                )}

                {isGov && (
                  <>
                    <Link 
                      to="/government" 
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition ${loc.pathname === '/government' && !loc.hash ? 'bg-blue-50 text-[#0B2447] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <LayoutDashboard size={16} className="text-[#0B2447]" />
                        <span>Dashboard</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </Link>
                    <a 
                      href="/government#skill-camps" 
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <Users size={16} className="text-slate-500" />
                        <span>Skill Camps</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </a>
                    <a 
                      href="/government#gov-opportunities" 
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <Landmark size={16} className="text-slate-500" />
                        <span>Government Opportunities</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </a>
                    <Link 
                      to="/government/course-gaps" 
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition ${loc.pathname.includes('course-gaps') ? 'bg-blue-50 text-[#0B2447] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Layers size={16} className="text-[#0B2447]" />
                        <span>Course Gaps</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* User Profile Footer Card in Mobile Menu */}
          {currentUser && !isLanding && !isLogin && (
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0B2447] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {currentUser.avatar || currentUser.role?.charAt(0).toUpperCase()}
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-bold text-slate-800 truncate max-w-[170px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">
                    {currentUser.role} • {currentUser.title || currentUser.email}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => { handleLogout(); setMobileOpen(false); }} 
                className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg transition"
              >
                <LogOut size={14} /> Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
