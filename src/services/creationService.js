import { supabase } from '../lib/supabase'
import { authService } from './authService'

export const creationService = {
  // Save creation
  async saveCreation(title, description, htmlContent, configData) {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Authentication required')

    const { data, error } = await supabase
      .from('creations')
      .insert([{
        user_id: user.id,
        title,
        description,
        html_content: htmlContent,
        config_data: configData
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update creation
  async updateCreation(id, title, description, htmlContent, configData) {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Authentication required')

    const { data, error } = await supabase
      .from('creations')
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
    
    if (error) throw error
    return data
  },

  // Get user creations
  async getUserCreations() {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Authentication required')

    const { data, error } = await supabase
      .from('creations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Delete creation
  async deleteCreation(id) {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Authentication required')

    const { error } = await supabase
      .from('creations')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
    
    if (error) throw error
    return true
  },

  // Toggle favorite
  async toggleFavorite(id) {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Authentication required')

    // Get current favorite status
    const { data: creation } = await supabase
      .from('creations')
      .select('is_favorite')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    const { data, error } = await supabase
      .from('creations')
      .update({
        is_favorite: !creation.is_favorite
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}