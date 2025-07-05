import { supabase } from '../lib/supabase'
import { authService } from './authService'

export const creationService = {
  // Save creation
  async saveCreation(title, description, htmlContent, configData) {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Authentication required')

    try {
      const { data, error } = await supabase
        .from('thalassa_events.creations')
        .insert([{
          user_id: user.id,
          title,
          description,
          html_content: htmlContent,
          config_data: configData
        }])
        .select()
        .single()
      
      if (error) throw new Error('Save failed: ' + error.message)
      return data
    } catch (error) {
      console.error('Save creation error:', error)
      throw error
    }
  },

  // Update creation
  async updateCreation(id, title, description, htmlContent, configData) {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Authentication required')

    try {
      const { data, error } = await supabase
        .from('thalassa_events.creations')
        .update({
          title,
          description,
          html_content: htmlContent,
          config_data: configData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()
      
      if (error) throw new Error('Update failed: ' + error.message)
      return data
    } catch (error) {
      console.error('Update creation error:', error)
      throw error
    }
  },

  // Get user creations
  async getUserCreations() {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Authentication required')

    try {
      const { data, error } = await supabase
        .from('thalassa_events.creations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (error) throw new Error('Load failed: ' + error.message)
      return data || []
    } catch (error) {
      console.error('Get user creations error:', error)
      throw error
    }
  },

  // Delete creation
  async deleteCreation(id) {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Authentication required')

    try {
      const { error } = await supabase
        .from('thalassa_events.creations')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)
      
      if (error) throw new Error('Delete failed: ' + error.message)
      return true
    } catch (error) {
      console.error('Delete creation error:', error)
      throw error
    }
  },

  // Toggle favorite
  async toggleFavorite(id) {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Authentication required')

    try {
      // Get current favorite status
      const { data: creation, error: getError } = await supabase
        .from('thalassa_events.creations')
        .select('is_favorite')
        .eq('id', id)
        .eq('user_id', user.id)
        .single()

      if (getError) throw new Error('Get favorite status failed: ' + getError.message)

      const { data, error } = await supabase
        .from('thalassa_events.creations')
        .update({
          is_favorite: !creation.is_favorite
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()
      
      if (error) throw new Error('Toggle favorite failed: ' + error.message)
      return data
    } catch (error) {
      console.error('Toggle favorite error:', error)
      throw error
    }
  }
}