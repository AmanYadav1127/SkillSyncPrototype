import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { courseGapTable, generativeAIDetail } from '../data/mockData'
import { X, Sparkles, FileText, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react'
import Toast from '../components/Toast'

export default function GovCourseGap(){
  const [selected, setSelected] = useState(null)
  const [showProposal, setShowProposal] = useState(false)
  const [toast, setToast] = useState("")

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar/>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div>
          <Link to="/government" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B2447]">Industry Demand vs Training Coverage</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">Identify where existing skill-development programs are not meeting industry demand.</p>
        </div>

        <div className="mt-6 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h3 className="text-sm font-bold text-[#0B2447]">Skill Gap Matrix • Maharashtra</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs font-bold tracking-wide text-slate-500">
                <tr>
                  <th className="text-left px-5 py-3">Skill</th>
                  <th className="text-center px-3 py-3">Industry Demand</th>
                  <th className="text-center px-3 py-3">Course Coverage</th>
                  <th className="text-center px-3 py-3">Gap</th>
                  <th className="text-left px-3 py-3">Recommendation</th>
                  <th className="text-center px-3 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courseGapTable.map(r=>(
                  <tr key={r.skill} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-bold text-[#0B2447]">{r.skill}</td>
                    <td className="px-3 py-3 text-center"><span className="bg-slate-900 text-white px-2 py-1 rounded-full text-xs font-bold">{r.demand}%</span></td>
                    <td className="px-3 py-3 text-center"><span className={`px-2 py-1 rounded-full text-xs font-bold border ${r.coverage < 30 ? 'bg-red-50 text-red-700 border-red-200' : r.coverage < 50 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>{r.coverage}%</span></td>
                    <td className="px-3 py-3 text-center"><span className={`px-2 py-1 rounded-full text-xs font-bold ${r.gap >= 60 ? 'bg-red-600 text-white' : r.gap >= 35 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'}`}>{r.gap}%</span></td>
                    <td className="px-3 py-3"><span className="text-xs font-semibold text-[#0B2447] bg-blue-50 border border-blue-200 px-2 py-1 rounded-full">{r.recommendation}</span></td>
                    <td className="px-3 py-3 text-center"><button onClick={()=> r.skill==="Generative AI" && setSelected(r.skill)} className="text-xs font-bold text-blue-600 hover:text-blue-800 border border-blue-200 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100">View Analysis</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-amber-50 border-t border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle size={14} className="mt-0.5 text-amber-600"/> Click “View Analysis” on <span className="font-bold">Generative AI</span> to see the SIH demo modal & course proposal generation.
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={()=>setSelected(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[560px] max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-[16px] font-extrabold text-[#0B2447]">Generative AI — Skill Gap Analysis</h3>
              <button onClick={()=>setSelected(null)} className="p-1.5 hover:bg-slate-100 rounded-full"><X size={18}/></button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label:"Industry Demand", value: generativeAIDetail.demand+"%", color:"bg-slate-900 text-white" },
                  { label:"Course Coverage", value: generativeAIDetail.coverage+"%", color:"bg-red-50 text-red-700 border border-red-200" },
                  { label:"Skill Gap", value: generativeAIDetail.gap+"%", color:"bg-red-600 text-white" },
                ].map(c=>(
                  <div key={c.label} className="text-center">
                    <div className={`mx-auto inline-flex px-3 py-1.5 rounded-full text-sm font-extrabold ${c.color}`}>{c.value}</div>
                    <div className="text-[11px] font-bold tracking-wide text-slate-500 mt-1.5">{c.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                  <div className="text-xs font-bold tracking-wide text-slate-500">STUDENT PROFICIENCY</div>
                  <div className="text-lg font-extrabold text-[#0B2447]">{generativeAIDetail.proficiency}%</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                  <div className="text-xs font-bold tracking-wide text-red-700">STATUS</div>
                  <div className="text-sm font-extrabold text-red-600 tracking-widest">{generativeAIDetail.status}</div>
                </div>
              </div>

              <div className="bg-[#0B2447] rounded-xl p-5 text-white">
                <div className="text-xs font-bold tracking-widest opacity-70">RECOMMENDED GOVERNMENT ACTION</div>
                <p className="mt-2 text-sm font-semibold leading-relaxed">Introduce a state-level Generative AI skill-development program.</p>
                <div className="mt-3">
                  <div className="text-xs font-bold opacity-70">RECOMMENDED MODULES</div>
                  <ol className="mt-2 space-y-1 text-sm">
                    {generativeAIDetail.modules.map((m,i)=><li key={m} className="flex gap-2"><span className="opacity-60">{i+1}.</span><span className="font-medium">{m}</span></li>)}
                  </ol>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/10 rounded-lg px-3 py-2"><div className="opacity-70">Duration</div><div className="font-bold text-sm">{generativeAIDetail.duration}</div></div>
                  <div className="bg-white/10 rounded-lg px-3 py-2"><div className="opacity-70">Target</div><div className="font-medium leading-tight">{generativeAIDetail.target}</div></div>
                </div>
              </div>

              <button onClick={()=>setShowProposal(true)} className="w-full bg-[#0B2447] text-white py-3 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 hover:bg-[#12325f]">
                <Sparkles size={16}/> Generate Course Proposal
              </button>
              <p className="text-center text-xs text-slate-500">Frontend simulation • No backend generation</p>
            </div>
          </div>
        </div>
      )}

      {/* Proposal preview */}
      {showProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={()=>setShowProposal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[560px]">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-[16px] font-extrabold text-[#0B2447] flex items-center gap-2"><FileText size={18} className="text-blue-600"/> Proposed Skill Development Program</h3>
              <button onClick={()=>setShowProposal(false)} className="p-1.5 hover:bg-slate-100 rounded-full"><X size={18}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gradient-to-br from-[#0B2447] to-[#1e4a8a] rounded-xl p-5 text-white">
                <div className="text-lg font-extrabold">Generative AI & AI Agents</div>
                <div className="text-xs opacity-80">Maharashtra State Skill Development Initiative • Demo Proposal</div>
              </div>

              <div>
                <div className="text-xs font-bold tracking-widest text-slate-500">OBJECTIVE</div>
                <p className="text-sm text-slate-700 mt-1">Prepare students for emerging AI-enabled software roles.</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center"><div className="text-xs font-bold text-slate-500">Industry Demand</div><div className="text-sm font-extrabold text-[#0B2447]">89%</div></div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center"><div className="text-xs font-bold text-slate-500">Training Gap</div><div className="text-sm font-extrabold text-red-600">71%</div></div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center"><div className="text-xs font-bold text-slate-500">Duration</div><div className="text-sm font-extrabold text-[#0B2447]">8 Weeks</div></div>
              </div>

              <div>
                <div className="text-xs font-bold tracking-widest text-slate-500">MODULES</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {generativeAIDetail.modules.map(m=><span key={m} className="px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-semibold text-blue-800">{m}</span>)}
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 mt-0.5"/>
                <div>
                  <div className="text-xs font-bold text-emerald-800">EXPECTED OUTCOME</div>
                  <p className="text-xs text-emerald-900 leading-relaxed">Improved industry readiness for emerging AI roles. Covers RAG, AI Agents & Responsible AI.</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={()=>{ setShowProposal(false); setSelected(null); setToast("Course proposal generated & shared with admin (demo).")}} className="flex-1 bg-emerald-600 text-white py-2.5 rounded-full text-sm font-bold hover:bg-emerald-700">Confirm & Share Proposal</button>
                <button onClick={()=>setShowProposal(false)} className="px-5 py-2.5 border border-slate-200 rounded-full text-sm font-semibold hover:bg-slate-50">Close</button>
              </div>
              <p className="text-center text-[11px] text-slate-400">This is only a frontend simulation. No PDF is actually generated.</p>
            </div>
          </div>
        </div>
      )}

      <Toast message={toast} onClose={()=>setToast("")}/>
    </div>
  )
}
