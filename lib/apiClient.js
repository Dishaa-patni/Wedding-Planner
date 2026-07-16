/**
 * API client scaffolding.
 * A future `server/` Express backend will be reached through this module.
 *
 * For now, it just returns mock responses so components can be wired against
 * a stable interface without knowing where the data comes from.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''

async function request(path, options = {}) {
  if (!BASE_URL) {
    throw new Error(
      'API base URL is not configured yet. Backend integration is pending.',
    )
  }
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json()
}

export const apiClient = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: (path) => request(path, { method: 'DELETE' }),
}
