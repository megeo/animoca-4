import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Layers, Globe, Zap, Shield } from 'lucide-react'

const cards = [
  {
    icon: Layers,
    tag: 'Funding',
    title: 'Early-Stage Funding',
    description:
      'We identify and fund the most promising Web3 startups from pre-seed through Series A.',
  },
  {
    icon: Globe,
    tag: 'Network',
    title: 'Global Network',
    description:
      'Connect with the Animoca Brands ecosystem and our network of 155+ portfolio companies worldwide.',
  },
  {
    icon: Zap,
    tag: 'Advisory',
    title: 'Strategic Support',
    description:
      'Beyond capital—we provide hands-on advisory, go-to-market strategy, and technical guidance.',
  },
  {
    icon: Shield,
    tag: 'Ownership',
    title: 'Digital Property Rights',
    description:
      'We champion true ownership and economic freedom through decentralized technologies.',
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-black pt-16 md:pt-20 pb-16 md:pb-20 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(82,197,232,0.03)_0%,_transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[#52C5E8]/50 text-xs tracking-widest uppercase">What We Do</span>
          <h2 className="text-3xl md:text-5xl text-white tracking-tight mt-4">Building the Decentralized Future</h2>
          <p className="text-white/50 text-base md:text-lg mt-4 max-w-2xl mx-auto">
            We back visionary teams at every stage—from ideation to scale—with capital, expertise, and the full Animoca Brands ecosystem.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                className="liquid-glass rounded-3xl overflow-hidden group p-6 md:p-8"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#52C5E8]/10 border border-[#52C5E8]/20 flex items-center justify-center mb-6">
                  <Icon size={24} className="text-[#52C5E8]" />
                </div>
                <span className="uppercase tracking-widest text-[#52C5E8]/50 text-xs">
                  {card.tag}
                </span>
                <h3 className="text-white text-xl md:text-2xl mb-3 mt-2 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
