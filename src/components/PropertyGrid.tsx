import { AnimatePresence, motion } from 'framer-motion'
import { SearchX } from 'lucide-react'

import PropertyCard from './PropertyCard'

import type { Property } from '../types/property'

interface PropertyGridProps {
  properties: Property[]
  onSelect: (property: Property) => void
}

export default function PropertyGrid({
  properties,
  onSelect,
}: PropertyGridProps) {
  return (
    <section id="properties" className="bg-base px-6 py-20 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="mx-auto max-w-7xl"
      >
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl text-ink">
              Portafolio actual
            </h2>

            <p className="mt-2 max-w-4xl text-ink-soft">
              Cada propiedad fue visitada, fotografiada tal como está y
              verificada por un asesor de Marea. No delegamos esa tarea a un
              algoritmo.
            </p>
          </div>

          <span className="shrink-0 text-sm text-ink-soft">
            {properties.length} resultados
          </span>
        </div>

        {properties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-24 text-center"
          >
            <SearchX size={32} className="text-ink-soft" />

            <p className="mt-4 font-display text-xl text-ink">
              No hay coincidencias con esos filtros
            </p>

            <p className="mt-2 max-w-sm text-sm text-ink-soft">
              Nuestro portafolio es acotado por decisión: preferimos calidad
              sobre volumen. Ajuste el presupuesto o sume otra ciudad — el
              catálogo se actualiza cada semana.
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={onSelect}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
