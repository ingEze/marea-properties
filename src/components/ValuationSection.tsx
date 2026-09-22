import { useState } from 'react'
import { ArrowRight, Check, ChevronDown, MapPin, X } from 'lucide-react'

type FormData = {
  name: string
  email: string
  phone: string
  propertyType: string
  location: string
  operation: string
  message: string
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  propertyType: '',
  location: '',
  operation: '',
  message: '',
}

const propertyTypes = [
  'Casa',
  'Departamento',
  'Terreno',
  'Local comercial',
  'Campo',
  'Otro',
]

export default function ValuationSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState<FormData>(initialForm)

  const updateField = (field: keyof FormData, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const openModal = () => {
    setSubmitted(false)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const handleReset = () => {
    setForm(initialForm)
    setSubmitted(false)
  }

  return (
    <>
      {/* CTA section */}
      <section
        id="valuation"
        className="bg-forest px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] px-7 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-white/[0.035] blur-3xl" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white/45">
                  Tasación personalizada
                </p>

                <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                  Conocé el valor de tu propiedad.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
                  Si estás pensando en vender o alquilar, contanos sobre tu
                  propiedad y conversemos sobre el próximo paso.
                </p>
              </div>

              <button
                type="button"
                onClick={openModal}
                className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-medium text-forest transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-forest"
              >
                Solicitar tasación
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal()
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="valuation-title"
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-surface text-ink shadow-2xl sm:max-w-2xl sm:rounded-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-line bg-surface px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-forest">
                  Marea Propiedades
                </p>

                <h2
                  id="valuation-title"
                  className="mt-1 font-display text-2xl text-ink"
                >
                  Solicitar una tasación
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Cerrar"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-ink-soft/40 hover:text-ink"
              >
                <X size={17} />
              </button>
            </div>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 px-6 py-7 sm:px-8 sm:py-8"
              >
                <p className="max-w-lg text-sm leading-6 text-ink-soft">
                  Completá algunos datos para que podamos conocer mejor tu
                  propiedad.
                </p>

                {/* Datos personales */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="valuation-name"
                      className="mb-2 block text-sm font-medium"
                    >
                      Nombre y apellido *
                    </label>

                    <input
                      id="valuation-name"
                      type="text"
                      value={form.name}
                      onChange={(event) =>
                        updateField('name', event.target.value)
                      }
                      placeholder="Ej. Martín González"
                      autoComplete="name"
                      required
                      className="h-12 w-full rounded-lg border border-line bg-white px-4 text-sm outline-none transition placeholder:text-ink-soft/45 focus:border-forest focus:ring-2 focus:ring-forest/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="valuation-email"
                      className="mb-2 block text-sm font-medium"
                    >
                      Email *
                    </label>

                    <input
                      id="valuation-email"
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        updateField('email', event.target.value)
                      }
                      placeholder="nombre@email.com"
                      autoComplete="email"
                      required
                      className="h-12 w-full rounded-lg border border-line bg-white px-4 text-sm outline-none transition placeholder:text-ink-soft/45 focus:border-forest focus:ring-2 focus:ring-forest/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="valuation-phone"
                      className="mb-2 block text-sm font-medium"
                    >
                      WhatsApp / teléfono *
                    </label>

                    <input
                      id="valuation-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(event) =>
                        updateField('phone', event.target.value)
                      }
                      placeholder="+54 9 11..."
                      autoComplete="tel"
                      required
                      className="h-12 w-full rounded-lg border border-line bg-white px-4 text-sm outline-none transition placeholder:text-ink-soft/45 focus:border-forest focus:ring-2 focus:ring-forest/10"
                    />
                  </div>
                </div>

                {/* Propiedad */}
                <div className="border-t border-line pt-6">
                  <p className="mb-4 text-sm font-medium">Sobre la propiedad</p>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="valuation-type"
                        className="mb-2 block text-sm font-medium"
                      >
                        Tipo de propiedad *
                      </label>

                      <div className="relative">
                        <select
                          id="valuation-type"
                          value={form.propertyType}
                          onChange={(event) =>
                            updateField('propertyType', event.target.value)
                          }
                          required
                          className="h-12 w-full appearance-none rounded-lg border border-line bg-white px-4 pr-10 text-sm outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/10"
                        >
                          <option value="" disabled>
                            Seleccioná
                          </option>

                          {propertyTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>

                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="valuation-location"
                        className="mb-2 block text-sm font-medium"
                      >
                        Ubicación *
                      </label>

                      <div className="relative">
                        <MapPin
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
                        />

                        <input
                          id="valuation-location"
                          type="text"
                          value={form.location}
                          onChange={(event) =>
                            updateField('location', event.target.value)
                          }
                          placeholder="Ej. Nordelta, Tigre"
                          required
                          className="h-12 w-full rounded-lg border border-line bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-ink-soft/45 focus:border-forest focus:ring-2 focus:ring-forest/10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operación */}
                <fieldset className="border-t border-line pt-6">
                  <legend className="mb-3 text-sm font-medium">
                    ¿Qué querés hacer? *
                  </legend>

                  <div className="grid grid-cols-2 gap-3">
                    {['Vender', 'Alquilar'].map((option) => {
                      const selected = form.operation === option

                      return (
                        <label
                          key={option}
                          className={`flex cursor-pointer items-center justify-center rounded-lg border py-3.5 text-sm transition ${
                            selected
                              ? 'border-forest bg-forest/5 text-forest'
                              : 'border-line text-ink-soft hover:border-ink-soft/40'
                          }`}
                        >
                          <input
                            type="radio"
                            name="operation"
                            value={option}
                            checked={selected}
                            onChange={(event) =>
                              updateField('operation', event.target.value)
                            }
                            required
                            className="sr-only"
                          />

                          {selected && <Check size={15} className="mr-2" />}

                          {option}
                        </label>
                      )
                    })}
                  </div>
                </fieldset>

                {/* Mensaje */}
                <div>
                  <label
                    htmlFor="valuation-message"
                    className="mb-2 block text-sm font-medium"
                  >
                    Información adicional
                    <span className="ml-1 font-normal text-ink-soft/50">
                      opcional
                    </span>
                  </label>

                  <textarea
                    id="valuation-message"
                    value={form.message}
                    onChange={(event) =>
                      updateField('message', event.target.value)
                    }
                    placeholder="¿Hay algo que quieras contarnos?"
                    rows={3}
                    className="w-full resize-none rounded-lg border border-line bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-ink-soft/45 focus:border-forest focus:ring-2 focus:ring-forest/10"
                  />
                </div>

                <button
                  type="submit"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-forest px-6 text-sm font-medium text-white transition hover:bg-forest/90 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
                >
                  Enviar solicitud
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <p className="text-center text-[11px] leading-5 text-ink-soft/55">
                  Este formulario es parte de una demostración conceptual.
                </p>
              </form>
            ) : (
              <div className="flex min-h-100 flex-col items-center justify-center px-6 py-12 text-center sm:px-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 text-forest">
                  <Check size={25} />
                </div>

                <h3 className="mt-6 font-display text-2xl">
                  Solicitud recibida
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">
                  Gracias por compartir la información. Un asesor podrá ponerse
                  en contacto para continuar.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="h-10 rounded-lg border border-line px-5 text-sm font-medium text-ink transition hover:border-ink-soft/40"
                  >
                    Nueva solicitud
                  </button>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="h-10 rounded-lg bg-forest px-5 text-sm font-medium text-white transition hover:bg-forest/90"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
