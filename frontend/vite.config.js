import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Получаем имя репозитория из переменной окружения
// Для GitHub Pages: если репозиторий называется "username.github.io", base должен быть "/"
// Иначе base должен быть "/repository-name/"
const repoName = process.env.VITE_REPO_NAME || ''

export default defineConfig({
  plugins: [react()],
  base: repoName ? `/${repoName}/` : '/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})

