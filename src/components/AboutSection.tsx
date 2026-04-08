import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(82,197,232,0.04)_0%,_transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto">
        <motion.p
          className="text-[#52C5E8]/60 text-sm tracking-widest uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.p>

        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          We are the{' '}
          <em
            className="not-italic text-[#52C5E8]/70"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            venture investment
          </em>{' '}
          arm
          <br className="hidden md:block" />
          {' '}of{' '}
          <em
            className="not-italic text-[#52C5E8]/70"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            Animoca Brands.
          </em>
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          We live on the cutting edge of Web3, and find, fund and support builders that will be the giants of tomorrow's Internet.
        </motion.p>
      </div>
    </section>
  )
}
