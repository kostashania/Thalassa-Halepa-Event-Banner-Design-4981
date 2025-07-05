// Simple localStorage-based authentication service
export const authService = {
  // Simple login without verification
  async login(email, password) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('thalassa_users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    
    if (!user) {
      throw new Error('Invalid email or password')
    }
    
    // Store current user session
    localStorage.setItem('thalassa_current_user', JSON.stringify(user))
    
    return user
  },

  // Simple registration
  async register(email, password, userData = {}) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('thalassa_users') || '[]')
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      throw new Error('User already exists')
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      full_name: userData.full_name || '',
      phone: userData.phone || '',
      created_at: new Date().toISOString()
    }
    
    // Save to localStorage
    users.push(newUser)
    localStorage.setItem('thalassa_users', JSON.stringify(users))
    localStorage.setItem('thalassa_current_user', JSON.stringify(newUser))
    
    return newUser
  },

  // Get current user
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('thalassa_current_user')
      return userStr ? JSON.parse(userStr) : null
    } catch (error) {
      return null
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('thalassa_current_user')
  }
}