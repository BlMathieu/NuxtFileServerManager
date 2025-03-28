// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    experimental: {
      websocket: true
    }
  },
  runtimeConfig: {
    DEFAULT_PATH: process.env.DEFAULT_PATH,
    BACKUP_PATH: process.env.BACKUP_PATH,
    public: {
      SERVER_IP: process.env.SERVER_IP,
      PORT: process.env.PORT,
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/test-utils/module', "@vueuse/nuxt"],
  typescript: {
    typeCheck: true,
  }
})