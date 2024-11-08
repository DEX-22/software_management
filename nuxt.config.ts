// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
     "nuxt-feather-icons"],
  nitro: {
     experimental: {
       websocket: true
     },
   }
})