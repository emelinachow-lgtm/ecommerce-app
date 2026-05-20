/*
  ERROR PAGE — Sahil
  -------------------
  404 page shown when a route doesn't exist.

  ASSETS:
  - iced-coffee.png — save to client/src/assets/

  CONNECTED TO:
  - App.jsx — catch-all route at the bottom:
    <Route path="*" element={<ErrorPage />} />
*/

import { useNavigate } from 'react-router-dom'
import icedCoffee from '../assets/iced-coffee.png'

function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFAF5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 48px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '48px',
        maxWidth: '800px',
        width: '100%'
      }}>

        {/* left — 404 + coffee image */}
        <div style={{
          position: 'relative',
          flexShrink: 0,
          width: '280px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <p style={{
            fontSize: '130px',
            fontWeight: '900',
            color: '#1A1A1A',
            fontFamily: 'Jomhuria, serif',
            margin: 0,
            lineHeight: 1,
            position: 'relative',
            zIndex: 1
          }}>404</p>

          <img
            src={icedCoffee}
            alt="Iced coffee"
            style={{
              width: '240px',
              objectFit: 'contain',
              marginTop: '-40px',
              position: 'relative',
              zIndex: 0
            }}
          />
        </div>

        {/* right — message */}
        <div style={{ textAlign: 'left' }}>
          <p style={{
            fontSize: '38px',
            fontWeight: '900',
            color: '#1A1A1A',
            margin: '0 0 16px',
            lineHeight: 1.2
          }}>Something's missing</p>
          <p style={{
            fontSize: '18px',
            color: '#1A1A1A',
            margin: '0 0 32px',
            lineHeight: 1.6,
            maxWidth: '320px'
          }}>
            This page is missing or you assembled the link incorrectly.
          </p>
          <button
            onClick={() => navigate('/products')}
            style={{
              background: '#C5EBDA',
              color: '#1A1A1A',
              border: 'none',
              padding: '14px 32px',
              borderRadius: '999px',
              fontSize: '16px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}>
            Back to Shop
          </button>
        </div>

      </div>
    </div>
  )
}

export default ErrorPage