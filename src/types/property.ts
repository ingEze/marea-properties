export type PropertyOperation = 'venta' | 'alquiler'

export type PropertyType =
  | 'Casa'
  | 'Departamento'
  | 'Penthouse'
  | 'Oficina'
  | 'Terreno'

export type PropertyStatus = 'disponible' | 'reservado' | 'vendido'

export interface Agent {
  name: string
  phone: string
  email: string
}

export interface Property {
  id: string
  title: string
  location: string
  city: string
  price: number
  currency: string
  operation: PropertyOperation
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  type: PropertyType
  features: string[]
  status: PropertyStatus
  featured: boolean
  yearBuilt: number
  description: string
  agent: Agent
}

export interface PropertyFilters {
  operation: PropertyOperation
  city: string
  type: PropertyType | 'Todos'
  maxPrice: number
  bedrooms: number
}
