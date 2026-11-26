export const useAPI = createUseFetch(() => {
  const nuxtApp = useNuxtApp()

  return {
    baseURL: '/api',

    async onResponseError({ response }) {
      if (response.status !== 401) return

      await nuxtApp.runWithContext(() => navigateTo('/auth'))
    },
  }

})