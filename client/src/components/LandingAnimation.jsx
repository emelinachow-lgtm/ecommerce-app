import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Red coffee cherries — start near the plant edges ───────────────────────
// startX / startY are vw/vh offsets from image center (set via gsap.set)
const CHERRIES = [
  { src: '/images/image 33.png', startX: '-38vw', startY: '-12vh', size: 88 },
  { src: '/images/image 34.png', startX: '-26vw', startY:  '10vh', size: 66 },
  { src: '/images/image 35.png', startX: '-42vw', startY:  '24vh', size: 78 },
  { src: '/images/image 44.png', startX: '-16vw', startY: '-30vh', size: 62 },
  { src: '/images/image 47.png', startX:  '36vw', startY: '-20vh', size: 82 },
  { src: '/images/image 48.png', startX:  '42vw', startY:   '6vh', size: 72 },
  { src: '/images/image 45.png', startX:  '28vw', startY:  '24vh', size: 66 },
  { src: '/images/image 36.png', startX:  '20vw', startY: '-34vh', size: 58 },
  { src: '/images/image 43.png', startX: '-10vw', startY:  '28vh', size: 62 },
  { src: '/images/image 50.png', startX:  '12vw', startY:  '30vh', size: 72 },
]

// ─── Roasted brown beans ─────────────────────────────────────────────────────
const BEANS = [
  { src: '/images/image 60.png', size: 72 },
  { src: '/images/image 61.png', size: 66 },
  { src: '/images/image 62.png', size: 76 },
  { src: '/images/image 63.png', size: 70 },
  { src: '/images/image 68.png', size: 74 },
  { src: '/images/image 71.png', size: 62 },
  { src: '/images/image 72.png', size: 68 },
  { src: '/images/image 73.png', size: 72 },
]

// Bean scattered start positions before funnelling
const BEAN_STARTS = [
  { x: '-24vw', y:  '10vh' },
  { x: '-14vw', y:  '24vh' },
  { x:   '2vw', y:  '14vh' },
  { x:  '20vw', y:   '4vh' },
  { x: '-32vw', y:  '-4vh' },
  { x:  '28vw', y:  '20vh' },
  { x:  '-6vw', y: '-16vh' },
  { x:  '16vw', y: '-22vh' },
]

