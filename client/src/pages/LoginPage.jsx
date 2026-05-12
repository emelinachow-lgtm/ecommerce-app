/*
  LOGIN PAGE — Sahil
  -------------------
  Handles customer and admin login.
  Same page for both — role determined by JWT returned from backend.

  DEPENDENCIES:
  - useAuth from context/useAuth — stores JWT after login
  - api.js — axios instance for API calls
  - React Router — redirect after login
  - coffee-bean.png — background asset in client/src/assets/

  ENDPOINTS USED:
  - POST /api/auth/login — verify credentials, return JWT

  FLOW:
  - User submits email + password
  - On success: call login() from useAuth, redirect to /
  - On failure: show error message below form

  NOTE:
  - Google and Facebook buttons are UI only — no real OAuth needed for assessment
*/

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import api from '../api'
import coffeeBean from '../assets/coffee-bean.png'

const beans = [
  { top: '2%',  left: '8%',  size: 100, rotate: -30 },
  { top: '-2%', left: '30%', size: 80,  rotate: 15  },
  { top: '-1%', left: '52%', size: 110, rotate: -10 },
  { top: '1%',  left: '72%', size: 85,  rotate: 25  },
  { top: '0%',  left: '90%', size: 100, rotate: -20 },
  { top: '22%', left: '-2%', size: 120, rotate: 40  },
  { top: '20%', left: '93%', size: 100, rotate: -35 },
  { top: '42%', left: '1%',  size: 90,  rotate: 20  },
  { top: '44%', left: '91%', size: 80,  rotate: -15 },
  { top: '62%', left: '4%',  size: 110, rotate: -25 },
  { top: '60%', left: '89%', size: 95,  rotate: 30  },
  { top: '76%', left: '-1%', size: 85,  rotate: 10  },
  { top: '74%', left: '28%', size: 100, rotate: -40 },
  { top: '80%', left: '58%', size: 90,  rotate: 20  },
  { top: '76%', left: '88%', size: 105, rotate: -10 },
  { top: '91%', left: '14%', size: 95,  rotate: 35  },
  { top: '89%', left: '74%', size: 85,  rotate: -20 },
]

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      const res = await api.post('/auth/login', { email, password })
      login(res.data.user, res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #C5EBDA 0%, #F5F5CC 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* scattered coffee beans */}
      {beans.map((bean, i) => (
        <img
          key={i}
          src={coffeeBean}
          alt=""
          style={{
            position: 'absolute',
            top: bean.top,
            left: bean.left,
            width: `${bean.size}px`,
            height: `${bean.size}px`,
            objectFit: 'contain',
            transform: `rotate(${bean.rotate}deg)`,
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0
          }}
        />
      ))}

      {/* login card */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E8E8E4',
        padding: '44px 48px',
        width: '100%',
        maxWidth: '480px',
        position: 'relative',
        zIndex: 1,
        boxShadow: '0 8px 40px rgba(0,0,0,0.06)'
      }}>

        {/* heading */}
        <p style={{
          fontSize: '52px',
          fontWeight: '400',
          color: '#1A1A1A',
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          margin: '0 0 24px',
          fontFamily: 'Jomhuria, serif',
          lineHeight: 1
        }}>Log In</p>

        {/* error message */}
        {error && (
          <p style={{
            fontSize: '14px',
            color: '#C0392B',
            background: '#FDEDEC',
            padding: '10px 14px',
            borderRadius: '8px',
            margin: '0 0 16px'
          }}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>

          {/* email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="Example@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* password */}
          <div style={{ marginBottom: '8px' }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="at least 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* forgot password */}
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <span style={{
              fontSize: '14px',
              color: '#2980B9',
              cursor: 'pointer'
            }}>Forgot Password?</span>
          </div>

          {/* sign in button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: '#1A1A1A',
              color: '#FFFFFF',
              border: 'none',
              padding: '15px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginBottom: '20px',
              fontFamily: 'inherit'
            }}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

        </form>

        {/* or divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '14px'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#E8E8E4' }} />
          <span style={{ fontSize: '14px', color: '#6B6B6B' }}>Or</span>
          <div style={{ flex: 1, height: '1px', background: '#E8E8E4' }} />
        </div>

        {/* google button */}
        <button style={{
          width: '100%',
          background: '#F5F5F3',
          color: '#1A1A1A',
          border: 'none',
          padding: '13px',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          fontFamily: 'inherit'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </button>

        {/* facebook button */}
        <button style={{
          width: '100%',
          background: '#F5F5F3',
          color: '#1A1A1A',
          border: 'none',
          padding: '13px',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          fontFamily: 'inherit'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Sign in with Facebook
        </button>

        {/* sign up link */}
        <p style={{
          fontSize: '15px',
          color: '#1A1A1A',
          textAlign: 'center',
          margin: 0
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            color: '#2980B9',
            fontWeight: '700',
            textDecoration: 'none'
          }}>Sign up</Link>
        </p>

      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: '15px',
  fontWeight: '600',
  color: '#1A1A1A',
  marginBottom: '6px'
}

const inputStyle = {
  width: '100%',
  background: '#FFFFFF',
  border: '1px solid #D0D0D0',
  borderRadius: '8px',
  padding: '12px 14px',
  fontSize: '15px',
  color: '#1A1A1A',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  outline: 'none'
}

export default LoginPage