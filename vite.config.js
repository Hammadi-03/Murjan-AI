import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import devServer from '@hono/vite-dev-server'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    devServer({
      entry: 'server/app.js',
      exclude: [
        /.*\.svelte/,
        /.*\.vue/,
        /.*\.js\?vue.*/,
        /.*\.jsx/,
        /.*\.tsx/,
        /.*\.css.*/,
        /.*\.ts/,
        /.*\.html/
      ],
      injectClientScript: false
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
