// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@nuxtjs/tailwindcss', "@nuxt/image"],
  css: [
    '~/assets/css/center.css',
    '~/assets/css/bg.css'
  ],
  // ssr: false
})