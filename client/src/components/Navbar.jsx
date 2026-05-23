/*
  NAVBAR — Shraddha
  ------------------
  Main navigation bar shown on all pages except admin dashboard and welcome page.

  PROPS:
  - onCartOpen (function) — opens the cart sidebar, passed from App.jsx

  FEATURES:
  - Active link wavy underline on current page
  - Search expands below navbar when icon clicked (disabled when not logged in)
  - Profile icon navigates to /profile when logged in
  - Admin badge navigates to /admin for admin users
  - Cart icon opens CartSidebar

  CONNECTED TO:
  - App.jsx — receives onCartOpen prop
  - useAuth — checks if user is logged in and their role
  - React Router — useLocation to detect active page
*/

import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

// wavy underline SVG shown under active nav link
function WavyUnderline() {
  return (
    <svg
      width="60"
      height="8"
      viewBox="0 0 60 8"
      style={{ display: 'block', margin: '2px auto 0' }}
    >
      <path
        d="M0 4 Q7.5 1 15 4 Q22.5 7 30 4 Q37.5 1 45 4 Q52.5 7 60 4"
        stroke="#1A1A1A"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Navbar({ onCartOpen }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path ||
    (path === '/products' && location.pathname.startsWith('/products'))

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`)
      setSearchOpen(false)
      setSearchTerm('')
    }
  }

  return (
    <div>
      {/* main navbar */}
      <nav style={{
        background: '#C5EBDA',
        padding: '0 32px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1.5px solid #1A1A1A'
      }}>

        {/* logo */}
        <Link
          to="/products"
          style={{
            fontSize: '48px',
            fontWeight: '400',
            color: '#1A1A1A',
            textDecoration: 'none',
            fontFamily: 'Jomhuria, serif',
            textTransform: 'uppercase',
            lineHeight: 0.5,
            letterSpacing: '0.02em'
          }}>
          espresso<br />yourself
        </Link>

        {/* nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <div style={{ textAlign: 'center' }}>
            <Link
              to="/products"
              style={{
                fontSize: '13px', fontWeight: '700', color: '#1A1A1A',
                textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em'
              }}>
              Shop
            </Link>
            {isActive('/products') && <WavyUnderline />}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link
              to="/our-story"
              style={{
                fontSize: '13px', fontWeight: '700', color: '#1A1A1A',
                textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em'
              }}>
              Our Story
            </Link>
            {isActive('/our-story') && <WavyUnderline />}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link
              to="/subscribe"
              style={{
                fontSize: '13px', fontWeight: '700', color: '#1A1A1A',
                textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em'
              }}>
              Subscribe
            </Link>
            {isActive('/subscribe') && <WavyUnderline />}
          </div>
        </div>

        {/* right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

          {/* search icon — disabled when not logged in */}
          <button
            onClick={() => token && setSearchOpen(!searchOpen)}
            style={{
              ...iconBtnStyle,
              opacity: token ? 1 : 0.4,
              cursor: token ? 'pointer' : 'not-allowed'
            }}
            title={token ? 'Search' : 'Log in to search'}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          {/* profile icon */}
          {token ? (
            <button
              onClick={() => navigate('/profile')}
              style={iconBtnStyle}
              title="Profile">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              style={iconBtnStyle}
              title="Login">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          )}

          {/* admin badge — only shown for admin users */}
          {user?.role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              style={{
                background: '#1A1A1A', color: '#C5EBDA', border: 'none',
                padding: '4px 10px', borderRadius: '4px', fontSize: '10px',
                fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em',
                cursor: 'pointer', fontFamily: 'inherit'
              }}>
              Admin
            </button>
          )}

          {/* cart icon */}
          <button
            onClick={onCartOpen}
            style={{ ...iconBtnStyle, position: 'relative' }}
            title="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
            </svg>
          </button>

        </div>
      </nav>

      {/* search bar — expands below navbar when search icon clicked */}
      {searchOpen && (
        <div style={{
          background: '#C5EBDA',
          padding: '12px 32px 16px',
          borderBottom: '1.5px solid #1A1A1A'
        }}>
          <input
            type="text"
            placeholder="Search for a coffee..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            autoFocus
            style={{
              width: '100%', padding: '12px 20px', fontSize: '15px',
              color: '#1A1A1A', background: '#FFFFFF', border: 'none',
              borderRadius: '8px', outline: 'none', fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
          />
          <p style={{ fontSize: '12px', color: '#1A1A1A', margin: '6px 0 0', opacity: 0.6 }}>
            Press Enter to search
          </p>
        </div>
      )}
    </div>
  )
}

const iconBtnStyle = {
  background: 'none', border: 'none', cursor: 'pointer',
  padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center'
}

export default Navbar