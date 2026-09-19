import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  AlertTriangle, TrendingUp, 
  ArrowRight, Plus, Calendar, MapPin, 
  Trash2, Edit3, Eye, Sparkles, X,
  Clock, GraduationCap, Award
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Toast from '../components/Toast'
import { 
  getCamps, saveCamp, deleteCamp, 
  getGovOpportunities, saveGovOpportunity, deleteGovOpportunity, 
  getCampRegistrations 
} from '../utils/storage'
import { industryDemand, emergingTrends, criticalGaps } from '../data/mockData'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from 'recharts'

export default function GovDashboard() {
  const [camps, setCamps] = useState(getCamps())

  const [opportunities, setOpportunities] = useState(getGovOpportunities())
  const [campRegistrations, setCampRegistrations] = useState(getCampRegistrations())
  const [toast, setToast] = useState('')

  // Modals
  const [isCampModalOpen, setIsCampModalOpen] = useState(false)
  const [editingCamp, setEditingCamp] = useState(null)
  const [viewingCamp, setViewingCamp] = useState(null)

  const [isOppModalOpen, setIsOppModalOpen] = useState(false)
  const [editingOpp, setEditingOpp] = useState(null)
  const [viewingOpp, setViewingOpp] = useState(null)

  // Camp Form State
  const initialCampForm = {
    name: '',
    domain: '',
    description: '',
    date: '2026-10-20',
    startTime: '09:30 AM',
    endTime: '04:30 PM',
    location: 'Bangalore',
    eligibility: 'B.Tech/BE/MCA Students',
    seats: 100,
    deadline: '2026-10-15',
    organizer: 'Govt. of Maharashtra Skill Development Mission',
    skillsCovered: '',
  }
  const [campFormData, setCampFormData] = useState(initialCampForm)

  // Opportunity Form State
  const initialOppForm = {
    title: '',
    organization: 'Government of Maharashtra - MahaIT',
    type: 'Government Internship',
    description: '',
    eligibility: 'Final year students',
    requiredSkills: '',
    location: 'Bangalore',
    deadline: '2026-10-30',
    benefits: '₹18,000 / month Stipend + Official Certificate',
    applicationLink: 'https://mahait.gov.in/careers',
  }
  const [oppFormData, setOppFormData] = useState(initialOppForm)

  // Storage listener
  useEffect(() => {
    const handleStorageUpdate = () => {
      setCamps(getCamps())
      setOpportunities(getGovOpportunities())
      setCampRegistrations(getCampRegistrations())
      setCurrentUser(getCurrentUser())
    }
    window.addEventListener('skillsync_storage_update', handleStorageUpdate)
    window.addEventListener('storage', handleStorageUpdate)
    return () => {
      window.removeEventListener('skillsync_storage_update', handleStorageUpdate)
      window.removeEventListener('storage', handleStorageUpdate)
    }
  }, [])

  // ---------------- Camp handlers ----------------
  const handleOpenCreateCamp = () => {
    setEditingCamp(null)
    setCampFormData(initialCampForm)
    setIsCampModalOpen(true)
  }

  const handleFillCampExample = () => {
    setCampFormData({
      name: 'Advanced Java & Spring Boot Training Camp',
      domain: 'Java Backend Development',
      description: 'Hands-on government-sponsored training camp on enterprise Java, Spring Boot microservices, REST APIs, and production database queries.',
      date: '2026-10-20',
      startTime: '09:30 AM',
      endTime: '04:30 PM',
      location: 'Bangalore',
      eligibility: 'Final & pre-final year engineering students',
      seats: 100,
      deadline: '2026-10-15',
      organizer: 'Maharashtra State Skill Mission & C-DAC',
      skillsCovered: 'Java, Spring Boot, REST API, MySQL',
    })
  }

  const handleOpenEditCamp = (camp) => {
    setEditingCamp(camp)
    setCampFormData({
      name: camp.name,
      domain: camp.domain,
      description: camp.description || '',
      date: camp.date,
      startTime: camp.startTime || '09:30 AM',
      endTime: camp.endTime || '04:30 PM',
      location: camp.location,
      eligibility: camp.eligibility,
      seats: camp.seats,
      deadline: camp.deadline,
      organizer: camp.organizer,
      skillsCovered: Array.isArray(camp.skillsCovered) ? camp.skillsCovered.join(', ') : camp.skillsCovered,
    })
    setIsCampModalOpen(true)
  }

  const handleSaveCamp = (e) => {
    e.preventDefault()
    if (!campFormData.name.trim()) return

    const parsedSkills = campFormData.skillsCovered
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    const payload = {
      ...(editingCamp || {}),
      name: campFormData.name.trim(),
      domain: campFormData.domain.trim() || 'Software Development',
      description: campFormData.description.trim(),
      date: campFormData.date,
      startTime: campFormData.startTime,
      endTime: campFormData.endTime,
      location: campFormData.location.trim(),
      eligibility: campFormData.eligibility.trim(),
      seats: Number(campFormData.seats) || 100,
      deadline: campFormData.deadline,
      organizer: campFormData.organizer.trim(),
      skillsCovered: parsedSkills,
      status: 'Open',
    }

    saveCamp(payload)
    setIsCampModalOpen(false)
    setToast(editingCamp ? 'Skill camp updated.' : 'New Skill Camp published! Immediately visible to students.')
  }

  const handleDeleteCamp = (campId, campName) => {
    if (window.confirm(`Delete "${campName}"?`)) {
      deleteCamp(campId)
      setToast('Skill camp deleted.')
    }
  }

  // ---------------- Opportunity handlers ----------------
  const handleOpenCreateOpp = () => {
    setEditingOpp(null)
    setOppFormData(initialOppForm)
    setIsOppModalOpen(true)
  }

  const handleFillOppExample = () => {
    setOppFormData({
      title: 'Government Digital Skills Internship',
      organization: 'Government of Maharashtra - MahaIT',
      type: 'Government Internship',
      description: 'Prestigious public sector internship on citizen portals, e-governance APIs, and state digital public infrastructure.',
      eligibility: 'Final year students with min 60% aggregate',
      requiredSkills: 'JavaScript, React, Git',
      location: 'Bangalore',
      deadline: '2026-10-30',
      benefits: '₹18,000 / month Stipend + Official Government Merit Certificate',
      applicationLink: 'https://mahait.gov.in/internships',
    })
  }

  const handleOpenEditOpp = (opp) => {
    setEditingOpp(opp)
    setOppFormData({
      title: opp.title,
      organization: opp.organization,
      type: opp.type,
      description: opp.description || '',
      eligibility: opp.eligibility,
      requiredSkills: Array.isArray(opp.requiredSkills) ? opp.requiredSkills.join(', ') : opp.requiredSkills,
      location: opp.location,
      deadline: opp.deadline,
      benefits: opp.benefits || '',
      applicationLink: opp.applicationLink || '',
    })
    setIsOppModalOpen(true)
  }

  const handleSaveOpp = (e) => {
    e.preventDefault()
    if (!oppFormData.title.trim()) return

    const parsedSkills = oppFormData.requiredSkills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    const payload = {
      ...(editingOpp || {}),
      title: oppFormData.title.trim(),
      organization: oppFormData.organization.trim(),
      type: oppFormData.type,
      description: oppFormData.description.trim(),
      eligibility: oppFormData.eligibility.trim(),
      requiredSkills: parsedSkills,
      location: oppFormData.location.trim(),
      deadline: oppFormData.deadline,
      benefits: oppFormData.benefits.trim(),
      applicationLink: oppFormData.applicationLink.trim(),
      status: 'Active',
    }

    saveGovOpportunity(payload)
    setIsOppModalOpen(false)
    setToast(editingOpp ? 'Opportunity updated.' : 'Government Opportunity published! Visible to students.')
  }

  const handleDeleteOpp = (oppId, oppTitle) => {
    if (window.confirm(`Delete "${oppTitle}"?`)) {
      deleteGovOpportunity(oppId)
      setToast('Opportunity deleted.')
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 text-xs font-bold text-amber-800">
              🏛️ GOVERNMENT • STATE SKILL INTELLIGENCE
            </div>
            <h1 className="mt-2 text-[22px] lg:text-[24px] font-extrabold text-[#0B2447]">
              Maharashtra Skill Intelligence & Governance
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Publish skill camps, sponsor opportunities, track industry demand, and close workforce readiness gaps.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleOpenCreateCamp}
              className="inline-flex items-center gap-1.5 bg-[#0B2447] text-white px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold hover:bg-[#12325f] shadow-sm transition"
            >
              <Plus size={16} /> Create Skill Camp
            </button>
            <button
              onClick={handleOpenCreateOpp}
              className="inline-flex items-center gap-1.5 bg-amber-600 text-white px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold hover:bg-amber-700 shadow-sm transition"
            >
              <Plus size={16} /> Post Opportunity
            </button>
            <Link
              to="/government/course-gaps"
              className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-slate-50 transition"
            >
              Course Gaps <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Real-time Metrics Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Active Camps', value: camps.length },
            { label: 'Students Registered', value: `${1240 + campRegistrations.length}` },
            { label: 'Active Opportunities', value: opportunities.length },
            { label: 'Skills in Demand', value: '12' },
            { label: 'Students Tracked', value: '12,450' },
            { label: 'Partner Companies', value: '186' },
          ].map(m => (
            <div key={m.label} className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm text-center">
              <div className="text-[20px] font-extrabold text-[#0B2447]">{m.value}</div>
              <div className="text-[11px] font-bold tracking-wide text-slate-500 leading-tight mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Section: Skill Development Camps */}
        <div id="skill-camps" className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-extrabold text-[#0B2447]">Active Skill Development Camps</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  {camps.length} Programs
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Government-organized training bootcamps. Publishing here automatically displays the camp on the Student Dashboard with 1-click registration.
              </p>
            </div>
            <button
              onClick={handleOpenCreateCamp}
              className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-[#0B2447] text-white px-3.5 py-1.5 rounded-full text-xs font-bold hover:bg-[#12325f] transition"
            >
              <Plus size={14} /> New Camp
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {camps.map(camp => (
              <div key={camp.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow transition flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                        {camp.domain}
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
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-slate-400" /> {camp.startTime || '09:30 AM'} - {camp.endTime || '04:30 PM'}
                    </div>
                    <div className="flex items-center gap-1.5 font-semibold text-amber-800">
                      Deadline: {camp.deadline}
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
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewingCamp(camp)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-50"
                    >
                      <Eye size={13} /> View
                    </button>
                    <button
                      onClick={() => handleOpenEditCamp(camp)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 px-2.5 py-1.5 rounded-lg hover:bg-blue-50"
                    >
                      <Edit3 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCamp(camp.id, camp.name)}
                      className="inline-flex items-center text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50"
                      title="Delete Camp"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Government Opportunities */}
        <div id="gov-opportunities" className="mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-extrabold text-[#0B2447]">Government Opportunities</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  {opportunities.length} Active
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Internships, scholarships, apprenticeships, and subsidized certifications. Syncs directly to the Student Dashboard.
              </p>
            </div>
            <button
              onClick={handleOpenCreateOpp}
              className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-amber-600 text-white px-3.5 py-1.5 rounded-full text-xs font-bold hover:bg-amber-700 transition"
            >
              <Plus size={14} /> New Opportunity
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {opportunities.map(opp => (
              <div key={opp.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow transition flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
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
                    {opp.benefits && (
                      <div className="flex justify-between pt-1 border-t border-slate-200/60">
                        <span className="text-slate-500">Benefits:</span>
                        <span className="font-bold text-emerald-700 truncate max-w-[240px]">{opp.benefits}</span>
                      </div>
                    )}
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

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-1">
                  <button
                    onClick={() => setViewingOpp(opp)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-50"
                  >
                    <Eye size={13} /> View
                  </button>
                  <button
                    onClick={() => handleOpenEditOpp(opp)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 px-2.5 py-1.5 rounded-lg hover:bg-blue-50"
                  >
                    <Edit3 size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOpp(opp.id, opp.title)}
                    className="inline-flex items-center text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50"
                    title="Delete Opportunity"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Charts Section: Demand & Trends */}
        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#0B2447]">Top Industry Skill Demand</h3>
            <p className="text-xs text-slate-500">Aggregated from 186 companies • % of roles requiring skill</p>
            <div className="h-[300px] mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryDemand} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11, fontWeight: 600, fill: '#0B2447' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="demand" radius={[0, 8, 8, 0]} barSize={16}>
                    {industryDemand.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? '#0B2447' : i < 3 ? '#1e40af' : '#60a5fa'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#0B2447]">Emerging Skill Trends</h3>
            <p className="text-xs text-slate-500">Fastest growing demand • YoY increase</p>
            <div className="h-[200px] mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emergingTrends}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 600 }} interval={0} angle={-10} height={50} tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} width={30} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={38}>
                    {emergingTrends.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? '#dc2626' : i === 1 ? '#ea580c' : i === 2 ? '#d97706' : '#16a34a'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
              <TrendingUp size={16} className="text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-900 leading-relaxed">
                <span className="font-bold">Insight:</span> Generative AI demand grew 89% — but course coverage is only 18%. Use "Create Skill Camp" above to quickly address high-priority gaps.
              </p>
            </div>
          </div>
        </div>

        {/* Existing Critical Skill Gaps */}
        <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B2447] flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-600" /> Critical Skill Gaps
            </h3>
            <Link to="/government/course-gaps" className="text-xs font-semibold text-blue-600 hover:underline">
              View all gaps →
            </Link>
          </div>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            {criticalGaps.map(g => (
              <div key={g.skill} className={`border rounded-xl p-4 ${g.status === 'Critical' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-extrabold text-[#0B2447]">{g.skill}</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${g.status === 'Critical' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'}`}>
                    {g.status}
                  </span>
                </div>
                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-slate-600">Demand:</span><span className="font-bold">{g.demand}%</span></div>
                  <div className="flex justify-between"><span className="text-slate-600">Course Coverage:</span><span className="font-bold">{g.coverage}%</span></div>
                  <div className="flex justify-between"><span className="text-slate-600">Gap:</span><span className="font-bold text-red-600">{g.gap}%</span></div>
                </div>
                <div className="mt-3 h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-red-500" style={{ width: `${g.gap}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Create / Edit Camp */}
      {isCampModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsCampModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[640px] max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0B2447] text-white flex items-center justify-center">
                  <GraduationCap size={16} />
                </div>
                <h3 className="text-[17px] font-extrabold text-[#0B2447]">
                  {editingCamp ? 'Edit Skill Camp' : 'Create Skill Development Camp'}
                </h3>
              </div>
              <button
                onClick={() => setIsCampModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCamp} className="p-6 space-y-4">
              {!editingCamp && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleFillCampExample}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-100 transition"
                  >
                    <Sparkles size={13} /> Auto-fill Example (Advanced Java Camp)
                  </button>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    CAMP NAME <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={campFormData.name}
                    onChange={e => setCampFormData({ ...campFormData, name: e.target.value })}
                    placeholder="e.g. Advanced Java & Spring Boot Training Camp"
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2447] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    SKILL / DOMAIN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={campFormData.domain}
                    onChange={e => setCampFormData({ ...campFormData, domain: e.target.value })}
                    placeholder="Java Backend Development"
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2447] font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  value={campFormData.description}
                  onChange={e => setCampFormData({ ...campFormData, description: e.target.value })}
                  placeholder="Details about camp schedule, training objectives, mentor qualifications..."
                  rows={3}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2447]"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  SKILLS COVERED (comma-separated) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={campFormData.skillsCovered}
                  onChange={e => setCampFormData({ ...campFormData, skillsCovered: e.target.value })}
                  placeholder="Java, Spring Boot, REST API, MySQL"
                  required
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2447] font-medium"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">DATE</label>
                  <input
                    type="date"
                    value={campFormData.date}
                    onChange={e => setCampFormData({ ...campFormData, date: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">START TIME</label>
                  <input
                    type="text"
                    value={campFormData.startTime}
                    onChange={e => setCampFormData({ ...campFormData, startTime: e.target.value })}
                    placeholder="09:30 AM"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">END TIME</label>
                  <input
                    type="text"
                    value={campFormData.endTime}
                    onChange={e => setCampFormData({ ...campFormData, endTime: e.target.value })}
                    placeholder="04:30 PM"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">LOCATION</label>
                  <input
                    type="text"
                    value={campFormData.location}
                    onChange={e => setCampFormData({ ...campFormData, location: e.target.value })}
                    placeholder="Bangalore"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">SEATS AVAILABLE</label>
                  <input
                    type="number"
                    value={campFormData.seats}
                    onChange={e => setCampFormData({ ...campFormData, seats: e.target.value })}
                    placeholder="100"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">REGISTRATION DEADLINE</label>
                  <input
                    type="date"
                    value={campFormData.deadline}
                    onChange={e => setCampFormData({ ...campFormData, deadline: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">ELIGIBILITY</label>
                  <input
                    type="text"
                    value={campFormData.eligibility}
                    onChange={e => setCampFormData({ ...campFormData, eligibility: e.target.value })}
                    placeholder="B.Tech/BE Students"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">ORGANIZER</label>
                  <input
                    type="text"
                    value={campFormData.organizer}
                    onChange={e => setCampFormData({ ...campFormData, organizer: e.target.value })}
                    placeholder="Govt. of Maharashtra Skill Mission"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCampModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-semibold border border-slate-200 rounded-full hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0B2447] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#12325f] transition shadow-sm"
                >
                  {editingCamp ? 'Save Camp' : 'Publish Camp'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create / Edit Opportunity */}
      {isOppModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsOppModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[640px] max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                  <Award size={16} />
                </div>
                <h3 className="text-[17px] font-extrabold text-[#0B2447]">
                  {editingOpp ? 'Edit Government Opportunity' : 'Post Government Opportunity'}
                </h3>
              </div>
              <button
                onClick={() => setIsOppModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveOpp} className="p-6 space-y-4">
              {!editingOpp && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleFillOppExample}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full hover:bg-amber-100 transition"
                  >
                    <Sparkles size={13} /> Auto-fill Example (Gov Digital Skills Internship)
                  </button>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    OPPORTUNITY TITLE <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={oppFormData.title}
                    onChange={e => setOppFormData({ ...oppFormData, title: e.target.value })}
                    placeholder="Government Digital Skills Internship"
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2447] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    OPPORTUNITY TYPE <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={oppFormData.type}
                    onChange={e => setOppFormData({ ...oppFormData, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white font-medium"
                  >
                    <option>Government Internship</option>
                    <option>Government-sponsored Training</option>
                    <option>Apprenticeship</option>
                    <option>Scholarship</option>
                    <option>Skill Development Program</option>
                    <option>Employment Opportunity</option>
                    <option>Certification Program</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  ORGANIZATION / DEPARTMENT <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={oppFormData.organization}
                  onChange={e => setOppFormData({ ...oppFormData, organization: e.target.value })}
                  placeholder="Government of Maharashtra - MahaIT"
                  required
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  value={oppFormData.description}
                  onChange={e => setOppFormData({ ...oppFormData, description: e.target.value })}
                  placeholder="Outline program scope, stipend details, responsibilities, certificate accreditation..."
                  rows={3}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2447]"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  REQUIRED SKILLS (comma-separated) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={oppFormData.requiredSkills}
                  onChange={e => setOppFormData({ ...oppFormData, requiredSkills: e.target.value })}
                  placeholder="JavaScript, React, Git"
                  required
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">ELIGIBILITY</label>
                  <input
                    type="text"
                    value={oppFormData.eligibility}
                    onChange={e => setOppFormData({ ...oppFormData, eligibility: e.target.value })}
                    placeholder="Final year students"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">LOCATION</label>
                  <input
                    type="text"
                    value={oppFormData.location}
                    onChange={e => setOppFormData({ ...oppFormData, location: e.target.value })}
                    placeholder="Bangalore"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">DEADLINE</label>
                  <input
                    type="date"
                    value={oppFormData.deadline}
                    onChange={e => setOppFormData({ ...oppFormData, deadline: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  BENEFITS / STIPEND
                </label>
                <input
                  type="text"
                  value={oppFormData.benefits}
                  onChange={e => setOppFormData({ ...oppFormData, benefits: e.target.value })}
                  placeholder="₹18,000 / month Stipend + Official Government Merit Certificate"
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsOppModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-semibold border border-slate-200 rounded-full hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-amber-700 transition shadow-sm"
                >
                  {editingOpp ? 'Save Opportunity' : 'Publish Opportunity'}
                </button>
              </div>
            </form>
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

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setViewingCamp(null)}
                  className="bg-[#0B2447] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#12325f]"
                >
                  Close
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
                  <div className="text-slate-500">Issuing Department</div>
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

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setViewingOpp(null)}
                  className="bg-[#0B2447] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#12325f]"
                >
                  Close
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
