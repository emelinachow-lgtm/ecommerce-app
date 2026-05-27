/*
  AUTH PROVIDER — Emelina
  ------------------------
  Wraps the app with authentication context.
  Persists user and token in localStorage so state
  survives page reloads.

  PROVIDES:
  - user — logged in user object { id, name, email, role }
  - token — JWT string
  - login(userData, tokenData) — saves user and token
  - logout() — clears user and token

  USED BY:
  - client/src/main.jsx — wraps entire app
  - client/src/context/useAuth.js — hook to access context
*/

import { useState } from 'react'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  // initialise from localStorage so auth state survives page reloads without a network request
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )
  const [token, setToken] = useState(
    localStorage.getItem('token') || null
  )

  const login = (userData, tokenData) => {
    // update both React state and localStorage together so they never go out of sync
    setUser(userData)
    setToken(tokenData)
    localStorage.setItem('token', tokenData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}