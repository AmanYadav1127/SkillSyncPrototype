import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { GraduationCap, Building2, Landmark, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react'
import Navbar from '../components/Navbar'
import { setCurrentUser } from '../utils/storage'

export default function Login() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialRole = searchParams.get('role') || 'student'
  
  const [activeRole, setActiveRole] = useState(
    ['student', 'company', 'government'].includes(initialRole) ? initialRole : 'student'
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)

  // Configure defaults when switching roles
  useEffect(() => {
    if (activeRole === 'student') {
      setEmail('student@example.com')
      setPassword('demo1234')
    } else if (activeRole === 'company') {
      setEmail('company@example.com')
      setPassword('demo1234')
    } else if (activeRole === 'government') {
      setEmail('government@example.com')
      setPassword('demo1234')
    }
  }, [activeRole])

  const handleLogin = (e) => {
    if (e) e.preventDefault()
    
    let user = {
      role: activeRole,
      email: email || `${activeRole}@example.com`,
      loginTime: new Date().toISOString(),
    }

    if (activeRole === 'student') {
      user = {
        ...user,
        name: 'Rahul Sharma',
        title: 'B.Tech CS Student',
        avatar: 'RS',
      }
      setCurrentUser(user)
      navigate('/student')
    } else if (activeRole === 'company') {
      user = {
        ...user,
        name: 'ABC Technologies',
        title: 'Enterprise Recruiter',
        avatar: 'ABC',
      }
      setCurrentUser(user)
      navigate('/company')
    } else if (activeRole === 'government') {
      user = {
        ...user,
        name: 'Govt. of Maharashtra',
        title: 'Skill Development Directorate',
        avatar: 'MH',
      }
      setCurrentUser(user)
      navigate('/government')
    }
  }

  const quickLogin = (role) => {
    setActiveRole(role)
    let user = {
      role,
      email: `${role}@example.com`,
      loginTime: new Date().toISOString(),
    }
    if (role === 'student') {
      user = { ...user, name: 'Rahul Sharma', title: 'B.Tech CS Student', avatar: 'RS' }
      setCurrentUser(user)
      navigate('/student')
    } else if (role === 'company') {
      user = { ...user, name: 'ABC Technologies', title: 'Enterprise Recruiter', avatar: 'ABC' }
      setCurrentUser(user)
      navigate('/company')
    } else if (role === 'government') {
      user = { ...user, name: 'Govt. of Maharashtra', title: 'Skill Development Directorate', avatar: 'MH' }
      setCurrentUser(user)
      navigate('/government')
    }
  }

  const roleMeta = {
    student: {
      title: 'Student Login',
      badge: 'Skill Readiness & Career Hub',
      desc: 'Access your Industry Readiness score, view company jobs, and analyze your skill gaps.',
      color: 'bg-emerald-600',
      textColor: 'text-emerald-700',
      bgLight: 'bg-emerald-50 border-emerald-200',
      icon: GraduationCap,
      defaultEmail: 'student@example.com',
    },
    company: {
      title: 'Company Recruiter Login',
      badge: 'Industry Talent & Hiring',
      desc: 'Post job openings, manage vacancies, review applications, and publish skill requirements.',
      color: 'bg-blue-600',
      textColor: 'text-blue-700',
      bgLight: 'bg-blue-50 border-blue-200',
      icon: Building2,
      defaultEmail: 'company@example.com',
    },
    government: {
      title: 'Government Directorate Login',
      badge: 'Statewide Skill Intelligence',
      desc: 'Publish skill camps, sponsor opportunities, track industry trends, and fund initiatives.',
      color: 'bg-amber-600',
      textColor: 'text-amber-700',
      bgLight: 'bg-amber-50 border-amber-200',
      icon: Landmark,
      defaultEmail: 'government@example.com',
    },
  }

  const currentMeta = roleMeta[activeRole]
  const IconComponent = currentMeta.icon

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <Navbar showSwitch={false} />

      <div className="flex-1 max-w-[1080px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col items-center justify-center">
        {/* Role Selector Tabs */}
        <div className="w-full max-w-[480px] mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm flex items-center gap-1">
            <button
              onClick={() => setActiveRole('student')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition ${
                activeRole === 'student'
                  ? 'bg-[#0B2447] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <GraduationCap size={16} /> Student
            </button>
            <button
              onClick={() => setActiveRole('company')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition ${
                activeRole === 'company'
                  ? 'bg-[#0B2447] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Building2 size={16} /> Company
            </button>
            <button
              onClick={() => setActiveRole('government')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition ${
                activeRole === 'government'
                  ? 'bg-[#0B2447] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Landmark size={16} /> Government
            </button>
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[480px] bg-white border border-slate-200 rounded-3xl p-7 lg:p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl ${currentMeta.color} text-white flex items-center justify-center shadow-sm`}>
              <IconComponent size={24} />
            </div>
            <div>
              <div className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${currentMeta.bgLight} ${currentMeta.textColor}`}>
                {currentMeta.badge}
              </div>
              <h2 className="text-[20px] font-extrabold text-[#0B2447] mt-0.5">{currentMeta.title}</h2>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 leading-relaxed">
            {currentMeta.desc}
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold tracking-wide text-slate-600 mb-1.5">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={currentMeta.defaultEmail}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2447] font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold tracking-wide text-slate-600">
                  PASSWORD
                </label>
                <span className="text-[11px] text-slate-400">Any password accepted</span>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2447] font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded text-[#0B2447] focus:ring-0"
                />
                Remember simulated login
              </label>
              <span className="text-slate-400">Prototype Demo</span>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#0B2447] text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#12325f] transition shadow-sm"
            >
              Sign In to {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)} Portal <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick 1-click test button */}
          <div className="mt-5 pt-5 border-t border-slate-100">
            <div className="text-center text-[11px] font-bold text-slate-400 tracking-wider mb-2.5">
              OR QUICK 1-CLICK DEMO ENTRY
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => quickLogin('student')}
                className="px-2 py-2 text-xs font-bold rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition text-center"
              >
                Student Demo
              </button>
              <button
                type="button"
                onClick={() => quickLogin('company')}
                className="px-2 py-2 text-xs font-bold rounded-xl border border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100 transition text-center"
              >
                Company Demo
              </button>
              <button
                type="button"
                onClick={() => quickLogin('government')}
                className="px-2 py-2 text-xs font-bold rounded-xl border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 transition text-center"
              >
                Gov Demo
              </button>
            </div>
          </div>

          <div className="mt-5 bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2.5">
            <ShieldCheck size={16} className="text-[#0B2447] shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-900">Prototype Note:</span> This is a frontend-only simulation. Session is stored in <code className="bg-slate-200/80 px-1 py-0.5 rounded text-[10px]">localStorage</code> and persists across browser refreshes.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/roles" className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition">
            ← Back to Role Overview & Explorer
          </Link>
        </div>
      </div>
    </div>
  )
}
