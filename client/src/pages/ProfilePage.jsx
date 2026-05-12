/*
  PROFILE PAGE — Khushi
  ----------------------
  Customer profile page with three tabs:
  - Account Details — view and edit name, email, delivery address
  - Order History — view past orders
  - Password — change password

  DEPENDENCIES:
  - useAuth from context/useAuth — gets logged in user
  - api.js — axios instance for API calls
  - React Router — redirect after delete account

  ENDPOINTS USED:
  - GET    /api/users/:id        — fetch user details on mount
  - PUT    /api/users/:id        — update name, email, address
  - DELETE /api/users/:id        — delete account
  - GET    /api/cart             — fetch order history (uses cart data)

  TO DO:
  - Replace dummy data with real API calls in Week 3
  - Connect order history to real cart/order data
*/

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import api from '../api'

const dummyOrders = [
  {
    _id: 'EY-1042',
    date: '4 May 2026',
    items: [
      { name: 'Wild Child — 1kg Whole Bean', quantity: 2, price: 58.00 },
      { name: 'House Blend — 500g Ground', quantity: 1, price: 22.00 }
    ],
    total: 80.00
  },
  {
    _id: 'EY-0987',
    date: '18 Apr 2026',
    items: [
      { name: 'Head Honcho — 250g Ground', quantity: 1, price: 19.50 }
    ],
    total: 19.50
  },
  {
    _id: 'EY-0856',
    date: '2 Mar 2026',
    items: [
      { name: 'Smooth Talker — 1kg Whole Bean', quantity: 1, price: 32.00 },
      { name: 'Happy Chappy — 500g Ground', quantity: 2, price: 44.00 }
    ],
    total: 76.00
  }
]

