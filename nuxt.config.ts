// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxt/eslint', 'nuxt-mdi', 'nuxt-auth-utils'],
  devtools: { enabled: true },
  runtimeConfig: {
    notesApiBaseUrl: process.env.NUXT_NOTES_API_BASE_URL,
  },
  css: [
    '~/assets/styles/main.css',
  ],
  components: [
    { path: '~/components', pathPrefix: false, extensions: ['vue'] },
    { path: '~/shared/ui-kit', pathPrefix: false, extensions: ['vue'] },
    { path: '~/shared/components', pathPrefix: false, extensions: ['vue'] },
    { path: '~/widgets', pathPrefix: false, extensions: ['vue'] },
    { path: '~/providers', pathPrefix: false, extensions: ['vue'] },
  ],
  ssr: false,
  routeRules: {
    '/notes': { ssr: false },
    '/notes/**': { ssr: false },
  },
  imports: {
    dirs: [
      'shared/composables/**',
      'shared/stores/**',
      'shared/constants/**',
      'shared/api/**',
      'shared/types/**',
      'shared/utils/**',
    ],
  },
})
