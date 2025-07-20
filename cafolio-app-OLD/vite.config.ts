import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact(), tsconfigPaths()],
  optimizeDeps: {
    exclude: ['@tanstack/react-router-devtools']
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