function LandingAnimation() {
  const wrapperRef    = useRef(null)
  const sceneRef      = useRef(null)
  const plantLeftRef  = useRef(null)
  const plantRightRef = useRef(null)
  const titleRef      = useRef(null)
  const finalTitleRef = useRef(null)
  const filterRef     = useRef(null)
  const affogatoRef   = useRef(null)
  const espressoRef   = useRef(null)
  const scrollHintRef = useRef(null)
  const phaseLabelRef = useRef(null)
  const cherryRefs    = useRef([])
  const beanRefs      = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Set all initial hidden states ────────────────────────────────────
      gsap.set(titleRef.current,      { opacity: 0, y: 35 })
      gsap.set(finalTitleRef.current, { opacity: 0, y: 25 })
      gsap.set(filterRef.current,     { opacity: 0, y: 90 })
      gsap.set(affogatoRef.current,   { opacity: 0, y: 110, scale: 0.65 })
      gsap.set(espressoRef.current,   { opacity: 0, scaleY: 0 })
      gsap.set(phaseLabelRef.current, { opacity: 0 })

      // Cherries — hidden, offset from center toward the plants
      cherryRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, {
          x: CHERRIES[i].startX,
          y: CHERRIES[i].startY,
          opacity: 0,
          scale: 0.6,
        })
      })

      // Beans — hidden, clustered loosely in center
      beanRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, {
          x: BEAN_STARTS[i]?.x || '0vw',
          y: BEAN_STARTS[i]?.y || '0vh',
          opacity: 0,
          scale: 0.75,
        })
      })

      // ── Master scroll-driven timeline ────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top top',
          end: '+=700%',       // 7× viewport height of scroll space
          pin: true,
          scrub: 1.4,          // smooth lag for cinematic feel
          anticipatePin: 1,
        },
      })

      // ════════════════════════════════════════════════════════════════════
      // PHASE 1 — Hero title fades in (t: 0 → 0.6)
      // ════════════════════════════════════════════════════════════════════
      tl.to(titleRef.current, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
      }, 0)

      // ════════════════════════════════════════════════════════════════════
      // PHASE 2 — Cherries burst from plants (t: 0.6 → 1.8)
      // ════════════════════════════════════════════════════════════════════
      cherryRefs.current.forEach((el, i) => {
        if (!el) return
        tl.to(el, {
          opacity: 1, scale: 1, duration: 0.18, ease: 'back.out(2)',
        }, 0.6 + i * 0.07)
      })

      // Plants start sliding outward
      tl.to(plantLeftRef.current,  { x: '-22vw', duration: 0.9 }, 0.8)
      tl.to(plantRightRef.current, { x:  '22vw', duration: 0.9 }, 0.8)

      // ════════════════════════════════════════════════════════════════════
      // PHASE 3 — Cherries gather centre, plants exit (t: 1.8 → 2.8)
      // ════════════════════════════════════════════════════════════════════
      tl.to(scrollHintRef.current, { opacity: 0, duration: 0.3 }, 1.5)
      tl.to(titleRef.current,      { opacity: 0, y: -50, duration: 0.4 }, 1.7)
      tl.to(plantLeftRef.current,  { x: '-48vw', opacity: 0, duration: 0.5 }, 1.9)
      tl.to(plantRightRef.current, { x:  '48vw', opacity: 0, duration: 0.5 }, 1.9)

      // Cherries drift into loose orbital cluster at centre
      cherryRefs.current.forEach((el, i) => {
        if (!el) return
        const angle  = (i / CHERRIES.length) * Math.PI * 2
        const radius = 20
        tl.to(el, {
          x: `${(Math.cos(angle) * radius).toFixed(1)}vw`,
          y: `${(Math.sin(angle) * radius * 0.55).toFixed(1)}vh`,
          rotation: gsap.utils.random(-40, 40),
          duration: 0.8,
        }, 1.9 + i * 0.04)
      })

      // ════════════════════════════════════════════════════════════════════
      // PHASE 4 — Cherry → Bean roasting transition (t: 2.8 → 3.8)
      // ════════════════════════════════════════════════════════════════════
      // "Roasting..." phase label
      tl.to(phaseLabelRef.current, { opacity: 1, duration: 0.3 }, 2.7)
      tl.to(phaseLabelRef.current, { opacity: 0, duration: 0.3 }, 3.5)

      // Cherries shrink and spin out
      cherryRefs.current.forEach((el, i) => {
        if (!el) return
        tl.to(el, {
          opacity: 0, scale: 0.5, rotation: '+=120', duration: 0.28,
        }, 2.8 + i * 0.035)
      })

      // Beans pop in, replacing cherries
      beanRefs.current.forEach((el, i) => {
        if (!el) return
        tl.to(el, {
          opacity: 1, scale: 1, duration: 0.22, ease: 'back.out(1.2)',
        }, 2.95 + i * 0.045)
      })

      // ════════════════════════════════════════════════════════════════════
      // PHASE 5 — Filter rises, beans funnel in (t: 3.8 → 5.4)
      // ════════════════════════════════════════════════════════════════════
      tl.to(filterRef.current, {
        opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
      }, 3.8)

      // Each bean spirals and shrinks into the filter opening
      beanRefs.current.forEach((el, i) => {
        if (!el) return
        tl.to(el, {
          x: `${gsap.utils.random(-2, 2)}vw`,
          y: '22vh',
          rotation: gsap.utils.random(-540, 540),
          scale: 0.1,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.in',
        }, 4.1 + i * 0.07)
      })

      // ════════════════════════════════════════════════════════════════════
      // PHASE 6 — Espresso drips (t: 5.4 → 6.4)
      // ════════════════════════════════════════════════════════════════════
      tl.to(espressoRef.current, {
        opacity: 1, scaleY: 1, duration: 0.55, ease: 'power1.out',
      }, 5.4)

      tl.to(filterRef.current, {
        opacity: 0, y: -70, duration: 0.45,
      }, 5.8)

      // ════════════════════════════════════════════════════════════════════
      // PHASE 7 — Affogato + brand reveal (t: 6.4 → 7.5)
      // ════════════════════════════════════════════════════════════════════
      tl.to(espressoRef.current, { opacity: 0, duration: 0.35 }, 6.3)

      tl.to(affogatoRef.current, {
        opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.3)',
      }, 6.3)

      tl.to(finalTitleRef.current, {
        opacity: 1, y: 0, duration: 0.55, ease: 'power2.out',
      }, 6.9)

    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  // ── Shared style helpers ─────────────────────────────────────────────────
  const absoluteCenter = (size) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -size / 2,
    marginLeft: -size / 2,
    width: size,
    height: size,
    objectFit: 'contain',
    pointerEvents: 'none',
    zIndex: 5,
  })

  return (
    // wrapperRef scopes gsap.context — keeps cleanup tight
    <div ref={wrapperRef}>
      <section
        ref={sceneRef}
        style={{
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          // Matches the MacBook_Pro_16_Prototype gradient: mint → pale yellow → warm green
          background: 'linear-gradient(180deg, #9ED8CE 0%, #F0F0A0 52%, #C0D46E 100%)',
        }}
      >

        {/* ── PLANT GROUP LEFT ─────────────────────────────────────────── */}
        <div
          ref={plantLeftRef}
          style={{ position: 'absolute', left: 0, top: 0, width: '30%', height: '100%', pointerEvents: 'none' }}
        >
          <img src="/images/1 1.png"  alt="" style={{ position: 'absolute', top:  '4%', left: '-6%',  width: 195 }} />
          <img src="/images/2 1.png"  alt="" style={{ position: 'absolute', top: '32%', left: '-9%',  width: 178 }} />
          <img src="/images/5 1.png"  alt="" style={{ position: 'absolute', top: '60%', left: '-4%',  width: 165 }} />
        </div>

        {/* ── PLANT GROUP RIGHT ────────────────────────────────────────── */}
        <div
          ref={plantRightRef}
          style={{ position: 'absolute', right: 0, top: 0, width: '30%', height: '100%', pointerEvents: 'none' }}
        >
          <img src="/images/1 2.png"  alt="" style={{ position: 'absolute', top:  '1%', right: '-6%', width: 215 }} />
          <img src="/images/4 42.png" alt="" style={{ position: 'absolute', top: '28%', right: '-9%', width: 188 }} />
          <img src="/images/6 1.png"  alt="" style={{ position: 'absolute', top: '56%', right: '-4%', width: 162 }} />
        </div>

        {/* ── HERO TITLE ───────────────────────────────────────────────── */}
        <div
          ref={titleRef}
          style={{
            position: 'absolute', top: '10%', left: 0, right: 0,
            textAlign: 'center', zIndex: 10,
          }}
        >
          <h1 style={{
            fontFamily: 'Jomhuria, serif',
            fontSize: 'clamp(70px, 13vw, 155px)',
            fontWeight: 400,
            textTransform: 'uppercase',
            lineHeight: 0.85,
            color: '#C8920A',
            letterSpacing: '0.02em',
          }}>
            SMELL<br />COFFEE
          </h1>
        </div>

        {/* ── PHASE LABEL (ROASTING...) ────────────────────────────────── */}
        <div
          ref={phaseLabelRef}
          style={{
            position: 'absolute', top: '10%', left: 0, right: 0,
            textAlign: 'center', zIndex: 10,
          }}
        >
          <p style={{
            margin: 0,
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#1A1A1A',
          }}>
            Roasting...
          </p>
        </div>

        {/* ── CHERRY IMAGES (centred, GSAP moves them) ─────────────────── */}
        {CHERRIES.map((cherry, i) => (
          <img
            key={`cherry-${i}`}
            ref={el => { cherryRefs.current[i] = el }}
            src={cherry.src}
            alt=""
            style={absoluteCenter(cherry.size)}
          />
        ))}

        {/* ── BEAN IMAGES (centred, GSAP moves them) ───────────────────── */}
        {BEANS.map((bean, i) => (
          <img
            key={`bean-${i}`}
            ref={el => { beanRefs.current[i] = el }}
            src={bean.src}
            alt=""
            style={absoluteCenter(bean.size)}
          />
        ))}

        {/* ── FILTER CONE ──────────────────────────────────────────────── */}
        {/* marginLeft = -(width/2) so centering doesn't need CSS transform */}
        <img
          ref={filterRef}
          src="/images/Group 7.png"
          alt="coffee filter"
          style={{
            position: 'absolute',
            bottom: '14%',
            left: '50%',
            marginLeft: -155,
            width: 310,
            objectFit: 'contain',
            zIndex: 6,
            pointerEvents: 'none',
            transformOrigin: 'bottom center',
          }}
        />

        {/* ── ESPRESSO DRIP (SVG) ───────────────────────────────────────── */}
        <svg
          ref={espressoRef}
          viewBox="0 0 44 190"
          width="44"
          height="190"
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            marginLeft: -22,
            zIndex: 7,
            transformOrigin: 'top center',
            overflow: 'visible',
          }}
        >
          {/* Stream */}
          <rect x="18" y="0" width="8" height="115" rx="4" fill="#3A1705" />
          {/* Elongated drop */}
          <ellipse cx="22" cy="135" rx="15" ry="24" fill="#3A1705" />
          {/* Tiny splatter */}
          <circle cx="5"  cy="158" r="4.5" fill="#3A1705" opacity="0.45" />
          <circle cx="39" cy="154" r="3"   fill="#3A1705" opacity="0.38" />
          <circle cx="9"  cy="172" r="2"   fill="#3A1705" opacity="0.3"  />
          <circle cx="36" cy="170" r="2.5" fill="#3A1705" opacity="0.3"  />
        </svg>

        {/* ── AFFOGATO ─────────────────────────────────────────────────── */}
        <img
          ref={affogatoRef}
          src="/images/Group 10.png"
          alt="affogato"
          style={{
            position: 'absolute',
            bottom: '6%',
            left: '50%',
            marginLeft: -165,
            width: 330,
            objectFit: 'contain',
            zIndex: 8,
            pointerEvents: 'none',
            transformOrigin: 'bottom center',
          }}
        />

        {/* ── FINAL BRAND REVEAL ────────────────────────────────────────── */}
        <div
          ref={finalTitleRef}
          style={{
            position: 'absolute', top: '8%', left: 0, right: 0,
            textAlign: 'center', zIndex: 10,
          }}
        >
          <h1 style={{
            fontFamily: 'Jomhuria, serif',
            fontSize: 'clamp(46px, 9vw, 115px)',
            fontWeight: 400,
            textTransform: 'uppercase',
            lineHeight: 0.88,
            color: '#1A1A1A',
            letterSpacing: '0.04em',
          }}>
            ESPRESSO<br />YOURSELF
          </h1>
          <p style={{
            margin: '16px 0 0',
            fontSize: 13,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: '#6B6B6B',
          }}>
            Australian Coffee Beans
          </p>
        </div>

        {/* ── SCROLL HINT ───────────────────────────────────────────────── */}
        <div
          ref={scrollHintRef}
          style={{
            position: 'absolute', bottom: '5%', left: 0, right: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            zIndex: 10,
          }}
        >
          <p style={{
            margin: 0, fontSize: 12, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.14em', color: '#1A1A1A',
          }}>
            scroll to explore
          </p>
          <div style={{
            marginTop: 10, width: 1, height: 38, background: '#1A1A1A',
            animation: 'scrollPulse 1.6s ease-in-out infinite',
          }} />
        </div>

      </section>

      <style>{`
        @keyframes scrollPulse {
          0%   { transform: scaleY(0); transform-origin: top;    opacity: 0; }
          45%  { transform: scaleY(1);                           opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default LandingAnimation