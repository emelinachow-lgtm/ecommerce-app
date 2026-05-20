/*
  REGISTER PAGE — Sahil
  ----------------------
  Handles new user registration.

  DEPENDENCIES:
  - useAuth from context/useAuth — stores JWT after register
  - api.js — axios instance for API calls
  - React Router — redirect after register
  - coffee-bean.png — background asset in client/src/assets/

  ENDPOINTS USED:
  - POST /api/auth/register — create account, return JWT
*/

import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
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

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, token } = useAuth()
  const navigate = useNavigate()

  if (token) return <Navigate to='/products' />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    try {
      setLoading(true)
      const res = await api.post('/auth/register', { name, email, password })
      login(res.data.user, res.data.token)
      navigate('/products')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
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

        <p style={{
          fontSize: '52px',
          fontWeight: '400',
          color: '#1A1A1A',
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          margin: '0 0 24px',
          fontFamily: 'Jomhuria, serif',
          lineHeight: 1
        }}>Sign Up</p>

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

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={inputStyle}
            />
          </div>

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

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="at least 8 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ ...inputStyle, paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="re-enter your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                style={{ ...inputStyle, paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

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
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

        </form>

        <p style={{ fontSize: '15px', color: '#1A1A1A', textAlign: 'center', margin: 0 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#2980B9', fontWeight: '700', textDecoration: 'none' }}>
            Log in
          </Link>
        </p>

      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block', fontSize: '15px', fontWeight: '600',
  color: '#1A1A1A', marginBottom: '6px'
}

const inputStyle = {
  width: '100%', background: '#FFFFFF', border: '1px solid #D0D0D0',
  borderRadius: '8px', padding: '12px 14px', fontSize: '15px',
  color: '#1A1A1A', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none'
}

export default RegisterPage