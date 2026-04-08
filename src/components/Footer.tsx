import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [email, setEmail] = useState('')

  return (
    <footer className="bg-black pt-10 pb-10 md:pt-12 md:pb-12 px-6" ref={ref}>
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="https://animoca.ventures/">
              <img src="/av-logo2-ai.png" alt="Animoca Ventures" className="h-8 mb-4" />
            </a>
            <p className="text-sm text-white/50 leading-relaxed">
              We are the venture investment arm of Animoca Brands. We find, fund and support Web3 builders that will be the giants of tomorrow's Internet.
            </p>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <div className="flex flex-col gap-2.5">
              <a href="https://animoca.ventures/" className="text-sm text-white/50 hover:text-white transition-colors">Home</a>
              <a href="https://animoca.ventures/portfolio/" className="text-sm text-white/50 hover:text-white transition-colors">Portfolio</a>
              <a href="https://animoca.ventures/about-us/" className="text-sm text-white/50 hover:text-white transition-colors">About Us</a>
              <a href="https://animoca.ventures/contact/" className="text-sm text-white/50 hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <div className="flex flex-col gap-2.5">
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">News</a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Blog & Articles</a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Case Studies</a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Media Kit</a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Stay Updated</h4>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Get the latest Web3 investment insights and portfolio updates straight to your email.
            </p>
            <div className="flex items-center gap-0 border border-white/10 rounded-xl overflow-hidden bg-white/5">
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm text-white placeholder-white/30 bg-transparent outline-none"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="px-3 py-2.5 text-[#52C5E8]/70 hover:text-[#52C5E8] transition-colors"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-white/10">
          <p className="text-xs text-white/40">&copy; 2025 Animoca Ventures. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <span className="w-px h-3 bg-white/10" />
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
