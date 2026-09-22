import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

interface Stat {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 340, suffix: '+', label: 'Propiedades escrituradas' },
  { value: 98, suffix: '%', label: 'Clientes que nos recomendarían' },
  { value: 12, suffix: ' años', label: 'De trayectoria en el mercado' },
  { value: 45, suffix: ' días', label: 'Promedio hasta la escritura' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1.4, bounce: 0 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => setDisplay(Math.round(v)))
    return () => unsubscribe()
  }, [spring])

  return (
    <span ref={ref} className="font-display text-4xl text-white md:text-5xl">
      {display}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="bg-forest py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 lg:grid-cols-4 lg:px-10">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-sm text-white/60">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
