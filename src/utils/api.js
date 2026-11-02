// The backend address comes from the .env file, so changing it there
// (and restarting `npm run dev`) updates every request in the app.
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/+$/, '')

export class ApiError extends Error {
  constructor(message, status = 0, fields = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status // 0 means the server could not be reached
    this.fields = fields // e.g. { username: 'That username is taken.' }
  }
}

export async function api(path, { method = 'GET', body } = {}) {
  let response

  try {
    response = await fetch(API_URL + path, {
      method,
      credentials: 'include', // lets the browser save and send the login cookie
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError(
      'Cannot reach the server. Check that the backend is running, that VITE_API_URL is correct, and that this website is listed in ALLOWED_ORIGINS.'
    )
  }

  let data = null
  try {
    data = await response.json()
  } catch {
    // The response was not JSON. We handle that below.
  }

  if (!response.ok) {
    throw new ApiError(
      data?.error || 'Something went wrong. Please try again.',
      response.status,
      data?.fields || {}
    )
  }

  return data
}
