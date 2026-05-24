/*
  SUBSCRIBE PAGE — Shraddha 
  ------------------------------------
  Membership tiers page showing Sipper, Brewer and Roaster tiers
  with perks and points required to unlock each tier.

  CONNECTED TO:
  - client/src/components/Navbar.jsx — linked from Subscribe nav item
*/

import { useNavigate } from 'react-router-dom'

function SubscribePage() {
  const navigate = useNavigate()

  const tiers = [
    {
      id: 'sipper',
      name: 'Sipper',
      pts: '0 – 499 pts',
      discount: '5% off every order',
      iconBg: '#F5F5CC',
      iconStroke: '#1A1A1A',
      discountBg: '#F5F5CC',
      discountColor: '#1A1A1A',
      btnLabel: 'Your Starting Tier',
      btnStyle: { background: 'transparent', color: '#1A1A1A', border: '1.5px solid #1A1A1A' },
      perks: [
        { text: '5% off all purchases', active: true },
        { text: 'Earn 1 pt per $1 spent', active: true },
        { text: 'Birthday discount', active: true },
        { text: 'No early access', active: false },
        { text: 'No free shipping', active: false },
      ]
    },
    {
      id: 'brewer',
      name: 'Brewer',
      pts: '500 – 1,499 pts',
      discount: '10% off every order',
      iconBg: '#C5EBDA',
      iconStroke: '#1A4D3A',
      discountBg: '#C5EBDA',
      discountColor: '#1A4D3A',
      btnLabel: 'Unlock at 500 pts',
      btnStyle: { background: '#C5EBDA', color: '#1A1A1A', border: 'none' },
      perks: [
        { text: '10% off all purchases', active: true },
        { text: 'Earn 1.5 pts per $1 spent', active: true },
        { text: 'Free shipping, always', active: true },
        { text: 'Early access to new roasts', active: true },
        { text: 'No exclusive drops', active: false },
      ]
    },
    {
      id: 'roaster',
      name: 'Roaster',
      pts: '1,500+ pts',
      discount: '15% off every order',
      iconBg: '#1A1A1A',
      iconStroke: '#C5EBDA',
      discountBg: '#1A1A1A',
      discountColor: '#C5EBDA',
      btnLabel: 'Unlock at 1,500 pts',
      btnStyle: { background: '#1A1A1A', color: '#FFFFFF', border: 'none' },
      perks: [
        { text: '15% off all purchases', active: true },
        { text: 'Earn 2 pts per $1 spent', active: true },
        { text: 'Free priority shipping', active: true },
        { text: 'First dibs on exclusive drops', active: true },
        { text: 'Personalised roast curation', active: true },
      ]
    }
  ]

  return (
    <div style={{ background: '#FAFAF5', minHeight: '100vh', padding: '60px 32px', textAlign: 'center', fontFamily: 'Karla, sans-serif' }}>

      {/* eyebrow */}
      <p style={{
        fontSize: '15px', fontWeight: '700', letterSpacing: '0.1em',
        textTransform: 'uppercase', color: '#6B6B6B', margin: '0 0 30px'
      }}>Membership Tiers</p>

      {/* heading */}
      <p style={{
        fontFamily: 'Jomhuria, serif', fontSize: '90px', fontWeight: '400',
        color: '#1A1A1A', lineHeight: 0.5, textTransform: 'uppercase',
        margin: '0 0 24px'
      }}>
        The more you sip,<br />the more you save.
      </p>

      {/* subheading */}
      <p style={{
        fontSize: '16px', color: '#6B6B6B', maxWidth: '400px',
        margin: '0 auto 48px', lineHeight: 1.6
      }}>
        Every order moves you up the ladder. Better discounts, earlier access, more perks — just for showing up.
      </p>

      {/* tier cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px', maxWidth: '900px', margin: '0 auto 40px', alignItems: 'stretch'
      }}>
        {tiers.map(tier => (
          <div
            key={tier.id}
            onMouseEnter={e => e.currentTarget.style.border = '2px solid #1A1A1A'}
            onMouseLeave={e => e.currentTarget.style.border = '0.5px solid #E8E8E4'}
            style={{
              background: '#FFFFFF', borderRadius: '20px',
              border: '0.5px solid #E8E8E4',
              padding: '28px 24px', textAlign: 'left',
              transition: 'border 0.15s ease',
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column'
            }}>

            {/* icon */}
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: tier.iconBg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', marginBottom: '16px'
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={tier.iconStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
              </svg>
            </div>

            {/* name */}
            <p style={{
              fontSize: '22px', fontWeight: '700', color: '#1A1A1A',
              textTransform: 'uppercase', margin: '0 0 4px', letterSpacing: '0.04em'
            }}>{tier.name}</p>

            {/* points */}
            <p style={{
              fontSize: '13px', fontWeight: '700', color: '#6B6B6B',
              textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 14px'
            }}>{tier.pts}</p>

            {/* discount badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '14px', fontWeight: '700', padding: '8px 16px',
              borderRadius: '999px', marginBottom: '20px',
              background: tier.discountBg, color: tier.discountColor
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
              </svg>
              {tier.discount}
            </div>

            {/* divider */}
            <div style={{ height: '0.5px', background: '#E8E8E4', margin: '0 0 16px' }} />

            {/* perks */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tier.perks.map((perk, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: perk.active ? '#1A1A1A' : '#6B6B6B' }}>
                  <span style={{
                    width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                    background: perk.active ? '#C5EBDA' : '#F0F0F0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {perk.active ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A4D3A" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    )}
                  </span>
                  {perk.text}
                </li>
              ))}
            </ul>

            {/* button */}
            <button
              onClick={() => navigate('/profile', { state: { tab: 'membership' } })}
              style={{
                width: '100%', padding: '14px', borderRadius: '999px',
                fontSize: '14px', fontWeight: '700', textTransform: 'uppercase',
                letterSpacing: '0.06em', cursor: 'pointer', fontFamily: 'inherit',
                marginTop: 'auto',
                ...tier.btnStyle
              }}>
              {tier.btnLabel}
            </button>

          </div>
        ))}
      </div>

      {/* footer */}
      <p style={{ fontSize: '14px', color: '#6B6B6B' }}>
        Already a customer?{' '}
        <strong style={{ color: '#1A1A1A' }}>Your points are being tracked automatically.</strong>{' '}
        <span
          onClick={() => navigate('/login')}
          style={{ color: '#1A1A1A', textDecoration: 'underline', cursor: 'pointer', fontWeight: '700' }}>
          Log in to check your tier.
        </span>
      </p>

    </div>
  )
}

export default SubscribePage