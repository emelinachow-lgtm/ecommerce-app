/*
  PROFILE PAGE — Khushi
  ----------------------
  Customer profile page with four tabs:
  - Account Details — view and edit name, email
  - Order History — view current cart items
  - Membership — view points balance and tier
  - Password — change password

  ENDPOINTS USED:
  - GET    /api/users/:id        — fetch user details on mount
  - PUT    /api/users/:id        — update name, email, password
  - GET    /api/cart             — fetch order history and calculate points
*/

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import api from '../api'

function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'account')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [accountError, setAccountError] = useState('')
  const [accountSuccess, setAccountSuccess] = useState('')
  const [accountLoading, setAccountLoading] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)

  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)

  const [points, setPoints] = useState(0)
  const [membershipLoading, setMembershipLoading] = useState(false)

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

  // helper — get tier based on points
  const getTier = (pts) => {
    if (pts >= 1500) return { name: 'Roaster', next: null, nextPts: null, min: 1500, max: null, color: '#1A1A1A', textColor: '#C5EBDA' }
    if (pts >= 500) return { name: 'Brewer', next: 'Roaster', nextPts: 1500, min: 500, max: 1500, color: '#C5EBDA', textColor: '#1A4D3A' }
    return { name: 'Sipper', next: 'Brewer', nextPts: 500, min: 0, max: 500, color: '#F5F5CC', textColor: '#1A1A1A' }
  }

  // helper — get progress to next tier
  const getProgress = (pts, tier) => {
    if (!tier.max) return 100
    return Math.min(((pts - tier.min) / (tier.max - tier.min)) * 100, 100)
  }

  // fetch user details on mount
  useEffect(() => {
    async function fetchUser() {
      if (!user?.id) return
      try {
        const res = await api.get(`/users/${user.id}`)
        const nameParts = res.data.name.split(' ')
        setFirstName(nameParts[0] || '')
        setLastName(nameParts.slice(1).join(' ') || '')
        setEmail(res.data.email)
      } catch (err) {
        console.error('Failed to fetch user:', err)
      }
    }
    fetchUser()
  }, [user])

  // fetch order history when orders tab clicked
  useEffect(() => {
    if (activeTab !== 'orders') return
    async function fetchOrders() {
      try {
        setOrdersLoading(true)
        const res = await api.get('/cart')
        setOrders(res.data.items || [])
      } catch (err) {
        console.error('Failed to fetch orders:', err)
      } finally {
        setOrdersLoading(false)
      }
    }
    fetchOrders()
  }, [activeTab])

  // fetch points when membership tab clicked
  useEffect(() => {
    if (activeTab !== 'membership') return
    async function fetchPoints() {
      try {
        setMembershipLoading(true)
        const res = await api.get('/cart')
        const items = res.data.items || []
        const total = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)
        setPoints(Math.floor(total))
      } catch (err) {
        console.error('Failed to fetch points:', err)
      } finally {
        setMembershipLoading(false)
      }
    }
    fetchPoints()
  }, [activeTab])

  const handleSaveAccount = async () => {
    setAccountError('')
    setAccountSuccess('')
    if (!firstName || !email) {
      setAccountError('First name and email are required')
      return
    }
    try {
      setAccountLoading(true)
      const res = await api.put(`/users/${user.id}`, {
        name: `${firstName} ${lastName}`.trim(),
        email
      })
      const updatedUser = { ...user, name: res.data.name, email: res.data.email }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setFirstName(res.data.name.split(' ')[0] || '')
      setLastName(res.data.name.split(' ').slice(1).join(' ') || '')
      setEmail(res.data.email)
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
      await api.put(`/users/${user.id}`, { password: newPassword })
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
        <div style={{
          display: 'flex', borderBottom: '1.5px solid #1A1A1A',
          marginBottom: '24px', justifyContent: 'center'
        }}>
          {['account', 'orders', 'membership', 'password'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px', fontSize: '14px', fontWeight: '700',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                color: activeTab === tab ? '#1A1A1A' : '#6B6B6B',
                background: 'none', border: 'none',
                borderBottom: activeTab === tab ? '3px solid #1A1A1A' : '3px solid transparent',
                marginBottom: '-1.5px', cursor: 'pointer', fontFamily: 'inherit'
              }}>
              {tab === 'account' ? 'Account' : tab === 'orders' ? 'Orders' : tab === 'membership' ? 'Membership' : 'Password'}
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
            <button onClick={() => { logout(); navigate('/login') }} style={dangerBtnStyle}>
              Log Out
            </button>
          </div>
        )}

        {/* orders tab */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {ordersLoading ? (
              <p style={{ textAlign: 'center', color: '#6B6B6B', fontSize: '16px' }}>Loading orders...</p>
            ) : orders.length === 0 ? (
              <div style={{
                background: '#FFFFFF', borderRadius: '20px',
                border: '0.5px solid #E8E8E4', padding: '48px', textAlign: 'center'
              }}>
                <p style={{ fontSize: '18px', color: '#6B6B6B', margin: 0 }}>No orders yet</p>
              </div>
            ) : (
              orders.map((item, i) => (
                <div key={i} style={{ background: '#F5F5CC', borderRadius: '14px', padding: '18px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A', textTransform: 'uppercase' }}>
                      {item.product?.name}
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A' }}>
                      ${item.product?.price?.toFixed(2)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#6B6B6B' }}>
                      {item.product?.variant} × {item.quantity}
                    </span>
                    <span style={{
                      fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
                      letterSpacing: '0.04em', padding: '4px 12px', borderRadius: '999px',
                      background: 'transparent', color: '#1A4D3A', border: '1.5px solid #C5EBDA'
                    }}>In Cart</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* membership tab */}
        {activeTab === 'membership' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {membershipLoading ? (
              <p style={{ textAlign: 'center', color: '#6B6B6B', fontSize: '16px' }}>Loading membership...</p>
            ) : (() => {
              const tier = getTier(points)
              const progress = getProgress(points, tier)
              return (
                <>
                  {/* current tier card */}
                  <div style={{
                    background: '#FFFFFF', borderRadius: '20px',
                    border: '0.5px solid #E8E8E4', padding: '32px 36px'
                  }}>
                    <p style={sectionTitleStyle}>Your Membership</p>

                    {/* tier badge + points */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                      <div style={{
                        width: '56px', height: '56px', borderRadius: '50%',
                        background: tier.color, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', flexShrink: 0
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={tier.textColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                          <line x1="3" y1="6" x2="21" y2="6"/>
                        </svg>
                      </div>
                      <div>
                        <p style={{
                          fontSize: '32px', fontWeight: '400', color: '#1A1A1A',
                          fontFamily: 'Jomhuria, serif', textTransform: 'uppercase',
                          margin: '0 0 2px', lineHeight: 1, letterSpacing: '0.02em'
                        }}>{tier.name}</p>
                        <p style={{ fontSize: '14px', color: '#6B6B6B', margin: 0 }}>Current tier</p>
                      </div>
                      <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                        <p style={{
                          fontSize: '40px', fontWeight: '400', color: '#1A1A1A',
                          fontFamily: 'Jomhuria, serif', margin: '0 0 2px', lineHeight: 1
                        }}>{points}</p>
                        <p style={{ fontSize: '14px', color: '#6B6B6B', margin: 0 }}>points</p>
                      </div>
                    </div>

                    {/* progress bar */}
                    {tier.next && (
                      <>
                        <div style={{
                          height: '8px', background: '#F5F5F3', borderRadius: '999px',
                          overflow: 'hidden', marginBottom: '8px'
                        }}>
                          <div style={{
                            height: '100%', width: `${progress}%`,
                            background: '#C5EBDA', borderRadius: '999px',
                            transition: 'width 0.5s ease'
                          }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <p style={{ fontSize: '13px', color: '#6B6B6B', margin: 0 }}>
                            {tier.nextPts - points} pts to <strong style={{ color: '#1A1A1A' }}>{tier.next}</strong>
                          </p>
                          <p style={{ fontSize: '13px', color: '#6B6B6B', margin: 0 }}>
                            {tier.nextPts} pts
                          </p>
                        </div>
                      </>
                    )}

                    {!tier.next && (
                      <p style={{
                        fontSize: '14px', color: '#1A4D3A', background: '#E8F7F2',
                        padding: '10px 14px', borderRadius: '8px', margin: 0, fontWeight: '700',
                        textTransform: 'uppercase', letterSpacing: '0.04em'
                      }}>
                        You've reached the highest tier!
                      </p>
                    )}
                  </div>

                  {/* perks card */}
                  <div style={{
                    background: '#FFFFFF', borderRadius: '20px',
                    border: '0.5px solid #E8E8E4', padding: '32px 36px'
                  }}>
                    <p style={sectionTitleStyle}>Your Perks</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        tier.name === 'Sipper' ? '5% off all purchases' : tier.name === 'Brewer' ? '10% off all purchases' : '15% off all purchases',
                        tier.name === 'Sipper' ? 'Earn 1 pt per $1 spent' : tier.name === 'Brewer' ? 'Earn 1.5 pts per $1 spent' : 'Earn 2 pts per $1 spent',
                        'Birthday discount',
                        ...(tier.name !== 'Sipper' ? ['Free shipping, always', 'Early access to new roasts'] : []),
                        ...(tier.name === 'Roaster' ? ['Free priority shipping', 'First dibs on exclusive drops', 'Personalised roast curation'] : []),
                      ].map((perk, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: '#1A1A1A' }}>
                          <span style={{
                            width: '20px', height: '20px', borderRadius: '50%',
                            background: '#C5EBDA', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', flexShrink: 0
                          }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A4D3A" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </span>
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* cta */}
                  <button
                    onClick={() => navigate('/subscribe')}
                    style={greenBtnStyle}>
                    View All Membership Tiers
                  </button>
                </>
              )
            })()}
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
  width: '100%', background: 'transparent', color: '#1A1A1A',
  border: '1.5px solid #1A1A1A', padding: '12px', borderRadius: '999px',
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