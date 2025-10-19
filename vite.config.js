import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/TaskMaker-Deploy/'   // MUST match new repo name exactly
})
