import { motion } from 'framer-motion'

interface Founder {
  name: string
  role: string
  photo: string
  quote: string
  bio: string
}

const founders: Founder[] = [
  {
    name: 'Julián Ibarra',
    role: 'Fundador & CEO',
    photo:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&crop=faces&w=800&h=1000&q=80',
    quote: 'Si no visité la propiedad yo mismo, no la publicamos.',
    bio: 'Empezó como tasador en 2011 y se cansó de ver inmobiliarias vendiendo fotos en vez de propiedades. Fundó Marea con una sola regla: cada ficha del catálogo se visita en persona antes de salir a la venta.',
  },
  {
    name: 'Camila Duarte',
    role: 'Co-fundadora & Directora Comercial',
    photo:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=800&h=1000&q=80',
    quote: 'Comprar una casa no debería sentirse como negociar un auto usado.',
    bio: 'Diez años acompañando compradores primerizos le enseñaron que la mayor fricción no es el precio, es la falta de información clara. Diseñó el proceso comercial de Marea alrededor de esa idea.',
  },
]

const easeOut = [0.16, 1, 0.3, 1] as const

export default function Founders() {
  return (
    <section className="overflow-hidden bg-base py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="text-sm font-medium text-brass"
          >
            Quiénes lideran Marea
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.08,
              ease: easeOut,
            }}
            className="mt-4 max-w-xl font-display text-4xl leading-tight text-ink sm:text-5xl"
          >
            Dos personas,
            <br />
            una sola regla
            <br />
            de trabajo.
          </motion.h2>
        </div>

        <div className="mt-16 space-y-32 md:mt-20 md:space-y-44">
          {founders.map((founder, i) => {
            const isFirst = i === 0

            return (
              <article key={founder.name}>
                <div
                  className={`hidden items-center md:grid md:grid-cols-12 md:gap-x-10 lg:gap-x-10 ${
                    isFirst ? '' : ''
                  }`}
                >
                  {/* Photo */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isFirst ? -30 : 30,
                      scale: 1.02,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                      margin: '-100px',
                    }}
                    transition={{
                      duration: 0.9,
                      ease: easeOut,
                    }}
                    className={`relative overflow-hidden rounded-2xl shadow-2xl shadow-black/15 ${
                      isFirst
                        ? 'col-span-6 col-start-1'
                        : 'col-span-6 col-start-7'
                    }`}
                  >
                    <img
                      src={founder.photo}
                      alt={founder.name}
                      className="aspect-4/3 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </motion.div>

                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isFirst ? 30 : -30,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      margin: '-100px',
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.12,
                      ease: easeOut,
                    }}
                    className={`col-span-5 ${
                      isFirst ? 'col-start-7' : 'col-start-2 row-start-1'
                    }`}
                  >
                    <div className="border-t border-line pt-5">
                      <p className="font-display text-3xl leading-tight text-forest lg:text-4xl">
                        <span className="text-brass/60">“</span>
                        {founder.quote}
                        <span className="text-brass/60">”</span>
                      </p>

                      <p className="mt-7 max-w-lg text-sm leading-7 text-ink-soft">
                        {founder.bio}
                      </p>
                    </div>

                    <div className="mt-7 border-t border-line pt-4">
                      <div className="flex items-baseline justify-between gap-6">
                        <p className="font-display text-xl text-ink">
                          {founder.name}
                        </p>

                        <p className="text-right text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                          {founder.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="md:hidden">
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      margin: '-80px',
                    }}
                    transition={{
                      duration: 0.8,
                      ease: easeOut,
                    }}
                    className="overflow-hidden rounded-2xl shadow-xl shadow-black/15"
                  >
                    <img
                      src={founder.photo}
                      alt={founder.name}
                      className="aspect-4/3 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1,
                      ease: easeOut,
                    }}
                    className="mt-6"
                  >
                    <div className="border-t border-line pt-4">
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="font-display text-xl text-ink">
                          {founder.name}
                        </p>

                        <p className="text-right text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                          {founder.role}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <p className="font-display text-2xl leading-tight text-forest">
                        <span className="text-brass/60">“</span>
                        {founder.quote}
                        <span className="text-brass/60">”</span>
                      </p>

                      <p className="mt-5 text-sm leading-7 text-ink-soft">
                        {founder.bio}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
