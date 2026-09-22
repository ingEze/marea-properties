import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Waves } from 'lucide-react'

const links = [
  { label: 'Catálogo', href: '/#properties' },
  { label: 'Nuestro equipo', href: '/about' },
  { label: 'Contacto', href: '/#contact' },
]

const easeOut = [0.16, 1, 0.3, 1] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          open
            ? 'bg-transparent py-5'
            : scrolled
              ? 'border-b border-line bg-surface/90 py-4 shadow-sm backdrop-blur-md'
              : 'bg-linear-to-b from-black/60 to-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="/" className="relative z-60 flex items-center gap-2.5">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 ${
                open
                  ? 'bg-white text-forest'
                  : scrolled
                    ? 'bg-forest text-white'
                    : 'bg-white text-forest'
              }`}
            >
              <Waves size={16} strokeWidth={2.2} />
            </span>

            <span
              className={`font-display text-xl tracking-tight transition-colors duration-300 ${
                open ? 'text-white' : scrolled ? 'text-ink' : 'text-white'
              }`}
            >
              Marea Propiedades
            </span>
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group relative text-sm font-medium transition-colors ${
                  scrolled
                    ? 'text-ink-soft hover:text-forest'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}

                <span
                  className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                    scrolled ? 'bg-forest' : 'bg-white'
                  }`}
                />
              </a>
            ))}

            <a
              href="/#valuation"
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                scrolled
                  ? 'bg-forest text-white hover:bg-forest-soft'
                  : 'bg-white text-forest shadow-md hover:bg-white/90'
              }`}
            >
              Solicitar tasación
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className={`relative z-60 flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 md:hidden ${
              open
                ? 'border-white/30 text-white'
                : scrolled
                  ? 'border-line text-ink'
                  : 'border-white/30 bg-black/20 text-white'
            }`}
          >
            <span className="relative flex h-3.5 w-4 flex-col justify-between">
              <motion.span
                className="block h-px w-full origin-center bg-current"
                animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: easeOut,
                }}
              />

              <motion.span
                className="block h-px w-full bg-current"
                animate={open ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                transition={{
                  duration: 0.15,
                  ease: easeOut,
                }}
              />

              <motion.span
                className="block h-px w-full origin-center bg-current"
                animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: easeOut,
                }}
              />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
            }}
            animate={{
              clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)',
            }}
            exit={{
              clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
            }}
            transition={{
              duration: 0.55,
              ease: easeOut,
            }}
            className="fixed inset-0 z-40 bg-forest md:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28">
              <div className="flex flex-col gap-1">
                {links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.12 + index * 0.06,
                      ease: easeOut,
                    }}
                    className="border-b border-white/10 py-4 font-display text-3xl text-white/90 transition-colors hover:text-brass-soft"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="/valuation"
                onClick={() => setOpen(false)}
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.12 + links.length * 0.06,
                  ease: easeOut,
                }}
                className="rounded-full bg-white px-6 py-3.5 text-center text-sm font-medium text-forest"
              >
                Solicitar tasación
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
