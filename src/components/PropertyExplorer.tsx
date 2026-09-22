import { useMemo, useState } from 'react'
import HeroSearch from './HeroSearch'
import PropertyGrid from './PropertyGrid'
import PropertyModal from './PropertyModal'
import { properties, cities, propertyTypes } from '../data/properties'
import type { Property, PropertyFilters } from '../types/property'

const initialFilters: PropertyFilters = {
  operation: 'venta',
  city: 'Todas',
  type: 'Todos',
  maxPrice: 2000000,
  bedrooms: 0,
}

export default function PropertyExplorer() {
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters)
  const [selected, setSelected] = useState<Property | null>(null)

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      if (property.operation !== filters.operation) return false
      if (filters.city !== 'Todas' && property.city !== filters.city)
        return false
      if (filters.type !== 'Todos' && property.type !== filters.type)
        return false
      if (property.price > filters.maxPrice) return false
      if (filters.bedrooms > 0 && property.bedrooms < filters.bedrooms)
        return false

      return true
    })
  }, [filters])

  return (
    <>
      <HeroSearch
        filters={filters}
        onChange={setFilters}
        cities={cities}
        types={propertyTypes}
        resultsCount={filtered.length}
      />

      <PropertyGrid properties={filtered} onSelect={setSelected} />

      <PropertyModal property={selected} onClose={() => setSelected(null)} />
    </>
  )
}
