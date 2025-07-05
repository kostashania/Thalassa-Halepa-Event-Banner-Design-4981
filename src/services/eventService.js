import { supabase } from '../lib/supabase'

export const eventService = {
  // Get all published events
  async getPublishedEvents() {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        event_registrations(count)
      `)
      .eq('status', 'published')
      .order('start_date', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Get featured events
  async getFeaturedEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('start_date', { ascending: true })
      .limit(3)
    
    if (error) throw error
    return data
  },

  // Get event by ID
  async getEventById(id) {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        event_registrations(count)
      `)
      .eq('id', id)
      .eq('status', 'published')
      .single()
    
    if (error) throw error
    return data
  },

  // Get events by category
  async getEventsByCategory(category) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('start_date', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Create new event (requires authentication)
  async createEvent(eventData) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Authentication required')

    const { data, error } = await supabase
      .from('events')
      .insert([{
        ...eventData,
        created_by: user.id
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update event (requires authentication and ownership)
  async updateEvent(id, eventData) {
    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete event (requires authentication and ownership)
  async deleteEvent(id) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}