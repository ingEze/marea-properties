import { forwardRef, memo, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { BedDouble, Bath, Ruler, MapPin } from 'lucide-react'
import type { Property } from '../types/property'
import { formatPrice, formatArea } from '../lib/format'

interface PropertyCardProps {
  property: Property
  onSelect: (property: Property) => void
}

const statusLabel: Record<Property['status'], string> = {
  disponible: 'Disponible',
  reservado: 'Reservado',
  vendido: 'Vendido',
}

const operationLabel: Record<Property['operation'], string> = {
  venta: 'Venta',
  alquiler: 'Alquiler',
}

const PropertyCard = forwardRef<HTMLElement, PropertyCardProps>(
  ({ property, onSelect }, ref) => {
    const imgRef = useRef<HTMLImageElement>(null)
    const [loaded, setLoaded] = useState(false)
    const [failed, setFailed] = useState(false)

    useEffect(() => {
      if (imgRef.current?.complete) {
        setLoaded(true)
      }
    }, [])

    return (
      <motion.article
        ref={ref}
        layout
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => onSelect(property)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onSelect(property)
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalles de ${property.title}`}
        className="group cursor-pointer overflow-hidden rounded-2xl border border-line bg-surface transition-shadow hover:shadow-xl hover:shadow-ink/5"
      >
        <div className="relative aspect-4/3 overflow-hidden bg-line">
          {!loaded && !failed && (
            <div className="absolute inset-0 animate-pulse bg-line" />
          )}

          {failed ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-line text-ink-soft">
              <MapPin size={20} />
              <span className="text-xs">Foto no disponible por ahora</span>
            </div>
          ) : (
            <img
              ref={imgRef}
              src={property.images[0]}
              srcSet={`${property.images[0].replace('w=1400', 'w=480')} 480w, ${property.images[0].replace('w=1400', 'w=900')} 900w, ${property.images[0]} 1400w`}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              alt={property.title}
              width={1400}
              height={1050}
              loading="lazy"
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          <div className="absolute left-3 top-3 flex gap-2">
            <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-ink">
              {operationLabel[property.operation]}
            </span>

            {property.featured && (
              <span className="rounded-full bg-brass px-3 py-1 text-xs font-medium text-white">
                Selección del equipo
              </span>
            )}
          </div>

          {property.status !== 'disponible' && (
            <div className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-white">
              {statusLabel[property.status]}
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg leading-snug text-ink">
              {property.title}
            </h3>
          </div>

          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
            <MapPin size={13} />
            {property.location}
          </p>

          <p className="mt-3 font-display text-xl text-forest">
            {formatPrice(property.price, property.currency, property.operation)}
          </p>

          <div className="mt-4 flex items-center gap-4 border-t border-line pt-4 text-sm text-ink-soft">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <BedDouble size={15} />
                {property.bedrooms}
              </span>
            )}

            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <Bath size={15} />
                {property.bathrooms}
              </span>
            )}

            <span className="flex items-center gap-1.5">
              <Ruler size={15} />
              {formatArea(property.area)}
            </span>
          </div>
        </div>
      </motion.article>
    )
  }
)

PropertyCard.displayName = 'PropertyCard'

export default memo(PropertyCard)
