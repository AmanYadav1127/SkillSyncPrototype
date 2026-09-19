// Shared data layer using localStorage for prototype multi-role synchronization

export const STORAGE_KEYS = {
  CURRENT_USER: 'skillsync_current_user',
  JOBS: 'skillsync_jobs',
  CAMPS: 'skillsync_camps',
  GOV_OPPORTUNITIES: 'skillsync_government_opportunities',
  STUDENT_PROFILE: 'skillsync_student_profile',
  APPLICATIONS: 'skillsync_applications',
  CAMP_REGISTRATIONS: 'skillsync_camp_registrations',
}

export const INITIAL_COMPANIES = [
  'ABC Technologies',
  'TechNova Solutions',
  'TCS',
  'Infosys',
  'Tech Mahindra',
  'Wipro',
]

export const INITIAL_STUDENT_PROFILE = {
  name: 'Rahul Sharma',
  email: 'student@example.com',
  education: 'B.Tech Computer Science',
  targetRole: 'Full Stack Developer',
  college: 'COEP Technological University, Pune',
  location: 'Pune, Maharashtra',
  skills: ['Java', 'Python', 'React', 'SQL', 'Git', 'Data Structures'],
  readiness: 72,
}

export const INITIAL_JOBS = [
  {
    id: 'job-1',
    title: 'Java Backend Developer',
    company: 'ABC Technologies',
    description: 'We are seeking an enthusiastic Java Backend Developer to build robust microservices, scalable REST APIs, and database integrations for high-throughput enterprise systems.',
    requiredSkills: ['Java', 'Spring Boot', 'REST API', 'MySQL', 'Git'],
    preferredSkills: ['Docker', 'AWS', 'Kafka'],
    experience: '0-2 years',
    location: 'Bangalore',
    salary: '₹6-8 LPA',
    type: 'Full-time',
    deadline: '2026-11-15',
    postedDate: '2026-09-18',
    applicantsCount: 18,
    status: 'Active',
  },
  {
    id: 'job-2',
    title: 'React Developer',
    company: 'TechNova Solutions',
    description: 'Join our frontend engineering team to craft high-performance, accessible, and responsive user interfaces using React, TypeScript, and modern component systems.',
    requiredSkills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Git'],
    preferredSkills: ['Redux Toolkit', 'TailwindCSS', 'Next.js'],
    experience: '1-3 years',
    location: 'Pune',
    salary: '₹7-10 LPA',
    type: 'Full-time',
    deadline: '2026-11-30',
    postedDate: '2026-09-15',
    applicantsCount: 34,
    status: 'Active',
  },
  {
    id: 'job-3',
    title: 'Full Stack Developer',
    company: 'Infosys',
    description: 'Looking for a versatile Full Stack Developer skilled in modern web development across both client and server layers with agile release cycles.',
    requiredSkills: ['React', 'Node.js', 'SQL', 'REST API', 'Git'],
    preferredSkills: ['PostgreSQL', 'Docker', 'Jest'],
    experience: '0-2 years',
    location: 'Mumbai',
    salary: '₹8-11 LPA',
    type: 'Full-time',
    deadline: '2026-12-05',
    postedDate: '2026-09-12',
    applicantsCount: 52,
    status: 'Active',
  },
  {
    id: 'job-4',
    title: 'Data Analyst',
    company: 'TCS',
    description: 'Analyze real-time commercial datasets, create executive dashboards, and translate business intelligence into actionable stakeholder strategies.',
    requiredSkills: ['Python', 'SQL', 'Data Structures', 'Excel'],
    preferredSkills: ['PowerBI', 'Pandas', 'Tableau'],
    experience: '0-1 year',
    location: 'Hyderabad',
    salary: '₹5-7 LPA',
    type: 'Full-time',
    deadline: '2026-11-20',
    postedDate: '2026-09-14',
    applicantsCount: 41,
    status: 'Active',
  },
  {
    id: 'job-5',
    title: 'Software Engineer Intern',
    company: 'Tech Mahindra',
    description: 'Exciting 6-month pre-placement internship opportunity for final year engineering students to learn industrial enterprise software development.',
    requiredSkills: ['Java', 'Data Structures', 'Git', 'SQL'],
    preferredSkills: ['Spring Boot', 'Problem Solving'],
    experience: 'Fresher / College Intern',
    location: 'Bangalore',
    salary: '₹25,000 / month Stipend',
    type: 'Internship',
    deadline: '2026-10-25',
    postedDate: '2026-09-16',
    applicantsCount: 88,
    status: 'Active',
  },
  {
    id: 'job-6',
    title: 'Cloud Engineer',
    company: 'Wipro',
    description: 'Architect, configure, and maintain scalable cloud infrastructure, container orchestration, and continuous deployment automation.',
    requiredSkills: ['Linux', 'Cloud', 'Docker', 'Git'],
    preferredSkills: ['AWS', 'Kubernetes', 'Terraform'],
    experience: '1-3 years',
    location: 'Delhi NCR',
    salary: '₹9-13 LPA',
    type: 'Full-time',
    deadline: '2026-12-10',
    postedDate: '2026-09-10',
    applicantsCount: 29,
    status: 'Active',
  },
]

