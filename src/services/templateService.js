import { authService } from './authService'

export const templateService = {
  // Save template
  async saveTemplate(title, description, htmlContent, configData) {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Authentication required')

    const templates = JSON.parse(localStorage.getItem('thalassa_templates') || '[]')
    
    const newTemplate = {
      id: Date.now().toString(),
      user_id: user.id,
      title,
      description,
      html_content: htmlContent,
      config_data: configData,
      is_favorite: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    templates.push(newTemplate)
    localStorage.setItem('thalassa_templates', JSON.stringify(templates))
    
    return newTemplate
  },

  // Update template
  async updateTemplate(id, title, description, htmlContent, configData) {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Authentication required')

    const templates = JSON.parse(localStorage.getItem('thalassa_templates') || '[]')
    const index = templates.findIndex(t => t.id === id && t.user_id === user.id)
    
    if (index === -1) {
      throw new Error('Template not found')
    }
    
    templates[index] = {
      ...templates[index],
      title,
      description,
      html_content: htmlContent,
      config_data: configData,
      updated_at: new Date().toISOString()
    }
    
    localStorage.setItem('thalassa_templates', JSON.stringify(templates))
    
    return templates[index]
  },

  // Get user templates
  async getUserTemplates() {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Authentication required')

    const templates = JSON.parse(localStorage.getItem('thalassa_templates') || '[]')
    return templates.filter(t => t.user_id === user.id).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  },

  // Delete template
  async deleteTemplate(id) {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Authentication required')

    const templates = JSON.parse(localStorage.getItem('thalassa_templates') || '[]')
    const filteredTemplates = templates.filter(t => !(t.id === id && t.user_id === user.id))
    
    localStorage.setItem('thalassa_templates', JSON.stringify(filteredTemplates))
    
    return true
  },

  // Toggle favorite
  async toggleFavorite(id) {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('Authentication required')

    const templates = JSON.parse(localStorage.getItem('thalassa_templates') || '[]')
    const index = templates.findIndex(t => t.id === id && t.user_id === user.id)
    
    if (index === -1) {
      throw new Error('Template not found')
    }
    
    templates[index].is_favorite = !templates[index].is_favorite
    templates[index].updated_at = new Date().toISOString()
    
    localStorage.setItem('thalassa_templates', JSON.stringify(templates))
    
    return templates[index]
  }
}