// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig:{
    DEFAULT_PATH : process.env.DEFAULT_PATH,
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/test-utils/module'],
  typescript: {
    typeCheck: true,
  }
})