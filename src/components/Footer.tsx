import { Waves, Instagram, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-white">
                <Waves size={16} strokeWidth={2.2} />
              </span>
              <span className="font-display text-xl text-ink">
                Marea Propiedades
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-ink-soft">
              Inmobiliaria boutique especializada en propiedades de alto valor
              en Argentina. Cada operación es acompañada de principio a fin por
              un mismo asesor.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:text-forest"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:text-forest"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:hola@marea.com.ar"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:text-forest"
                aria-label="Correo electrónico"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-ink">Recorrer el catálogo</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <li>
                <a href="/#properties" className="hover:text-forest">
                  Propiedades en venta
                </a>
              </li>
              <li>
                <a href="/#properties" className="hover:text-forest">
                  Propiedades en alquiler
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-forest">
                  Nuestro equipo
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-ink">Contacto</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              <li>Av. del Libertador 5990, Buenos Aires</li>
              <li>+54 9 11 4000-2211</li>
              <li>hola@marea.com.ar</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Marea Propiedades. Todos los derechos reservados.</p>
          <p>Diseñado para quienes buscan un hogar rápido y sin vueltas.</p>
        </div>
      </div>
      <div className="mt-5 ml-1 border-t border-line pt-4">
        <p className="text-[10px] leading-relaxed text-ink-soft/60">
          <span className="font-medium text-ink-soft/80">
            Sitio conceptual.
          </span>
          <br />
          Esta web fue desarrollada como demostración para el sector
          inmobiliario. Las propiedades, información y datos de contacto son
          únicamente ilustrativos.
        </p>
      </div>
    </footer>
  )
}
