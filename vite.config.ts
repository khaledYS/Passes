import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], 
  resolve:{
    alias:{
      components: resolve(__dirname, "./src/components/"),
      config: resolve(__dirname, "./src/config/"),
      contexts: resolve(__dirname, "./src/contexts/"),
      fonts: resolve(__dirname, "./src/fonts/"),
      pages: resolve(__dirname, "./src/pages/"),
      style: resolve(__dirname, "./src/style/"),
      src: resolve(__dirname, "./src/")
    }
  }
})