export const INITIAL_CAMPS = [
  {
    id: 'camp-1',
    name: 'Advanced Java & Spring Boot Training Camp',
    domain: 'Java Backend Development',
    description: 'Intensive hands-on skill development program funded by Maharashtra State Skill Development Mission covering modern microservices, Spring Boot, and enterprise SQL.',
    date: '2026-10-20',
    startTime: '09:30 AM',
    endTime: '04:30 PM',
    location: 'Bangalore / Pune Tech Hub',
    eligibility: 'B.Tech/BE/BCA/MCA 3rd & 4th Year Students',
    seats: 100,
    deadline: '2026-10-15',
    organizer: 'Govt. of Maharashtra Skill Mission & NASSCOM',
    skillsCovered: ['Java', 'Spring Boot', 'REST API', 'MySQL'],
    mode: 'Hybrid (Online + Lab Sessions)',
    status: 'Open',
  },
  {
    id: 'camp-2',
    name: 'Full Stack Development Bootcamp',
    domain: 'Web Application Engineering',
    description: 'Comprehensive 4-week state-sponsored bootcamp equipping engineering graduates with practical full-stack deployment skills and real-world project portfolios.',
    date: '2026-11-05',
    startTime: '10:00 AM',
    endTime: '05:00 PM',
    location: 'Mumbai Innovation Center',
    eligibility: 'Any graduate or final year student with basic coding knowledge',
    seats: 150,
    deadline: '2026-10-30',
    organizer: 'Maharashtra State Innovation Society (MSInS)',
    skillsCovered: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    mode: 'In-person & Mentored',
    status: 'Open',
  },
  {
    id: 'camp-3',
    name: 'Cloud Computing & DevOps Training Camp',
    domain: 'Cloud Infrastructure',
    description: 'Learn modern cloud architecture, container management with Docker, and CI/CD pipeline automation under certified industry mentors.',
    date: '2026-11-18',
    startTime: '11:00 AM',
    endTime: '03:30 PM',
    location: 'Pune Digital Campus',
    eligibility: 'CS/IT and allied engineering disciplines',
    seats: 80,
    deadline: '2026-11-10',
    organizer: 'Directorate of Technical Education (DTE)',
    skillsCovered: ['Cloud', 'Docker', 'Linux', 'Git'],
    mode: 'Virtual Classroom',
    status: 'Open',
  },
  {
    id: 'camp-4',
    name: 'Cybersecurity Awareness & Skills Camp',
    domain: 'Information Security',
    description: 'Specialized state training program on ethical hacking, threat hunting, secure coding practices, and national cyber defense frameworks.',
    date: '2026-12-01',
    startTime: '10:00 AM',
    endTime: '04:00 PM',
    location: 'Nagpur IT Park',
    eligibility: 'Open to all technical students and IT professionals',
    seats: 120,
    deadline: '2026-11-25',
    organizer: 'Maharashtra Cyber Police & CDAC',
    skillsCovered: ['Cybersecurity', 'Network Security', 'Linux'],
    mode: 'Hybrid',
    status: 'Open',
  },
]

