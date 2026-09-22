import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  X,
  ChevronLeft,
  ChevronRight,
  BedDouble,
  Bath,
  Ruler,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Check,
  Heart,
} from 'lucide-react'
import type { Property } from '../types/property'
import { formatPrice, formatArea } from '../lib/format'

interface PropertyModalProps {
  property: Property | null
  onClose: () => void
}

export default function PropertyModal({
  property,
  onClose,
}: PropertyModalProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [downPaymentPct, setDownPaymentPct] = useState(20)
  const [years, setYears] = useState(20)
  const [requestSent, setRequestSent] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setActiveImage(0)
    setRequestSent(false)
    setSaved(false)
    setDownPaymentPct(20)
    setYears(20)
  }, [property?.id])

  useEffect(() => {
    document.body.style.overflow = property ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [property])

  const monthlyPayment = useMemo(() => {
    if (!property || property.operation !== 'venta') return 0
    const principal = property.price * (1 - downPaymentPct / 100)
    const monthlyRate = 0.065 / 12
    const totalMonths = years * 12
    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    return Number.isFinite(payment) ? payment : 0
  }, [property, downPaymentPct, years])

  if (!property) return null

  const goTo = (delta: number) => {
    setActiveImage(
      (current) =>
        (current + delta + property.images.length) % property.images.length
    )
  }

  return (
    <AnimatePresence>
      {property && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-surface no-scrollbar"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-ink shadow-md"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-video bg-line">
              <img
                src={property.images[activeImage]}
                alt={property.title}
                className="h-full w-full object-cover"
                loading="eager"
              />
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => goTo(-1)}
                    className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => goTo(1)}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`h-1.5 rounded-full transition-all ${
                          index === activeImage
                            ? 'w-6 bg-white'
                            : 'w-1.5 bg-white/50'
                        }`}
                        aria-label={`Ir a imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-5 md:p-8">
              <div className="md:col-span-3">
                <p className="flex items-center gap-1.5 text-sm text-ink-soft">
                  <MapPin size={14} /> {property.location}
                </p>
                <h2 className="mt-1 font-display text-2xl text-ink md:text-3xl">
                  {property.title}
                </h2>
                <p className="mt-2 font-display text-2xl text-forest">
                  {formatPrice(
                    property.price,
                    property.currency,
                    property.operation
                  )}
                </p>

                <div className="mt-5 flex flex-wrap gap-5 border-y border-line py-4 text-sm text-ink-soft">
                  {property.bedrooms > 0 && (
                    <span className="flex items-center gap-1.5">
                      <BedDouble size={16} /> {property.bedrooms} dormitorios
                    </span>
                  )}
                  {property.bathrooms > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Bath size={16} /> {property.bathrooms} baños
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Ruler size={16} /> {formatArea(property.area)}
                  </span>
                  {property.yearBuilt > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={16} /> {property.yearBuilt}
                    </span>
                  )}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-ink-soft">
                  {property.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
                  {property.features.map((feature) => (
                    <span
                      key={feature}
                      className="flex items-center gap-2 text-sm text-ink"
                    >
                      <Check size={14} className="text-brass" /> {feature}
                    </span>
                  ))}
                </div>

                {property.operation === 'venta' && (
                  <div className="mt-8 rounded-xl border border-line p-5">
                    <p className="font-display text-lg text-ink">
                      Estime su cuota mensual
                    </p>
                    <p className="mt-1 text-xs text-ink-soft">
                      Cálculo referencial a tasa fija del 6,5% anual. Sirve
                      para orientarse; no reemplaza un análisis crediticio
                      formal.
                    </p>

                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-ink-soft">
                          <span>Anticipo</span>
                          <span>{downPaymentPct}%</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={50}
                          step={5}
                          value={downPaymentPct}
                          onChange={(e) =>
                            setDownPaymentPct(Number(e.target.value))
                          }
                          className="mt-1 w-full accent-forest"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-ink-soft">
                          <span>Plazo</span>
                          <span>{years} años</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={30}
                          step={5}
                          value={years}
                          onChange={(e) => setYears(Number(e.target.value))}
                          className="mt-1 w-full accent-forest"
                        />
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg bg-base p-4">
                      <p className="text-xs text-ink-soft">
                        Con estos parámetros, la cuota estimada sería de
                      </p>
                      <p className="font-display text-2xl text-forest">
                        {formatPrice(
                          monthlyPayment,
                          property.currency,
                          'alquiler'
                        ).replace('/mes', '')}
                        <span className="text-sm text-ink-soft"> /mes</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <div className="rounded-xl border border-line p-5">
                  <p className="text-xs text-ink-soft">
                    Su contacto para esta propiedad
                  </p>
                  <p className="mt-1 font-display text-lg text-ink">
                    {property.agent.name}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-ink-soft">
                    <p className="flex items-center gap-2">
                      <Phone size={14} /> {property.agent.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail size={14} /> {property.agent.email}
                    </p>
                  </div>

                  {requestSent ? (
                    <div className="mt-5 flex items-center gap-2 rounded-lg bg-brass-soft px-4 py-3 text-sm text-ink">
                      <Check size={16} className="text-brass" />
                      Listo. {property.agent.name.split(' ')[0]} se pondrá en
                      contacto dentro de las próximas 24 horas.
                    </div>
                  ) : (
                    <button
                      onClick={() => setRequestSent(true)}
                      className="mt-5 w-full rounded-full bg-forest py-3 text-sm font-medium text-white transition-colors hover:bg-forest-soft"
                    >
                      Coordinar una visita
                    </button>
                  )}
                  <button
                    onClick={() => setSaved((v) => !v)}
                    className={`mt-2 flex w-full items-center justify-center gap-2 rounded-full border py-3 text-sm font-medium transition-colors ${
                      saved
                        ? 'border-brass bg-brass-soft text-ink'
                        : 'border-line text-ink hover:bg-base'
                    }`}
                  >
                    <Heart
                      size={15}
                      className={saved ? 'fill-brass text-brass' : ''}
                    />
                    {saved ? 'Guardada en favoritos' : 'Guardar en favoritos'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
