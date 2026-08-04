const fallbackBaseUrl = 'http://localhost:8000'

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : fallbackBaseUrl
}

export function buildApiUrl(resource) {
  const normalizedResource = resource.replace(/^\/+|\/+$/g, '')
  return `${getApiBaseUrl()}/api/${normalizedResource}/`
}

function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.data?.items)) {
    return payload.data.items
  }

  const knownKeys = ['users', 'activities', 'teams', 'leaderboard', 'workouts']
  for (const key of knownKeys) {
    if (Array.isArray(payload?.[key])) {
      return payload[key]
    }
  }

  return []
}

export async function fetchResource(resourceOrUrl, fallbackItems = []) {
  const url = typeof resourceOrUrl === 'string' && /^(https?:\/\/|\/)/.test(resourceOrUrl)
    ? resourceOrUrl
    : buildApiUrl(resourceOrUrl)

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`)
    }

    const payload = await response.json()
    return normalizeItems(payload)
  } catch (error) {
    console.warn(`Unable to load ${resource}:`, error)
    return fallbackItems
  }
}
