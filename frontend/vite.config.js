import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const __dirname = path.resolve()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
    "@": path.resolve(__dirname, "./src"),
    "@components": path.resolve(__dirname, "./src/components"),
    "@assets": path.resolve(__dirname, "./src/assets"),
    "@pages": path.resolve(__dirname, "./src/pages"),
    "@api": path.resolve(__dirname, "./src/services/api"),
    "@constants": path.resolve(__dirname, "./src/constants"),
    "@styles": path.resolve(__dirname, "./src/styles"),
    "@context": path.resolve(__dirname, "./src/context"),
    "@public": path.resolve(__dirname, "./src/public"),
  },
},
})