export const INITIAL_GOV_OPPORTUNITIES = [
  {
    id: 'opp-1',
    title: 'Government Digital Skills Internship',
    organization: 'Government of Maharashtra - MahaIT',
    type: 'Government Internship',
    description: 'Work alongside government tech specialists on statewide e-governance applications, citizen service portals, and public digital infrastructure.',
    eligibility: 'Final year B.Tech/BE/MCA students with min 60% aggregate',
    requiredSkills: ['JavaScript', 'React', 'Git', 'SQL'],
    location: 'Bangalore & Mumbai (Hybrid)',
    deadline: '2026-10-30',
    benefits: '₹18,000 / month Stipend + Official Government Merit Certificate + Project Experience',
    applicationLink: 'https://mahait.org/internships-2026',
    postedDate: '2026-09-15',
    status: 'Active',
  },
  {
    id: 'opp-2',
    title: 'Digital Skills & Emerging Tech Scholarship',
    organization: 'Ministry of Electronics & Information Technology (MeitY)',
    type: 'Scholarship',
    description: 'Financial assistance scheme providing up to ₹75,000 for students pursuing approved advanced certifications in Cloud, AI, and Full Stack technologies.',
    eligibility: 'Undergraduate students currently enrolled in AICTE approved institutions',
    requiredSkills: ['Python', 'Java', 'Data Structures'],
    location: 'All Maharashtra Districts',
    deadline: '2026-11-20',
    benefits: 'Full tuition fee reimbursement for approved certifications + Mentorship',
    applicationLink: 'https://meity.gov.in/scholarships/digital-skills',
    postedDate: '2026-09-12',
    status: 'Active',
  },
  {
    id: 'opp-3',
    title: 'Maharashtra State IT Apprenticeship Program',
    organization: 'Maharashtra State Skill Development Society (MSSDS)',
    type: 'Apprenticeship',
    description: '1-year paid national apprenticeship in public sector technology cells, automated testing, and citizen database maintenance.',
    eligibility: 'Recent graduates (2025/2026 batches)',
    requiredSkills: ['Java', 'SQL', 'Git'],
    location: 'Pune & Mumbai',
    deadline: '2026-11-15',
    benefits: '₹22,000 / month Stipend + NATS Certification + Direct PSU Interview Eligibility',
    applicationLink: 'https://mssds.gov.in/apprenticeships',
    postedDate: '2026-09-14',
    status: 'Active',
  },
  {
    id: 'opp-4',
    title: 'Statewide Cybersecurity Certification Program',
    organization: 'Maharashtra Cyber Defense Cell',
    type: 'Certification Program',
    description: 'Government-sponsored professional security training & accredited credentialing on cloud and critical infrastructure security.',
    eligibility: 'Students & young developers interested in security operations',
    requiredSkills: ['Linux', 'Networking', 'Python'],
    location: 'Online / Maharashtra Virtual Academy',
    deadline: '2026-12-01',
    benefits: 'Govt accredited certificate + placement assistance in cybersecurity firms',
    applicationLink: 'https://mahacyber.gov.in/certification',
    postedDate: '2026-09-10',
    status: 'Active',
  },
]

// Initialize LocalStorage with seed data if not present
export function initializeStorage() {
  if (typeof window === 'undefined') return

  if (!localStorage.getItem(STORAGE_KEYS.STUDENT_PROFILE)) {
    localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILE, JSON.stringify(INITIAL_STUDENT_PROFILE))
  }
  if (!localStorage.getItem(STORAGE_KEYS.JOBS)) {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOBS))
  }
  if (!localStorage.getItem(STORAGE_KEYS.CAMPS)) {
    localStorage.setItem(STORAGE_KEYS.CAMPS, JSON.stringify(INITIAL_CAMPS))
  }
  if (!localStorage.getItem(STORAGE_KEYS.GOV_OPPORTUNITIES)) {
    localStorage.setItem(STORAGE_KEYS.GOV_OPPORTUNITIES, JSON.stringify(INITIAL_GOV_OPPORTUNITIES))
  }
  if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify([
      {
        id: 'app-seed-1',
        type: 'job',
        itemId: 'job-3',
        title: 'Full Stack Developer',
        organization: 'Infosys',
        appliedDate: '2026-09-17',
        status: 'Under Review',
      },
    ]))
  }
  if (!localStorage.getItem(STORAGE_KEYS.CAMP_REGISTRATIONS)) {
    localStorage.setItem(STORAGE_KEYS.CAMP_REGISTRATIONS, JSON.stringify([
      {
        id: 'reg-seed-1',
        campId: 'camp-2',
        campName: 'Full Stack Development Bootcamp',
        registeredDate: '2026-09-16',
        status: 'Confirmed',
      },
    ]))
  }
}

// Event dispatcher to notify all components in the same window/tabs
function notifyStorageUpdate(key, data) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('skillsync_storage_update', { detail: { key, data } }))
  }
}

// ----------------- Auth State -----------------

