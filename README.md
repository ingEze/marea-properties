# Marea Propiedades — demo de portal inmobiliario

Plantilla de demostración (Astro + React + Tailwind v4) para mostrarle a
clientes cómo puede verse su web de inmobiliaria. 100% frontend, sin
backend: los datos viven en `src/data/properties.ts` y todo el filtrado,
el modal de detalle y el simulador de cuota funcionan en el navegador.

## Cómo probarla

```bash
npm install
npm run dev
```

Abrir `http://localhost:4321`.

## Qué es "funcional" acá (sin backend)

- Buscador con filtros por operación, ciudad, tipo, precio y ambientes.
- Grilla de propiedades que se actualiza en tiempo real según los filtros.
- Modal de detalle con galería, ficha técnica y simulador de cuota mensual
  (cálculo de amortización francés, 100% en el cliente).
- Botón "Coordinar una visita" y "Guardar en favoritos": simulan el envío
  con estado local de React (no hay servidor ni base de datos).
- Botón flotante de WhatsApp con mensaje precargado.

## Estructura

```
src/
  components/   Navbar, HeroSearch, PropertyGrid, PropertyCard, PropertyModal,
                StatsSection, Footer, ButtonWhatsApp
  data/         properties.ts (los datos de ejemplo)
  lib/          format.ts (formato de precios y superficies)
  types/        property.ts (tipos TypeScript)
  layouts/      Layout.astro
  pages/        index.astro
  styles/       global.css (paleta y tipografías)
```
