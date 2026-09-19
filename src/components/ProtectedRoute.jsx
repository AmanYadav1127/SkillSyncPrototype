import { getCurrentUser, setCurrentUser } from '../utils/storage'

const defaultUsers = {
  student: { role: 'student', email: 'student@example.com', name: 'Rahul Sharma', title: 'B.Tech CS Student', avatar: 'RS' },
  company: { role: 'company', email: 'company@example.com', name: 'ABC Technologies', title: 'Enterprise Recruiter', avatar: 'ABC' },
  government: { role: 'government', email: 'government@example.com', name: 'Govt. of Maharashtra', title: 'Skill Development Directorate', avatar: 'MH' },
}

export default function ProtectedRoute({ role, children }) {
  const user = getCurrentUser()

  // If user is not logged in or role differs, smoothly establish session for requested portal
  if (!user || (role && user.role !== role)) {
    if (role && defaultUsers[role]) {
      setCurrentUser(defaultUsers[role])
    }
  }

  return children
}
