import React from 'react'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'
import { format } from 'date-fns'
import { el } from 'date-fns/locale'

const { FiCalendar, FiMapPin, FiUsers, FiEuro } = FiIcons

const EventCard = ({ event, onRegister, isRegistered = false }) => {
  const categoryIcons = {
    cultural: '🎭',
    gastronomy: '🍷',
    marine: '🌊',
    entertainment: '🎪',
    education: '📚'
  }

  const categoryColors = {
    cultural: 'bg-rose-100 text-rose-800',
    gastronomy: 'bg-amber-100 text-amber-800',
    marine: 'bg-blue-100 text-blue-800',
    entertainment: 'bg-purple-100 text-purple-800',
    education: 'bg-green-100 text-green-800'
  }

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd MMM yyyy, HH:mm', { locale: el })
  }

  const handleRegister = () => {
    if (onRegister) {
      onRegister(event.id)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {event.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Προτεινόμενο
          </div>
        )}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${categoryColors[event.category] || 'bg-gray-100 text-gray-800'}`}>
          {categoryIcons[event.category]} {event.category}
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {event.short_description || event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
            <span className="text-sm">{formatDate(event.start_date)}</span>
          </div>
          
          {event.location && (
            <div className="flex items-center text-gray-600">
              <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
              <span className="text-sm">{event.location}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {event.current_participants || 0}
                {event.max_participants && `/${event.max_participants}`} συμμετέχοντες
              </span>
            </div>
            
            {event.price > 0 && (
              <div className="flex items-center text-blue-600 font-semibold">
                <SafeIcon icon={FiEuro} className="w-4 h-4 mr-1" />
                <span>{event.price}</span>
              </div>
            )}
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={isRegistered || (event.max_participants && event.current_participants >= event.max_participants)}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
            isRegistered
              ? 'bg-green-100 text-green-800 cursor-not-allowed'
              : event.max_participants && event.current_participants >= event.max_participants
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isRegistered
            ? 'Έχετε εγγραφεί'
            : event.max_participants && event.current_participants >= event.max_participants
            ? 'Συμπληρώθηκε'
            : 'Εγγραφή'}
        </button>
      </div>
    </div>
  )
}

export default EventCard