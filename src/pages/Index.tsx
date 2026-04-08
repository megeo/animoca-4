import { useRef, useCallback } from 'react'
import { Globe, ArrowRight, Heart, MessageCircle } from 'lucide-react'

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4'

function animateOpacity(
  el: HTMLVideoElement,
  from: number,
  to: number,
  duration: number,
) {
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min((now - start) / duration, 1)
    el.style.opacity = String(from + (to - from) * t)
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function Index() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const onCanPlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.play()
    animateOpacity(v, 0, 1, 500)
  }, [])

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current
    if (!v || !v.duration) return
    const remaining = v.duration - v.currentTime
    if (remaining <= 0.55) {
      animateOpacity(v, parseFloat(v.style.opacity || '1'), 0, 500)
    }
  }, [])

  const onEnded = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.style.opacity = '0'
    setTimeout(() => {
      v.currentTime = 0
      v.play()
      animateOpacity(v, 0, 1, 500)
    }, 100)
  }, [])

  return (
    <section className="min-h-screen overflow-hidden relative flex flex-col">
      {/* Background video */}
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        muted
        autoPlay
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        style={{ opacity: 0 }}
        onCanPlay={onCanPlay}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />

      {/* Navbar */}
      <nav className="relative z-20 px-6 py-6">
        <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/av-logo2-ai.png" alt="Animoca Ventures" className="h-10" />
            <div className="hidden md:flex items-center gap-8 ml-8">
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium">Home</a>
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium">Portfolio</a>
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium">About</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white text-sm font-medium cursor-pointer">Contact</span>
            <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium">
              Submit Deck
            </button>
          </div>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
        <h1
          className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          We Are The<br />Web3 Builders' <em className="italic">VC.</em>
        </h1>

        <p className="text-white text-sm leading-relaxed px-4 mt-6 max-w-xl">
          Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
        </p>

        <button className="liquid-glass rounded-full px-8 py-3 text-[#52C5E8] text-sm font-medium hover:bg-[#52C5E8]/10 transition-colors mt-6">
          Reach out to us
        </button>
      </div>

      {/* Social icons footer */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
          <Heart size={20} />
        </button>
        <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
          <MessageCircle size={20} />
        </button>
        <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
          <Globe size={20} />
        </button>
      </div>
    </section>
  )
}
