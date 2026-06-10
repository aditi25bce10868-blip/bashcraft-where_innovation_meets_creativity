import { useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = async (email) => {
    setLoading(true)
    setError(null)
    try {
      // API call would go here
      setUser({ email })
      localStorage.setItem('user', JSON.stringify({ email }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const register = async (name, email, college) => {
    setLoading(true)
    setError(null)
    try {
      // API call would go here
      setUser({ name, email, college })
      localStorage.setItem('user', JSON.stringify({ name, email, college }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return { user, loading, error, login, register, logout }
}
