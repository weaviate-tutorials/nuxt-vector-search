// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    githubToken: '',
    weaviateURL: '',
    weaviateToken: '',
    openai: '',
    cohere: '',
  },
  nitro: {
    experimental: {
      tasks: true
    },
    scheduledTasks: {
      // Run `db:migrate` task every minute
      '15 13 * * 1-5': ['db:migrate']
    }
  }
})