export function getCurrentUser() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.error('Error reading current user:', e)
    return null
  }
}

export function setCurrentUser(user) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
  notifyStorageUpdate(STORAGE_KEYS.CURRENT_USER, user)
}

export function logoutUser() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  notifyStorageUpdate(STORAGE_KEYS.CURRENT_USER, null)
}

// ----------------- Jobs -----------------

export function getJobs() {
  initializeStorage()
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.JOBS)
    return raw ? JSON.parse(raw) : INITIAL_JOBS
  } catch {
    return INITIAL_JOBS
  }
}

export function saveJob(job) {
  const jobs = getJobs()
  const existsIndex = jobs.findIndex(j => j.id === job.id)
  let updated
  if (existsIndex >= 0) {
    updated = [...jobs]
    updated[existsIndex] = { ...updated[existsIndex], ...job }
  } else {
    const newJob = {
      ...job,
      id: job.id || `job-${Date.now()}`,
      postedDate: job.postedDate || new Date().toISOString().split('T')[0],
      applicantsCount: job.applicantsCount ?? Math.floor(Math.random() * 15) + 3,
      status: job.status || 'Active',
    }
    updated = [newJob, ...jobs]
  }
  localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(updated))
  notifyStorageUpdate(STORAGE_KEYS.JOBS, updated)
  return updated
}

export function deleteJob(jobId) {
  const jobs = getJobs().filter(j => j.id !== jobId)
  localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs))
  notifyStorageUpdate(STORAGE_KEYS.JOBS, jobs)
  return jobs
}

export function toggleJobStatus(jobId) {
  const jobs = getJobs().map(j => {
    if (j.id === jobId) {
      return { ...j, status: j.status === 'Active' ? 'Closed' : 'Active' }
    }
    return j
  })
  localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs))
  notifyStorageUpdate(STORAGE_KEYS.JOBS, jobs)
  return jobs
}

// ----------------- Camps -----------------

export function getCamps() {
  initializeStorage()
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CAMPS)
    return raw ? JSON.parse(raw) : INITIAL_CAMPS
  } catch {
    return INITIAL_CAMPS
  }
}

export function saveCamp(camp) {
  const camps = getCamps()
  const existsIndex = camps.findIndex(c => c.id === camp.id)
  let updated
  if (existsIndex >= 0) {
    updated = [...camps]
    updated[existsIndex] = { ...updated[existsIndex], ...camp }
  } else {
    const newCamp = {
      ...camp,
      id: camp.id || `camp-${Date.now()}`,
      status: camp.status || 'Open',
    }
    updated = [newCamp, ...camps]
  }
  localStorage.setItem(STORAGE_KEYS.CAMPS, JSON.stringify(updated))
  notifyStorageUpdate(STORAGE_KEYS.CAMPS, updated)
  return updated
}

export function deleteCamp(campId) {
  const camps = getCamps().filter(c => c.id !== campId)
  localStorage.setItem(STORAGE_KEYS.CAMPS, JSON.stringify(camps))
  notifyStorageUpdate(STORAGE_KEYS.CAMPS, camps)
  return camps
}

// ----------------- Government Opportunities -----------------

export function getGovOpportunities() {
  initializeStorage()
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GOV_OPPORTUNITIES)
    return raw ? JSON.parse(raw) : INITIAL_GOV_OPPORTUNITIES
  } catch {
    return INITIAL_GOV_OPPORTUNITIES
  }
}

export function saveGovOpportunity(opp) {
  const opps = getGovOpportunities()
  const existsIndex = opps.findIndex(o => o.id === opp.id)
  let updated
  if (existsIndex >= 0) {
    updated = [...opps]
    updated[existsIndex] = { ...updated[existsIndex], ...opp }
  } else {
    const newOpp = {
      ...opp,
      id: opp.id || `opp-${Date.now()}`,
      postedDate: opp.postedDate || new Date().toISOString().split('T')[0],
      status: opp.status || 'Active',
    }
    updated = [newOpp, ...opps]
  }
  localStorage.setItem(STORAGE_KEYS.GOV_OPPORTUNITIES, JSON.stringify(updated))
  notifyStorageUpdate(STORAGE_KEYS.GOV_OPPORTUNITIES, updated)
  return updated
}

export function deleteGovOpportunity(oppId) {
  const opps = getGovOpportunities().filter(o => o.id !== oppId)
  localStorage.setItem(STORAGE_KEYS.GOV_OPPORTUNITIES, JSON.stringify(opps))
  notifyStorageUpdate(STORAGE_KEYS.GOV_OPPORTUNITIES, opps)
  return opps
}

