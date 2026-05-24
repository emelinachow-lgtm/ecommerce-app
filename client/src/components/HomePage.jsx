/*
  HOME PAGE / LANDING ANIMATION — Khushi
  ----------------------------------------
  Scroll-driven landing animation shown to customers after login.
  Auto-scrolls through 5 scenes over 10 seconds then redirects to /products.
  Skip button allows users to bypass the animation.

  SCENES:
  1. Tea plantation with hills and cherry clusters
  2. Cherries rise and form a decorative frame
  3. Bean stream pours into a cone/flask
  4. Pour shot and glass appear with product bags
  5. Bags line up horizontally with final text

  ASSETS: All in client/src/assets/

  CONNECTED TO:
  - App.jsx — rendered at /welcome route (protected)
  - LoginPage.jsx — customers redirected here after login
*/

import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import hill_b from '../LAassets/hill_b.webp'
import hill_f from '../LAassets/hill_f.webp'
import t_coffee from '../LAassets/t_coffee.webp'
import t_smell from '../LAassets/t_smell.webp'
import sp_bl from '../LAassets/sp_bl.webp'
import sp_bc from '../LAassets/s2_h.webp'
import sp_br from '../LAassets/sp_br.webp'
import br_tr from '../LAassets/br_tr.webp'
import s2_f from '../LAassets/s2_f.webp'
import s2_h from '../LAassets/s2_h.webp'
import s2_a from '../LAassets/s2_a.webp'
import s2_c from '../LAassets/s2_c.webp'
import s2_g from '../LAassets/s2_g.webp'
import s2_i from '../LAassets/s2_i.png'
import s2_j from '../LAassets/s2_j.png'
import s2_k from '../LAassets/s2_k.png'
import bn_a from '../LAassets/bn_a.webp'
import bn_b from '../LAassets/bn_b.webp'
import bn_c from '../LAassets/bn_c.webp'
import bn_d from '../LAassets/bn_d.webp'
import cone from '../LAassets/cone.webp'
import drop from '../LAassets/drop.webp'
import glass from '../LAassets/glass.webp'
import bag1 from '../LAassets/bag1.webp'
import bag2 from '../LAassets/bag2.webp'
import bag3 from '../LAassets/bag3.webp'
import bag4 from '../LAassets/bag4.webp'
import bag5 from '../LAassets/bag5.webp'
import bag6 from '../LAassets/bag6.webp'
import every1 from '../LAassets/every1.png'
import every2 from '../LAassets/every2.png'
import every3 from '../LAassets/every3.png'

