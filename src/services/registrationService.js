import { supabase } from '../lib/supabase'

export const registrationService = {
  // Register for an event
  async registerForEvent(eventId, notes = '') {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Authentication required')

    // Check if already registered
    const { data: existingRegistration } = await supabase
      .from('event_registrations')
      .select('id')
      .eq('event_id', eventId)
      .eq('user_id', user.id)
      .single()

    if (existingRegistration) {
      throw new Error('Already registered for this event')
    }

    // Check event capacity
    const { data: event } = await supabase
      .from('events')
      .select('max_participants, current_participants')
      .eq('id', eventId)
      .single()

    if (event && event.max_participants && event.current_participants >= event.max_participants) {
      throw new Error('Event is full')
    }

    // Create registration
    const { data, error } = await supabase
      .from('event_registrations')
      .insert([{
        event_id: eventId,
        user_id: user.id,
        notes
      }])
      .select()
      .single()
    
    if (error) throw error

    // Update event participant count
    await supabase.rpc('increment_event_participants', {
      event_id: eventId
    })
    
    return data
  },

  // Cancel registration
  async cancelRegistration(eventId) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Authentication required')

    const { error } = await supabase
      .from('event_registrations')
      .delete()
      .eq('event_id', eventId)
      .eq('user_id', user.id)
    
    if (error) throw error

    // Update event participant count
    await supabase.rpc('decrement_event_participants', {
      event_id: eventId
    })
    
    return true
  },

  // Check if user is registered for event
  async isRegisteredForEvent(eventId) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { data, error } = await supabase
      .from('event_registrations')
      .select('id')
      .eq('event_id', eventId)
      .eq('user_id', user.id)
      .single()
    
    return !error && data
  }
}