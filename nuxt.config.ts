// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@nuxtjs/tailwindcss', "@nuxt/image", 'nuxt-snackbar'],
  snackbar: {
    bottom: true,
    right: true,
    duration: 3000
  },
  ui: {
    notifications: {
      // Show toasts at the top right of the screen
      position: 'top-0 bottom-auto',
      timeout: 3000,
      color: 'purple'
    }
  },
  css: [
    '~/assets/css/center.css',
    '~/assets/css/bg.css',
    '~/assets/css/font.css',
  
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: "icon", type: "image/png", href: "logo.png" }
      ],
      title: 'UniTrace'
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:8000',
    }
  },
  vite: {
    server: {
      // APIs
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true
        }
      }
    }
  }
})