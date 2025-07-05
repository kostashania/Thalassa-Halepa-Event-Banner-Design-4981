import React, { useState, useEffect } from 'react'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'
import EventCard from './EventCard'
import { useEvents } from '../hooks/useEvents'
import { useAuth } from '../hooks/useAuth'
import { registrationService } from '../services/registrationService'

const { FiCalendar, FiFilter, FiSearch } = FiIcons

const EventsSection = () => {
  const { events, featuredEvents, loading, error } = useEvents()
  const { user } = useAuth()
  const [filteredEvents, setFilteredEvents] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [registrations, setRegistrations] = useState(new Set())

  const categories = [
    { id: 'all', name: 'Όλα', icon: '🎯' },
    { id: 'cultural', name: 'Πολιτιστικά', icon: '🎭' },
    { id: 'gastronomy', name: 'Γαστρονομία', icon: '🍷' },
    { id: 'marine', name: 'Θαλάσσια', icon: '🌊' },
    { id: 'entertainment', name: 'Ψυχαγωγία', icon: '🎪' },
    { id: 'education', name: 'Εκπαίδευση', icon: '📚' }
  ]

  useEffect(() => {
    let filtered = events

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredEvents(filtered)
  }, [events, selectedCategory, searchTerm])

  const handleRegister = async (eventId) => {
    if (!user) {
      alert('Παρακαλώ συνδεθείτε για να εγγραφείτε σε εκδηλώσεις')
      return
    }

    try {
      await registrationService.registerForEvent(eventId)
      setRegistrations(prev => new Set([...prev, eventId]))
      alert('Η εγγραφή σας καταχωρήθηκε επιτυχώς!')
    } catch (error) {
      alert(`Σφάλμα εγγραφής: ${error.message}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση εκδηλώσεων...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Σφάλμα φόρτωσης: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Επανατφόρτωση
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Προσεχείς Εκδηλώσεις
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ανακαλύψτε τις μαγικές στιγμές που σας περιμένουν στη Θάλασσα Χαλέπα
            </p>
          </div>
        </div>
      </div>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Προτεινόμενες Εκδηλώσεις
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Οι κορυφαίες εκδηλώσεις που δεν πρέπει να χάσετε
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={handleRegister}
                  isRegistered={registrations.has(event.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Events */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Αναζήτηση εκδηλώσεων..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.icon} {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <SafeIcon icon={FiCalendar} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Δεν βρέθηκαν εκδηλώσεις
              </h3>
              <p className="text-gray-600">
                Δοκιμάστε να αλλάξετε τα φίλτρα αναζήτησης
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={handleRegister}
                  isRegistered={registrations.has(event.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventsSection