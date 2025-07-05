import { useState, useEffect } from 'react'
import { authService } from '../services/authService'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const currentUser = authService.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Auth initialization error:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const user = await authService.login(email, password)
    setUser(user)
    return user
  }

  const register = async (email, password, userData) => {
    const user = await authService.register(email, password, userData)
    setUser(user)
    return user
  }

  const logout = () => {
    try {
      authService.logout()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return {
    user,
    loading,
    login,
    register,
    logout
  }
}