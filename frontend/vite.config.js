import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// En GitHub Pages el sitio vive en https://sancochomaster.github.io/Zona-12/,
// así que el build se publica bajo esa subcarpeta (base "/Zona-12/").
// En local (npm run dev) la base sigue siendo "/".
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/Zona-12/' : '/',
}))
