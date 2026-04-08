import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const marqueeImages = [
  '/banner-1.jpg',
  '/banner-2.jpeg',
  '/banner-3.jpeg',
  '/banner-4.png',
  '/banner-5.jpeg',
  '/banner-6.jpg',
]

export default function FeaturedVideoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const allImages = [...marqueeImages, ...marqueeImages]

  return (
    <section ref={ref} className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
      >
        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          {allImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="h-[280px] md:h-[500px] object-cover mx-3 rounded-2xl shadow-lg"
              loading="lazy"
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
