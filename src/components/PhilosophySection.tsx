import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Hls from 'hls.js'

const VIDEO_URL =
  'https://stream.mux.com/BuGGTsiXq1T00WUb8qfURrHkTCbhrkfFLSv4uAOZzdhw.m3u8'

export default function PhilosophySection() {
  const ref = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(VIDEO_URL)
      hls.attachMedia(video)
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = VIDEO_URL
    }
  }, [])

  return (
    <section ref={ref} className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Animoca Ventures{' '}
          <em
            className="not-italic text-[#52C5E8]/60"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            In
          </em>{' '}
          Numbers
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Video */}
          <motion.div
            className="rounded-3xl overflow-hidden aspect-[4/3]"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <video
              ref={videoRef}
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right: Text blocks */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-8">
              <p className="text-[#52C5E8]/50 text-xs tracking-widest uppercase mb-4">
                Choose your space
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Every meaningful breakthrough begins at the intersection of disciplined strategy and
                remarkable creative vision. We operate at that crossroads, turning bold thinking into
                tangible outcomes that move people and reshape industries.
              </p>
            </div>

            <div className="w-full h-px bg-white/10 mb-8" />

            <div>
              <p className="text-[#52C5E8]/50 text-xs tracking-widest uppercase mb-4">
                Shape the future
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                We believe that the best work emerges when curiosity meets conviction. Our process is
                designed to uncover hidden opportunities and translate them into experiences that
                resonate long after the first impression.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
