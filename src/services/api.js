// All API calls to the BashCraft backend go here.
// Set VITE_API_URL in your .env file (e.g. http://localhost:5000/api)

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

// ── Auth / Users ─────────────────────────────────────────

/**
 * Register a new attendee.
 * POST /api/auth/register
 * Body: { name, email, college }
 */
export const registerUser = (body) =>
  request('/auth/register', { method: 'POST', body: JSON.stringify(body) })

/**
 * Login by email — returns user record if found.
 * POST /api/auth/login
 * Body: { email }
 */
export const loginUser = (email) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ email }) })

// ── Certificate ──────────────────────────────────────────

/**
 * Fetch certificate data for logged-in user.
 * GET /api/certificate/:email
 */
export const getCertificate = (email) =>
  request(`/certificate/${encodeURIComponent(email)}`)
