// Для теста

export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession()

  if (!loggedIn) {
    navigateTo({
      name: AUTH_PAGE
    })
  }
})