// Sitio de varias páginas: cada .html de la lista es una entrada del build.
// VITE_BASE permite publicarlo en una subcarpeta (por omisión, la raíz).
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const PAGINAS = ['index', 'productos', 'producto', 'nosotros', 'sostenibilidad', 'sucursales', 'contacto', 'cotizar'];

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  build: {
    rollupOptions: {
      input: Object.fromEntries(PAGINAS.map((p) => [p, resolve(import.meta.dirname, `${p}.html`)])),
    },
  },
});
