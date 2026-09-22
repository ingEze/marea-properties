import { motion } from 'framer-motion'

import { Search, MapPin, BedDouble, Wallet } from 'lucide-react'

import type {
  PropertyFilters,
  PropertyOperation,
  PropertyType,
} from '../types/property'

interface HeroSearchProps {
  filters: PropertyFilters
  onChange: (filters: PropertyFilters) => void
  cities: string[]
  types: PropertyType[]
  resultsCount: number
}

const priceOptions = [250000, 500000, 750000, 1000000, 1500000, 2000000]

const operationLabel: Record<PropertyOperation, string> = {
  venta: 'Comprar',
  alquiler: 'Alquilar',
}

export default function HeroSearch({
  filters,
  onChange,
  cities,
  types,
  resultsCount,
}: HeroSearchProps) {
  const setOperation = (operation: PropertyOperation) =>
    onChange({ ...filters, operation })

  return (
    <section className="relative overflow-hidden bg-ink pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="h-full w-full object-cover opacity-40"
          loading="eager"
          decoding="async"
          srcSet="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80 2000w"
          sizes="100vw"
          {...({
            fetchpriority: 'high',
          } as React.HTMLAttributes<HTMLImageElement>)}
        />

        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/60 to-ink/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 1, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-sm font-medium text-white/80">
            8 propiedades verificadas en cartera actual.
          </p>

          <h1 className="font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl">
            Un portafolio curado de propiedades verificadas en persona.
          </h1>

          <p className="mt-6 max-w-md text-white/80">
            Visitamos cada propiedad antes de publicarla. Sin fotos de stock,
            sin valores "a consultar" y sin sorpresas el día de la firma.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-12 max-w-4xl rounded-2xl bg-surface p-2 shadow-2xl shadow-black/30"
        >
          <div className="flex gap-3 border-b border-line px-4 pt-3">
            {(['venta', 'alquiler'] as PropertyOperation[]).map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => setOperation(op)}
                aria-pressed={filters.operation === op}
                className={`relative pb-3 text-sm font-medium transition-colors ${
                  filters.operation === op
                    ? 'text-forest'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                {operationLabel[op]}

                {filters.operation === op && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute -bottom-px left-0 right-0 h-0.5 bg-forest"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors focus-within:border-line hover:bg-base">
              <MapPin size={17} className="shrink-0 text-ink-soft" />

              <select
                aria-label="Ciudad"
                value={filters.city}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    city: e.target.value,
                  })
                }
                className="w-full bg-transparent text-sm text-ink outline-none"
              >
                <option value="Todas">Cualquier ciudad</option>

                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors focus-within:border-line hover:bg-base">
              <Search size={17} className="shrink-0 text-ink-soft" />

              <select
                aria-label="Tipo de propiedad"
                value={filters.type}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    type: e.target.value as PropertyType | 'Todos',
                  })
                }
                className="w-full bg-transparent text-sm text-ink outline-none"
              >
                <option value="Todos">Cualquier tipo</option>

                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors focus-within:border-line hover:bg-base">
              <Wallet size={17} className="shrink-0 text-ink-soft" />

              <select
                aria-label="Precio máximo"
                value={filters.maxPrice}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    maxPrice: Number(e.target.value),
                  })
                }
                className="w-full bg-transparent text-sm text-ink outline-none"
              >
                {priceOptions.map((price) => (
                  <option key={price} value={price}>
                    Hasta USD {new Intl.NumberFormat('es-AR').format(price)}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors focus-within:border-line hover:bg-base">
              <BedDouble size={17} className="shrink-0 text-ink-soft" />

              <select
                aria-label="Cantidad de dormitorios"
                value={filters.bedrooms}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    bedrooms: Number(e.target.value),
                  })
                }
                className="w-full bg-transparent text-sm text-ink outline-none"
              >
                <option value={0}>Cualquier ambiente</option>
                <option value={1}>1+ dormitorio</option>
                <option value={2}>2+ dormitorios</option>
                <option value={3}>3+ dormitorios</option>
                <option value={4}>4+ dormitorios</option>
              </select>
            </label>
          </div>

          <div className="flex items-center justify-between px-4 pb-3 pt-1">
            <span className="text-xs text-ink-soft">
              {resultsCount}{' '}
              {resultsCount === 1
                ? 'propiedad encontrada'
                : 'propiedades encontradas'}
            </span>

            <a
              href="#properties"
              className="flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            >
              <Search size={15} />
              Ver propiedades
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
