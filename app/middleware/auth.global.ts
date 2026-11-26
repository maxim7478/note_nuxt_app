export default defineNuxtRouteMiddleware((to) => {
  const notesPath = `/${NOTES_PAGE}`
  if (to.path !== notesPath && !to.path.startsWith(`${notesPath}/`)) return

  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo({ name: AUTH_PAGE })
  }
})