function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('account')
  const [firstName, setFirstName] = useState('Jamie')
  const [lastName, setLastName] = useState('Lee')
  const [email, setEmail] = useState('jamie@gmail.com')
  const [address, setAddress] = useState('123 Collins St, Melbourne VIC 3000')
  const [accountError, setAccountError] = useState('')
  const [accountSuccess, setAccountSuccess] = useState('')
  const [accountLoading, setAccountLoading] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

  const handleSaveAccount = async () => {
    setAccountError('')
    setAccountSuccess('')
    if (!firstName || !email) {
      setAccountError('First name and email are required')
      return
    }
    try {
      setAccountLoading(true)
      // TODO Week 3: await api.put(`/users/${user.id}`, { name: `${firstName} ${lastName}`, email })
      setAccountSuccess('Account details updated successfully')
    } catch (err) {
      setAccountError(err.response?.data?.message || 'Failed to update account')
    } finally {
      setAccountLoading(false)
    }
  }

  const handleUpdatePassword = async () => {
    setPasswordError('')
    setPasswordSuccess('')
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill in all fields')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      return
    }
    try {
      setPasswordLoading(true)
      // TODO Week 3: await api.put(`/users/${user.id}`, { password: newPassword })
      setPasswordSuccess('Password updated successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to update password')
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return
    try {
      // TODO Week 3: await api.delete(`/users/${user.id}`)
      logout()
      navigate('/login')
    } catch (err) {
      setAccountError('Failed to delete account')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF5' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '40px 28px' }}>

        {/* avatar */}
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: '#C5EBDA', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '24px', fontWeight: '900',
          color: '#1A1A1A', margin: '0 auto 12px'
        }}>{initials}</div>

        {/* name */}
        <p style={{
          fontSize: '34px', fontWeight: '400', color: '#1A1A1A',
          textAlign: 'center', margin: '0 0 4px',
          fontFamily: 'Jomhuria, serif', textTransform: 'uppercase',
          letterSpacing: '0.02em', lineHeight: 1
        }}>{firstName} {lastName}</p>

        {/* email */}
        <p style={{
          fontSize: '15px', color: '#6B6B6B',
          textAlign: 'center', margin: '0 0 24px'
        }}>{email}</p>

        {/* tabs */}
        <div style={{ display: 'flex', borderBottom: '1.5px solid #1A1A1A', marginBottom: '24px' }}>
          {['account', 'orders', 'password'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 24px', fontSize: '14px', fontWeight: '700',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                color: activeTab === tab ? '#1A1A1A' : '#6B6B6B',
                background: 'none', border: 'none',
                borderBottom: activeTab === tab ? '3px solid #1A1A1A' : '3px solid transparent',
                marginBottom: '-1.5px', cursor: 'pointer', fontFamily: 'inherit'
              }}>
              {tab === 'account' ? 'Account Details' : tab === 'orders' ? 'Order History' : 'Password'}
            </button>
          ))}
        </div>

        {/* account tab */}
        {activeTab === 'account' && (
          <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '0.5px solid #E8E8E4', padding: '32px 36px' }}>
            <p style={sectionTitleStyle}>Personal information</p>
            {accountError && <p style={errorStyle}>{accountError}</p>}
            {accountSuccess && <p style={successStyle}>{accountSuccess}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={labelStyle}>First name</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Last name</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Delivery address</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} style={inputStyle} />
              </div>
            </div>
            {user?.role === 'admin' && (
              <button onClick={() => navigate('/admin')} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '14px', fontWeight: '700', color: '#1A1A1A',
                textDecoration: 'underline', textTransform: 'uppercase',
                letterSpacing: '0.04em', padding: 0, marginBottom: '16px',
                display: 'block', fontFamily: 'inherit'
              }}>Go to Admin Dashboard →</button>
            )}
            <button onClick={handleSaveAccount} disabled={accountLoading} style={greenBtnStyle}>
              {accountLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button onClick={handleDeleteAccount} style={dangerBtnStyle}>Delete Account</button>
          </div>
        )}

        {/* orders tab */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {dummyOrders.map(order => (
              <div key={order._id} style={{ background: '#F5F5CC', borderRadius: '14px', padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Order #{order._id}</span>
                  <span style={{ fontSize: '13px', color: '#6B6B6B' }}>{order.date}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', color: '#1A1A1A' }}>{item.name} × {item.quantity}</span>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#1A1A1A' }}>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '0.5px solid #E8E8E4', paddingTop: '12px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#1A1A1A' }}>Total ${order.total.toFixed(2)} AUD</span>
                  <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', padding: '4px 12px', borderRadius: '999px', background: 'transparent', color: '#1A4D3A', border: '1.5px solid #C5EBDA' }}>Completed</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* password tab */}
        {activeTab === 'password' && (
          <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '0.5px solid #E8E8E4', padding: '32px 36px' }}>
            <p style={sectionTitleStyle}>Change password</p>
            {passwordError && <p style={errorStyle}>{passwordError}</p>}
            {passwordSuccess && <p style={successStyle}>{passwordSuccess}</p>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <div>
                <label style={labelStyle}>Current password</label>
                <input type="password" placeholder="••••••••" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>New password</label>
                <input type="password" placeholder="at least 8 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Confirm new password</label>
                <input type="password" placeholder="re-enter new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={inputStyle} />
              </div>
            </div>
            <button onClick={handleUpdatePassword} disabled={passwordLoading} style={greenBtnStyle}>
              {passwordLoading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

const sectionTitleStyle = {
  fontSize: '13px', fontWeight: '700', color: '#1A1A1A',
  textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 16px'
}

const labelStyle = {
  display: 'block', fontSize: '12px', fontWeight: '700',
  color: '#1A1A1A', textTransform: 'uppercase',
  letterSpacing: '0.06em', marginBottom: '6px'
}

const inputStyle = {
  width: '100%', background: '#F5F5F3', border: 'none',
  borderRadius: '10px', padding: '12px 14px', fontSize: '15px',
  color: '#1A1A1A', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none'
}

const greenBtnStyle = {
  width: '100%', background: '#C5EBDA', color: '#1A1A1A',
  border: 'none', padding: '14px', borderRadius: '999px',
  fontSize: '15px', fontWeight: '700', textTransform: 'uppercase',
  letterSpacing: '0.05em', cursor: 'pointer', marginBottom: '12px', fontFamily: 'inherit'
}

const dangerBtnStyle = {
  width: '100%', background: 'transparent', color: '#C0392B',
  border: '1.5px solid #C0392B', padding: '12px', borderRadius: '999px',
  fontSize: '14px', fontWeight: '700', textTransform: 'uppercase',
  letterSpacing: '0.05em', cursor: 'pointer', fontFamily: 'inherit'
}

const errorStyle = {
  fontSize: '14px', color: '#C0392B', background: '#FDEDEC',
  padding: '10px 14px', borderRadius: '8px', margin: '0 0 16px'
}

const successStyle = {
  fontSize: '14px', color: '#1A4D3A', background: '#E8F7F2',
  padding: '10px 14px', borderRadius: '8px', margin: '0 0 16px'
}

export default ProfilePage