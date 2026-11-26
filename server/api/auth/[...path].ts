const authMethods = new Map([
  ['login', ['POST']],
  ['logout', ['POST']],
  ['register', ['POST']],
  ['me', ['GET', 'DELETE']],
])

export default defineEventHandler((event) => {
  const path = getRouterParam(event, 'path')
  const methods = path ? authMethods.get(path) : undefined

  if (!path || !methods) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  if (!methods.includes(event.method)) {
    setResponseHeader(event, 'Allow', methods.join(', '))
    throw createError({ status: 405, statusMessage: 'Method Not Allowed' })
  }

  const requestUrl = getRequestURL(event)
  const origin = getRequestHeader(event, 'origin')
  if (event.method !== 'GET' && origin && origin !== requestUrl.origin) {
    throw createError({ status: 403, message: 'Origin not allowed' })
  }

  const { notesApiBaseUrl } = useRuntimeConfig(event)
  const target = new URL(`/api/auth/${path}`, notesApiBaseUrl)

  target.search = requestUrl.search
  const session = getCookie(event, 'notes_session')

  return proxyRequest(event, target.href, {
    headers: {
      origin: target.origin,
      cookie: session ? `notes_session=${encodeURIComponent(session)}` : '',
    },
    fetchOptions: { redirect: 'manual' },
  })
})
