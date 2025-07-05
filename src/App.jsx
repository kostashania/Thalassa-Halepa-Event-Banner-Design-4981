import React, { useState } from 'react'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from './common/SafeIcon'
import EventsSection from './components/EventsSection'
import SimpleAuthModal from './components/SimpleAuthModal'
import CreationManager from './components/CreationManager'
import { useAuth } from './hooks/useAuth'

const { FiDownload, FiImage, FiEdit3, FiCopy, FiCheck, FiUser, FiLogOut, FiCalendar } = FiIcons

function App() {
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')
  const [cards, setCards] = useState([
    {
      icon: '🎭',
      title: 'Πολιτιστικές Εκδηλώσεις',
      text: 'Θεατρικές παραστάσεις, συναυλίες και εκθέσεις που εμπλουτίζουν την ψυχή και τον νου'
    },
    {
      icon: '🍷',
      title: 'Γαστρονομικά Ταξίδια',
      text: 'Γευστικές εμπειρίες με παραδοσιακές και σύγχρονες γεύσεις της Κρήτης'
    },
    {
      icon: '🌊',
      title: 'Θαλάσσιες Δραστηριότητες',
      text: 'Εξερευνήστε τα κρυστάλλινα νερά με δραστηριότητες για όλες τις ηλικίες'
    }
  ])
  const [copied, setCopied] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [currentView, setCurrentView] = useState('builder') // 'builder' or 'events'
  
  const { user, logout } = useAuth()

  const updateCard = (index, field, value) => {
    const newCards = [...cards]
    newCards[index][field] = value
    setCards(newCards)
  }

  const generateHTML = () => {
    return `<style>
.thalassa-events * {margin: 0;padding: 0;box-sizing: border-box;}
.thalassa-events {font-family: 'Georgia',serif;line-height: 1.6;background-color: #E0E0E0;}
.thalassa-events .events-hero {background: linear-gradient(135deg,#1B4965 0%,#1E7F9D 100%);position: relative;overflow: hidden;padding: 80px 0;color: white;}
.thalassa-events .events-hero::before {content: '';position: absolute;top: 0;left: 0;right: 0;bottom: 0;background: url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80') center/cover;opacity: 0.15;z-index: 1;}
.thalassa-events .events-hero::after {content: '';position: absolute;bottom: 0;left: 0;right: 0;height: 100px;background: linear-gradient(to top,#E0E0E0,transparent);z-index: 2;}
.thalassa-events .hero-content {position: relative;z-index: 3;max-width: 1200px;margin: 0 auto;padding: 0 20px;text-align: center;}
.thalassa-events .hero-title {font-size: 3.5rem;font-weight: 300;margin-bottom: 20px;text-shadow: 2px 2px 4px rgba(0,0,0,0.3);letter-spacing: 2px;}
.thalassa-events .hero-subtitle {font-size: 1.4rem;margin-bottom: 40px;color: #E6D5B8;font-style: italic;text-shadow: 1px 1px 2px rgba(0,0,0,0.3);}
.thalassa-events .wave-divider {position: absolute;bottom: -2px;left: 0;width: 100%;height: 60px;background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23E0E0E0'%3E%3C/path%3E%3C/svg%3E") repeat-x;background-size: 1200px 60px;z-index: 4;}
.thalassa-events .events-intro {background-color: #E0E0E0;padding: 60px 0;position: relative;}
.thalassa-events .intro-container {max-width: 1200px;margin: 0 auto;padding: 0 20px;}
.thalassa-events .intro-grid {display: grid;grid-template-columns: 1fr 1fr;gap: 60px;align-items: center;margin-bottom: 60px;}
.thalassa-events .intro-text {background: white;padding: 40px;border-radius: 15px;box-shadow: 0 10px 30px rgba(27,73,101,0.1);border-left: 5px solid #E57F84;position: relative;}
.thalassa-events .intro-text::before {content: '';position: absolute;top: -10px;right: -10px;width: 30px;height: 30px;background: #E57F84;border-radius: 50%;opacity: 0.3;}
.thalassa-events .intro-text h2 {color: #1B4965;font-size: 2.2rem;margin-bottom: 20px;font-weight: 400;}
.thalassa-events .intro-text p {color: #333;font-size: 1.1rem;line-height: 1.8;margin-bottom: 15px;}
.thalassa-events .intro-image {position: relative;border-radius: 15px;overflow: hidden;box-shadow: 0 15px 35px rgba(27,73,101,0.2);transform: perspective(1000px) rotateY(-5deg);transition: transform 0.3s ease;}
.thalassa-events .intro-image:hover {transform: perspective(1000px) rotateY(0deg);}
.thalassa-events .intro-image img {width: 100%;height: 400px;object-fit: cover;transition: transform 0.3s ease;}
.thalassa-events .intro-image:hover img {transform: scale(1.05);}
.thalassa-events .intro-image::after {content: '';position: absolute;top: 0;left: 0;right: 0;bottom: 0;background: linear-gradient(45deg,#1B4965,transparent);opacity: 0.1;}
.thalassa-events .features-grid {display: grid;grid-template-columns: repeat(auto-fit,minmax(300px,1fr));gap: 30px;margin-top: 40px;}
.thalassa-events .feature-card {background: white;padding: 30px;border-radius: 12px;text-align: center;box-shadow: 0 8px 25px rgba(27,73,101,0.08);transition: transform 0.3s ease,box-shadow 0.3s ease;border-top: 4px solid #1E7F9D;}
.thalassa-events .feature-card:hover {transform: translateY(-5px);box-shadow: 0 15px 40px rgba(27,73,101,0.15);}
.thalassa-events .feature-icon {width: 80px;height: 80px;background: linear-gradient(135deg,#E57F84,#E6D5B8);border-radius: 50%;margin: 0 auto 20px;display: flex;align-items: center;justify-content: center;font-size: 2rem;color: white;text-shadow: 1px 1px 2px rgba(0,0,0,0.2);}
.thalassa-events .feature-card h3 {color: #1B4965;font-size: 1.3rem;margin-bottom: 15px;font-weight: 500;}
.thalassa-events .feature-card p {color: #666;font-size: 0.95rem;line-height: 1.6;}
.thalassa-events .cta-section {background: linear-gradient(135deg,#E6D5B8,#E0E0E0);padding: 50px 0;text-align: center;margin-top: 40px;border-radius: 20px;position: relative;overflow: hidden;}
.thalassa-events .cta-section::before {content: '';position: absolute;top: 0;left: 0;right: 0;bottom: 0;background: url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80') center/cover;opacity: 0.05;z-index: 1;}
.thalassa-events .cta-content {position: relative;z-index: 2;}
.thalassa-events .cta-section h2 {color: #1B4965;font-size: 2.5rem;margin-bottom: 20px;font-weight: 300;}
.thalassa-events .cta-section p {color: #1B4965;font-size: 1.2rem;margin-bottom: 30px;max-width: 600px;margin-left: auto;margin-right: auto;}
.thalassa-events .scroll-indicator {position: absolute;bottom: 20px;left: 50%;transform: translateX(-50%);animation: thalassa-bounce 2s infinite;}
.thalassa-events .scroll-arrow {width: 30px;height: 30px;border-right: 3px solid #E57F84;border-bottom: 3px solid #E57F84;transform: rotate(45deg);}
@keyframes thalassa-bounce {0%,20%,50%,80%,100% {transform: translateX(-50%) translateY(0);} 40% {transform: translateX(-50%) translateY(-10px);} 60% {transform: translateX(-50%) translateY(-5px);}}
@media (max-width: 768px) {.thalassa-events .hero-title {font-size: 2.5rem;} .thalassa-events .hero-subtitle {font-size: 1.1rem;} .thalassa-events .intro-grid {grid-template-columns: 1fr;gap: 40px;} .thalassa-events .intro-image {transform: none;} .thalassa-events .features-grid {grid-template-columns: 1fr;} .thalassa-events .intro-text {padding: 25px;} .thalassa-events .intro-text h2 {font-size: 1.8rem;}}
</style>
<div class="thalassa-events">
<section class="events-hero">
<div class="hero-content">
<h1 class="hero-title">Προσεχή Γεγονότα</h1>
<p class="hero-subtitle">Ανακαλύψτε τις μαγικές στιγμές που σας περιμένουν</p>
</div>
<div class="wave-divider"></div>
</section>
<section class="events-intro">
<div class="intro-container">
<div class="intro-grid">
<div class="intro-text">
<h2>Μια Θάλασσα Εμπειριών</h2>
<p>Στη Θάλασσα Χαλέπα, κάθε γεγονός είναι μια μοναδική εμπειρία που συνδυάζει την ομορφιά του Αιγαίου με την αυθεντική κρητική φιλοξενία.</p>
<p>Από πολιτιστικές εκδηλώσεις μέχρι γαστρονομικά ταξίδια, κάθε στιγμή είναι σχεδιασμένη να δημιουργήσει αξέχαστες αναμνήσεις.</p>
</div>
<div class="intro-image">
<img src="${imageUrl}" alt="Θάλασσα Χαλέπα Events">
</div>
</div>
<div class="features-grid">
${cards.map(card => `
<div class="feature-card">
<div class="feature-icon">${card.icon}</div>
<h3>${card.title}</h3>
<p>${card.text}</p>
</div>
`).join('')}
</div>
<div class="cta-section">
<div class="cta-content">
<h2>Ετοιμαστείτε για Μαγικές Στιγμές</h2>
<p>Παρακάτω θα βρείτε όλα τα προσεχή γεγονότα που θα σας ταξιδέψουν σε έναν κόσμο γεμάτο χρώματα, γεύσεις και συναισθήματα</p>
</div>
<div class="scroll-indicator">
<div class="scroll-arrow"></div>
</div>
</div>
</div>
</section>
</div>`
  }

  const copyToClipboard = () => {
    const htmlCode = generateHTML()
    navigator.clipboard.writeText(htmlCode).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const downloadHTML = () => {
    const htmlCode = generateHTML()
    const blob = new Blob([htmlCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'thalassa-events.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleLoadCreation = (creation) => {
    if (creation.config_data) {
      const config = creation.config_data
      if (config.imageUrl) setImageUrl(config.imageUrl)
      if (config.cards) setCards(config.cards)
    }
  }

  const handleImportHtml = (htmlContent) => {
    // Try to extract config from HTML comments or data attributes
    // For now, just notify that HTML was imported
    alert('HTML εισήχθη επιτυχώς! Μπορείτε να προσαρμόσετε τις ρυθμίσεις.')
  }

  const handleSignOut = async () => {
    try {
      logout()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">Θάλασσα Χαλέπα</h1>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentView('builder')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === 'builder'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <SafeIcon icon={FiEdit3} className="w-4 h-4 inline mr-2" />
                  Builder
                </button>
                <button
                  onClick={() => setCurrentView('events')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === 'events'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <SafeIcon icon={FiCalendar} className="w-4 h-4 inline mr-2" />
                  Εκδηλώσεις
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700">
                    Γεια σας, {user.full_name || user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                    <span>Αποσύνδεση</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <SafeIcon icon={FiUser} className="w-4 h-4" />
                  <span>Σύνδεση</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {currentView === 'events' ? (
        <EventsSection />
      ) : (
        <>
          {/* Control Panel */}
          <div className="bg-white shadow-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Export Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <SafeIcon icon={copied ? FiCheck : FiCopy} className="w-4 h-4" />
                    {copied ? 'Αντιγράφηκε!' : 'Αντιγραφή HTML'}
                  </button>
                  <button
                    onClick={downloadHTML}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <SafeIcon icon={FiDownload} className="w-4 h-4" />
                    Λήψη HTML
                  </button>
                </div>

                {/* Image URL Input */}
                <div className="flex-1 max-w-md">
                  <div className="flex items-center gap-2 mb-2">
                    <SafeIcon icon={FiImage} className="w-4 h-4 text-gray-600" />
                    <label className="text-sm font-medium text-gray-700">Image URL</label>
                  </div>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Card Editors */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <SafeIcon icon={FiEdit3} className="w-5 h-5 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-800">Επεξεργασία Καρτών</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cards.map((card, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Icon (Emoji)
                          </label>
                          <input
                            type="text"
                            value={card.icon}
                            onChange={(e) => updateCard(index, 'icon', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl"
                            maxLength="2"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Τίτλος
                          </label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => updateCard(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Περιγραφή
                          </label>
                          <textarea
                            value={card.text}
                            onChange={(e) => updateCard(index, 'text', e.target.value)}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Creation Manager */}
              <div className="lg:col-span-1">
                <CreationManager
                  currentHtml={generateHTML()}
                  currentConfig={{ imageUrl, cards }}
                  onLoadCreation={handleLoadCreation}
                  onImportHtml={handleImportHtml}
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="border-t border-gray-200 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Προεπισκόπηση</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div dangerouslySetInnerHTML={{ __html: generateHTML() }} />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Auth Modal */}
      <SimpleAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  )
}

export default App