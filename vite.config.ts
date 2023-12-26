import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      components: "/src/components",
      store: "/src/store",
      pages:"/src/pages",
      types: "/src/types"
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:4000', 
    },
  },
})