import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { userService } from '../services/userService'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      
      if (session?.user) {
        const userProfile = await userService.getCurrentUserProfile()
        setProfile(userProfile)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          const userProfile = await userService.getCurrentUserProfile()
          setProfile(userProfile)
        } else {
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    const result = await userService.signIn(email, password)
    return result
  }

  const signUp = async (email, password, userData) => {
    const result = await userService.signUp(email, password, userData)
    return result
  }

  const signOut = async () => {
    await userService.signOut()
  }

  const updateProfile = async (profileData) => {
    const updatedProfile = await userService.upsertUserProfile(profileData)
    setProfile(updatedProfile)
    return updatedProfile
  }

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  }
}