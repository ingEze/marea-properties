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
    <section id="properties" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl text-ink">Portafolio actual</h2>

          <p className="mt-2 text-ink-soft">
            Cada propiedad fue visitada, fotografiada tal como está y
            verificada por un asesor de Marea. No delegamos esa tarea a un
            algoritmo.
          </p>
        </div>

        <span className="text-sm text-ink-soft">
          {properties.length} resultados
        </span>
      </div>

      {properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-24 text-center">
          <SearchX size={32} className="text-ink-soft" />

          <p className="mt-4 font-display text-xl text-ink">
            No hay coincidencias con esos filtros
          </p>

          <p className="mt-2 max-w-sm text-sm text-ink-soft">
            Nuestro portafolio es acotado por decisión: preferimos calidad
            sobre volumen. Ajuste el presupuesto o sume otra ciudad — el
            catálogo se actualiza cada semana.
          </p>
        </div>
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
    </section>
  )
}
