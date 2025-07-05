import { supabase } from '../lib/supabase'
import bcrypt from 'bcryptjs'

export const authService = {
  // Simple login without email verification
  async login(email, password) {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .limit(1)
    
    if (error) throw error
    
    if (users.length === 0) {
      throw new Error('User not found')
    }
    
    const user = users[0]
    
    // For demo purposes, we'll skip password hashing
    // In production, use bcrypt.compare(password, user.password_hash)
    if (password !== user.password_hash) {
      throw new Error('Invalid password')
    }
    
    // Store user session locally
    localStorage.setItem('thalassa_user', JSON.stringify(user))
    
    return user
  },

  // Simple registration
  async register(email, password, userData = {}) {
    // Check if user already exists
    const { data: existingUsers } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .limit(1)
    
    if (existingUsers && existingUsers.length > 0) {
      throw new Error('User already exists')
    }
    
    // For demo purposes, we'll store password as plain text
    // In production, use bcrypt.hash(password, 10)
    const { data, error } = await supabase
      .from('users')
      .insert([{
        email,
        password_hash: password, // In production: await bcrypt.hash(password, 10)
        full_name: userData.full_name || '',
        phone: userData.phone || ''
      }])
      .select()
      .single()
    
    if (error) throw error
    
    // Store user session locally
    localStorage.setItem('thalassa_user', JSON.stringify(data))
    
    return data
  },

  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem('thalassa_user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Logout
  logout() {
    localStorage.removeItem('thalassa_user')
  }
}