function HomePage() {
  const navigate = useNavigate()
  const animFrameRef = useRef(null)

  const handleSkip = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    navigate('/products')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.height = '2100vh'
    document.body.style.overflow = 'auto'
    document.body.style.overflowX = 'hidden'
    document.body.style.background = '#f4f4b8'
    document.documentElement.style.overflow = 'auto'

    const SCROLL_SCALE = 4
    const SCROLL_SMOOTH = 0.028
    const DISPLAY_SMOOTH = 0.08
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

    const clamp = (n, min, max) => Math.max(min, Math.min(max, n))
    const ease = t => { t = clamp(t, 0, 1); return t * t * t * (t * (t * 6 - 15) + 10) }
    const lerp = (a, b, t) => a + (b - a) * t
    const fadeIn = (p, start, len) => ease(clamp((p - start) / len, 0, 1))
    const fadeOut = (p, start, len) => 1 - ease(clamp((p - start) / len, 0, 1))

    function hexToRgb(hex) {
      const h = hex.replace('#', '')
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
    }
    function rgbToHex(rgb) {
      return '#' + rgb.map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
    }
    function mix(c1, c2, t) {
      const a = hexToRgb(c1), b = hexToRgb(c2)
      return rgbToHex([lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)])
    }

    function scatterFallTarget(x, y, spin) {
      const h1 = ((x * 17 + y * 13) % 97) / 97
      const h2 = ((spin * 3 + x * 7) % 89) / 89
      let tx, ty
      if (y <= 18) { tx = 20 + h1 * 60; ty = 46 + h2 * 24 }
      else if (y >= 82) { tx = 16 + h1 * 68; ty = 74 + h2 * 20 }
      else if (x <= 18) { tx = 12 + h1 * 34; ty = 48 + h2 * 40 }
      else if (x >= 82) { tx = 54 + h1 * 34; ty = 48 + h2 * 40 }
      else { tx = 30 + h1 * 40; ty = 50 + h2 * 32 }
      return [clamp(tx, 10, 90), clamp(ty, 44, 93)]
    }

    function hillSpawn(x, y) {
      let ox, oy
      if (x < 28) { ox = 11 + x * 0.38; oy = 87 }
      else if (x > 72) { ox = 89 - (100 - x) * 0.38; oy = 87 }
      else { ox = 47 + (x - 50) * 0.22; oy = 85 }
      if (y < 22) oy -= 5
      else if (y > 78) oy += 3
      return [ox, oy]
    }

    function frameKScene2(x, y, r, s, peak, spinBoost) {
      const spin = spinBoost ?? ((x * 5 + y * 3) % 48)
      const stagger = ((x * 11 + y * 5) % 55) / 1000
      const [ox, oy] = hillSpawn(x, y)
      const os = s * 0.26
      const or_ = r * 0.25 - 6
      const arcY = Math.min(y - 6, oy - 18 - Math.abs(x - 50) * 0.06)
      const ePre = 0.38 + stagger * 0.5
      const e0 = 0.44 + stagger
      const e1 = e0 + 0.09
      const e2 = e0 + 0.18
      const e3 = e0 + 0.28
      const e4 = Math.min(Math.max(e3 + 0.08, 0.80), 0.90)
      const m1x = ox + (x - ox) * 0.32
      const m1y = oy + (arcY - oy) * 0.48
      const m2x = ox + (x - ox) * 0.68
      const m2y = arcY + (y - arcY) * 0.52
      const [tx, ty] = scatterFallTarget(x, y, spin)
      const fallDelay = (spin % 34) / 1100
      const f0 = 0.96 + fallDelay
      const f1 = f0 + 0.10
      const f2 = f0 + 0.22
      const f3 = Math.min(f0 + 0.36, 1.50)
      const f4 = Math.min(f0 + 0.50, 1.64)
      const f5 = Math.min(f0 + 0.62, 1.74)
      const f1x = x + (tx - x) * 0.22
      const f1y = y + (ty - y) * 0.22
      const f2x = x + (tx - x) * 0.48
      const f2y = y + (ty - y) * 0.48
      const f3x = x + (tx - x) * 0.76
      const f3y = y + (ty - y) * 0.76
      const wobble = (spin % 9) - 4
      const r1 = r + 32 + spin * 0.28
      const r2 = r + 78 + spin * 0.4
      const rEnd = r + 125 + spin * 0.55
      const sFall = s * 0.58
      const sEnd = s * 0.44
      return [
        [0, ox, oy, or_, os, 0],
        [ePre, ox, oy, or_, os * 0.9, peak * 0.08],
        [e0 - 0.02, ox, oy, or_ + 2, os * 0.95, peak * 0.16],
        [e0, ox, oy, or_ + 3, os, peak * 0.28],
        [e1, ox, oy - 1, or_ + 5, os * 1.1, peak * 0.48],
        [e2, m1x, m1y, r * 0.5, s * 0.54, peak * 0.68],
        [e3, m2x, m2y, r * 0.78, s * 0.82, peak * 0.88],
        [e4, x, y, r, s, peak],
        [f0, x, y, r, s, peak],
        [f1, f1x, f1y, r1, s * 0.9, peak],
        [f2, f2x, f2y, r2, sFall, peak * 0.96],
        [f3, f3x, f3y, r + 108 + spin * 0.35, sFall * 0.92, peak * 0.92],
        [f4, tx + wobble * 0.35, ty, rEnd, sEnd, peak * 0.82],
        [f5, tx + wobble * 0.2, ty + 3, rEnd + 18, sEnd * 0.88, 0],
        [3.6, tx, ty + 3, rEnd + 18, sEnd * 0.88, 0]
      ]
    }

    function frameKCenter(x, y, r, s) {
      const peak = 1
      const spin = (x * 5 + y * 3) % 48
      const stagger = ((x * 11 + y * 5) % 55) / 1000
      const [ox, oy] = hillSpawn(x, y)
      const os = s * 0.26
      const or_ = r * 0.25 - 6
      const arcY = Math.min(y - 6, oy - 18 - Math.abs(x - 50) * 0.06)
      const ePre = 0.38 + stagger * 0.5
      const e0 = 0.44 + stagger
      const e1 = e0 + 0.09
      const e2 = e0 + 0.18
      const e3 = e0 + 0.28
      const e4 = Math.min(Math.max(e3 + 0.08, 0.80), 0.90)
      const m1x = ox + (x - ox) * 0.32
      const m1y = oy + (arcY - oy) * 0.48
      const m2x = ox + (x - ox) * 0.68
      const m2y = arcY + (y - arcY) * 0.52
      const hold1 = Math.min(e4 + 0.04, 0.74)
      const hold2 = hold1 + 0.10
      const hold3 = hold2 + 0.06
      const fade0 = 0.90 + stagger * 0.03
      const fade1 = fade0 + 0.06
      const fade2 = fade0 + 0.12
      const fade3 = fade0 + 0.18
      const fade4 = fade0 + 0.24
      const fade5 = fade0 + 0.30
      return [
        [0, ox, oy, or_, os, 0],
        [ePre, ox, oy, or_, os * 0.9, peak * 0.08],
        [e0 - 0.02, ox, oy, or_ + 2, os * 0.95, peak * 0.16],
        [e0, ox, oy, or_ + 3, os, peak * 0.28],
        [e1, ox, oy - 1, or_ + 5, os * 1.1, peak * 0.48],
        [e2, m1x, m1y, r * 0.5, s * 0.54, peak * 0.68],
        [e3, m2x, m2y, r * 0.78, s * 0.82, peak * 0.88],
        [e4, x, y, r, s, peak],
        [hold1, x, y, r, s, peak],
        [hold2, x, y, r, s, peak],
        [hold3, x, y, r, s, peak],
        [fade0, x, y, r, s, peak * 0.98],
        [fade1, x, y, r, s * 0.99, peak * 0.9],
        [fade2, x, y, r, s * 0.97, peak * 0.72],
        [fade3, x, y, r, s * 0.94, peak * 0.48],
        [fade4, x, y, r, s * 0.9, peak * 0.24],
        [fade5, x, y, r * 0.1, s * 0.84, 0],
        [3.6, x, y, r * 0.1, s * 0.84, 0]
      ]
    }

    function beanDriftToFlask(startX, rotDir, delay, peak, scaleMul) {
      const r = rotDir
      const sm = scaleMul || 1
      const seed = Math.round(startX * 13 + delay * 900) % 100
      const lane = (startX * 2.4 + seed + delay * 160) % 100
      const t0 = 0.94 + delay
      const x0 = startX
      const fx = 43 + (seed % 15) * 0.9
      const fy = 38 + (seed % 11) * 1.1
      const xLane = clamp(28 + startX * 0.48 + (seed % 11 - 5) * 3.2, 24, 76)
      const xWobble = clamp(xLane + (seed % 7 - 3) * 3.5, 22, 78)
      const y0 = -18 + (lane % 32) * 2.9
      const y1 = y0 + 16 + (seed % 10) * 2.4
      const y2 = y1 + 14 + (seed % 12) * 2.6
      const y3 = y2 + 13 + (seed % 11) * 2.5
      const y4 = y3 + 12 + (seed % 9) * 2.7
      const y5 = clamp(y4 + 11 + (seed % 8) * 2.4, 10, 92)
      const step = 0.062 + (seed % 6) * 0.009
      const t1 = t0, t2 = t0 + step, t3 = t0 + step * 2, t4 = t0 + step * 3
      const t5 = t0 + step * 4, t6 = t0 + step * 5, t7 = t0 + step * 6
      const t8 = t0 + step * 7.5
      const t9 = Math.min(t0 + step * 9, 1.68)
      const t10 = Math.min(t0 + step * 10.5, 1.82)
      const t11 = Math.min(t0 + step * 12, 1.98)
      const t12 = Math.min(t0 + step * 13.5, 2.16)
      const t13 = Math.min(t0 + step * 15, 2.32)
      const vis = peak * 1.06
      const sc = 1.1 * sm
      return [
        [0, x0, -26, 0, 0.4 * sm, 0],
        [t0 - 0.05, x0, -18, r * 10, 0.5 * sm, 0],
        [t1, x0 + (xLane - x0) * 0.1, y0, r * 28, 0.76 * sm, vis * 0.5],
        [t2, xLane, y0 + 5, r * 52, 0.9 * sc, vis * 0.72],
        [t3, xWobble, y1, r * 78, 1 * sc, vis * 0.86],
        [t4, xLane, y2, r * 102, 1.08 * sc, vis * 0.96],
        [t5, xWobble, y3, r * 128, 1.12 * sc, vis],
        [t6, xLane, y4, r * 152, 1.12 * sc, vis * 0.98],
        [t7, xWobble, y5, r * 178, 1.1 * sc, vis * 0.94],
        [t8, xLane + (fx - xLane) * 0.25, y5 + 6, r * 208, 1.06 * sc, vis * 0.88],
        [t9, fx + (seed % 3 - 1), fy + 18, r * 242, 1.02 * sc, vis * 0.82],
        [t10, fx, fy + 12, r * 276, 0.98 * sc, vis * 0.74],
        [t11, fx, fy + 6, r * 310, 0.94 * sm, vis * 0.56],
        [t12, fx, fy, r * 344, 0.88 * sm, vis * 0.3],
        [t13, fx, fy + 1, r * 372, 0.82 * sm, 0],
        [3.6, fx, fy + 1, r * 372, 0.82 * sm, 0]
      ]
    }

    function bagLineK(slot, frames) {
      const lineX = 10 + slot * 16
      const lineY = 74
      const lineS = 0.86
      const last = frames[frames.length - 1]
      const s4x = last[1], s4y = last[2], s4r = last[3], s4s = last[4]
      const midX = s4x + (lineX - s4x) * 0.5
      const midY = s4y + (lineY - s4y) * 0.45
      return [
        ...frames.slice(0, -1),
        last,
        [3.68, midX, midY, s4r * 0.4, s4s * 0.98, 1],
        [3.86, lineX, lineY - 2, 0, lineS + 0.04, 1],
        [4.05, lineX, lineY, 0, lineS, 1],
        [5.0, lineX, lineY, 0, lineS, 1]
      ]
    }

    function frameK(x, y, r, s) { return frameKScene2(x, y, r, s, 1) }
    function frameKBg(x, y, r, s) { return frameKScene2(x, y, r, s, .88) }
    function frameKFill(x, y, r, s) { return frameKScene2(x, y, r, s, .94) }

    function every3Scene5K() {
      return [
        [0, 50, 60, 0, 0.55, 0],
        [3.45, 50, 56, 0, 0.58, 0],
        [3.62, 50, 46, 0, 0.82, 0.45],
        [3.78, 50, 38, 0, 0.98, 0.82],
        [3.92, 50, 32, 0, 1.08, 1],
        [4.08, 50, 30, 0, 1.1, 1],
        [5.0, 50, 30, 0, 1.1, 1]
      ]
    }

    const ITEMS = [
      { id: 'hill_b', float: .08, k: [[0, 50, 100, 0, 1.08, 1], [.55, 50, 100, 0, 1.05, .55], [.64, 50, 100, 0, 1.04, .48], [.74, 50, 100, 0, 1.03, .32], [.84, 50, 101, 0, 1.02, .16], [.94, 50, 108, 0, 1.06, 0], [3.6, 50, 108, 0, 1.06, 0]] },
      { id: 'hill_f', float: .10, k: [[0, 50, 100, 0, 1, 1], [.55, 50, 100, 0, 1.02, .55], [.62, 50, 100, 0, 1.02, .46], [.72, 50, 101, 0, 1.02, .30], [.82, 50, 103, 0, 1.01, .14], [.92, 50, 105, 0, 1.04, 0], [3.6, 50, 106, 0, 1.04, 0]] },
      { id: 't_smell', float: 0, k: [[0, 50, 21, 0, .98, 1], [.35, 50, 11, 0, 1, .85], [.72, 50, -14, 0, 1.04, 0], [3.6, 50, -14, 0, 1.04, 0]] },
      { id: 't_coffee', float: 0, k: [[0, 50, 45, 0, 1.02, 1], [.35, 50, 34, 0, 1.06, .85], [.72, 50, 8, 0, 1.08, 0], [3.6, 50, 8, 0, 1.08, 0]] },
      { id: 'br_tr', float: .36, k: [[0, 97, 11, 2, 1.05, 1], [.50, 98, 9, 0, 1, .9], [.58, 100, 7, -4, .88, .4], [.65, 102, 5, -6, 0, 0], [3.6, 102, 5, -6, 0, 0]] },
      { id: 'sp_bl', float: .34, k: [[0, 10, 92, -8, .95, 1], [.50, 11, 91, -7, .94, 1], [.58, 12, 90, -6, .88, .5], [.65, 14, 91, -5, .65, 0], [3.6, 14, 91, -5, .65, 0]] },
      { id: 'sp_bc', float: .28, k: [[0, 75, 96, 2, .88, 1], [.50, 76, 95, 1, .86, 1], [.58, 77, 94, 0, .8, .45], [.65, 78, 95, -2, .65, 0], [3.6, 78, 95, -2, .65, 0]] },
      { id: 'sp_br', float: .28, k: [[0, 94, 92, 4, .95, 1], [.48, 95, 91, 3, .94, 1], [.52, 96, 90, 2, .9, .15], [.55, 98, 91, 0, 0, 0]] },
      { id: 's2_fill_tc', float: .12, k: frameKFill(50, 4, 0, 1.22) },
      { id: 's2_fill_bc', float: .12, k: frameKFill(50, 96, 0, 1.2) },
      { id: 's2_fill_t1', float: .10, k: frameKFill(32, 5, -6, .98) },
      { id: 's2_fill_t2', float: .10, k: frameKFill(68, 5, 6, .98) },
      { id: 's2_fill_t3', float: .10, k: frameKFill(17, 8, -14, .88) },
      { id: 's2_fill_t4', float: .10, k: frameKFill(83, 8, 14, .88) },
      { id: 's2_fill_b1', float: .10, k: frameKFill(32, 95, 6, .98) },
      { id: 's2_fill_b2', float: .10, k: frameKFill(68, 95, -6, .98) },
      { id: 's2_fill_b3', float: .10, k: frameKFill(17, 92, 12, .88) },
      { id: 's2_fill_b4', float: .10, k: frameKFill(83, 92, -12, .88) },
      { id: 's2_fill_l1', float: .10, k: frameKFill(1, 27, 88, .9) },
      { id: 's2_fill_l2', float: .10, k: frameKFill(0, 41, 92, .86) },
      { id: 's2_fill_l3', float: .10, k: frameKFill(1, 57, 90, .86) },
      { id: 's2_fill_l4', float: .10, k: frameKFill(0, 73, 88, .9) },
      { id: 's2_fill_r1', float: .10, k: frameKFill(99, 27, -88, .9) },
      { id: 's2_fill_r2', float: .10, k: frameKFill(100, 41, -92, .86) },
      { id: 's2_fill_r3', float: .10, k: frameKFill(99, 57, -90, .86) },
      { id: 's2_fill_r4', float: .10, k: frameKFill(100, 73, -88, .9) },
      { id: 's2_fill_d1', float: .10, k: frameKFill(15, 15, -22, .95) },
      { id: 's2_fill_d2', float: .10, k: frameKFill(85, 15, 22, .95) },
      { id: 's2_fill_d3', float: .10, k: frameKFill(15, 85, 22, .95) },
      { id: 's2_fill_d4', float: .10, k: frameKFill(85, 85, -22, .95) },
      { id: 's2_fill_c1', float: .14, k: frameKFill(37, 10, -4, .9) },
      { id: 's2_fill_c2', float: .14, k: frameKFill(63, 10, 4, .9) },
      { id: 's2_fill_c3', float: .14, k: frameKFill(37, 90, 4, .9) },
      { id: 's2_fill_c4', float: .14, k: frameKFill(63, 90, -4, .9) },
      { id: 's2_fill_c5', float: .14, k: frameKFill(13, 50, -5, .92) },
      { id: 's2_fill_c6', float: .14, k: frameKFill(87, 50, 5, .92) },
      { id: 's2_fill_c7', float: .12, k: frameKFill(21, 19, -10, .88) },
      { id: 's2_fill_c8', float: .12, k: frameKFill(79, 19, 10, .88) },
      { id: 's2_fill_c9', float: .12, k: frameKFill(21, 81, 10, .88) },
      { id: 's2_fill_c10', float: .12, k: frameKFill(79, 81, -10, .88) },
      { id: 's2_fill_c11', float: .14, k: frameKFill(50, 21, 0, .95) },
      { id: 's2_fill_c12', float: .14, k: frameKFill(50, 79, 0, .95) },
      { id: 'every1', float: .08, k: frameKCenter(50, 47, 0, 1.32) },
      { id: 'every2', float: .08, k: frameKCenter(50, 53, 0, 1.24) },
      { id: 's2_fill_f1', float: .10, k: frameKFill(7, 35, 82, .85) },
      { id: 's2_fill_f2', float: .10, k: frameKFill(93, 35, -82, .85) },
      { id: 's2_fill_f3', float: .10, k: frameKFill(7, 65, 78, .85) },
      { id: 's2_fill_f4', float: .10, k: frameKFill(93, 65, -78, .85) },
      { id: 's2_edge_t5', float: .10, k: frameKFill(24, 4, -4, 1.05) },
      { id: 's2_edge_t6', float: .10, k: frameKFill(41, 3, 0, 1.1) },
      { id: 's2_edge_t7', float: .10, k: frameKFill(59, 3, 0, 1.1) },
      { id: 's2_edge_t8', float: .10, k: frameKFill(76, 4, 4, 1.05) },
      { id: 's2_edge_t9', float: .12, k: frameKFill(11, 5, -10, .95) },
      { id: 's2_edge_t10', float: .12, k: frameKFill(89, 5, 10, .95) },
      { id: 's2_edge_t11', float: .12, k: frameKFill(33, 5, -6, .92) },
      { id: 's2_edge_t12', float: .12, k: frameKFill(67, 5, 6, .92) },
      { id: 's2_edge_b5', float: .10, k: frameKFill(24, 96, 4, 1.05) },
      { id: 's2_edge_b6', float: .10, k: frameKFill(41, 97, 0, 1.1) },
      { id: 's2_edge_b7', float: .10, k: frameKFill(59, 97, 0, 1.1) },
      { id: 's2_edge_b8', float: .10, k: frameKFill(76, 96, -4, 1.05) },
      { id: 's2_edge_b9', float: .12, k: frameKFill(11, 95, 10, .95) },
      { id: 's2_edge_b10', float: .12, k: frameKFill(89, 95, -10, .95) },
      { id: 's2_edge_b11', float: .12, k: frameKFill(33, 95, 6, .92) },
      { id: 's2_edge_b12', float: .12, k: frameKFill(67, 95, -6, .92) },
      { id: 's2_lg_i', float: .18, k: frameKBg(2, 18, -12, 1.02) },
      { id: 's2_lg_j', float: .18, k: frameKBg(98, 18, 12, 1.02) },
      { id: 's2_lg_c', float: .14, k: frameKBg(50, 4, 0, 1.08) },
      { id: 's2_lg_k', float: .14, k: frameKBg(50, 96, 0, 1.08) },
      { id: 's2_lg_tl', float: .16, k: frameKBg(6, 7, -8, 1) },
      { id: 's2_lg_tr', float: .16, k: frameKBg(94, 7, 8, 1) },
      { id: 's2_lg_bl', float: .18, k: frameKBg(6, 93, 8, 1) },
      { id: 's2_lg_br', float: .18, k: frameKBg(94, 93, -8, 1) },
      { id: 's2_lg_l2', float: .16, k: frameKBg(1, 50, -6, 1) },
      { id: 's2_lg_r2', float: .16, k: frameKBg(99, 50, 6, 1) },
      { id: 's2_lg_t2', float: .14, k: frameKBg(20, 4, -4, .98) },
      { id: 's2_lg_t3', float: .14, k: frameKBg(80, 4, 4, .98) },
      { id: 's2_lg_b2', float: .14, k: frameKBg(20, 96, 4, .98) },
      { id: 's2_lg_b3', float: .14, k: frameKBg(80, 96, -4, .98) },
      { id: 's2_lg_l3', float: .20, k: frameKBg(3, 65, -10, .98) },
      { id: 's2_lg_r3', float: .20, k: frameKBg(97, 65, 10, .98) },
      { id: 's2_frame_i', float: .22, k: frameK(5, 22, -12, 1.02) },
      { id: 's2_frame_j', float: .22, k: frameK(95, 22, 12, 1.02) },
      { id: 's2_frame_c', float: .18, k: frameK(50, 8, 0, 1.05) },
      { id: 's2_frame_k', float: .18, k: frameK(50, 92, 0, 1.05) },
      { id: 's2_frm_tl', float: .20, k: frameK(10, 12, -8, 1) },
      { id: 's2_frm_tr', float: .20, k: frameK(90, 12, 8, 1) },
      { id: 's2_frm_bl', float: .22, k: frameK(10, 88, 8, 1) },
      { id: 's2_frm_br', float: .22, k: frameK(90, 88, -8, 1) },
      { id: 's2_frm_l2', float: .20, k: frameK(4, 50, -6, 1) },
      { id: 's2_frm_r2', float: .20, k: frameK(96, 50, 6, 1) },
      { id: 's2_frm_t2', float: .18, k: frameK(24, 9, -4, .95) },
      { id: 's2_frm_t3', float: .18, k: frameK(76, 9, 4, .95) },
      { id: 's2_frm_b2', float: .18, k: frameK(24, 91, 4, .95) },
      { id: 's2_frm_b3', float: .18, k: frameK(76, 91, -4, .95) },
      { id: 's2_frm_l3', float: .24, k: frameK(6, 68, -10, .98) },
      { id: 's2_frm_r3', float: .24, k: frameK(94, 68, 10, .98) },
      { id: 's2_g_a', float: .11, k: beanDriftToFlask(36, 1, 0, 1, 0.68) },
      { id: 's2_g_b', float: .11, k: beanDriftToFlask(64, -1, 0.06, 0.98, 0.66) },
      { id: 's2_g_c', float: .11, k: beanDriftToFlask(20, 1, 0.03, 0.96, 0.64) },
      { id: 's2_g_d', float: .11, k: beanDriftToFlask(26, -1, 0.10, 0.97, 0.65) },
      { id: 's2_g_e', float: .11, k: beanDriftToFlask(16, 1, 0.14, 0.94, 0.62) },
      { id: 's2_g_f', float: .11, k: beanDriftToFlask(74, -1, 0.04, 0.96, 0.64) },
      { id: 's2_g_g', float: .11, k: beanDriftToFlask(80, 1, 0.11, 0.95, 0.64) },
      { id: 's2_g_h', float: .11, k: beanDriftToFlask(84, -1, 0.16, 0.94, 0.62) },
      { id: 's2_g_i', float: .11, k: beanDriftToFlask(41, 1, 0.02, 0.98, 0.64) },
      { id: 's2_g_j', float: .11, k: beanDriftToFlask(59, -1, 0.08, 0.98, 0.64) },
      { id: 's2_g_k', float: .11, k: beanDriftToFlask(33, 1, 0.12, 0.96, 0.63) },
      { id: 's2_g_l', float: .11, k: beanDriftToFlask(67, -1, 0.15, 0.95, 0.62) },
      { id: 's2_bd_a', float: .10, k: beanDriftToFlask(34, 1, 0, 1, 1.05) },
      { id: 's2_bd_b', float: .10, k: beanDriftToFlask(39, -1, 0.025, 0.98, 1.04) },
      { id: 's2_bd_c', float: .10, k: beanDriftToFlask(44, 1, 0.05, 0.98, 1.06) },
      { id: 's2_bd_d', float: .10, k: beanDriftToFlask(61, -1, 0.075, 0.97, 1.04) },
      { id: 's2_bd_e', float: .10, k: beanDriftToFlask(66, 1, 0.10, 0.97, 1.05) },
      { id: 's2_bd_f', float: .10, k: beanDriftToFlask(37, -1, 0.125, 0.98, 1.04) },
      { id: 's2_bd_g', float: .10, k: beanDriftToFlask(52, 1, 0.15, 0.97, 1.03) },
      { id: 's2_bd_h', float: .10, k: beanDriftToFlask(69, -1, 0.175, 0.96, 1.02) },
      { id: 's2_bc_a', float: .10, k: beanDriftToFlask(31, 1, 0.01, 0.98, 1.08) },
      { id: 's2_bc_b', float: .10, k: beanDriftToFlask(46, -1, 0.04, 0.97, 1.06) },
      { id: 's2_bc_c', float: .10, k: beanDriftToFlask(56, 1, 0.07, 0.97, 1.06) },
      { id: 's2_bc_d', float: .10, k: beanDriftToFlask(71, -1, 0.10, 0.96, 1.05) },
      { id: 's2_bc_e', float: .10, k: beanDriftToFlask(42, 1, 0.13, 0.97, 1.05) },
      { id: 's2_bc_f', float: .10, k: beanDriftToFlask(63, -1, 0.16, 0.96, 1.04) },
      { id: 's2_bc_g', float: .10, k: beanDriftToFlask(48, 1, 0.19, 0.96, 1.04) },
      { id: 's2_bc_h', float: .10, k: beanDriftToFlask(54, -1, 0.22, 0.95, 1.03) },
      { id: 'cone', float: .05, k: [[0, 50, 145, 0, .55, 0], [1.15, 50, 145, 0, .55, 0], [1.58, 50, 112, 0, .70, .6], [1.9, 50, 83, 0, 1.02, 1], [2.22, 50, 78, 0, 1.04, 1], [2.55, 50, 44, 0, .95, 1], [2.95, 50, -28, 0, .78, .82], [3.25, 50, -36, 0, .72, .45], [3.45, 50, -46, 0, .68, 0], [5.0, 50, -50, 0, .68, 0]] },
      { id: 'bn_a', float: .14, k: [[0, 45, -35, 0, .55, 0], [1.10, 45, -32, 0, .55, 0], [1.14, 45, -24, 8, .68, .45], [1.22, 45, -14, 10, .78, .72], [1.52, 45, 4, 12, .84, .88], [1.92, 45, 30, 22, 1.05, 1], [2.25, 44, 41, 50, 1.05, .95], [2.62, 42, 28, 82, .75, .35], [2.92, 40, -15, 120, .5, 0], [3.6, 40, -15, 120, .5, 0]] },
      { id: 'bn_b', float: .17, k: [[0, 57, -38, 0, .55, 0], [1.12, 57, -34, 0, .55, 0], [1.16, 56, -22, -10, .68, .45], [1.24, 56, -12, -12, .78, .72], [1.58, 56, 10, -12, .84, .88], [2.0, 55, 40, -22, 1.05, 1], [2.25, 56, 48, -48, 1.05, .95], [2.62, 58, 30, -80, .75, .35], [2.92, 60, -15, -120, .5, 0], [3.6, 60, -15, -120, .5, 0]] },
      { id: 'bn_c', float: .10, k: [[0, 47, -12, 0, .9, 0], [1.38, 47, -10, 0, .9, 0], [1.52, 47, 8, 40, 1.05, .75], [1.78, 47, 24, 80, 1.25, 1], [2.08, 46, 42, 160, 1.18, 1], [2.48, 45, 48, 230, 1, .75], [2.82, 44, 20, 320, .7, 0], [3.6, 44, 20, 320, .7, 0]] },
      { id: 'bn_d', float: .12, k: [[0, 53, -12, 0, .9, 0], [1.40, 53, -10, 0, .9, 0], [1.54, 53, 8, -40, 1.05, .75], [1.82, 53, 24, -80, 1.25, 1], [2.10, 54, 42, -160, 1.18, 1], [2.48, 55, 48, -230, 1, .75], [2.82, 56, 20, -320, .7, 0], [3.6, 56, 20, -320, .7, 0]] },
      { id: 'drop', float: .08, k: [[0, 50, 5, 0, .55, 0], [2.28, 50, 5, 0, .55, 0], [2.62, 50, 18, 0, .58, .8], [2.92, 50, 30, 0, .76, 1], [3.18, 50, 44, 0, .78, 1], [3.6, 50, 44, 0, .78, 1], [3.72, 50, 40, 0, .74, .55], [3.9, 50, 36, 0, .68, 0], [5.0, 50, 36, 0, .68, 0]] },
      { id: 'glass', float: .06, k: [[0, 50, 84, 0, .55, 0], [2.45, 50, 84, 0, .55, 0], [2.68, 50, 80, 0, .75, .08], [2.88, 50, 76, 0, .85, .18], [3.05, 50, 72, 0, .92, .38], [3.18, 50, 68, 0, .98, .72], [3.28, 50, 66, 0, 1.05, 1], [3.6, 50, 66, 0, 1.05, 1], [3.72, 50, 62, 0, 1, .75], [3.9, 50, 58, 0, .92, 0], [5.0, 50, 58, 0, .92, 0]] },
      { id: 'bag1', float: .10, k: bagLineK(0, [[0, -20, 23, -18, .65, 0], [2.45, -20, 23, -18, .65, 0], [2.82, 14, 23, -12, .95, .85], [3.08, 23, 25, -8, 1.06, 1], [3.6, 23, 25, -8, 1.06, 1]]) },
      { id: 'bag2', float: .10, k: bagLineK(1, [[0, 125, 20, 14, .65, 0], [2.45, 125, 20, 14, .65, 0], [2.82, 94, 23, 10, .95, .85], [3.08, 91, 24, 8, 1.08, 1], [3.6, 91, 24, 8, 1.08, 1]]) },
      { id: 'bag3', float: .10, k: bagLineK(2, [[0, -20, 70, -18, .65, 0], [2.45, -20, 70, -18, .65, 0], [2.82, 8, 69, -14, .95, .85], [3.08, 13, 68, -12, 1.05, 1], [3.6, 13, 68, -12, 1.05, 1]]) },
      { id: 'bag4', float: .10, k: bagLineK(3, [[0, 122, 55, 18, .65, 0], [2.45, 122, 55, 18, .65, 0], [2.82, 83, 51, 12, .95, .85], [3.08, 76, 52, 10, 1.06, 1], [3.6, 76, 52, 10, 1.06, 1]]) },
      { id: 'bag5', float: .10, k: bagLineK(4, [[0, 40, 125, -8, .65, 0], [2.45, 40, 125, -8, .65, 0], [2.82, 40, 96, -5, .92, .85], [3.08, 42, 93, -4, 1.06, 1], [3.6, 42, 93, -4, 1.06, 1]]) },
      { id: 'bag6', float: .10, k: bagLineK(5, [[0, 108, 120, 12, .65, 0], [2.45, 108, 120, 12, .65, 0], [2.82, 91, 90, 10, .92, .85], [3.08, 86, 86, 8, 1.03, 1], [3.6, 86, 86, 8, 1.03, 1]]) },
      { id: 'every3', float: .06, k: every3Scene5K() }
    ]

    // map asset imports to element IDs
    const assetMap = {
      hill_b, hill_f, t_coffee, t_smell, sp_bl, sp_bc, sp_br, br_tr,
      s2_fill_tc: s2_f, s2_fill_bc: s2_f, s2_fill_t1: s2_f, s2_fill_t2: s2_f,
      s2_fill_t3: s2_f, s2_fill_t4: s2_f, s2_fill_b1: s2_f, s2_fill_b2: s2_f,
      s2_fill_b3: s2_f, s2_fill_b4: s2_f, s2_fill_l1: s2_f, s2_fill_l2: s2_f,
      s2_fill_l3: s2_f, s2_fill_l4: s2_f, s2_fill_r1: s2_f, s2_fill_r2: s2_f,
      s2_fill_r3: s2_f, s2_fill_r4: s2_f, s2_fill_d1: s2_f, s2_fill_d2: s2_f,
      s2_fill_d3: s2_f, s2_fill_d4: s2_f,
      s2_fill_c1: s2_h, s2_fill_c2: s2_h, s2_fill_c3: s2_h, s2_fill_c4: s2_h,
      s2_fill_c5: s2_a, s2_fill_c6: s2_a, s2_fill_c7: s2_c, s2_fill_c8: s2_c,
      s2_fill_c9: s2_c, s2_fill_c10: s2_c, s2_fill_c11: s2_h, s2_fill_c12: s2_h,
      every1, every2,
      s2_fill_f1: s2_f, s2_fill_f2: s2_f, s2_fill_f3: s2_f, s2_fill_f4: s2_f,
      s2_edge_t5: s2_f, s2_edge_t6: s2_f, s2_edge_t7: s2_f, s2_edge_t8: s2_f,
      s2_edge_t9: s2_h, s2_edge_t10: s2_h, s2_edge_t11: s2_a, s2_edge_t12: s2_a,
      s2_edge_b5: s2_f, s2_edge_b6: s2_f, s2_edge_b7: s2_f, s2_edge_b8: s2_f,
      s2_edge_b9: s2_h, s2_edge_b10: s2_h, s2_edge_b11: s2_a, s2_edge_b12: s2_a,
      s2_lg_i: s2_i, s2_lg_j: s2_j, s2_lg_c: s2_c, s2_lg_k: s2_k,
      s2_lg_tl: s2_h, s2_lg_tr: s2_h, s2_lg_bl: s2_a, s2_lg_br: s2_a,
      s2_lg_l2: s2_c, s2_lg_r2: s2_c, s2_lg_t2: s2_i, s2_lg_t3: s2_k,
      s2_lg_b2: s2_i, s2_lg_b3: s2_k, s2_lg_l3: s2_h, s2_lg_r3: s2_h,
      s2_frame_i: s2_i, s2_frame_j: s2_j, s2_frame_c: s2_c, s2_frame_k: s2_k,
      s2_frm_tl: s2_h, s2_frm_tr: s2_h, s2_frm_bl: s2_a, s2_frm_br: s2_a,
      s2_frm_l2: s2_c, s2_frm_r2: s2_c, s2_frm_t2: s2_i, s2_frm_t3: s2_k,
      s2_frm_b2: s2_i, s2_frm_b3: s2_k, s2_frm_l3: s2_h, s2_frm_r3: s2_h,
      s2_g_a: s2_g, s2_g_b: s2_g, s2_g_c: s2_g, s2_g_d: s2_g,
      s2_g_e: s2_g, s2_g_f: s2_g, s2_g_g: s2_g, s2_g_h: s2_g,
      s2_g_i: s2_g, s2_g_j: s2_g, s2_g_k: s2_g, s2_g_l: s2_g,
      s2_bd_a: bn_d, s2_bd_b: bn_d, s2_bd_c: bn_d, s2_bd_d: bn_d,
      s2_bd_e: bn_d, s2_bd_f: bn_d, s2_bd_g: bn_d, s2_bd_h: bn_d,
      s2_bc_a: bn_c, s2_bc_b: bn_c, s2_bc_c: bn_c, s2_bc_d: bn_c,
      s2_bc_e: bn_c, s2_bc_f: bn_c, s2_bc_g: bn_c, s2_bc_h: bn_c,
      cone, bn_a, bn_b, bn_c, bn_d, drop, glass,
      bag1, bag2, bag3, bag4, bag5, bag6, every3
    }

    // z-index map
    const zMap = {
      t_coffee: 54, hill_b: 52, t_smell: 55, sp_bl: 54, sp_bc: 54, sp_br: 54,
      hill_f: 58, br_tr: 59, cone: 31, bn_a: 45, bn_b: 45, bn_c: 46, bn_d: 46,
      drop: 58, glass: 56, bag1: 54, bag2: 54, bag3: 54, bag4: 54, bag5: 54, bag6: 54,
      every1: 34, every2: 34, every3: 63
    }

    const scene2Ids = new Set(ITEMS.filter(it =>
      it.id.startsWith('s2_') || it.id === 'every1' || it.id === 'every2'
    ).map(it => it.id))

    const scene2ZBase = {}
    const scene2ZRise = {}
    ITEMS.forEach(it => {
      if (scene2Ids.has(it.id)) {
        const z = zMap[it.id] || 30
        scene2ZBase[it.id] = String(z)
        scene2ZRise[it.id] = z >= 34 ? String(z) : '56'
      }
    })

    // create DOM elements
    const stage = document.getElementById('ey-stage')
    const nodeMap = {}
    ITEMS.forEach(it => {
      const img = document.createElement('img')
      img.id = it.id
      img.src = assetMap[it.id] || s2_f
      img.alt = ''
      img.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        opacity: 0;
        transform-origin: center center;
        height: auto;
        object-fit: contain;
        will-change: transform, opacity;
        user-select: none;
        -webkit-user-drag: none;
        backface-visibility: hidden;
        pointer-events: none;
      `
      // widths from original HTML
      const widths = {
        t_coffee: '32vw', hill_b: '108vw', t_smell: '18vw', sp_bl: '18vw',
        sp_bc: '20vw', sp_br: '18vw', hill_f: '102vw', br_tr: '25vw',
        every1: '34vw', every2: '29vw', cone: '42vw', bn_a: '19vw', bn_b: '18vw',
        bn_c: '4.2vw', bn_d: '4.1vw', drop: '6.5vw', glass: '24vw',
        bag1: '16vw', bag2: '15vw', bag3: '15vw', bag4: '15vw',
        bag5: '14vw', bag6: '14vw', every3: '40vw'
      }
      img.style.width = widths[it.id] || (
        it.id.startsWith('s2_g_') ? '6vw' :
        it.id.startsWith('s2_bd_') ? '4vw' :
        it.id.startsWith('s2_bc_') ? '4vw' :
        it.id.startsWith('s2_lg_') ? '19vw' :
        it.id.startsWith('s2_frm_') || it.id.startsWith('s2_frame_') ? '12vw' :
        it.id.startsWith('s2_fill_c') ? '8vw' :
        it.id.startsWith('s2_fill_') ? '12vw' :
        it.id.startsWith('s2_edge_') ? '14vw' : '12vw'
      )
      if (zMap[it.id]) img.style.zIndex = String(zMap[it.id])
      else if (scene2Ids.has(it.id)) img.style.zIndex = scene2ZBase[it.id] || '30'
      stage.appendChild(img)
      nodeMap[it.id] = img
    })

    // grain overlay
    const grain = document.createElement('div')
    grain.style.cssText = `
      position: absolute; inset: -20%; z-index: 100; opacity: .045;
      mix-blend-mode: soft-light;
      background-image:
        radial-gradient(circle at 18% 23%, rgba(255,255,255,.8) 0 1px, transparent 1.4px),
        radial-gradient(circle at 70% 38%, rgba(0,0,0,.55) 0 1px, transparent 1.4px),
        radial-gradient(circle at 36% 78%, rgba(255,255,255,.7) 0 1px, transparent 1.5px);
      background-size: 210px 210px, 260px 260px, 320px 320px;
      animation: grainDrift 20s linear infinite;
    `
    stage.appendChild(grain)

    const elements = ITEMS.map((it, idx) => {
      const node = nodeMap[it.id]
      if (!node) return null
      const out = { ...it, node, idx }
      if (scene2Ids.has(it.id)) {
        out.zBase = scene2ZBase[it.id]
        out.zRise = scene2ZRise[it.id]
      }
      return out
    }).filter(Boolean)

    function sample(k, p) {
      if (p <= k[0][0]) return k[0]
      const last = k[k.length - 1]
      if (p >= last[0]) return last
      for (let i = 0; i < k.length - 1; i++) {
        const a = k[i], b = k[i + 1]
        if (p >= a[0] && p <= b[0]) {
          const t = ease((p - a[0]) / (b[0] - a[0]))
          return [p, lerp(a[1], b[1], t), lerp(a[2], b[2], t), lerp(a[3], b[3], t), lerp(a[4], b[4], t), lerp(a[5], b[5], t)]
        }
      }
      return last
    }

    const state = { current: 0, target: 0, velocity: 0, vh: Math.max(innerHeight, 1), lastFrame: 0 }

    function targetProgress() {
      state.vh = Math.max(innerHeight, 1)
      return reduced ? 0 : (scrollY / state.vh) / SCROLL_SCALE
    }

    function advanceScroll(time) {
      state.target = targetProgress()
      if (reduced) { state.current = state.target; state.velocity = 0; return }
      const dt = Math.min(40, Math.max(8, time - (state.lastFrame || time)))
      state.lastFrame = time
      const k = 1 - Math.pow(1 - SCROLL_SMOOTH, dt / 16.67)
      state.velocity = state.velocity * Math.pow(0.84, dt / 16.67) + (state.target - state.current) * k
      state.current += state.velocity
      if (Math.abs(state.target - state.current) < 0.00006 && Math.abs(state.velocity) < 0.00006) {
        state.current = state.target; state.velocity = 0
      }
      state.lastDt = dt
    }

    function paintBackground(p) {
      const bg = document.getElementById('ey-bg')
      if (!bg) return
      const t1 = ease(clamp(p / 1.05, 0, 1))
      const top = mix('#b9e8e1', '#f5f4b8', t1)
      const mid = mix('#eef2bd', '#f5f4b8', t1)
      const t4 = ease(clamp((p - 2.32) / 0.72, 0, 1))
      const t5 = ease(clamp((p - 3.52) / 0.58, 0, 1))
      const final = mix('#f5f4b8', '#f3f4ad', t4)
      const scene5 = mix(final, '#f2f3a8', t5)
      bg.style.background = `linear-gradient(180deg, ${top} 0%, ${mid} 32%, ${scene5} 100%)`
    }

    function frame(time = 0) {
      advanceScroll(time)
      const p = state.current
      const dt = state.lastDt || 16.67
      const blend = reduced ? 1 : (1 - Math.pow(1 - DISPLAY_SMOOTH, dt / 16.67))
      paintBackground(p)

      for (const it of elements) {
        const v = sample(it.k, p)
        let opacity = clamp(v[5], 0, 1)
        if (!scene2Ids.has(it.id) && it.id !== 'hill_b' && it.id !== 'hill_f' && it.id !== 'every1' && it.id !== 'every2') {
          // scene 1 elements fade out
        }
        if (it.id === 'hill_b' || it.id === 'hill_f') opacity *= fadeOut(p, 0.88, 0.22)
        const s2Bean = /^s2_(g|bd|bc)_/.test(it.id)
        const s2End = s2Bean ? 2.52 : 1.76
        if (scene2Ids.has(it.id)) {
          opacity *= fadeIn(p, 0.30, 0.14)
          opacity *= fadeOut(p, s2End - 0.06, 0.18)
        }
        if (s2Bean && p >= 0.90 && p < 1.75) {
          const boost = 1 + 0.12 * (1 - ease(clamp(Math.abs(p - 1.32) / 0.43, 0, 1)))
          opacity = Math.min(1, opacity * boost)
        }
        if (it.id === 'every1' || it.id === 'every2') {
          opacity *= fadeOut(p, 0.88, 0.30)
          if (p >= 0.86 && p < 1.12) it.node.style.zIndex = '59'
        }
        if (it.id === 'drop' || it.id === 'glass') opacity *= fadeIn(p, 2.22, 0.22)
        if (['bag1', 'bag2', 'bag3', 'bag4', 'bag5', 'bag6'].includes(it.id)) opacity *= fadeIn(p, 2.38, 0.20)
        if (it.id === 'every3') opacity *= fadeIn(p, 3.42, 0.24)
        if (scene2Ids.has(it.id)) {
          const rising = p >= 0.38 && p < 0.9
          const beanTransition = s2Bean && p >= 0.86 && p < 2.35
          it.node.style.zIndex = beanTransition ? '60' : (rising ? it.zRise : it.zBase)
        }
        if (['bag1', 'bag2', 'bag3', 'bag4', 'bag5', 'bag6'].includes(it.id) && p >= 3.52) it.node.style.zIndex = '62'
        if (it.id === 'every3' && p >= 3.52) it.node.style.zIndex = '63'
        if (it.id === 'cone') opacity *= fadeOut(p, 3.18, 0.32)
        const src = it.node.getAttribute('src') || ''
        if (/sp_br|sp_bl/i.test(it.id) || it.id === 'br_tr') {
          opacity *= fadeOut(p, 0.48, 0.18)
          if (opacity < 0.02) {
            it.node.style.visibility = 'hidden'
            it.node.style.display = 'none'
          } else {
            it.node.style.visibility = 'visible'
            it.node.style.display = ''
          }
        }

        if (!it.smooth) it.smooth = { l: v[1], t: v[2], r: v[3], s: Math.abs(v[4]), o: opacity }
        const sm = it.smooth
        sm.l += (v[1] - sm.l) * blend
        sm.t += (v[2] - sm.t) * blend
        sm.r += (v[3] - sm.r) * blend
        sm.s += (Math.abs(v[4]) - sm.s) * blend
        sm.o += (opacity - sm.o) * blend

        const drift = sm.o > .03 && !reduced ? Math.sin(time * 0.0005 + it.idx * 1.731) * (it.float || 0) * 0.75 : 0
        const rotateDrift = sm.o > .03 && !reduced ? Math.sin(time * 0.00038 + it.idx) * (it.float || 0) * 0.95 : 0
        it.node.style.opacity = clamp(sm.o, 0, 1).toFixed(4)
        const tx = '-50%'
        const ty = '-50%'
        const s = Math.max(.001, sm.s)
        const flipX = v[4] < 0 ? -1 : 1
        it.node.style.transform = `translate3d(${tx},${ty},0) translate3d(0,${drift.toFixed(3)}vh,0) rotate(${(sm.r + rotateDrift).toFixed(3)}deg) scale(${flipX * s},${s})`
        it.node.style.left = sm.l.toFixed(4) + '%'
        it.node.style.top = sm.t.toFixed(4) + '%'
      }
      animFrameRef.current = requestAnimationFrame(frame)
    }

    const onResize = () => { state.vh = Math.max(innerHeight, 1) }
    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('orientationchange', onResize, { passive: true })

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (window.scrollY >= totalScroll - 50) {
        navigate('/products')
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    setTimeout(() => {
      animFrameRef.current = requestAnimationFrame(frame)
    }, 100)

    const prompt = document.getElementById('ey-prompt')
    const hidePrompt = () => {
      if (prompt) {
        prompt.style.opacity = '0'
        prompt.style.transition = 'opacity 0.5s ease'
      }
      window.removeEventListener('scroll', hidePrompt)
    }
    window.addEventListener('scroll', hidePrompt, { passive: true })

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', hidePrompt)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      // reset body styles
      document.body.style.height = ''
      document.body.style.overflow = ''
      document.body.style.overflowX = ''
      document.body.style.background = ''
      document.documentElement.style.overflow = ''
      document.getElementById('root').style.height = ''
      // clean up dynamically created elements
      const stageEl = document.getElementById('ey-stage')
      if (stageEl) stageEl.innerHTML = ''
    }
  }, [navigate])

  return (
    <>
      <style>{`
        @keyframes grainDrift {
          from { transform: translate3d(0,0,0) }
          to { transform: translate3d(-3%,-2%,0) }
        }
      `}</style>

      {/* skip button */}
      <button
        onClick={handleSkip}
        style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 999,
          background: 'rgba(255,255,255,0.8)', border: '1.5px solid #1A1A1A',
          padding: '8px 20px', borderRadius: '999px', fontSize: '13px',
          fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em',
          cursor: 'pointer', fontFamily: 'inherit', pointerEvents: 'auto'
        }}>
        Skip →
      </button>

      {/* stage */}
      <div
        id="ey-stage"
        style={{
          position: 'fixed', inset: 0, overflow: 'hidden',
          pointerEvents: 'none', background: '#f4f4b8',
          isolation: 'isolate', transform: 'translateZ(0)',
          willChange: 'transform'
        }}>
        <div
          id="ey-bg"
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: 'linear-gradient(180deg,#b9e8e1 0%,#eef2bd 43%,#f7f5b7 100%)',
            willChange: 'background'
          }}
        />
      </div>

      {/* scroll prompt */}
      <div 
      id="ey-prompt"
      style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        pointerEvents: 'none'
      }}>
        <p style={{
          fontSize: '16px', fontWeight: '800', color: '#ffffff',
          textTransform: 'uppercase', letterSpacing: '0.1em',
          margin: 0, opacity: 0.6
        }}>Scroll to explore</p>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
          <line x1="12" y1="5" x2="12" y2="19"/>
          <polyline points="19 12 12 19 5 12"/>
        </svg>
      </div>
    </>
  )
}

export default HomePage