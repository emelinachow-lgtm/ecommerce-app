import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import screen1 from '../assets/screen1.svg'
import screen2 from '../assets/screen2.svg'
import screen3 from '../assets/screen3.svg'
import screen4 from '../assets/screen4.svg'
import upperEl from '../assets/UPPER_EL.svg'
import upperElB from '../assets/UPPER_EL-1.svg'
import lowerEl from '../assets/LOWER_EL.svg'
import lowerElB from '../assets/LOWER_EL-1.svg'
import group5 from '../assets/Group_5.svg'
import group5b from '../assets/Group_5-1.svg'
import group10 from '../assets/Group_10.svg'
import el1 from '../assets/1.png'
import el2 from '../assets/2.png'
import el3 from '../assets/3.png'
import el4 from '../assets/4.png'
import el5 from '../assets/5.png'
import el6 from '../assets/6.png'
import el7 from '../assets/7.png'
import el8 from '../assets/8.png'
import el9 from '../assets/9.png'
import el10 from '../assets/10.png'

const CHERRY_ITEMS = [
  { id: 'upperEl', rotateMax: -40, slideX: 50, origin: 'top left' },
  { id: 'upperElB', rotateMax: 55, slideX: -80, origin: 'top right' },
  { id: 's1-el1', rotateMax: -30, slideX: 70, origin: 'center center' },
  { id: 's1-el3', rotateMax: -35, slideX: 0, origin: 'center bottom', centerX: true },
  { id: 's1-el4', rotateMax: 45, slideX: -90, origin: 'bottom right' },
]

const FUNNEL_ITEMS = [
  { id: 'group5', rotateDir: 1 },
  { id: 'group5b', rotateDir: -1 },
  { id: 's2-el1', rotateDir: 1 },
  { id: 's2-el2', rotateDir: -1 },
  { id: 's2-el3', rotateDir: 1 },
  { id: 's2-el4', rotateDir: -1 },
]

const PARALLAX_ITEMS = [
  { id: 'group10', factor: 0.14, baseTransform: 'translateX(-50%)' },
  { id: 'el5', factor: 0.16, baseTransform: '' },
  { id: 'el6', factor: 0.18, baseTransform: '' },
  { id: 'el7', factor: 0.20, baseTransform: '' },
  { id: 'el8', factor: 0.21, baseTransform: '' },
  { id: 'lowerEl', factor: 0.22, baseTransform: '' },
  { id: 'lowerElB', factor: 0.23, baseTransform: '' },
  { id: 'el9', factor: 0.24, baseTransform: '' },
  { id: 'el10', factor: 0.25, baseTransform: '' },
]

const pageStyle = {
  position: 'relative',
  margin: 0,
  padding: 0,
  width: '100%',
  overflowX: 'hidden',
}

const sectionStyle = (image) => ({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100vh',
  margin: 0,
  padding: 0,
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
})

const floatStyle = {
  position: 'absolute',
  pointerEvents: 'none',
  willChange: 'transform, opacity',
}

const pngStyle = {
  mixBlendMode: 'multiply',
}

