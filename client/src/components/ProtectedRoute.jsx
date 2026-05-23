/*
  PROTECTED ROUTE — Emelina
  --------------------------
  Wraps routes that require authentication.
  Redirects to /login if no token is found.
  Redirects to / if adminOnly is true and user is not an admin.

  PROPS:
  - children — the page/component to render if authorised
  - adminOnly (boolean) — if true, only admins can access

  USAGE:
  <ProtectedRoute>
    <ProductsPage />
  </ProtectedRoute>

  <ProtectedRoute adminOnly={true}>
    <AdminPage />
  </ProtectedRoute>
*/

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, token } = useAuth()

  if (!token) return <Navigate to='/login' />
  if (adminOnly && user?.role !== 'admin') return <Navigate to='/' />

  return children
}

export default ProtectedRoute