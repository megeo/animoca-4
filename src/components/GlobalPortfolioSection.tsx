import { useRef, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

const BLUE = { r: 82, g: 197, b: 232 }

const cities: [number, number, string, number][] = [
  [22.32, 114.17, 'Hong Kong', 28], [1.35, 103.82, 'Singapore', 18],
  [37.57, 126.98, 'Seoul', 12], [35.68, 139.69, 'Tokyo', 10],
  [40.71, -74.01, 'New York', 14], [37.77, -122.42, 'San Francisco', 11],
  [51.51, -0.13, 'London', 9], [48.86, 2.35, 'Paris', 5],
  [52.52, 13.41, 'Berlin', 4], [-33.87, 151.21, 'Sydney', 3],
  [25.20, 55.27, 'Dubai', 6], [13.76, 100.50, 'Bangkok', 4],
  [14.60, 120.98, 'Manila', 3], [39.90, 116.40, 'Beijing', 5],
  [31.23, 121.47, 'Shanghai', 4], [-23.55, -46.63, 'Sao Paulo', 2],
  [43.65, -79.38, 'Toronto', 3], [55.76, 37.62, 'Moscow', 1],
  [28.61, 77.23, 'New Delhi', 3], [41.90, 12.50, 'Rome', 1],
  [47.37, 8.54, 'Zurich', 2], [34.05, -118.24, 'Los Angeles', 3],
  [25.03, 121.57, 'Taipei', 4], [3.14, 101.69, 'Kuala Lumpur', 2],
  [35.17, 136.91, 'Nagoya', 1], [21.03, 105.85, 'Hanoi', 2],
]

const connections = [
  [0,1],[0,3],[0,5],[0,2],[1,3],[1,7],[4,7],[4,5],[5,4],[7,8],
  [0,10],[1,10],[10,7],[2,3],[0,13],[0,14],[4,16],[11,1],[12,1],
  [0,22],[1,23],[3,24],[11,25]
]

const continents = [
  [[72,-168],[72,-60],[50,-55],[45,-65],[30,-80],[25,-80],[15,-85],[10,-75],[7,-77],[18,-88],[20,-105],[32,-117],[48,-125],[55,-130],[60,-145],[72,-168]],
  [[12,-70],[10,-62],[-5,-35],[-15,-40],[-23,-43],[-35,-57],[-55,-68],[-55,-75],[-40,-73],[-18,-70],[-5,-80],[5,-77],[12,-70]],
  [[70,30],[72,40],[60,30],[55,28],[50,40],[45,30],[40,28],[35,25],[37,15],[43,5],[44,-8],[48,-5],[50,2],[53,5],[55,12],[57,10],[65,14],[70,30]],
  [[37,10],[32,32],[30,33],[22,36],[12,44],[0,42],[-10,40],[-25,35],[-35,20],[-35,18],[-20,12],[-5,12],[5,-5],[10,-15],[15,-17],[20,-17],[30,0],[35,-2],[37,10]],
  [[70,30],[70,180],[65,170],[55,163],[50,140],[45,145],[35,140],[30,120],[22,114],[20,110],[10,105],[1,104],[-8,115],[-8,140],[5,120],[20,122],[30,130],[40,130],[50,90],[55,70],[45,50],[40,45],[32,36],[35,45],[50,50],[55,60],[65,60],[70,50],[70,30]],
  [[-12,130],[-15,140],[-20,148],[-28,153],[-35,150],[-38,145],[-35,137],[-32,133],[-25,113],[-20,115],[-13,125],[-12,130]],
]

function InteractiveMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef(0)
  const mouseRef = useRef({ x: -999, y: -999 })
  const dimRef = useRef({ w: 0, h: 0 })

  const project = useCallback((lat: number, lng: number) => {
    const { w, h } = dimRef.current
    const x = (lng + 180) / 360 * w
    const latRad = lat * Math.PI / 180
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2))
    const y = (h / 2) - (w * mercN / (2 * Math.PI)) * 0.72
    return [x, y] as const
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      const rect = wrap!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      dimRef.current = { w: rect.width, h: rect.height }
      canvas!.width = rect.width * dpr
      canvas!.height = rect.height * dpr
      canvas!.style.width = rect.width + 'px'
      canvas!.style.height = rect.height + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function drawArc(x1: number, y1: number, x2: number, y2: number, alpha: number, progress: number) {
      const mx = (x1 + x2) / 2
      const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.15
      ctx!.beginPath()
      ctx!.moveTo(x1, y1)
      const steps = 30
      const limit = Math.floor(steps * progress)
      for (let i = 1; i <= limit; i++) {
        const t = i / steps
        const px = (1-t)*(1-t)*x1 + 2*(1-t)*t*mx + t*t*x2
        const py = (1-t)*(1-t)*y1 + 2*(1-t)*t*my + t*t*y2
        ctx!.lineTo(px, py)
      }
      ctx!.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${alpha * 0.35})`
      ctx!.lineWidth = 1
      ctx!.stroke()

      if (progress > 0 && progress < 1) {
        const t = progress
        const dx = (1-t)*(1-t)*x1 + 2*(1-t)*t*mx + t*t*x2
        const dy = (1-t)*(1-t)*y1 + 2*(1-t)*t*my + t*t*y2
        ctx!.beginPath()
        ctx!.arc(dx, dy, 2, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${alpha * 0.9})`
        ctx!.fill()
      }
    }

    function draw() {
      const { w, h } = dimRef.current
      timeRef.current += 0.005
      const time = timeRef.current
      ctx!.clearRect(0, 0, w, h)

      // Grid lines
      ctx!.strokeStyle = 'rgba(255,255,255,0.03)'
      ctx!.lineWidth = 0.5
      for (let lat = -60; lat <= 80; lat += 20) {
        const [, y] = project(lat, 0)
        ctx!.beginPath(); ctx!.moveTo(0, y); ctx!.lineTo(w, y); ctx!.stroke()
      }
      for (let lng = -180; lng <= 180; lng += 30) {
        const [x] = project(0, lng)
        ctx!.beginPath(); ctx!.moveTo(x, 0); ctx!.lineTo(x, h); ctx!.stroke()
      }

      // Continents
      ctx!.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},0.2)`
      ctx!.fillStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},0.06)`
      ctx!.lineWidth = 1
      for (const cont of continents) {
        ctx!.beginPath()
        for (let i = 0; i < cont.length; i++) {
          const [x, y] = project(cont[i][0], cont[i][1])
          if (i === 0) ctx!.moveTo(x, y); else ctx!.lineTo(x, y)
        }
        ctx!.closePath(); ctx!.fill(); ctx!.stroke()
      }

      // Connection arcs
      for (let i = 0; i < connections.length; i++) {
        const [a, b] = connections[i]
        const [x1, y1] = project(cities[a][0], cities[a][1])
        const [x2, y2] = project(cities[b][0], cities[b][1])
        const progress = ((time * 0.8 + i * 0.13) % 1)
        drawArc(x1, y1, x2, y2, 0.6, progress)
      }

      // City dots
      const mx = mouseRef.current.x, my = mouseRef.current.y
      for (let i = 0; i < cities.length; i++) {
        const c = cities[i]
        const [cx, cy] = project(c[0], c[1])
        const pulse = Math.sin(time * 3 + i * 0.7) * 0.3 + 0.7
        const size = 2.5 + (c[3] / 28) * 4
        const dist = Math.hypot(mx - cx, my - cy)
        const isHovered = dist < size + 8

        // Glow
        const glowSize = size * (isHovered ? 5 : 3.5) * pulse
        const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, glowSize)
        grad.addColorStop(0, `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${isHovered ? 0.2 : 0.08})`)
        grad.addColorStop(1, 'transparent')
        ctx!.fillStyle = grad
        ctx!.fillRect(cx - glowSize, cy - glowSize, glowSize * 2, glowSize * 2)

        // Ping ring
        const pingPhase = (time * 1.5 + i * 0.5) % 1
        const pingR = size + pingPhase * 15
        const pingAlpha = (1 - pingPhase) * 0.3
        ctx!.beginPath(); ctx!.arc(cx, cy, pingR, 0, Math.PI * 2)
        ctx!.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${pingAlpha})`
        ctx!.lineWidth = 0.5; ctx!.stroke()

        // Core dot
        ctx!.beginPath(); ctx!.arc(cx, cy, isHovered ? size * 1.4 : size, 0, Math.PI * 2)
        ctx!.fillStyle = isHovered
          ? `rgba(${BLUE.r},${BLUE.g},${BLUE.b},1)`
          : `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${0.6 + pulse * 0.4})`
        ctx!.fill()

        // Center
        ctx!.beginPath(); ctx!.arc(cx, cy, size * 0.4, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},0.95)`
        ctx!.fill()

        // Label
        ctx!.font = `${isHovered ? 600 : 400} ${isHovered ? '11px' : '9px'} -apple-system, sans-serif`
        ctx!.fillStyle = isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)'
        ctx!.textAlign = 'left'
        ctx!.textBaseline = 'middle'
        ctx!.fillText(c[2], cx + size + 5, cy)
      }

      requestAnimationFrame(draw)
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMove)
    const raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [project])

  return (
    <div ref={wrapRef} className="relative w-full aspect-[2/1]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

export default function GlobalPortfolioSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-black py-20 md:py-28 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(82,197,232,0.03)_0%,_transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[#52C5E8]/50 text-xs tracking-widest uppercase">Worldwide Reach</span>
          <h2 className="text-3xl md:text-5xl text-white tracking-tight mt-4">
            Global{' '}
            <em
              className="not-italic text-[#52C5E8]/70"
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
            >
              Portfolio
            </em>
          </h2>
          <p className="text-white/50 text-base md:text-lg mt-4 max-w-2xl mx-auto">
            Our investments span every major Web3 ecosystem across the globe, from North America to Asia-Pacific and beyond.
          </p>
        </motion.div>

        <motion.div
          className="liquid-glass rounded-3xl overflow-hidden p-4 md:p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <InteractiveMap />
        </motion.div>
      </div>
    </section>
  )
}
