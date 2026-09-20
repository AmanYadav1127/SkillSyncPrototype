import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Award, ArrowRight, AlertTriangle, 
  CheckCircle2, Plus, X, Briefcase, MapPin, IndianRupee, Calendar, 
  Sparkles
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Toast from '../components/Toast'
import { 
  getStudentProfile, addStudentSkill, removeStudentSkill, 
  getJobs, getCamps, getGovOpportunities, 
  getStudentApplications, applyToOpportunity, isItemApplied, 
  getCampRegistrations, registerForCamp, isCampRegistered, 
  calculateSkillGap 
} from '../utils/storage'
import { topGaps } from '../data/mockData'

function CircularProgress({ value }){
  const r = 54, c = 2 * Math.PI * r, offset = c - (value / 100) * c
  return (
    <div className="relative w-[132px] h-[132px]">
      <svg width="132" height="132" className="-rotate-90">
        <circle cx="66" cy="66" r={r} stroke="#e2e8f0" strokeWidth="10" fill="none"/>
        <circle cx="66" cy="66" r={r} stroke="#0B2447" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} className="transition-all duration-700"/>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[28px] font-extrabold text-[#0B2447] leading-none">{value}<span className="text-sm font-bold">/100</span></div>
        <div className="text-[10px] font-bold tracking-widest text-slate-500 mt-1">READINESS</div>
      </div>
    </div>
  )
}

