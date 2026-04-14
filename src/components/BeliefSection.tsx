import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4'

export default function BeliefSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative bg-black min-h-screen flex flex-col justify-center pb-[160px] px-6 overflow-hidden">
      {/* Background video - matching HTML composition */}
      <video
        src={VIDEO_URL}
        muted
        autoPlay
        playsInline
        onTimeUpdate={(e) => {
          const v = e.currentTarget
          if (v.duration && v.currentTime >= v.duration - 0.3) {
            v.currentTime = 0
            v.play()
          }
        }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Blue orbs */}
      <div
        className="absolute z-[1] pointer-events-none rounded-full"
        style={{
          top: '21rem',
          left: '-7.5rem',
          width: '25rem',
          height: '25rem',
          background: 'rgba(82, 197, 232, 0.12)',
          filter: 'blur(6.75rem)',
        }}
      />
      <div
        className="absolute z-[1] pointer-events-none rounded-full"
        style={{
          top: '11rem',
          right: '-10rem',
          width: '25rem',
          height: '25rem',
          background: 'rgba(82, 197, 232, 0.12)',
          filter: 'blur(6.75rem)',
        }}
      />

      <div className="relative z-[3] max-w-4xl mx-auto text-center -translate-y-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#52C5E8]/60 text-sm tracking-widest uppercase mb-6 inline-block">
            Our Vision
          </span>

          <h2
            className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight mb-8"
          >
            Having Digital Property Rights{' '}
            <em
              className="not-italic text-[#52C5E8]/70"
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
            >
              Changes Everything
            </em>
          </h2>

          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            We believe that Web3, underpinned by true digital property rights, will unlock economic freedoms for billions, and unleash innovation on a scale currently unimaginable. We work with companies sharing the same ethos.
          </p>

          <a
            href="https://animoca.ventures/contact/"
            className="inline-block bg-[#52C5E8] text-black rounded-full px-8 py-3 text-sm font-medium hover:bg-[#52C5E8]/90 transition-colors"
          >
            Reach Out to Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}