function HomePage() {
  const elementRefs = useRef({})
  const funnelAnchors = useRef({})
  const navigate = useNavigate()
  const animFrameRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const measureFunnelAnchors = () => {
      FUNNEL_ITEMS.forEach(({ id }) => {
        const node = elementRefs.current[id]
        if (!node) return
        const prev = node.style.transform
        node.style.transform = 'none'
        const rect = node.getBoundingClientRect()
        node.style.transform = prev
        funnelAnchors.current[id] = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        }
      })
    }

    let ticking = false

    const updateScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      const s1Progress = Math.min(scrollY / vh, 1)
      const s2Progress = Math.min(Math.max((scrollY - vh) / vh, 0), 1)

      const hillsLayer = elementRefs.current.hillsLayer
      if (hillsLayer) hillsLayer.style.opacity = String(1 - s1Progress)

      const screen1Bg = elementRefs.current.screen1Bg
      if (screen1Bg) {
        if (s1Progress > 0) {
          const hillsStart = 38
          const fadeEdge = hillsStart + (100 - hillsStart) * (1 - s1Progress)
          const mask = `linear-gradient(to bottom, black 0%, black ${hillsStart}%, transparent ${fadeEdge}%)`
          screen1Bg.style.webkitMaskImage = mask
          screen1Bg.style.maskImage = mask
        } else {
          screen1Bg.style.webkitMaskImage = ''
          screen1Bg.style.maskImage = ''
        }
      }

      const cherryFade = s1Progress < 1
        ? 1
        : Math.max(0, 1 - (scrollY - vh) / (vh * 0.4))

      CHERRY_ITEMS.forEach(({ id, rotateMax, slideX, origin, centerX }) => {
        const node = elementRefs.current[id]
        if (!node) return
        const rotate = s1Progress * rotateMax
        const x = s1Progress * slideX
        const tx = centerX ? 'translateX(-50%) ' : ''
        node.style.transformOrigin = origin
        node.style.transform = `${tx}translate(${x}px, ${scrollY}px) rotate(${rotate}deg)`
        node.style.opacity = String(cherryFade)
      })

      const targetX = window.innerWidth / 2
      const targetY = vh * 0.78
      const pinY = Math.max(0, scrollY - vh)
      const swirl = Math.sin(s2Progress * Math.PI) * 35

      FUNNEL_ITEMS.forEach(({ id, rotateDir }) => {
        const node = elementRefs.current[id]
        const anchor = funnelAnchors.current[id]
        if (!node || !anchor) return
        const baseY = anchor.y - scrollY + pinY
        const pullX = (targetX - anchor.x) * s2Progress
        const pullY = (targetY - baseY) * s2Progress
        const rotate = s2Progress * rotateDir * (160 + swirl)
        const scale = 1 - s2Progress * 0.5
        const fade = 1 - s2Progress * 0.9
        node.style.transformOrigin = 'center center'
        node.style.transform = `translateY(${pinY}px) translate(${pullX}px, ${pullY}px) rotate(${rotate}deg) scale(${scale})`
        node.style.opacity = String(fade)
      })

      PARALLAX_ITEMS.forEach(({ id, factor, baseTransform }) => {
        const node = elementRefs.current[id]
        if (!node) return
        const y = scrollY * factor
        node.style.transform = baseTransform
          ? `${baseTransform} translateY(${y}px)`
          : `translateY(${y}px)`
      })

      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(updateScroll)
    }

    const onResize = () => {
      measureFunnelAnchors()
      onScroll()
    }

    measureFunnelAnchors()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    updateScroll()

    const scrollTimer = setTimeout(() => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      console.log('totalScroll:', totalScroll)

      if (totalScroll <= 0) {
        navigate('/products')
        return
      }

      const duration = 10000
      const startTime = Date.now()

      const autoScroll = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress

        const scrollPos = totalScroll * eased
        document.documentElement.scrollTop = scrollPos
        document.body.scrollTop = scrollPos

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(autoScroll)
        } else {
          navigate('/products')
        }
      }

      animFrameRef.current = requestAnimationFrame(autoScroll)
    }, 1500)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      clearTimeout(scrollTimer)
    }
  }, [navigate])

  const setRef = (id) => (node) => {
    elementRefs.current[id] = node
  }

  const handleSkip = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    navigate('/products')
  }

  return (
    <div style={pageStyle}>

      {/* skip button */}
      <button
        onClick={handleSkip}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 999,
          background: 'rgba(255,255,255,0.8)',
          border: '1.5px solid #1A1A1A',
          padding: '8px 20px',
          borderRadius: '999px',
          fontSize: '13px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}>
        Skip →
      </button>

      {/* Section 1 */}
      <section style={{
        position: 'relative',
        overflow: 'visible',
        width: '100%',
        height: '100vh',
        margin: 0,
        padding: 0,
        backgroundColor: '#F5F5CC',
        zIndex: 2,
      }}>
        <div
          ref={setRef('screen1Bg')}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${screen1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div
          ref={setRef('hillsLayer')}
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '58%',
            backgroundImage: `url(${screen1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none',
            zIndex: 1,
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
          }}
        />
        <img ref={setRef('upperEl')} src={upperEl} alt="" style={{ ...floatStyle, top: 0, left: -40, width: 280, zIndex: 10 }} />
        <img ref={setRef('upperElB')} src={upperElB} alt="" style={{ ...floatStyle, top: -60, right: -120, width: 520, zIndex: 11 }} />
        <img ref={setRef('s1-el1')} src={el1} alt="" style={{ ...floatStyle, ...pngStyle, top: '36%', left: -25, width: 260, zIndex: 12 }} />
        <img ref={setRef('s1-el3')} src={el3} alt="" style={{ ...floatStyle, ...pngStyle, bottom: -45, left: '50%', width: 240, zIndex: 12 }} />
        <img ref={setRef('s1-el4')} src={el4} alt="" style={{ ...floatStyle, ...pngStyle, bottom: -30, right: -70, width: 420, zIndex: 13 }} />
      </section>

      {/* Section 2 */}
      <section style={{ ...sectionStyle(screen2), overflow: 'visible', zIndex: 3 }}>
        <img ref={setRef('group5')} src={group5} alt="" style={{ ...floatStyle, top: 0, left: -60, width: 350, zIndex: 10 }} />
        <img ref={setRef('group5b')} src={group5b} alt="" style={{ ...floatStyle, top: 0, right: -60, width: 350, zIndex: 10 }} />
        <img ref={setRef('s2-el1')} src={el1} alt="" style={{ ...floatStyle, ...pngStyle, top: '28%', left: '8%', width: 200, zIndex: 11 }} />
        <img ref={setRef('s2-el2')} src={el2} alt="" style={{ ...floatStyle, ...pngStyle, top: '22%', left: '42%', width: 200, zIndex: 11 }} />
        <img ref={setRef('s2-el3')} src={el3} alt="" style={{ ...floatStyle, ...pngStyle, top: '48%', left: '18%', width: 200, zIndex: 11 }} />
        <img ref={setRef('s2-el4')} src={el4} alt="" style={{ ...floatStyle, ...pngStyle, top: '40%', right: '8%', width: 200, zIndex: 11 }} />
      </section>

      {/* Section 3 */}
      <section style={{ ...sectionStyle(screen3), zIndex: 2 }}>
        <img ref={setRef('group10')} src={group10} alt="" style={{ ...floatStyle, top: 50, left: '50%', width: 600, transform: 'translateX(-50%)' }} />
        <img ref={setRef('el5')} src={el5} alt="" style={{ ...floatStyle, ...pngStyle, top: '12%', left: '8%', width: 180 }} />
        <img ref={setRef('el6')} src={el6} alt="" style={{ ...floatStyle, ...pngStyle, top: '18%', right: '10%', width: 180 }} />
        <img ref={setRef('el7')} src={el7} alt="" style={{ ...floatStyle, ...pngStyle, bottom: '18%', left: '12%', width: 180 }} />
        <img ref={setRef('el8')} src={el8} alt="" style={{ ...floatStyle, ...pngStyle, bottom: '14%', right: '8%', width: 180 }} />
      </section>

      {/* Section 4 */}
      <section style={sectionStyle(screen4)}>
        <img ref={setRef('lowerEl')} src={lowerEl} alt="" style={{ ...floatStyle, bottom: 0, left: -40, width: 400 }} />
        <img ref={setRef('lowerElB')} src={lowerElB} alt="" style={{ ...floatStyle, bottom: 0, right: -40, width: 400 }} />
        <img ref={setRef('el9')} src={el9} alt="" style={{ ...floatStyle, ...pngStyle, bottom: 24, left: 24, width: 200 }} />
        <img ref={setRef('el10')} src={el10} alt="" style={{ ...floatStyle, ...pngStyle, bottom: 24, right: 24, width: 200 }} />
      </section>

    </div>
  )
}

export default HomePage