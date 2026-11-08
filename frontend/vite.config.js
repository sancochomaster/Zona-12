import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// En GitHub Pages la web vive en https://sancochomaster.github.io/Zona-12/,
// por eso el sitio compilado usa esa subcarpeta como base.
// En local (npm run dev) la base sigue siendo "/".
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/Zona-12/' : '/',
}))
