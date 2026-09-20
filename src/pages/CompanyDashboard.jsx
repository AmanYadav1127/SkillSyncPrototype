import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Building2, Users, Layers, Flame, ArrowRight, Plus, 
  MapPin, Briefcase, IndianRupee, Calendar, Eye, Edit3, Trash2, 
  X, Sparkles
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Toast from '../components/Toast'
import { 
  getJobs, saveJob, deleteJob, toggleJobStatus, getCurrentUser 
} from '../utils/storage'
import { companyTopSkills, jobRoles } from '../data/mockData'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from 'recharts'

export default function CompanyDashboard() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser())
  const [jobs, setJobs] = useState(getJobs())
  const [toast, setToast] = useState('')

  // Modals state
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [viewingJob, setViewingJob] = useState(null)
  const [filterStatus, setFilterStatus] = useState('All')

  // Form State
  const initialForm = {
    title: '',
    company: currentUser?.name || 'ABC Technologies',
    description: '',
    requiredSkills: '',
    preferredSkills: '',
    experience: '0-2 years',
    location: 'Bangalore',
    salary: '₹6-8 LPA',
    type: 'Full-time',
    deadline: '2026-11-30',
  }
  const [formData, setFormData] = useState(initialForm)

  // Listen to storage events
  useEffect(() => {
    const handleStorageUpdate = () => {
      setJobs(getJobs())
      setCurrentUser(getCurrentUser())
    }
    window.addEventListener('skillsync_storage_update', handleStorageUpdate)
    window.addEventListener('storage', handleStorageUpdate)
    return () => {
      window.removeEventListener('skillsync_storage_update', handleStorageUpdate)
      window.removeEventListener('storage', handleStorageUpdate)
    }
  }, [])

  const companyName = currentUser?.name || 'ABC Technologies'

  // Calculations
  const activeJobsCount = jobs.filter(j => j.status === 'Active').length
  const totalApplicants = jobs.reduce((sum, j) => sum + (j.applicantsCount || 0), 0)
  const totalJobsCount = jobs.length

  const filteredJobs = jobs.filter(j => {
    if (filterStatus === 'All') return true
    return j.status === filterStatus
  })

  // Open create modal
  const handleOpenPostModal = () => {
    setEditingJob(null)
    setFormData({
      ...initialForm,
      company: companyName,
    })
    setIsPostModalOpen(true)
  }

  // Pre-fill with example requested in prompt
  const handleFillExample = () => {
    setFormData({
      title: 'Java Backend Developer',
      company: 'ABC Technologies',
      description: 'Design, implement, and maintain high-performance Java microservices, REST APIs, and database transactions for state-of-the-art enterprise platforms.',
      requiredSkills: 'Java, Spring Boot, REST API, MySQL, Git',
      preferredSkills: 'Docker, AWS',
      experience: '0-2 years',
      location: 'Bangalore',
      salary: '₹6-8 LPA',
      type: 'Full-time',
      deadline: '2026-11-25',
    })
  }

  // Open edit modal
  const handleOpenEdit = (job) => {
    setEditingJob(job)
    setFormData({
      title: job.title,
      company: job.company,
      description: job.description,
      requiredSkills: Array.isArray(job.requiredSkills) ? job.requiredSkills.join(', ') : job.requiredSkills,
      preferredSkills: Array.isArray(job.preferredSkills) ? job.preferredSkills.join(', ') : (job.preferredSkills || ''),
      experience: job.experience,
      location: job.location,
      salary: job.salary,
      type: job.type || 'Full-time',
      deadline: job.deadline || '2026-11-30',
    })
    setIsPostModalOpen(true)
  }

  // Save or update job
  const handleSaveJob = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    const parsedRequired = formData.requiredSkills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    const parsedPreferred = formData.preferredSkills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    const jobPayload = {
      ...(editingJob || {}),
      title: formData.title.trim(),
      company: formData.company.trim() || companyName,
      description: formData.description.trim(),
      requiredSkills: parsedRequired,
      preferredSkills: parsedPreferred,
      experience: formData.experience,
      location: formData.location,
      salary: formData.salary,
      type: formData.type,
      deadline: formData.deadline,
      status: editingJob ? editingJob.status : 'Active',
    }

    saveJob(jobPayload)
    setIsPostModalOpen(false)
    setToast(editingJob ? 'Job posting updated successfully.' : 'New job posted! Visible to students immediately.')
  }

  // Delete job
  const handleDeleteJob = (jobId, jobTitle) => {
    if (window.confirm(`Are you sure you want to delete "${jobTitle}"?`)) {
      deleteJob(jobId)
      setToast('Job posting deleted.')
    }
  }

  // Toggle status
  const handleToggleStatus = (jobId, currentStatus) => {
    toggleJobStatus(jobId)
    setToast(currentStatus === 'Active' ? 'Job posting closed.' : 'Job posting reopened.')
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0B2447] text-white flex items-center justify-center shadow-xs shrink-0">
              <Building2 size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B2447] leading-tight">
                  {companyName}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  Verified Employer
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Information Technology • Bangalore & Pune, India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
            <button
              onClick={handleOpenPostModal}
              className="inline-flex items-center justify-center gap-2 bg-[#0B2447] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold hover:bg-[#12325f] shadow-xs transition flex-1 sm:flex-none"
            >
              <Plus size={18} /> Post a Job
            </button>
            <Link
              to="/company/requirements"
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-slate-50 transition flex-1 sm:flex-none"
            >
              Skill Requirements <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Real-time Analytics Metrics */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Jobs', value: activeJobsCount, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
            { label: 'Total Applicants', value: totalApplicants, icon: Users, color: 'text-violet-600', bg: 'bg-violet-50 border-violet-200' },
            { label: 'Skills in Demand', value: 8, icon: Flame, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
            { label: 'Jobs Posted', value: totalJobsCount, icon: Layers, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
          ].map(m => (
            <div key={m.label} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${m.bg} ${m.color}`}>
                <m.icon size={20} />
              </div>
              <div>
                <div className="text-[22px] font-extrabold text-[#0B2447] leading-none">{m.value}</div>
                <div className="text-xs font-semibold text-slate-500 mt-1">{m.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Section: My Job Postings */}
        <div id="my-jobs" className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-[18px] font-extrabold text-[#0B2447]">My Job Postings</h2>
              <p className="text-xs text-slate-500">
                Manage positions and review applicants. Jobs posted here appear automatically on the Student Dashboard.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white border border-slate-200 rounded-full p-1 text-xs font-semibold">
                {['All', 'Active', 'Closed'].map(st => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1 rounded-full transition ${
                      filterStatus === st ? 'bg-[#0B2447] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
              <button
                onClick={handleOpenPostModal}
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#0B2447] text-white px-3.5 py-1.5 rounded-full text-xs font-bold hover:bg-[#12325f] transition"
              >
                <Plus size={14} /> New
              </button>
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
              <Briefcase size={36} className="mx-auto text-slate-300 mb-2" />
              <h3 className="text-sm font-bold text-[#0B2447]">No job postings found</h3>
              <p className="text-xs text-slate-500 mt-1">Get started by creating your first job opening.</p>
              <button
                onClick={handleOpenPostModal}
                className="mt-4 inline-flex items-center gap-1.5 bg-[#0B2447] text-white px-4 py-2 rounded-full text-xs font-bold"
              >
                <Plus size={14} /> Post a Job
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.map(job => (
                <div
                  key={job.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow transition flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Title & Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-extrabold text-[#0B2447] leading-snug">{job.title}</h3>
                        <div className="text-xs font-semibold text-slate-500 mt-0.5">{job.company}</div>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${
                          job.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>

                    {/* Metadata tags */}
                    <div className="mt-3.5 flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-slate-400" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-slate-800">
                        <IndianRupee size={13} className="text-slate-400" /> {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase size={13} className="text-slate-400" /> {job.experience}
                      </span>
                    </div>

                    {/* Required Skills */}
                    <div className="mt-3.5">
                      <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">
                        Required Skills
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(job.requiredSkills || []).map(skill => (
                          <span
                            key={skill}
                            className="bg-slate-100 text-slate-800 text-[11px] font-medium px-2.5 py-0.5 rounded-md border border-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} /> Posted {job.postedDate}
                      </span>
                      <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {job.applicantsCount} applicants
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-1">
                    <button
                      onClick={() => setViewingJob(job)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 px-2 py-1.5 rounded-lg hover:bg-slate-50"
                    >
                      <Eye size={14} /> View
                    </button>
                    <button
                      onClick={() => handleOpenEdit(job)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 px-2 py-1.5 rounded-lg hover:bg-blue-50"
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(job.id, job.status)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 px-2 py-1.5 rounded-lg hover:bg-slate-50"
                    >
                      {job.status === 'Active' ? 'Close' : 'Reopen'}
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id, job.title)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50"
                      title="Delete Job"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Existing Charts Section */}
        <div className="mt-10 grid lg:grid-cols-[1.4fr_0.8fr] gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#0B2447]">Top Skills Required</h3>
            <p className="text-xs text-slate-500">Demand score based on your open positions</p>
            <div className="h-[280px] mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={companyTopSkills} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 12, fontWeight: 600, fill: '#0B2447' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="demand" radius={[0, 8, 8, 0]} barSize={18}>
                    {companyTopSkills.map((e, i) => (
                      <Cell key={i} fill={i < 2 ? '#0B2447' : i < 4 ? '#2563eb' : '#93c5fd'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#0B2447]">Open Positions by Role</h3>
            <div className="mt-3 overflow-hidden border border-slate-200 rounded-xl">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs font-bold tracking-wide text-slate-500">
                  <tr>
                    <th className="text-left px-3 py-2.5">Job Role</th>
                    <th className="text-center px-3 py-2.5">Positions</th>
                    <th className="text-left px-3 py-2.5">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jobRoles.map(j => (
                    <tr key={j.role} className="hover:bg-slate-50">
                      <td className="px-3 py-3 font-semibold text-[#0B2447]">{j.role}</td>
                      <td className="px-3 py-3 text-center font-bold">{j.positions}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            j.priority === 'High'
                              ? 'bg-red-100 text-red-700 border border-red-200'
                              : 'bg-amber-100 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {j.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 leading-relaxed">
              <span className="font-bold">Prototype Insight:</span> When you post a new job above, it is instantly saved to shared mock state in localStorage. Students browsing the Student Dashboard will immediately see your posting and can analyze their skill gap against it.
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Post / Edit Job */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsPostModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[640px] max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0B2447] text-white flex items-center justify-center">
                  <Briefcase size={16} />
                </div>
                <h3 className="text-[17px] font-extrabold text-[#0B2447]">
                  {editingJob ? 'Edit Job Posting' : 'Post a New Job'}
                </h3>
              </div>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="p-6 space-y-4">
              {!editingJob && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleFillExample}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-100 transition"
                  >
                    <Sparkles size={13} /> Auto-fill Prompt Example (Java Backend Dev)
                  </button>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    JOB TITLE <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Java Backend Developer"
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2447] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    COMPANY NAME <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. ABC Technologies"
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2447] font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  JOB DESCRIPTION
                </label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Outline responsibilities, daily workflows, team dynamics..."
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
                  value={formData.requiredSkills}
                  onChange={e => setFormData({ ...formData, requiredSkills: e.target.value })}
                  placeholder="Java, Spring Boot, REST API, MySQL, Git"
                  required
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2447] font-medium"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  These skills will be matched against students' profiles during Skill Gap Analysis.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  PREFERRED SKILLS (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.preferredSkills}
                  onChange={e => setFormData({ ...formData, preferredSkills: e.target.value })}
                  placeholder="Docker, AWS"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2447]"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    EXPERIENCE
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={e => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="0-2 years"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    LOCATION
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Bangalore"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    SALARY
                  </label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={e => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="₹6-8 LPA"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    JOB TYPE
                  </label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white font-medium"
                  >
                    <option>Full-time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                    <option>Part-time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    APPLICATION DEADLINE
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-semibold border border-slate-200 rounded-full hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0B2447] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#12325f] transition shadow-sm"
                >
                  {editingJob ? 'Save Changes' : 'Post Job'}
                </button>
              </div>
            </form>
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
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/50 border border-slate-100 rounded-xl p-3">
                  {viewingJob.description || 'No description provided.'}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-1.5">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(viewingJob.requiredSkills || []).map(s => (
                    <span key={s} className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-lg">
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

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-slate-500">Application Deadline</div>
                  <div className="font-bold text-slate-800 mt-0.5">{viewingJob.deadline || 'Open'}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-slate-500">Applicant Submissions</div>
                  <div className="font-bold text-blue-700 mt-0.5">{viewingJob.applicantsCount || 0} candidates</div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setViewingJob(null)}
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
