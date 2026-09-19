import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { ArrowRight, AlertTriangle, Info, ArrowLeft } from 'lucide-react'
import { skillGaps, radarData } from '../data/mockData'
import { getStudentProfile } from '../utils/storage'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from 'recharts'

function LevelBadge({ level }){
  const map = {
    None: "bg-slate-100 text-slate-600 border-slate-200",
    Beginner: "bg-amber-50 text-amber-700 border-amber-200",
    Intermediate: "bg-blue-50 text-blue-700 border-blue-200",
    Advanced: "bg-violet-50 text-violet-700 border-violet-200",
    Expert: "bg-emerald-50 text-emerald-700 border-emerald-200",
  }
  return <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${map[level] || map.Beginner}`}>{level}</span>
}
function GapBadge({ gap }){
  if(gap==="None") return <span className="px-2 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">None</span>
  if(gap==="High") return <span className="px-2 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">High</span>
  if(gap==="Critical") return <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">Critical</span>
  return <span className="px-2 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">{gap}</span>
}
function PriorityBadge({ p }){
  if(p==="Critical") return <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-600 text-white">Critical</span>
  if(p==="High") return <span className="px-2 py-1 rounded-full text-xs font-bold bg-amber-500 text-white">High</span>
  if(p==="Matched") return <span className="px-2 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">Matched</span>
  return <span className="px-2 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700">{p}</span>
}

export default function SkillGap(){
  const [profile, setProfile] = useState(getStudentProfile())

  useEffect(() => {
    const handleUpdate = () => setProfile(getStudentProfile())
    window.addEventListener('skillsync_storage_update', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('skillsync_storage_update', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar/>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <Link to="/student" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2">
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
            <h1 className="text-[24px] font-extrabold text-[#0B2447]">Your Industry Skill Gap</h1>
            <p className="text-sm text-slate-600">Compare your profile skills with employer standards for {profile.targetRole}.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/student#industry-jobs" className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#0B2447] px-4 py-2.5 rounded-full text-xs font-bold hover:bg-slate-50">
              Analyze Specific Job Gaps
            </Link>
            <Link to="/student/recommendations" className="inline-flex items-center gap-2 bg-[#0B2447] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#12325f]">
              View Recommended Courses <ArrowRight size={16}/>
            </Link>
          </div>
        </div>

        {/* Profile Skills Quick Chip Bar */}
        <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-[#0B2447]">Your Profile Skills ({profile.skills.length}):</span>
            {profile.skills.map(s => (
              <span key={s} className="px-2.5 py-0.5 bg-slate-100 text-slate-800 rounded-full font-medium">
                {s}
              </span>
            ))}
          </div>
          <Link to="/student#skills-section" className="text-blue-600 font-bold hover:underline shrink-0">
            Edit Profile Skills →
          </Link>
        </div>

        <div className="mt-6 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B2447]">Statewide Skill Benchmark • Target Role: {profile.targetRole}</h3>
            <span className="text-xs bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full font-semibold text-slate-600">6 core competencies evaluated</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs font-bold tracking-wide text-slate-500">
                <tr>
                  <th className="text-left px-5 py-3">Skill</th>
                  <th className="text-left px-3 py-3">Your Level</th>
                  <th className="text-left px-3 py-3">Required Level</th>
                  <th className="text-left px-3 py-3">Gap</th>
                  <th className="text-left px-3 py-3">Priority</th>
                  <th className="text-left px-3 py-3">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {skillGaps.slice(0,6).map(r=>(
                  <tr key={r.skill} className="hover:bg-slate-50/60">
                    <td className="px-5 py-3 font-bold text-[#0B2447]">{r.skill}</td>
                    <td className="px-3 py-3"><LevelBadge level={r.yourLevel}/></td>
                    <td className="px-3 py-3"><LevelBadge level={r.required}/></td>
                    <td className="px-3 py-3"><GapBadge gap={r.gap}/></td>
                    <td className="px-3 py-3"><PriorityBadge p={r.priority}/></td>
                    <td className="px-3 py-3">
                      <div className="w-[100px] h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${r.priority==='Matched' ? 'bg-emerald-500' : r.priority==='Critical' ? 'bg-red-500' : r.priority==='High' ? 'bg-amber-500' : 'bg-blue-500'}`} style={{width: r.gap==='None' ? '100%' : r.gap==='High' ? '35%' : r.gap==='Critical' ? '15%' : '55%'}}></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#0B2447]">Your Skills vs Industry Requirements</h3>
            <p className="text-xs text-slate-500">Radar comparison • Higher = stronger. You trail in React, Node, Cloud & APIs.</p>
            <div className="h-[300px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="#e2e8f0"/>
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill:'#475569', fontWeight:600 }}/>
                  <PolarRadiusAxis angle={30} domain={[0,100]} tick={{ fontSize:10}}/>
                  <Radar name="Industry Required" dataKey="required" stroke="#0B2447" fill="#0B2447" fillOpacity={0.15} strokeWidth={2}/>
                  <Radar name="Your Level" dataKey="student" stroke="#2563eb" fill="#2563eb" fillOpacity={0.35} strokeWidth={2}/>
                  <Tooltip/>
                  <Legend wrapperStyle={{fontSize:12}}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm"><AlertTriangle size={16}/> Your biggest gap is React.js</div>
              <p className="mt-2 text-sm text-amber-900 leading-relaxed">
                React.js is required in <span className="font-bold">78%</span> of Full Stack Developer roles in our demo industry dataset. Your current level is <span className="font-bold">Beginner</span> while the target level is <span className="font-bold">Advanced</span>.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-amber-800">
                <span className="px-2 py-1 bg-white border border-amber-200 rounded-full">Gap: High</span>
                <span className="px-2 py-1 bg-red-600 text-white rounded-full">Priority: Critical</span>
              </div>
              <Link to="/student/recommendations" className="mt-4 inline-flex items-center gap-2 bg-[#0B2447] text-white px-4 py-2 rounded-full text-sm font-bold">View Recommended Courses <ArrowRight size={14}/></Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h4 className="text-sm font-bold text-[#0B2447] flex items-center gap-2"><Info size={16} className="text-blue-600"/> How this is calculated</h4>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600 leading-relaxed list-disc pl-4">
                <li>Industry requirement = median level across 186 companies for Full Stack Developer</li>
                <li>Gap = difference between your self-reported level and required level</li>
                <li>Priority weighs gap size × industry demand frequency</li>
                <li>Demo dataset • Maharashtra • No ML, rule-based prototype</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
