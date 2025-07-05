import React, { useState } from 'react'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from './common/SafeIcon'
import AuthModal from './components/AuthModal'
import TemplateManager from './components/TemplateManager'
import { useAuth } from './hooks/useAuth'

const { FiDownload, FiImage, FiEdit3, FiCopy, FiCheck, FiUser, FiLogOut, FiType, FiEye } = FiIcons

function App() {
  const [config, setConfig] = useState({
    heroTitle: 'Προσεχή Γεγονότα',
    heroSubtitle: 'Ανακαλύψτε τις μαγικές στιγμές που σας περιμένουν',
    heroBackgroundImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    sectionTitle: 'Μια Θάλασσα Εμπειριών',
    sectionText1: 'Στη Θάλασσα Χαλέπα, κάθε γεγονός είναι μια μοναδική εμπειρία που συνδυάζει την ομορφιά του Αιγαίου με την αυθεντική κρητική φιλοξενία.',
    sectionText2: 'Από πολιτιστικές εκδηλώσεις μέχρι γαστρονομικά ταξίδια, κάθε στιγμή είναι σχεδιασμένη να δημιουργήσει αξέχαστες αναμνήσεις.',
    sectionImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    ctaTitle: 'Ετοιμαστείτε για Μαγικές Στιγμές',
    ctaText: 'Παρακάτω θα βρείτε όλα τα προσεχή γεγονότα που θα σας ταξιδέψουν σε έναν κόσμο γεμάτο χρώματα, γεύσεις και συναισθήματα',
    ctaBackgroundImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    cards: [
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
    ]
  })

  const [copied, setCopied] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  
  const { user, loading, logout } = useAuth()

  const updateConfig = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const updateCard = (index, field, value) => {
    const newCards = [...config.cards]
    newCards[index][field] = value
    setConfig(prev => ({
      ...prev,
      cards: newCards
    }))
  }

  const generateHTML = () => {
    return `<!DOCTYPE html>
<html lang="el">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Θάλασσα Χαλέπα - Εκδηλώσεις</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            background-color: #E0E0E0;
        }
        
        .events-hero {
            background: linear-gradient(135deg, #1B4965 0%, #1E7F9D 100%);
            position: relative;
            overflow: hidden;
            padding: 80px 0;
            color: white;
        }
        
        .events-hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('${config.heroBackgroundImage}') center/cover;
            opacity: 0.15;
            z-index: 1;
        }
        
        .events-hero::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100px;
            background: linear-gradient(to top, #E0E0E0, transparent);
            z-index: 2;
        }
        
        .hero-content {
            position: relative;
            z-index: 3;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            text-align: center;
        }
        
        .hero-title {
            font-size: 3.5rem;
            font-weight: 300;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            letter-spacing: 2px;
        }
        
        .hero-subtitle {
            font-size: 1.4rem;
            margin-bottom: 40px;
            color: #E6D5B8;
            font-style: italic;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }
        
        .wave-divider {
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 60px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23E0E0E0'%3E%3C/path%3E%3C/svg%3E") repeat-x;
            background-size: 1200px 60px;
            z-index: 4;
        }
        
        .events-intro {
            background-color: #E0E0E0;
            padding: 60px 0;
            position: relative;
        }
        
        .intro-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .intro-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
            margin-bottom: 60px;
        }
        
        .intro-text {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(27,73,101,0.1);
            border-left: 5px solid #E57F84;
            position: relative;
        }
        
        .intro-text::before {
            content: '';
            position: absolute;
            top: -10px;
            right: -10px;
            width: 30px;
            height: 30px;
            background: #E57F84;
            border-radius: 50%;
            opacity: 0.3;
        }
        
        .intro-text h2 {
            color: #1B4965;
            font-size: 2.2rem;
            margin-bottom: 20px;
            font-weight: 400;
        }
        
        .intro-text p {
            color: #333;
            font-size: 1.1rem;
            line-height: 1.8;
            margin-bottom: 15px;
        }
        
        .intro-image {
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(27,73,101,0.2);
            transform: perspective(1000px) rotateY(-5deg);
            transition: transform 0.3s ease;
        }
        
        .intro-image:hover {
            transform: perspective(1000px) rotateY(0deg);
        }
        
        .intro-image img {
            width: 100%;
            height: 400px;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .intro-image:hover img {
            transform: scale(1.05);
        }
        
        .intro-image::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, #1B4965, transparent);
            opacity: 0.1;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        
        .feature-card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 8px 25px rgba(27,73,101,0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-top: 4px solid #1E7F9D;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(27,73,101,0.15);
        }
        
        .feature-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #E57F84, #E6D5B8);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: white;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }
        
        .feature-card h3 {
            color: #1B4965;
            font-size: 1.3rem;
            margin-bottom: 15px;
            font-weight: 500;
        }
        
        .feature-card p {
            color: #666;
            font-size: 0.95rem;
            line-height: 1.6;
        }
        
        .cta-section {
            background: linear-gradient(135deg, #E6D5B8, #E0E0E0);
            padding: 50px 0;
            text-align: center;
            margin-top: 40px;
            border-radius: 20px;
            position: relative;
            overflow: hidden;
        }
        
        .cta-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('${config.ctaBackgroundImage}') center/cover;
            opacity: 0.05;
            z-index: 1;
        }
        
        .cta-content {
            position: relative;
            z-index: 2;
        }
        
        .cta-section h2 {
            color: #1B4965;
            font-size: 2.5rem;
            margin-bottom: 20px;
            font-weight: 300;
        }
        
        .cta-section p {
            color: #1B4965;
            font-size: 1.2rem;
            margin-bottom: 30px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .scroll-indicator {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            animation: bounce 2s infinite;
        }
        
        .scroll-arrow {
            width: 30px;
            height: 30px;
            border-right: 3px solid #E57F84;
            border-bottom: 3px solid #E57F84;
            transform: rotate(45deg);
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateX(-50%) translateY(0);
            }
            40% {
                transform: translateX(-50%) translateY(-10px);
            }
            60% {
                transform: translateX(-50%) translateY(-5px);
            }
        }
        
        @media (max-width: 768px) {
            .hero-title {
                font-size: 2.5rem;
            }
            
            .hero-subtitle {
                font-size: 1.1rem;
            }
            
            .intro-grid {
                grid-template-columns: 1fr;
                gap: 40px;
            }
            
            .intro-image {
                transform: none;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
            
            .intro-text {
                padding: 25px;
            }
            
            .intro-text h2 {
                font-size: 1.8rem;
            }
        }
    </style>
</head>
<body>
    <section class="events-hero">
        <div class="hero-content">
            <h1 class="hero-title">${config.heroTitle}</h1>
            <p class="hero-subtitle">${config.heroSubtitle}</p>
        </div>
        <div class="wave-divider"></div>
    </section>
    
    <section class="events-intro">
        <div class="intro-container">
            <div class="intro-grid">
                <div class="intro-text">
                    <h2>${config.sectionTitle}</h2>
                    <p>${config.sectionText1}</p>
                    <p>${config.sectionText2}</p>
                </div>
                <div class="intro-image">
                    <img src="${config.sectionImage}" alt="Θάλασσα Χαλέπα Events">
                </div>
            </div>
            
            <div class="features-grid">
                ${config.cards.map(card => `
                    <div class="feature-card">
                        <div class="feature-icon">${card.icon}</div>
                        <h3>${card.title}</h3>
                        <p>${card.text}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="cta-section">
                <div class="cta-content">
                    <h2>${config.ctaTitle}</h2>
                    <p>${config.ctaText}</p>
                </div>
                <div class="scroll-indicator">
                    <div class="scroll-arrow"></div>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`
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
    a.download = 'thalassa-events-template.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleLoadTemplate = (template) => {
    if (template.config_data) {
      setConfig(template.config_data)
    }
    if (template.html_content && !template.config_data) {
      // If loading raw HTML, try to extract content
      alert('Template φορτώθηκε! Μπορείτε να προσαρμόσετε τις ρυθμίσεις.')
    }
  }

  const handleSignOut = () => {
    logout()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">Θάλασσα Χαλέπα Template Builder</h1>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <SafeIcon icon={FiEye} className="w-4 h-4" />
                <span>{showPreview ? 'Απόκρυψη' : 'Εμφάνιση'} Preview</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Settings */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hero Section Settings */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <SafeIcon icon={FiType} className="w-5 h-5" />
                  Hero Section
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Τίτλος</label>
                    <input
                      type="text"
                      value={config.heroTitle}
                      onChange={(e) => updateConfig('heroTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Υπότιτλος</label>
                    <input
                      type="text"
                      value={config.heroSubtitle}
                      onChange={(e) => updateConfig('heroSubtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
                    <input
                      type="url"
                      value={config.heroBackgroundImage}
                      onChange={(e) => updateConfig('heroBackgroundImage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Main Section Settings */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <SafeIcon icon={FiEdit3} className="w-5 h-5" />
                  Κύρια Ενότητα
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Τίτλος Ενότητας</label>
                    <input
                      type="text"
                      value={config.sectionTitle}
                      onChange={(e) => updateConfig('sectionTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Πρώτη Παράγραφος</label>
                    <textarea
                      value={config.sectionText1}
                      onChange={(e) => updateConfig('sectionText1', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Δεύτερη Παράγραφος</label>
                    <textarea
                      value={config.sectionText2}
                      onChange={(e) => updateConfig('sectionText2', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={config.sectionImage}
                      onChange={(e) => updateConfig('sectionImage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* CTA Section Settings */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <SafeIcon icon={FiType} className="w-5 h-5" />
                  CTA Section
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CTA Τίτλος</label>
                    <input
                      type="text"
                      value={config.ctaTitle}
                      onChange={(e) => updateConfig('ctaTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CTA Κείμενο</label>
                    <textarea
                      value={config.ctaText}
                      onChange={(e) => updateConfig('ctaText', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CTA Background Image URL</label>
                    <input
                      type="url"
                      value={config.ctaBackgroundImage}
                      onChange={(e) => updateConfig('ctaBackgroundImage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Cards Settings */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <SafeIcon icon={FiEdit3} className="w-5 h-5" />
                  Κάρτες
                </h3>
                <div className="space-y-6">
                  {config.cards.map((card, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-3">Κάρτα {index + 1}</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji)</label>
                          <input
                            type="text"
                            value={card.icon}
                            onChange={(e) => updateCard(index, 'icon', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl"
                            maxLength="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Τίτλος</label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => updateCard(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Περιγραφή</label>
                          <textarea
                            value={card.text}
                            onChange={(e) => updateCard(index, 'text', e.target.value)}
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Template Manager */}
          <div className="lg:col-span-1">
            <TemplateManager
              currentHtml={generateHTML()}
              currentConfig={config}
              onLoadTemplate={handleLoadTemplate}
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="border-t border-gray-200 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Προεπισκόπηση</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div dangerouslySetInnerHTML={{ __html: generateHTML() }} />
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  )
}

export default App