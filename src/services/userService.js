import { supabase } from '../lib/supabase'

export const userService = {
  // Get current user profile
  async getCurrentUserProfile() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  // Create or update user profile
  async upsertUserProfile(profileData) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Authentication required')

    const { data, error } = await supabase
      .from('users')
      .upsert([{
        id: user.id,
        email: user.email,
        ...profileData
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Sign up new user
  async signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    
    if (error) throw error
    
    // Create user profile
    if (data.user) {
      await this.upsertUserProfile({
        full_name: userData.full_name || '',
        phone: userData.phone || ''
      })
    }
    
    return data
  },

  // Sign in user
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  // Sign out user
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return true
  },

  // Get user registrations
  async getUserRegistrations() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from('event_registrations')
      .select(`
        *,
        events(*)
      `)
      .eq('user_id', user.id)
      .order('registration_date', { ascending: false })
    
    if (error) throw error
    return data
  }
}