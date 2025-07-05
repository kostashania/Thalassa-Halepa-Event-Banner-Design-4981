import { useState, useEffect } from 'react'
import { templateService } from '../services/templateService'
import { useAuth } from './useAuth'

export const useTemplates = () => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadTemplates()
    } else {
      setTemplates([])
      setLoading(false)
    }
  }, [user])

  const loadTemplates = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await templateService.getUserTemplates()
      setTemplates(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const saveTemplate = async (title, description, htmlContent, configData) => {
    try {
      const newTemplate = await templateService.saveTemplate(title, description, htmlContent, configData)
      setTemplates(prev => [newTemplate, ...prev])
      return newTemplate
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateTemplate = async (id, title, description, htmlContent, configData) => {
    try {
      const updatedTemplate = await templateService.updateTemplate(id, title, description, htmlContent, configData)
      setTemplates(prev => prev.map(t => t.id === id ? updatedTemplate : t))
      return updatedTemplate
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteTemplate = async (id) => {
    try {
      await templateService.deleteTemplate(id)
      setTemplates(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const toggleFavorite = async (id) => {
    try {
      const updatedTemplate = await templateService.toggleFavorite(id)
      setTemplates(prev => prev.map(t => t.id === id ? updatedTemplate : t))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    templates,
    loading,
    error,
    loadTemplates,
    saveTemplate,
    updateTemplate,
    deleteTemplate,
    toggleFavorite
  }
}