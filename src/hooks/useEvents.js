import { useState, useEffect } from 'react'
import { eventService } from '../services/eventService'

export const useEvents = () => {
  const [events, setEvents] = useState([])
  const [featuredEvents, setFeaturedEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [allEvents, featured] = await Promise.all([
        eventService.getPublishedEvents(),
        eventService.getFeaturedEvents()
      ])
      
      setEvents(allEvents)
      setFeaturedEvents(featured)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getEventsByCategory = async (category) => {
    try {
      const categoryEvents = await eventService.getEventsByCategory(category)
      return categoryEvents
    } catch (err) {
      setError(err.message)
      return []
    }
  }

  const getEventById = async (id) => {
    try {
      const event = await eventService.getEventById(id)
      return event
    } catch (err) {
      setError(err.message)
      return null
    }
  }

  return {
    events,
    featuredEvents,
    loading,
    error,
    loadEvents,
    getEventsByCategory,
    getEventById
  }
}