// ----------------- Student Profile & Skills -----------------

export function getStudentProfile() {
  initializeStorage()
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENT_PROFILE)
    return raw ? JSON.parse(raw) : INITIAL_STUDENT_PROFILE
  } catch {
    return INITIAL_STUDENT_PROFILE
  }
}

export function saveStudentProfile(profile) {
  localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILE, JSON.stringify(profile))
  notifyStorageUpdate(STORAGE_KEYS.STUDENT_PROFILE, profile)
  return profile
}

export function addStudentSkill(newSkill) {
  if (!newSkill || !newSkill.trim()) return getStudentProfile()
  const profile = getStudentProfile()
  const cleanSkill = newSkill.trim()
  const exists = profile.skills.some(s => s.toLowerCase() === cleanSkill.toLowerCase())
  if (exists) return profile

  const updated = {
    ...profile,
    skills: [...profile.skills, cleanSkill],
  }
  return saveStudentProfile(updated)
}

export function removeStudentSkill(skillToRemove) {
  const profile = getStudentProfile()
  const updated = {
    ...profile,
    skills: profile.skills.filter(s => s.toLowerCase() !== skillToRemove.toLowerCase()),
  }
  return saveStudentProfile(updated)
}

// ----------------- Student Applications & Registrations -----------------

export function getStudentApplications() {
  initializeStorage()
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function applyToOpportunity(item, type = 'job') {
  const applications = getStudentApplications()
  const alreadyApplied = applications.some(a => a.itemId === item.id && a.type === type)
  if (alreadyApplied) return applications

  const newApp = {
    id: `app-${Date.now()}`,
    type,
    itemId: item.id,
    title: item.title,
    organization: item.company || item.organization,
    location: item.location,
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Applied',
  }
  const updated = [newApp, ...applications]
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated))
  notifyStorageUpdate(STORAGE_KEYS.APPLICATIONS, updated)
  return updated
}

export function isItemApplied(itemId, type = 'job') {
  const applications = getStudentApplications()
  return applications.some(a => a.itemId === itemId && a.type === type)
}

export function getCampRegistrations() {
  initializeStorage()
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CAMP_REGISTRATIONS)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function registerForCamp(camp) {
  const registrations = getCampRegistrations()
  const alreadyRegistered = registrations.some(r => r.campId === camp.id)
  if (alreadyRegistered) return registrations

  const newReg = {
    id: `reg-${Date.now()}`,
    campId: camp.id,
    campName: camp.name,
    domain: camp.domain,
    date: camp.date,
    location: camp.location,
    registeredDate: new Date().toISOString().split('T')[0],
    status: 'Registered',
  }
  const updated = [newReg, ...registrations]
  localStorage.setItem(STORAGE_KEYS.CAMP_REGISTRATIONS, JSON.stringify(updated))
  notifyStorageUpdate(STORAGE_KEYS.CAMP_REGISTRATIONS, updated)
  return updated
}

export function isCampRegistered(campId) {
  const registrations = getCampRegistrations()
  return registrations.some(r => r.campId === campId)
}

// ----------------- Rule-based Skill Gap Matcher -----------------

export function calculateSkillGap(studentSkills = [], requiredSkills = []) {
  if (!requiredSkills || requiredSkills.length === 0) {
    return {
      matched: [],
      missing: [],
      matchPercentage: 100,
      recommendedSkills: [],
    }
  }

  const normalizedStudent = studentSkills.map(s => s.toLowerCase().trim())
  const matched = []
  const missing = []

  requiredSkills.forEach(req => {
    const cleanReq = req.trim()
    const reqLower = cleanReq.toLowerCase()
    // match exact or substring (e.g. "React" matches "React.js")
    const isMatched = normalizedStudent.some(st => 
      st === reqLower || 
      (reqLower.startsWith('react') && st.startsWith('react')) ||
      (reqLower.startsWith('sql') && st.includes('sql')) ||
      (reqLower.includes(st) && st.length > 3)
    )

    if (isMatched) {
      matched.push(cleanReq)
    } else {
      missing.push(cleanReq)
    }
  })

  const matchPercentage = Math.min(100, Math.round((matched.length / requiredSkills.length) * 100))

  return {
    matched,
    missing,
    matchPercentage,
    recommendedSkills: missing,
  }
}
