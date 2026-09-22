import type { PropertyOperation } from '../types/property'

export function formatPrice(
  price: number,
  currency: string,
  operation: PropertyOperation
): string {
  const formatted = new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: 0,
  }).format(Math.round(price))

  const base = `${currency} ${formatted}`
  return operation === 'alquiler' ? `${base}/mes` : base
}

export function formatArea(area: number): string {
  const formatted = new Intl.NumberFormat('es-AR').format(area)
  return `${formatted} m²`
}
