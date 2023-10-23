import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { FreelancerChat, AdvocacyLanding } from '@/pages'

import { useAuth } from './contexts/AuthContext'

const AppRoutes = () => {
  const { isAdminLogged } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        {/* =============================================================== */}

        <Route path="/" element={<AdvocacyLanding />} />
        <Route path="/*" element={<Navigate to="/" />} />

        {/* =============================================================== */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

// =========================================== ROUTES

interface RouteProps {
  isAuthenticated: boolean
  children: React.ReactNode
}

const PrivateAdminRoute = ({ isAuthenticated, children }: RouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/admin/entrar" replace />
  }

  return children
}

const PublicRoute = ({ isAuthenticated, children }: RouteProps) => {
  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return children
}