export default function StudentDashboard(){
  const [profile, setProfile] = useState(getStudentProfile())
  const [jobs, setJobs] = useState(getJobs())
  const [camps, setCamps] = useState(getCamps())
  const [govOpportunities, setGovOpportunities] = useState(getGovOpportunities())
  const [applications, setApplications] = useState(getStudentApplications())
  const [campRegistrations, setCampRegistrations] = useState(getCampRegistrations())
  const [toast, setToast] = useState('')

  // New Skill input state
  const [newSkillInput, setNewSkillInput] = useState('')

  // Modals state
  const [analyzingJob, setAnalyzingJob] = useState(null)
  const [viewingJob, setViewingJob] = useState(null)
  const [viewingCamp, setViewingCamp] = useState(null)
  const [viewingOpp, setViewingOpp] = useState(null)
  const [applicationTab, setApplicationTab] = useState('jobs') // 'jobs' | 'gov' | 'camps'

  // Sync with storage events
  useEffect(() => {
    const handleUpdate = () => {
      setProfile(getStudentProfile())
      setJobs(getJobs())
      setCamps(getCamps())
      setGovOpportunities(getGovOpportunities())
      setApplications(getStudentApplications())
      setCampRegistrations(getCampRegistrations())
    }
    window.addEventListener('skillsync_storage_update', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('skillsync_storage_update', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  // Skill management
  const handleAddSkill = (e) => {
    if (e) e.preventDefault()
    if (!newSkillInput.trim()) return
    const updated = addStudentSkill(newSkillInput.trim())
    setProfile(updated)
    setNewSkillInput('')
    setToast(`Added skill: "${newSkillInput.trim()}"`)
  }

  const handleRemoveSkill = (skill) => {
    const updated = removeStudentSkill(skill)
    setProfile(updated)
    setToast(`Removed skill: "${skill}"`)
  }

  // Application / Registration handlers
  const handleApplyJob = (job) => {
    applyToOpportunity(job, 'job')
    setToast(`Successfully applied to ${job.title} at ${job.company}!`)
  }

  const handleApplyOpp = (opp) => {
    applyToOpportunity(opp, 'government_opportunity')
    setToast(`Application submitted for ${opp.title}!`)
  }

  const handleRegisterCamp = (camp) => {
    registerForCamp(camp)
    setToast(`Registered for ${camp.name}! Confirmation stored.`)
  }

  // Compute job matches dynamically for all jobs based on student's current skills
  const jobsWithMatch = jobs.map(job => {
    const analysis = calculateSkillGap(profile.skills, job.requiredSkills || [])
    return {
      ...job,
      analysis,
      matchPercentage: analysis.matchPercentage,
    }
  })

  // Recommended jobs sorted by match percentage descending
  const recommendedJobs = [...jobsWithMatch].sort((a, b) => b.matchPercentage - a.matchPercentage)

  // Quick action inside skill gap modal: Add missing skill directly to student profile
  const handleAddMissingToProfile = (missingSkill) => {
    const updated = addStudentSkill(missingSkill)
    setProfile(updated)
    setToast(`Added "${missingSkill}" to your skills profile!`)
    // re-calculate current modal view
    if (analyzingJob) {
      const updatedSkills = [...profile.skills, missingSkill]
      const newAnalysis = calculateSkillGap(updatedSkills, analyzingJob.requiredSkills || [])
      setAnalyzingJob({ ...analyzingJob, analysis: newAnalysis })
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0B2447]">
              Good morning, {profile.name} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Let’s get you industry-ready. <span className="font-semibold text-slate-800">{profile.education}</span> • Target: <span className="text-[#0B2447] font-bold">{profile.targetRole}</span>
            </p>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
            <a 
              href="#industry-jobs"
              className="inline-flex items-center justify-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2.5 rounded-full text-xs font-bold hover:bg-blue-100 transition flex-1 sm:flex-none"
            >
              <Briefcase size={14}/> Explore Jobs ({jobs.length})
            </a>
            <Link 
              to="/student/skill-gap" 
              className="inline-flex items-center justify-center gap-2 bg-[#0B2447] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#12325f] shadow-xs transition flex-1 sm:flex-none"
            >
              Full Skill Gap Analysis <ArrowRight size={16}/>
            </Link>
          </div>
        </div>

        {/* 1. Student Profile & Skills Management Section */}
        <div id="skills-section" className="mt-6 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-[#0B2447] uppercase tracking-wider">
                  My Profile & Active Skills
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {profile.skills.length} Skills Added
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                These skills are compared directly against company job requirements in the prototype skill-gap algorithm.
              </p>
            </div>

            {/* Add Skill Form */}
            <form onSubmit={handleAddSkill} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                placeholder="Add skill (e.g. Spring Boot)..."
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2447] font-medium flex-1 sm:w-[220px]"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 bg-[#0B2447] text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-[#12325f] transition shadow-xs shrink-0"
              >
                <Plus size={14} /> Add Skill
              </button>
            </form>
          </div>

          {/* Current Skills Tags */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-800 hover:border-slate-300 transition"
              >
                <CheckCircle2 size={13} className="text-emerald-600" />
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  title={`Remove ${skill}`}
                  className="text-slate-400 hover:text-red-500 rounded-full p-0.5 ml-0.5 transition"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* 2. Readiness & Top Gaps Overview */}
        <div className="mt-6 grid lg:grid-cols-[360px_1fr] gap-6">
          {/* Readiness Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="text-xs font-bold tracking-widest text-slate-500">INDUSTRY READINESS SCORE</div>
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left">
              <CircularProgress value={profile.readiness || 72}/>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600"/>
                  <span className="font-semibold">{profile.skills.length} Skills Added</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Briefcase size={16} className="text-blue-600"/>
                  <span className="font-semibold">{jobs.length} Active Jobs</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Award size={16} className="text-amber-500"/>
                  <span className="font-semibold">{camps.length} State Camps</span>
                </div>
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-800 text-left">
                  Adding missing skills will immediately increase your job match scores.
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-50 border border-slate-200 rounded-xl py-2.5">
                <div className="text-xs font-bold text-slate-500">SKILLS</div>
                <div className="text-lg font-extrabold text-emerald-600">{profile.skills.length}</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl py-2.5">
                <div className="text-xs font-bold text-slate-500">PROGRAMS</div>
                <div className="text-lg font-extrabold text-amber-600">{camps.length + govOpportunities.length}</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl py-2.5">
                <div className="text-xs font-bold text-slate-500">APPLICATIONS</div>
                <div className="text-lg font-extrabold text-blue-600">{applications.length + campRegistrations.length}</div>
              </div>
            </div>
          </div>

          {/* Top Gaps & Snapshot */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0B2447]">Target Role Benchmarks • Full Stack Developer</h3>
                <Link to="/student/skill-gap" className="text-xs font-semibold text-blue-600 hover:underline">Full comparison →</Link>
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {topGaps.map(g=>(
                  <div key={g.skill} className="border border-slate-200 rounded-xl p-4 bg-slate-50/60">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-[#0B2447]">{g.skill}</div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${g.gap==='Critical' ? 'bg-red-100 text-red-700 border border-red-200' : g.gap==='High' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>{g.gap}</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-600 space-y-1">
                      <div className="flex justify-between"><span>Your level:</span><span className="font-semibold">{g.yourLevel}</span></div>
                      <div className="flex justify-between"><span>Required:</span><span className="font-semibold text-[#0B2447]">{g.required}</span></div>
                    </div>
                    <div className="mt-3 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${g.gap==='Critical' ? 'bg-red-500 w-[90%]' : g.gap==='High' ? 'bg-amber-500 w-[70%]' : 'bg-blue-500 w-[40%]'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-[#0B2447]">Industry Snapshot</h3>
                <div className="mt-3 space-y-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Current target role:</span><span className="font-semibold">{profile.targetRole}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Industry demand:</span><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">High</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Partner companies:</span><span className="font-semibold">186</span></div>
                  <div className="pt-3 border-t border-slate-200">
                    <div className="text-xs font-bold tracking-wide text-slate-500 mb-2">TOP IN-DEMAND SKILLS</div>
                    <div className="flex flex-wrap gap-1.5">
                      {["React","Spring Boot","MySQL","Docker","AWS"].map(s=>(
                        <span key={s} className="px-2.5 py-1 bg-[#0B2447] text-white rounded-full text-xs font-semibold">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#0B2447] to-[#1e4a8a] rounded-2xl p-5 text-white flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold">Fast-Track Recommendation</h3>
                  <p className="mt-2 text-xs opacity-90 leading-relaxed">
                    Review company openings below and click <span className="font-bold underline">Analyze Skill Gap</span> on any job to view an instant breakdown of your matched vs missing skills.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="opacity-80">Connected Ecosystem</span>
                  <span className="font-bold text-emerald-300">Live Mock Data Sync</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Recommended Jobs (Ranked by Match %) */}
        <div className="mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-extrabold text-[#0B2447]">Recommended Jobs for You</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Sorted by Skill Match
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Rule-based percentage: (your matching skills / required skills) × 100.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 self-start sm:self-auto">
              Comparing with {profile.skills.length} skills in your profile
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedJobs.slice(0, 3).map(job => {
              const applied = isItemApplied(job.id, 'job')
              return (
                <div key={`rec-${job.id}`} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-extrabold text-[#0B2447]">{job.title}</h3>
                        <div className="text-xs font-semibold text-slate-600 mt-0.5">{job.company}</div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                        {job.matchPercentage}% Match
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                        <span>Skill Match</span>
                        <span className="text-[#0B2447] font-bold">{job.analysis.matched.length}/{job.requiredSkills.length} skills</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            job.matchPercentage >= 70 ? 'bg-emerald-500' : job.matchPercentage >= 40 ? 'bg-amber-500' : 'bg-red-400'
                          }`} 
                          style={{ width: `${job.matchPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-3.5 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                      <span className="flex items-center gap-1 font-semibold text-slate-800"><IndianRupee size={12} /> {job.salary}</span>
                      <span className="flex items-center gap-1"><Briefcase size={12} /> {job.experience}</span>
                    </div>

                    <div className="mt-3 text-xs space-y-1">
                      <div className="text-emerald-700 font-medium truncate">
                        ✓ Have: {job.analysis.matched.join(', ') || 'None yet'}
                      </div>
                      {job.analysis.missing.length > 0 && (
                        <div className="text-amber-700 font-medium truncate">
                          • Missing: {job.analysis.missing.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setAnalyzingJob(job)}
                      className="inline-flex items-center gap-1 bg-[#0B2447] text-white px-3.5 py-1.5 rounded-full text-xs font-bold hover:bg-[#12325f] transition"
                    >
                      <Sparkles size={13} /> Analyze Gap
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setViewingJob(job)}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2 py-1 rounded hover:bg-slate-50"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleApplyJob(job)}
                        disabled={applied}
                        className={`text-xs font-bold px-3 py-1 rounded-full transition ${
                          applied
                            ? 'bg-emerald-100 text-emerald-800 cursor-default'
                            : 'bg-slate-100 text-[#0B2447] hover:bg-slate-200'
                        }`}
                      >
                        {applied ? 'Applied ✓' : 'Apply'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 4. Latest Industry Opportunities ("Jobs from Companies") */}
        <div id="industry-jobs" className="mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-extrabold text-[#0B2447]">Latest Industry Opportunities</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {jobs.length} Openings Posted by Companies
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Jobs posted by employers appear here in real time. Click "Analyze Skill Gap" on any job to test the rule-based comparison.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobsWithMatch.map(job => {
              const applied = isItemApplied(job.id, 'job')
              return (
                <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-extrabold text-[#0B2447] leading-snug">{job.title}</h3>
                        <div className="text-xs font-semibold text-slate-500 mt-0.5">{job.company}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                        job.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {job.status}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600">
                      <span className="flex items-center gap-1"><MapPin size={12} className="text-slate-400" /> {job.location}</span>
                      <span className="flex items-center gap-1 font-semibold text-slate-800"><IndianRupee size={12} className="text-slate-400" /> {job.salary}</span>
                      <span className="flex items-center gap-1"><Briefcase size={12} className="text-slate-400" /> {job.experience}</span>
                    </div>

                    {/* Required Skills tags */}
                    <div className="mt-3.5">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Required Skills
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(job.requiredSkills || []).map(skill => {
                          const isHave = profile.skills.some(s => s.toLowerCase() === skill.toLowerCase())
                          return (
                            <span 
                              key={skill} 
                              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                                isHave 
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                  : 'bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              {isHave ? `✓ ${skill}` : skill}
                            </span>
                          )
                        })}
                      </div>
                    </div>

                    {/* Skill Match Indicator */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-600">Skill Match</span>
                        <span className={`${
                          job.matchPercentage >= 70 ? 'text-emerald-700' : job.matchPercentage >= 40 ? 'text-amber-700' : 'text-slate-600'
                        }`}>
                          {job.matchPercentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            job.matchPercentage >= 70 ? 'bg-emerald-500' : job.matchPercentage >= 40 ? 'bg-amber-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${job.matchPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-1">
                    <button
                      onClick={() => setViewingJob(job)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-50"
                    >
                      View Job
                    </button>
                    <button
                      onClick={() => setAnalyzingJob(job)}
                      className="inline-flex items-center gap-1 bg-[#0B2447] text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-[#12325f] transition shadow-sm"
                    >
                      <Sparkles size={12} /> Analyze Skill Gap
                    </button>
                    <button
                      onClick={() => handleApplyJob(job)}
                      disabled={applied}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full transition ${
                        applied 
                          ? 'bg-emerald-100 text-emerald-800 cursor-default' 
                          : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {applied ? 'Applied ✓' : 'Apply'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 5. Government Skill Development Programs */}
        <div id="gov-camps" className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-extrabold text-[#0B2447]">Government Skill Development Programs</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  {camps.length} State Camps
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Government-sponsored intensive training camps. Register with one click; confirmation is stored in your profile.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {camps.map(camp => {
              const registered = isCampRegistered(camp.id)
              return (
                <div key={camp.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                          Government Skill Development Camp
                        </span>
                        <h3 className="mt-1.5 text-base font-extrabold text-[#0B2447] leading-snug">
                          {camp.name}
                        </h3>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        {camp.seats} Seats
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {camp.description}
                    </p>

                    <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-slate-400" /> {camp.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-slate-400" /> {camp.location}
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold text-amber-900 col-span-2">
                        Registration Deadline: {camp.deadline}
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Skills Covered
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(camp.skillsCovered || []).map(skill => (
                          <span key={skill} className="bg-slate-100 text-slate-800 text-[11px] font-medium px-2 py-0.5 rounded-md">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] text-slate-500 truncate max-w-[200px]">
                      By: {camp.organizer}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewingCamp(camp)}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-50"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleRegisterCamp(camp)}
                        disabled={registered}
                        className={`text-xs font-bold px-4 py-1.5 rounded-full transition shadow-sm ${
                          registered
                            ? 'bg-emerald-600 text-white cursor-default'
                            : 'bg-[#0B2447] text-white hover:bg-[#12325f]'
                        }`}
                      >
                        {registered ? 'Registered ✓' : 'Register'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 6. Government Opportunities (Internships, Scholarships, Apprenticeships) */}
        <div id="gov-opportunities" className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-extrabold text-[#0B2447]">Government Opportunities</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {govOpportunities.length} Available
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Government internships, training sponsorships, and scholarships for college students.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {govOpportunities.map(opp => {
              const applied = isItemApplied(opp.id, 'government_opportunity')
              return (
                <div key={opp.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                          {opp.type}
                        </span>
                        <h3 className="mt-1.5 text-base font-extrabold text-[#0B2447] leading-snug">
                          {opp.title}
                        </h3>
                        <div className="text-xs font-semibold text-slate-500 mt-0.5">{opp.organization}</div>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 shrink-0">
                        {opp.location}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {opp.description}
                    </p>

                    <div className="mt-3 bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Eligibility:</span>
                        <span className="font-semibold text-slate-800">{opp.eligibility}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Deadline:</span>
                        <span className="font-semibold text-red-600">{opp.deadline}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Required Skills
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(opp.requiredSkills || []).map(skill => (
                          <span key={skill} className="bg-slate-100 text-slate-800 text-[11px] font-medium px-2 py-0.5 rounded-md">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-emerald-700 font-bold truncate max-w-[220px]">
                      {opp.benefits || 'Government Certificate + Stipend'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewingOpp(opp)}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-50"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleApplyOpp(opp)}
                        disabled={applied}
                        className={`text-xs font-bold px-4 py-1.5 rounded-full transition shadow-sm ${
                          applied
                            ? 'bg-emerald-600 text-white cursor-default'
                            : 'bg-[#0B2447] text-white hover:bg-[#12325f]'
                        }`}
                      >
                        {applied ? 'Applied ✓' : 'Apply'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 7. My Applications & Registrations Section */}
        <div id="my-applications" className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-[18px] font-extrabold text-[#0B2447]">My Applications & Registrations</h2>
              <p className="text-xs text-slate-500">Track all your simulated submissions across jobs, government schemes, and training camps.</p>
            </div>

            <div className="flex items-center bg-slate-100 rounded-full p-1 text-xs font-bold">
              <button
                onClick={() => setApplicationTab('jobs')}
                className={`px-3.5 py-1.5 rounded-full transition ${
                  applicationTab === 'jobs' ? 'bg-white shadow text-[#0B2447]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Applied Jobs ({applications.filter(a => a.type === 'job').length})
              </button>
              <button
                onClick={() => setApplicationTab('gov')}
                className={`px-3.5 py-1.5 rounded-full transition ${
                  applicationTab === 'gov' ? 'bg-white shadow text-[#0B2447]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Gov Opportunities ({applications.filter(a => a.type === 'government_opportunity').length})
              </button>
              <button
                onClick={() => setApplicationTab('camps')}
                className={`px-3.5 py-1.5 rounded-full transition ${
                  applicationTab === 'camps' ? 'bg-white shadow text-[#0B2447]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Camps Registered ({campRegistrations.length})
              </button>
            </div>
          </div>

          <div className="mt-5">
            {applicationTab === 'jobs' && (
              <div className="space-y-3">
                {applications.filter(a => a.type === 'job').length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No jobs applied yet. Browse "Latest Industry Opportunities" above and click Apply!</p>
                ) : (
                  applications.filter(a => a.type === 'job').map(app => (
                    <div key={app.id} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                      <div>
                        <div className="font-bold text-[#0B2447] text-sm">{app.title}</div>
                        <div className="text-slate-500">{app.organization} • Applied on {app.appliedDate}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {app.status || 'Applied'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {applicationTab === 'gov' && (
              <div className="space-y-3">
                {applications.filter(a => a.type === 'government_opportunity').length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No government opportunities applied yet. Explore "Government Opportunities" above!</p>
                ) : (
                  applications.filter(a => a.type === 'government_opportunity').map(app => (
                    <div key={app.id} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                      <div>
                        <div className="font-bold text-[#0B2447] text-sm">{app.title}</div>
                        <div className="text-slate-500">{app.organization} • Applied on {app.appliedDate}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {app.status || 'Applied'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {applicationTab === 'camps' && (
              <div className="space-y-3">
                {campRegistrations.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No skill camps registered yet. Click "Register" on any camp above!</p>
                ) : (
                  campRegistrations.map(reg => (
                    <div key={reg.id} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                      <div>
                        <div className="font-bold text-[#0B2447] text-sm">{reg.campName}</div>
                        <div className="text-slate-500">{reg.domain} • Scheduled: {reg.date} • Registered on {reg.registeredDate}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full font-bold bg-emerald-600 text-white">
                        {reg.status || 'Confirmed'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal: Interactive Skill Gap Analysis */}
      {analyzingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setAnalyzingJob(null)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[580px] max-h-[90vh] overflow-y-auto">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  Rule-Based Skill Gap Analysis
                </span>
                <h3 className="text-lg font-extrabold text-[#0B2447] mt-1">
                  {analyzingJob.title}
                </h3>
                <div className="text-xs font-semibold text-slate-500">{analyzingJob.company} • {analyzingJob.location}</div>
              </div>
              <button
                onClick={() => setAnalyzingJob(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Score card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                <div className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                  Skill Match Score
                </div>
                <div className="text-[36px] font-black text-[#0B2447] leading-none my-1">
                  {analyzingJob.matchPercentage}%
                </div>
                <p className="text-xs text-slate-500">
                  {analyzingJob.analysis.matched.length} of {analyzingJob.requiredSkills.length} required skills matched
                </p>
                <div className="mt-3 h-2.5 bg-slate-200 rounded-full overflow-hidden max-w-[320px] mx-auto">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      analyzingJob.matchPercentage >= 70 ? 'bg-emerald-500' : analyzingJob.matchPercentage >= 40 ? 'bg-amber-500' : 'bg-red-500'
                    }`} 
                    style={{ width: `${analyzingJob.matchPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Skills You Have */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" /> Skills You Have ({analyzingJob.analysis.matched.length})
                  </h4>
                </div>
                {analyzingJob.analysis.matched.length === 0 ? (
                  <p className="text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-xl p-3">
                    None of your profile skills currently match this job's required skills.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {analyzingJob.analysis.matched.map(skill => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200"
                      >
                        {skill} ✓
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Skills You Need */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle size={14} className="text-amber-600" /> Skills You Need ({analyzingJob.analysis.missing.length})
                  </h4>
                </div>
                {analyzingJob.analysis.missing.length === 0 ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 font-semibold">
                    🎉 Excellent! You have 100% of the required skills for this position.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {analyzingJob.analysis.missing.map(skill => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-red-50 text-red-700 border border-red-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Recommended Skills to Learn */}
              {analyzingJob.analysis.recommendedSkills.length > 0 && (
                <div className="bg-[#0B2447] text-white rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-amber-300 uppercase">
                    <Sparkles size={14} /> Recommended Skills to Learn
                  </div>
                  <p className="mt-1 text-xs text-slate-200 leading-relaxed">
                    Prioritize learning these skills to qualify for this role. (Click to simulate having acquired the skill):
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {analyzingJob.analysis.recommendedSkills.map(skill => (
                      <button
                        key={skill}
                        onClick={() => handleAddMissingToProfile(skill)}
                        className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-2.5 py-1 rounded-lg text-xs font-semibold transition"
                        title="Click to add to your skills profile"
                      >
                        + Add "{skill}" to Profile
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  onClick={() => setAnalyzingJob(null)}
                  className="px-5 py-2 text-xs font-semibold border border-slate-200 rounded-full hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleApplyJob(analyzingJob)
                    setAnalyzingJob(null)
                  }}
                  disabled={isItemApplied(analyzingJob.id, 'job')}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition shadow-sm ${
                    isItemApplied(analyzingJob.id, 'job')
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#0B2447] text-white hover:bg-[#12325f]'
                  }`}
                >
                  {isItemApplied(analyzingJob.id, 'job') ? 'Applied ✓' : 'Apply for this Job'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: View Job Details */}
      {viewingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setViewingJob(null)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[560px] max-h-[90vh] overflow-y-auto">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Job Details</span>
                <h3 className="text-lg font-extrabold text-[#0B2447]">{viewingJob.title}</h3>
              </div>
              <button
                onClick={() => setViewingJob(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div>
                  <div className="font-bold text-[#0B2447]">{viewingJob.company}</div>
                  <div className="text-slate-500">{viewingJob.location} • {viewingJob.type}</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-[#0B2447]">{viewingJob.salary}</div>
                  <div className="text-slate-500">{viewingJob.experience}</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-1">Description</h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-3">
                  {viewingJob.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-1.5">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(viewingJob.requiredSkills || []).map(s => (
                    <span key={s} className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {viewingJob.preferredSkills?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-1.5">Preferred Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(viewingJob.preferredSkills || []).map(s => (
                      <span key={s} className="bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold px-2.5 py-1 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setViewingJob(null)}
                  className="px-5 py-2 rounded-full border border-slate-200 text-xs font-semibold hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleApplyJob(viewingJob)
                    setViewingJob(null)
                  }}
                  disabled={isItemApplied(viewingJob.id, 'job')}
                  className={`px-5 py-2 rounded-full text-xs font-bold ${
                    isItemApplied(viewingJob.id, 'job') ? 'bg-emerald-600 text-white' : 'bg-[#0B2447] text-white hover:bg-[#12325f]'
                  }`}
                >
                  {isItemApplied(viewingJob.id, 'job') ? 'Applied ✓' : 'Apply Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: View Camp Details */}
      {viewingCamp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setViewingCamp(null)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[560px] max-h-[90vh] overflow-y-auto">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  {viewingCamp.domain}
                </span>
                <h3 className="text-lg font-extrabold text-[#0B2447] mt-1">{viewingCamp.name}</h3>
              </div>
              <button
                onClick={() => setViewingCamp(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 rounded-xl p-3">
                {viewingCamp.description}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-slate-500">Date & Schedule</div>
                  <div className="font-bold text-slate-800 mt-0.5">{viewingCamp.date}</div>
                  <div className="text-slate-500 mt-0.5">{viewingCamp.startTime} - {viewingCamp.endTime}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-slate-500">Location & Seats</div>
                  <div className="font-bold text-slate-800 mt-0.5">{viewingCamp.location}</div>
                  <div className="text-emerald-700 font-semibold mt-0.5">{viewingCamp.seats} Total Seats</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Skills Covered</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(viewingCamp.skillsCovered || []).map(s => (
                    <span key={s} className="bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold px-2.5 py-1 rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
                <div className="font-bold">Registration Deadline: {viewingCamp.deadline}</div>
                <div className="text-amber-800 mt-0.5">Eligibility: {viewingCamp.eligibility}</div>
                <div className="text-slate-500 mt-0.5">Organized by: {viewingCamp.organizer}</div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setViewingCamp(null)}
                  className="px-5 py-2 rounded-full border border-slate-200 text-xs font-semibold hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleRegisterCamp(viewingCamp)
                    setViewingCamp(null)
                  }}
                  disabled={isCampRegistered(viewingCamp.id)}
                  className={`px-5 py-2 rounded-full text-xs font-bold ${
                    isCampRegistered(viewingCamp.id) ? 'bg-emerald-600 text-white' : 'bg-[#0B2447] text-white hover:bg-[#12325f]'
                  }`}
                >
                  {isCampRegistered(viewingCamp.id) ? 'Registered ✓' : 'Register Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: View Opportunity Details */}
      {viewingOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setViewingOpp(null)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[560px] max-h-[90vh] overflow-y-auto">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {viewingOpp.type}
                </span>
                <h3 className="text-lg font-extrabold text-[#0B2447] mt-1">{viewingOpp.title}</h3>
              </div>
              <button
                onClick={() => setViewingOpp(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 rounded-xl p-3">
                {viewingOpp.description}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-slate-500">Department</div>
                  <div className="font-bold text-slate-800 mt-0.5">{viewingOpp.organization}</div>
                  <div className="text-slate-500 mt-0.5">{viewingOpp.location}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-slate-500">Deadline & Eligibility</div>
                  <div className="font-bold text-red-600 mt-0.5">{viewingOpp.deadline}</div>
                  <div className="text-slate-600 mt-0.5">{viewingOpp.eligibility}</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(viewingOpp.requiredSkills || []).map(s => (
                    <span key={s} className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {viewingOpp.benefits && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs">
                  <span className="font-bold text-emerald-800">Benefits: </span>
                  <span className="text-emerald-900">{viewingOpp.benefits}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setViewingOpp(null)}
                  className="px-5 py-2 rounded-full border border-slate-200 text-xs font-semibold hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleApplyOpp(viewingOpp)
                    setViewingOpp(null)
                  }}
                  disabled={isItemApplied(viewingOpp.id, 'government_opportunity')}
                  className={`px-5 py-2 rounded-full text-xs font-bold ${
                    isItemApplied(viewingOpp.id, 'government_opportunity') ? 'bg-emerald-600 text-white' : 'bg-[#0B2447] text-white hover:bg-[#12325f]'
                  }`}
                >
                  {isItemApplied(viewingOpp.id, 'government_opportunity') ? 'Applied ✓' : 'Apply Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  )
}
