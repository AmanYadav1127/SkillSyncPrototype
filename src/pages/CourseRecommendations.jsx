import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { Clock, BarChart3, Award, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react'
import { courses } from '../data/mockData'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from 'recharts'

export default function CourseRecommendations(){
  const chartData = [
    { name: 'Current', value: 72, fill: '#cbd5e1' },
    { name: 'Projected', value: 91, fill: '#0B2447' },
  ]
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar/>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div>
          <Link to="/student" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B2447]">Recommended For You</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">Courses selected based on your skill gaps and industry demand.</p>
        </div>

        <div className="mt-5 bg-gradient-to-r from-[#0B2447] to-[#1e4a8a] rounded-2xl p-4 sm:p-5 lg:p-6 text-white flex flex-col lg:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-3 py-1 text-xs font-bold tracking-wide">✨ PERSONALIZED RECOMMENDATION</div>
            <p className="mt-3 text-[15px] font-semibold leading-relaxed">Completing these courses could increase your projected industry readiness from <span className="bg-white text-[#0B2447] px-2 py-0.5 rounded font-extrabold">72%</span> → <span className="bg-emerald-400 text-[#0B2447] px-2 py-0.5 rounded font-extrabold">91%</span>.</p>
            <p className="mt-1 text-xs opacity-80">Based on covering your 4 priority gaps • Demo projection • No ML, rule-based.</p>
          </div>
          <div className="bg-white rounded-xl p-3 w-full lg:w-[260px] h-[140px]">
            <div className="text-xs font-bold text-slate-500 text-center">READINESS PROJECTION</div>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={chartData} barSize={44}>
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="name" tick={{fontSize:11, fontWeight:600}} axisLine={false} tickLine={false}/>
                <YAxis domain={[0,100]} tick={{fontSize:11}} width={30} axisLine={false} tickLine={false}/>
                <Tooltip cursor={{fill:'#f8fafc'}}/>
                <Bar dataKey="value" radius={[8,8,0,0]}>
                  {chartData.map((e,i)=><Cell key={i} fill={e.fill}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {courses.map(c=>(
            <div key={c.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${c.color}`}></span>
                    <span className="text-xs font-bold tracking-widest text-slate-500">{c.skill.toUpperCase()}</span>
                    <span className="text-xs bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full font-bold">{c.relevance}% relevance</span>
                  </div>
                  <h3 className="mt-1.5 text-[16px] font-extrabold text-[#0B2447] leading-tight">{c.title}</h3>
                  <div className="text-xs text-slate-500">{c.provider}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <BarChart3 size={16} className="text-slate-600"/>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full font-medium"><Clock size={12}/>{c.duration}</span>
                <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full font-medium"><Award size={12}/>{c.level}</span>
              </div>

              <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2 text-xs text-blue-900">
                <span className="font-bold">Why this course?</span> {c.reason}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.modules.map(m=>(
                  <span key={m} className="text-[11px] bg-slate-50 border border-slate-200 px-2 py-1 rounded-full font-medium text-slate-600">{m}</span>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={()=>alert(`Demo: Opening ${c.title}`)} className="flex-1 bg-[#0B2447] text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-[#12325f] inline-flex items-center justify-center gap-2">View Course <ArrowRight size={14}/></button>
                <button className="px-4 py-2.5 border border-slate-200 rounded-full text-sm font-semibold hover:bg-slate-50">Syllabus</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-emerald-600"/>
            <div>
              <div className="text-sm font-bold text-[#0B2447]">Ready to start?</div>
              <div className="text-xs text-slate-600">Your updated readiness will reflect in the dashboard after completion (demo).</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/student/skill-gap" className="px-5 py-2.5 border border-slate-200 rounded-full text-sm font-semibold hover:bg-slate-50">Back to Skill Gap</Link>
            <Link to="/student" className="px-5 py-2.5 bg-emerald-600 text-white rounded-full text-sm font-semibold hover:bg-emerald-700">Go to Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
