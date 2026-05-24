/*
  OUR STORY PAGE — Khushi
  ------------------------
  Uses the landing animation to tell the story of Espresso Yourself.
  Same scroll-driven animation as the welcome page.
  Includes a floating back button to return to the shop.

  CONNECTED TO:
  - client/src/components/Navbar.jsx — linked from Our Story nav item
  - client/src/components/HomePage.jsx — reuses landing animation
*/

import { useNavigate } from 'react-router-dom'
import HomePage from '../components/HomePage'

function OurStoryPage() {
  const navigate = useNavigate()

  return (
    <>
      <HomePage hideSkip={true} />
      <button
        onClick={() => navigate('/products')}
        style={{
          position: 'fixed', top: '24px', left: '24px', zIndex: 999,
          background: 'rgba(255,255,255,0.8)', border: '1.5px solid #1A1A1A',
          padding: '8px 20px', borderRadius: '999px', fontSize: '13px',
          fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em',
          cursor: 'pointer', fontFamily: 'inherit', pointerEvents: 'auto'
        }}>
        ← Back
      </button>
    </>
  )
}

export default OurStoryPage