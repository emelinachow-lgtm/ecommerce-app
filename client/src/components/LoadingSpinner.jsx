/*
  LOADING SPINNER — Khushi
  -------------------------
  Coffee bean sliding along a progress bar animation.
  Shown while data is fetching on any page.

  USAGE:
  import LoadingSpinner from '../components/LoadingSpinner'
  if (loading) return <LoadingSpinner />

  ASSETS:
  - coffee-bean.png — already in client/src/assets/
*/

import { useEffect, useState } from 'react'
import coffeeBean from '../assets/coffee-bean.png'

function LoadingSpinner() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let current = 0
    let direction = 1

    const interval = setInterval(() => {
      current += direction * 1.2
      if (current >= 100) { current = 100; direction = -1 }
      if (current <= 0) { current = 0; direction = 1 }
      setProgress(current)
    }, 16)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px'
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '0.5px solid #E8E8E4',
        padding: '60px 48px',
        width: '100%',
        maxWidth: '560px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '28px'
      }}>

        {/* progress bar + bean */}
        <div style={{
          width: '100%',
          position: 'relative',
          height: '48px',
          display: 'flex',
          alignItems: 'center'
        }}>

          {/* track */}
          <div style={{
            position: 'absolute',
            left: '24px',
            right: '24px',
            height: '3px',
            background: 'transparent',
            border: '1.5px solid #1A1A1A',
            borderRadius: '999px'
          }} />

          {/* fill */}
          <div style={{
            position: 'absolute',
            left: '24px',
            width: `calc(${progress}% * (100% - 48px) / 100)`,
            height: '3px',
            background: '#C5956A',
            borderRadius: '999px'
          }} />

          {/* coffee bean */}
          <img
            src={coffeeBean}
            alt="Loading"
            style={{
              position: 'absolute',
              left: `calc(24px + ${progress}% * (100% - 48px) / 100)`,
              transform: 'translateX(-50%)',
              width: '48px',
              height: '48px',
              objectFit: 'contain',
              mixBlendMode: 'multiply'
            }}
          />
        </div>

        {/* loading text */}
        <p style={{
          fontSize: '32px',
          fontWeight: '900',
          color: '#1A1A1A',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          margin: 0,
          fontFamily: 'Jomhuria, serif'
        }}>Loading</p>

      </div>
    </div>
  )
}

export default LoadingSpinner