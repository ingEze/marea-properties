import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  integrations: [react()],
  vite: {
    server: {
      allowedHosts: ['hokily-unsociological-henley.ngrok-free.dev'],
    },
    plugins: [tailwindcss()],
  },
})
