import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Toast from '../components/Toast'
import { Plus, Trash2, Save, Info, ArrowLeft } from 'lucide-react'

const levels = ["Beginner","Elementary","Intermediate","Advanced","Expert"]
const importances = ["Low","Medium","High","Critical"]

export default function CompanyRequirements(){
  const [skills, setSkills] = useState([
    { skill: "React.js", level: "Advanced", importance: "Critical" },
    { skill: "Node.js", level: "Intermediate", importance: "High" },
    { skill: "PostgreSQL", level: "Intermediate", importance: "High" },
    { skill: "Docker", level: "Beginner", importance: "Medium" },
    { skill: "AWS", level: "Beginner", importance: "Medium" },
  ])
  const [role, setRole] = useState("Full Stack Developer")
  const [toast, setToast] = useState("")
  const [newSkill, setNewSkill] = useState("")

  const update = (i, field, val) => {
    const copy=[...skills]; copy[i][field]=val; setSkills(copy)
  }
  const add = () => {
    if(!newSkill.trim()) return
    setSkills([...skills, { skill: newSkill.trim(), level:"Beginner", importance:"Medium"}])
    setNewSkill("")
  }
  const remove = (i) => setSkills(skills.filter((_,idx)=>idx!==i))

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar/>
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div>
          <Link to="/company" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B2447]">Define Skill Requirements</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">Tell the platform what skills your company needs.</p>
        </div>

        <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <label className="text-xs font-bold tracking-widest text-slate-500">JOB ROLE</label>
          <select value={role} onChange={e=>setRole(e.target.value)} className="mt-2 w-full max-w-[320px] border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold bg-white">
            <option>Full Stack Developer</option>
            <option>Data Analyst</option>
            <option>Cloud Engineer</option>
            <option>Cybersecurity Analyst</option>
          </select>

          <div className="mt-6 space-y-3">
            {skills.map((s, i)=>(
              <div key={i} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-[140px]">
                  <div className="text-sm font-bold text-[#0B2447]">{s.skill}</div>
                  <div className="text-xs text-slate-500">Skill #{i+1}</div>
                </div>

                <div className="flex flex-wrap items-center gap-3 flex-1">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold tracking-wide text-slate-500">PROFICIENCY</label>
                    <select value={s.level} onChange={e=>update(i,'level',e.target.value)} className="border border-slate-200 rounded-lg px-2.5 py-2 text-sm bg-white min-w-[150px] font-medium">
                      {levels.map(l=><option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold tracking-wide text-slate-500">IMPORTANCE</label>
                    <select value={s.importance} onChange={e=>update(i,'importance',e.target.value)} className="border border-slate-200 rounded-lg px-2.5 py-2 text-sm bg-white min-w-[130px] font-medium">
                      {importances.map(im=><option key={im}>{im}</option>)}
                    </select>
                  </div>
                </div>

                <button onClick={()=>remove(i)} className="self-start sm:self-center p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={16}/>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input value={newSkill} onChange={e=>setNewSkill(e.target.value)} placeholder="Add skill e.g. Kubernetes" className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <button onClick={add} className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50"><Plus size={16}/> Add Skill</button>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button onClick={()=>setToast("Skill requirements updated successfully.")} className="inline-flex items-center gap-2 bg-[#0B2447] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#12325f]"><Save size={16}/> Save Requirements</button>
            <span className="text-xs text-slate-500 flex items-center gap-1.5"><Info size={14}/> Updated requirements will contribute to aggregated industry skill intelligence.</span>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 leading-relaxed">
          <span className="font-bold">How this helps:</span> Your inputs are aggregated anonymously with 186 companies to compute statewide demand. Students see “Industry requires React Advanced” because companies like yours said so.
        </div>
      </div>
      <Toast message={toast} onClose={()=>setToast("")}/>
    </div>
  )
}
