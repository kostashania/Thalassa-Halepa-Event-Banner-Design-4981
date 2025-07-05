import { useState, useEffect } from 'react'
import { creationService } from '../services/creationService'

export const useCreations = () => {
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCreations()
  }, [])

  const loadCreations = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await creationService.getUserCreations()
      setCreations(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const saveCreation = async (title, description, htmlContent, configData) => {
    try {
      const newCreation = await creationService.saveCreation(title, description, htmlContent, configData)
      setCreations(prev => [newCreation, ...prev])
      return newCreation
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateCreation = async (id, title, description, htmlContent, configData) => {
    try {
      const updatedCreation = await creationService.updateCreation(id, title, description, htmlContent, configData)
      setCreations(prev => prev.map(c => c.id === id ? updatedCreation : c))
      return updatedCreation
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteCreation = async (id) => {
    try {
      await creationService.deleteCreation(id)
      setCreations(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const toggleFavorite = async (id) => {
    try {
      const updatedCreation = await creationService.toggleFavorite(id)
      setCreations(prev => prev.map(c => c.id === id ? updatedCreation : c))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    creations,
    loading,
    error,
    loadCreations,
    saveCreation,
    updateCreation,
    deleteCreation,
    toggleFavorite
  }
}