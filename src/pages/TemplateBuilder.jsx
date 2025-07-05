import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSave, FiArrowLeft, FiEye, FiEyeOff, FiCopy, FiDownload, FiUpload, FiSettings } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

const TemplateBuilder = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { templateId } = useParams()
  const [showPreview, setShowPreview] = useState(true)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('template')

  const [templateData, setTemplateData] = useState({
    id: templateId || Date.now().toString(),
    name: 'New Template',
    description: '',
    icon: '🎨',
    config: {
      // Hero Section
      heroTitle: 'Upcoming Events',
      heroSubtitle: 'Discover the magical moments awaiting you',
      heroBackgroundImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      heroGradientFrom: '#1B4965',
      heroGradientTo: '#1E7F9D',
      heroTextColor: '#ffffff',
      heroTextAlign: 'center',
      heroTitleSize: '3.5rem',
      heroSubtitleSize: '1.4rem',
      heroBackgroundOpacity: 0.15,
      heroPadding: '80px',
      heroTextShadow: true,
      
      // Content Section
      sectionTitle: 'A Sea of Experiences',
      sectionText1: 'At Thalassa Halepa, every event is a unique experience that combines the beauty of the Aegean with authentic Cretan hospitality.',
      sectionText2: 'From cultural events to gastronomic journeys, every moment is designed to create unforgettable memories.',
      sectionImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      sectionBackgroundColor: '#E0E0E0',
      sectionLayout: 'side-by-side', // side-by-side, stacked, image-first
      sectionTextAlign: 'left',
      sectionImageAlign: 'center',
      sectionImageEffect: 'hover-scale', // hover-scale, hover-rotate, hover-lift, none
      sectionBorderRadius: '15px',
      sectionShadow: 'medium', // none, light, medium, heavy
      sectionTextBackground: '#ffffff',
      sectionTextPadding: '40px',
      sectionImageHeight: '400px',
      sectionGap: '60px',
      
      // Feature Cards
      cardsLayout: 'grid-3', // grid-3, grid-2, grid-1, carousel
      cardsAlignment: 'center', // left, center, right
      cardsGap: '30px',
      cardsEffect: 'hover-lift', // hover-lift, hover-scale, hover-rotate, none
      cardsBorderRadius: '12px',
      cardsShadow: 'light', // none, light, medium, heavy
      cardsBackgroundColor: '#ffffff',
      cardsPadding: '30px',
      cardsIconSize: '80px',
      cardsIconBackground: 'linear-gradient(135deg, #E57F84, #E6D5B8)',
      cardsTitleColor: '#1B4965',
      cardsTextColor: '#666',
      cardsBorderTop: '4px solid #1E7F9D',
      
      // CTA Section
      ctaTitle: 'Get Ready for Magical Moments',
      ctaText: 'Below you will find all the upcoming events that will take you to a world full of colors, flavors and emotions',
      ctaBackgroundImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      ctaGradientFrom: '#E6D5B8',
      ctaGradientTo: '#E0E0E0',
      ctaTextAlign: 'center',
      ctaTitleSize: '2.5rem',
      ctaTextSize: '1.2rem',
      ctaBorderRadius: '20px',
      ctaPadding: '50px',
      ctaBackgroundOpacity: 0.05,
      
      // Animation & Effects
      enableAnimations: true,
      hoverEffects: true,
      transitionDuration: '0.3s',
      
      cards: [
        {
          icon: '🎭',
          title: 'Cultural Events',
          text: 'Theater performances, concerts and exhibitions that enrich the soul and mind'
        },
        {
          icon: '🍷',
          title: 'Gastronomic Journeys',
          text: 'Taste experiences with traditional and modern flavors of Crete'
        },
        {
          icon: '🌊',
          title: 'Marine Activities',
          text: 'Explore the crystal waters with activities for all ages'
        }
      ]
    }
  })

  useEffect(() => {
    if (templateId) {
      const savedTemplates = localStorage.getItem(`templates_${user.id}`)
      if (savedTemplates) {
        const templates = JSON.parse(savedTemplates)
        const template = templates.find(t => t.id === templateId)
        if (template) {
          setTemplateData(template)
        }
      }
    }
  }, [templateId, user.id])

  const generateHTML = () => {
    const { config } = templateData
    
    // Helper functions for effects
    const getShadowStyle = (level) => {
      switch(level) {
        case 'light': return '0 2px 8px rgba(27,73,101,0.08)'
        case 'medium': return '0 10px 30px rgba(27,73,101,0.1)'
        case 'heavy': return '0 20px 50px rgba(27,73,101,0.2)'
        default: return 'none'
      }
    }
    
    const getLayoutStyle = () => {
      switch(config.sectionLayout) {
        case 'stacked':
          return 'grid-template-columns: 1fr !important; gap: 40px !important;'
        case 'image-first':
          return 'grid-template-columns: 1fr 1fr !important; gap: 60px !important;'
        default:
          return 'grid-template-columns: 1fr 1fr !important; gap: 60px !important;'
      }
    }
    
    const getCardsLayoutStyle = () => {
      switch(config.cardsLayout) {
        case 'grid-2':
          return 'grid-template-columns: repeat(2, 1fr) !important;'
        case 'grid-1':
          return 'grid-template-columns: 1fr !important;'
        case 'carousel':
          return 'display: flex !important; overflow-x: auto !important; gap: 30px !important;'
        default:
          return 'grid-template-columns: repeat(3, 1fr) !important;'
      }
    }
    
    const getHoverEffect = (effect) => {
      switch(effect) {
        case 'hover-scale':
          return 'transform: scale(1.05) !important;'
        case 'hover-rotate':
          return 'transform: rotate(2deg) scale(1.02) !important;'
        case 'hover-lift':
          return 'transform: translateY(-10px) !important;'
        default:
          return 'transform: scale(1.05) !important;'
      }
    }

    const getTextAlignment = (alignment) => {
      return alignment === 'left' ? 'left' : alignment === 'right' ? 'right' : 'center'
    }

    const getImageAlignment = (alignment) => {
      switch(alignment) {
        case 'left': return 'justify-self: start !important;'
        case 'right': return 'justify-self: end !important;'
        case 'center': 
        default: return 'justify-self: center !important;'
      }
    }

    const getCardsAlignment = (alignment) => {
      switch(alignment) {
        case 'left': return 'justify-items: start !important;'
        case 'right': return 'justify-items: end !important;'
        case 'center':
        default: return 'justify-items: center !important;'
      }
    }
    
    return `<!-- WordPress Compatible Template - ${templateData.name} -->
<div class="wp-custom-template-wrapper" style="margin: 0 !important; padding: 0 !important; box-sizing: border-box !important; font-family: Georgia, serif !important; line-height: 1.6 !important; background-color: ${config.sectionBackgroundColor} !important; overflow-x: hidden !important;">
  
  <!-- Hero Section -->
  <div class="wp-events-hero" style="background: linear-gradient(135deg, ${config.heroGradientFrom} 0%, ${config.heroGradientTo} 100%) !important; position: relative !important; overflow: hidden !important; padding: ${config.heroPadding} 20px !important; color: ${config.heroTextColor} !important; text-align: ${getTextAlignment(config.heroTextAlign)} !important; min-height: 400px !important; display: flex !important; align-items: center !important; justify-content: center !important;">
    
    <!-- Background Image Overlay -->
    <div style="content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; background: url('${config.heroBackgroundImage}') center/cover !important; opacity: ${config.heroBackgroundOpacity} !important; z-index: 1 !important;"></div>
    
    <!-- Bottom Gradient -->
    <div style="content: '' !important; position: absolute !important; bottom: 0 !important; left: 0 !important; right: 0 !important; height: 100px !important; background: linear-gradient(to top, ${config.sectionBackgroundColor}, transparent) !important; z-index: 2 !important;"></div>
    
    <!-- Hero Content -->
    <div style="position: relative !important; z-index: 3 !important; max-width: 1200px !important; margin: 0 auto !important; padding: 0 20px !important; text-align: ${getTextAlignment(config.heroTextAlign)} !important;">
      <h1 style="font-size: ${config.heroTitleSize} !important; font-weight: 300 !important; margin: 0 0 20px 0 !important; ${config.heroTextShadow ? 'text-shadow: 2px 2px 4px rgba(0,0,0,0.3) !important;' : ''} letter-spacing: 2px !important; color: ${config.heroTextColor} !important; line-height: 1.2 !important; text-align: ${getTextAlignment(config.heroTextAlign)} !important; ${config.enableAnimations ? 'animation: fadeInUp 1s ease-out !important;' : ''}">
        ${config.heroTitle}
      </h1>
      <p style="font-size: ${config.heroSubtitleSize} !important; margin: 0 0 40px 0 !important; color: #E6D5B8 !important; font-style: italic !important; ${config.heroTextShadow ? 'text-shadow: 1px 1px 2px rgba(0,0,0,0.3) !important;' : ''} line-height: 1.4 !important; max-width: 800px !important; ${config.heroTextAlign === 'center' ? 'margin-left: auto !important; margin-right: auto !important;' : config.heroTextAlign === 'right' ? 'margin-left: auto !important;' : ''} text-align: ${getTextAlignment(config.heroTextAlign)} !important; ${config.enableAnimations ? 'animation: fadeInUp 1s ease-out 0.2s both !important;' : ''}">
        ${config.heroSubtitle}
      </p>
    </div>
  </div>

  <!-- Main Content Section -->
  <div class="wp-events-intro" style="background-color: ${config.sectionBackgroundColor} !important; padding: 60px 20px !important; position: relative !important;">
    <div style="max-width: 1200px !important; margin: 0 auto !important; padding: 0 20px !important;">
      
      <!-- Intro Grid -->
      <div class="wp-intro-grid" style="display: grid !important; ${getLayoutStyle()} align-items: center !important; margin-bottom: 60px !important; ${config.enableAnimations ? 'animation: fadeInUp 1s ease-out 0.4s both !important;' : ''}">
        
        <!-- Text Content -->
        <div class="wp-text-content" style="background: ${config.sectionTextBackground} !important; padding: ${config.sectionTextPadding} !important; border-radius: ${config.sectionBorderRadius} !important; box-shadow: ${getShadowStyle(config.sectionShadow)} !important; border-left: 5px solid #E57F84 !important; position: relative !important; text-align: ${getTextAlignment(config.sectionTextAlign)} !important; ${config.sectionLayout === 'image-first' ? 'order: 2 !important;' : 'order: 1 !important;'}">
          <h2 style="color: #1B4965 !important; font-size: 2.2rem !important; margin: 0 0 20px 0 !important; font-weight: 400 !important; line-height: 1.3 !important; text-align: ${getTextAlignment(config.sectionTextAlign)} !important;">
            ${config.sectionTitle}
          </h2>
          <p style="color: #333 !important; font-size: 1.1rem !important; line-height: 1.8 !important; margin: 0 0 15px 0 !important; text-align: ${getTextAlignment(config.sectionTextAlign)} !important;">
            ${config.sectionText1}
          </p>
          <p style="color: #333 !important; font-size: 1.1rem !important; line-height: 1.8 !important; margin: 0 !important; text-align: ${getTextAlignment(config.sectionTextAlign)} !important;">
            ${config.sectionText2}
          </p>
        </div>
        
        <!-- Image -->
        <div class="wp-image-content" style="position: relative !important; border-radius: ${config.sectionBorderRadius} !important; overflow: hidden !important; box-shadow: ${getShadowStyle(config.sectionShadow)} !important; transition: transform ${config.transitionDuration} ease !important; ${getImageAlignment(config.sectionImageAlign)} ${config.sectionLayout === 'image-first' ? 'order: 1 !important;' : 'order: 2 !important;'}">
          <img src="${config.sectionImage}" alt="Event Image" style="width: 100% !important; height: ${config.sectionImageHeight} !important; object-fit: cover !important; display: block !important; transition: transform ${config.transitionDuration} ease !important;">
        </div>
      </div>
      
      <!-- Feature Cards Grid -->
      <div class="wp-cards-grid" style="display: ${config.cardsLayout === 'carousel' ? 'flex' : 'grid'} !important; ${getCardsLayoutStyle()} ${getCardsAlignment(config.cardsAlignment)} gap: ${config.cardsGap} !important; margin-top: 40px !important; ${config.enableAnimations ? 'animation: fadeInUp 1s ease-out 0.6s both !important;' : ''}">
        ${config.cards.map((card, index) => `
          <div class="wp-feature-card" style="background: ${config.cardsBackgroundColor} !important; padding: ${config.cardsPadding} !important; border-radius: ${config.cardsBorderRadius} !important; text-align: center !important; box-shadow: ${getShadowStyle(config.cardsShadow)} !important; transition: transform ${config.transitionDuration} ease, box-shadow ${config.transitionDuration} ease !important; ${config.cardsBorderTop} !important; width: 100% !important; max-width: 350px !important; ${config.cardsLayout === 'carousel' ? 'flex-shrink: 0 !important;' : ''} ${config.enableAnimations ? `animation: fadeInUp 1s ease-out ${0.8 + index * 0.1}s both !important;` : ''}">
            
            <!-- Icon -->
            <div style="width: ${config.cardsIconSize} !important; height: ${config.cardsIconSize} !important; background: ${config.cardsIconBackground} !important; border-radius: 50% !important; margin: 0 auto 20px !important; display: flex !important; align-items: center !important; justify-content: center !important; font-size: 2rem !important; color: white !important; text-shadow: 1px 1px 2px rgba(0,0,0,0.2) !important; transition: transform ${config.transitionDuration} ease !important;">
              ${card.icon}
            </div>
            
            <!-- Title -->
            <h3 style="color: ${config.cardsTitleColor} !important; font-size: 1.3rem !important; margin: 0 0 15px 0 !important; font-weight: 500 !important; line-height: 1.3 !important; text-align: center !important;">
              ${card.title}
            </h3>
            
            <!-- Description -->
            <p style="color: ${config.cardsTextColor} !important; font-size: 0.95rem !important; line-height: 1.6 !important; margin: 0 !important; text-align: center !important;">
              ${card.text}
            </p>
          </div>
        `).join('')}
      </div>
      
      <!-- CTA Section -->
      <div class="wp-cta-section" style="background: linear-gradient(135deg, ${config.ctaGradientFrom}, ${config.ctaGradientTo}) !important; padding: ${config.ctaPadding} 30px !important; text-align: ${getTextAlignment(config.ctaTextAlign)} !important; margin-top: 40px !important; border-radius: ${config.ctaBorderRadius} !important; position: relative !important; overflow: hidden !important; ${config.enableAnimations ? 'animation: fadeInUp 1s ease-out 1s both !important;' : ''}">
        
        <!-- Background Image -->
        <div style="content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; background: url('${config.ctaBackgroundImage}') center/cover !important; opacity: ${config.ctaBackgroundOpacity} !important; z-index: 1 !important;"></div>
        
        <!-- CTA Content -->
        <div style="position: relative !important; z-index: 2 !important; text-align: ${getTextAlignment(config.ctaTextAlign)} !important;">
          <h2 style="color: #1B4965 !important; font-size: ${config.ctaTitleSize} !important; margin: 0 0 20px 0 !important; font-weight: 300 !important; line-height: 1.2 !important; text-align: ${getTextAlignment(config.ctaTextAlign)} !important;">
            ${config.ctaTitle}
          </h2>
          <p style="color: #1B4965 !important; font-size: ${config.ctaTextSize} !important; margin: 0 auto 30px auto !important; max-width: 600px !important; line-height: 1.5 !important; text-align: ${getTextAlignment(config.ctaTextAlign)} !important; ${config.ctaTextAlign === 'left' ? 'margin-left: 0 !important;' : config.ctaTextAlign === 'right' ? 'margin-right: 0 !important;' : ''}">
            ${config.ctaText}
          </p>
        </div>
      </div>
      
    </div>
  </div>
</div>

<!-- Styles and Animations -->
<style>
${config.enableAnimations ? `
@keyframes fadeInUp {
  from {
    opacity: 0 !important;
    transform: translateY(30px) !important;
  }
  to {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
}

@keyframes fadeIn {
  from { opacity: 0 !important; }
  to { opacity: 1 !important; }
}
` : ''}

/* WordPress Override Styles */
.wp-custom-template-wrapper {
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
}

.wp-custom-template-wrapper * {
  box-sizing: border-box !important;
}

.wp-custom-template-wrapper h1, 
.wp-custom-template-wrapper h2, 
.wp-custom-template-wrapper h3, 
.wp-custom-template-wrapper p {
  margin-top: 0 !important;
}

.wp-custom-template-wrapper img {
  max-width: 100% !important;
  height: auto !important;
}

/* Layout-specific styles */
.wp-intro-grid {
  ${config.sectionLayout === 'stacked' ? `
  grid-template-columns: 1fr !important;
  ` : config.sectionLayout === 'image-first' ? `
  grid-template-columns: 1fr 1fr !important;
  ` : `
  grid-template-columns: 1fr 1fr !important;
  `}
}

/* Responsive Design */
@media (max-width: 768px) {
  .wp-custom-template-wrapper .wp-events-hero h1 {
    font-size: 2.5rem !important;
  }
  
  .wp-custom-template-wrapper .wp-events-hero p {
    font-size: 1.1rem !important;
  }
  
  .wp-custom-template-wrapper .wp-intro-grid {
    grid-template-columns: 1fr !important;
    gap: 40px !important;
  }
  
  .wp-custom-template-wrapper .wp-text-content {
    padding: 25px !important;
    order: 1 !important;
  }
  
  .wp-custom-template-wrapper .wp-image-content {
    order: 2 !important;
    justify-self: center !important;
  }
  
  .wp-custom-template-wrapper .wp-text-content h2 {
    font-size: 1.8rem !important;
  }
  
  .wp-custom-template-wrapper .wp-cards-grid {
    grid-template-columns: 1fr !important;
    justify-items: center !important;
  }
  
  .wp-custom-template-wrapper .wp-cta-section h2 {
    font-size: 2rem !important;
  }
  
  .wp-custom-template-wrapper .wp-cta-section p {
    font-size: 1.1rem !important;
  }
}

@media (max-width: 480px) {
  .wp-custom-template-wrapper .wp-events-hero {
    padding: 60px 15px !important;
  }
  
  .wp-custom-template-wrapper .wp-events-hero h1 {
    font-size: 2rem !important;
  }
  
  .wp-custom-template-wrapper .wp-events-hero p {
    font-size: 1rem !important;
  }
  
  .wp-custom-template-wrapper .wp-events-intro {
    padding: 40px 15px !important;
  }
  
  .wp-custom-template-wrapper .wp-text-content {
    padding: 20px !important;
  }
  
  .wp-custom-template-wrapper .wp-text-content h2 {
    font-size: 1.5rem !important;
  }
  
  .wp-custom-template-wrapper .wp-text-content p {
    font-size: 1rem !important;
  }
  
  .wp-custom-template-wrapper .wp-feature-card {
    padding: 20px !important;
  }
  
  .wp-custom-template-wrapper .wp-cta-section {
    padding: 30px 20px !important;
  }
  
  .wp-custom-template-wrapper .wp-cta-section h2 {
    font-size: 1.8rem !important;
  }
}

${config.hoverEffects ? `
/* Hover effects */
.wp-custom-template-wrapper .wp-feature-card:hover {
  ${config.cardsEffect === 'hover-lift' ? 'transform: translateY(-5px) !important;' : 
    config.cardsEffect === 'hover-scale' ? 'transform: scale(1.05) !important;' : 
    config.cardsEffect === 'hover-rotate' ? 'transform: rotate(2deg) scale(1.02) !important;' : ''}
  box-shadow: 0 15px 40px rgba(27,73,101,0.15) !important;
}

.wp-custom-template-wrapper .wp-image-content img:hover {
  ${getHoverEffect(config.sectionImageEffect)}
}

.wp-custom-template-wrapper .wp-feature-card:hover .wp-card-icon {
  transform: scale(1.1) !important;
}
` : ''}
</style>

<!-- End WordPress Compatible Template -->`
  }

  const handleSave = () => {
    try {
      const templates = JSON.parse(localStorage.getItem(`templates_${user.id}`) || '[]')
      const updatedTemplateData = {
        ...templateData,
        html: generateHTML(),
        updatedAt: new Date().toISOString(),
        createdAt: templateData.createdAt || new Date().toISOString()
      }
      
      const existingIndex = templates.findIndex(t => t.id === templateData.id)
      if (existingIndex >= 0) {
        templates[existingIndex] = updatedTemplateData
      } else {
        templates.push(updatedTemplateData)
      }
      
      localStorage.setItem(`templates_${user.id}`, JSON.stringify(templates))
      setTemplateData(updatedTemplateData)
      
      alert('Template saved successfully!')
    } catch (error) {
      console.error('Save error:', error)
      alert('Error saving template. Please try again.')
    }
  }

  const handleCopyHTML = () => {
    const html = generateHTML()
    navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadHTML = () => {
    const html = generateHTML()
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${templateData.name.replace(/\s+/g, '-').toLowerCase()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportHTML = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const htmlContent = e.target.result
        alert('HTML imported! You can now customize it using the controls.')
      }
      reader.readAsText(file)
    }
  }

  const updateConfig = (key, value) => {
    setTemplateData(prev => ({
      ...prev,
      config: {
        ...prev.config,
        [key]: value
      }
    }))
  }

  const updateCard = (index, field, value) => {
    setTemplateData(prev => ({
      ...prev,
      config: {
        ...prev.config,
        cards: prev.config.cards.map((card, i) => 
          i === index ? { ...card, [field]: value } : card
        )
      }
    }))
  }

  const tabs = [
    { id: 'template', label: 'Template Info', icon: '📄' },
    { id: 'hero', label: 'Hero Section', icon: '🎯' },
    { id: 'content', label: 'Content Section', icon: '📝' },
    { id: 'cards', label: 'Feature Cards', icon: '🎴' },
    { id: 'cta', label: 'CTA Section', icon: '📣' },
    { id: 'effects', label: 'Effects & Animations', icon: '✨' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">Template Builder</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {showPreview ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
              </button>
              <button
                onClick={handleCopyHTML}
                className="flex items-center space-x-1 px-3 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <FiCopy className="w-4 h-4" />
                <span>{copied ? 'Copied!' : 'Copy WordPress HTML'}</span>
              </button>
              <button
                onClick={handleDownloadHTML}
                className="flex items-center space-x-1 px-3 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                <FiDownload className="w-4 h-4" />
                <span>Download</span>
              </button>
              <label className="flex items-center space-x-1 px-3 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors cursor-pointer">
                <FiUpload className="w-4 h-4" />
                <span>Import</span>
                <input
                  type="file"
                  accept=".html"
                  onChange={handleImportHTML}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleSave}
                className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiSave className="w-4 h-4" />
                <span>Save Template</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-wrap gap-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Template Info Tab */}
            {activeTab === 'template' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Template Info</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                    <input
                      type="text"
                      value={templateData.name}
                      onChange={(e) => setTemplateData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={templateData.description}
                      onChange={(e) => setTemplateData(prev => ({ ...prev, description: e.target.value }))}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                    <input
                      type="text"
                      value={templateData.icon}
                      onChange={(e) => setTemplateData(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl"
                      maxLength="2"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Hero Section Tab */}
            {activeTab === 'hero' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Hero Section</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                    <input
                      type="text"
                      value={templateData.config.heroTitle}
                      onChange={(e) => updateConfig('heroTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                    <input
                      type="text"
                      value={templateData.config.heroSubtitle}
                      onChange={(e) => updateConfig('heroSubtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
                    <input
                      type="url"
                      value={templateData.config.heroBackgroundImage}
                      onChange={(e) => updateConfig('heroBackgroundImage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title Size</label>
                      <input
                        type="text"
                        value={templateData.config.heroTitleSize}
                        onChange={(e) => updateConfig('heroTitleSize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="3.5rem"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle Size</label>
                      <input
                        type="text"
                        value={templateData.config.heroSubtitleSize}
                        onChange={(e) => updateConfig('heroSubtitleSize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1.4rem"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text Alignment</label>
                    <select
                      value={templateData.config.heroTextAlign}
                      onChange={(e) => updateConfig('heroTextAlign', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gradient From</label>
                      <input
                        type="color"
                        value={templateData.config.heroGradientFrom}
                        onChange={(e) => updateConfig('heroGradientFrom', e.target.value)}
                        className="w-full h-10 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gradient To</label>
                      <input
                        type="color"
                        value={templateData.config.heroGradientTo}
                        onChange={(e) => updateConfig('heroGradientTo', e.target.value)}
                        className="w-full h-10 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Opacity</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={templateData.config.heroBackgroundOpacity}
                      onChange={(e) => updateConfig('heroBackgroundOpacity', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500">{templateData.config.heroBackgroundOpacity}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={templateData.config.heroTextShadow}
                        onChange={(e) => updateConfig('heroTextShadow', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Text Shadow</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Content Section Tab */}
            {activeTab === 'content' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Section</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                    <input
                      type="text"
                      value={templateData.config.sectionTitle}
                      onChange={(e) => updateConfig('sectionTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Paragraph</label>
                    <textarea
                      value={templateData.config.sectionText1}
                      onChange={(e) => updateConfig('sectionText1', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Second Paragraph</label>
                    <textarea
                      value={templateData.config.sectionText2}
                      onChange={(e) => updateConfig('sectionText2', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section Image URL</label>
                    <input
                      type="url"
                      value={templateData.config.sectionImage}
                      onChange={(e) => updateConfig('sectionImage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
                    <select
                      value={templateData.config.sectionLayout}
                      onChange={(e) => updateConfig('sectionLayout', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="side-by-side">Side by Side</option>
                      <option value="image-first">Image First</option>
                      <option value="stacked">Stacked</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Text Alignment</label>
                      <select
                        value={templateData.config.sectionTextAlign}
                        onChange={(e) => updateConfig('sectionTextAlign', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image Alignment</label>
                      <select
                        value={templateData.config.sectionImageAlign}
                        onChange={(e) => updateConfig('sectionImageAlign', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image Effect</label>
                    <select
                      value={templateData.config.sectionImageEffect}
                      onChange={(e) => updateConfig('sectionImageEffect', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="hover-scale">Hover Scale</option>
                      <option value="hover-rotate">Hover Rotate</option>
                      <option value="hover-lift">Hover Lift</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shadow Effect</label>
                    <select
                      value={templateData.config.sectionShadow}
                      onChange={(e) => updateConfig('sectionShadow', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="none">None</option>
                      <option value="light">Light</option>
                      <option value="medium">Medium</option>
                      <option value="heavy">Heavy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image Height</label>
                    <input
                      type="text"
                      value={templateData.config.sectionImageHeight}
                      onChange={(e) => updateConfig('sectionImageHeight', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="400px"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Feature Cards Tab */}
            {activeTab === 'cards' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Feature Cards</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
                    <select
                      value={templateData.config.cardsLayout}
                      onChange={(e) => updateConfig('cardsLayout', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="grid-3">3 Columns</option>
                      <option value="grid-2">2 Columns</option>
                      <option value="grid-1">1 Column</option>
                      <option value="carousel">Carousel</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alignment</label>
                    <select
                      value={templateData.config.cardsAlignment}
                      onChange={(e) => updateConfig('cardsAlignment', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hover Effect</label>
                    <select
                      value={templateData.config.cardsEffect}
                      onChange={(e) => updateConfig('cardsEffect', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="hover-lift">Hover Lift</option>
                      <option value="hover-scale">Hover Scale</option>
                      <option value="hover-rotate">Hover Rotate</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shadow Effect</label>
                    <select
                      value={templateData.config.cardsShadow}
                      onChange={(e) => updateConfig('cardsShadow', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="none">None</option>
                      <option value="light">Light</option>
                      <option value="medium">Medium</option>
                      <option value="heavy">Heavy</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title Color</label>
                      <input
                        type="color"
                        value={templateData.config.cardsTitleColor}
                        onChange={(e) => updateConfig('cardsTitleColor', e.target.value)}
                        className="w-full h-10 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                      <input
                        type="color"
                        value={templateData.config.cardsTextColor}
                        onChange={(e) => updateConfig('cardsTextColor', e.target.value)}
                        className="w-full h-10 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h4 className="font-medium text-gray-700">Card Content</h4>
                  {templateData.config.cards.map((card, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-700 mb-3">Card {index + 1}</h5>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                          <input
                            type="text"
                            value={card.icon}
                            onChange={(e) => updateCard(index, 'icon', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl"
                            maxLength="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => updateCard(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            value={card.text}
                            onChange={(e) => updateCard(index, 'text', e.target.value)}
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section Tab */}
            {activeTab === 'cta' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">CTA Section</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CTA Title</label>
                    <input
                      type="text"
                      value={templateData.config.ctaTitle}
                      onChange={(e) => updateConfig('ctaTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
                    <textarea
                      value={templateData.config.ctaText}
                      onChange={(e) => updateConfig('ctaText', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
                    <input
                      type="url"
                      value={templateData.config.ctaBackgroundImage}
                      onChange={(e) => updateConfig('ctaBackgroundImage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text Alignment</label>
                    <select
                      value={templateData.config.ctaTextAlign}
                      onChange={(e) => updateConfig('ctaTextAlign', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title Size</label>
                      <input
                        type="text"
                        value={templateData.config.ctaTitleSize}
                        onChange={(e) => updateConfig('ctaTitleSize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="2.5rem"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Text Size</label>
                      <input
                        type="text"
                        value={templateData.config.ctaTextSize}
                        onChange={(e) => updateConfig('ctaTextSize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1.2rem"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gradient From</label>
                      <input
                        type="color"
                        value={templateData.config.ctaGradientFrom}
                        onChange={(e) => updateConfig('ctaGradientFrom', e.target.value)}
                        className="w-full h-10 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gradient To</label>
                      <input
                        type="color"
                        value={templateData.config.ctaGradientTo}
                        onChange={(e) => updateConfig('ctaGradientTo', e.target.value)}
                        className="w-full h-10 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Opacity</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={templateData.config.ctaBackgroundOpacity}
                      onChange={(e) => updateConfig('ctaBackgroundOpacity', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500">{templateData.config.ctaBackgroundOpacity}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Effects & Animations Tab */}
            {activeTab === 'effects' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Effects & Animations</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={templateData.config.enableAnimations}
                        onChange={(e) => updateConfig('enableAnimations', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Enable Animations</span>
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={templateData.config.hoverEffects}
                        onChange={(e) => updateConfig('hoverEffects', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Enable Hover Effects</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Transition Duration</label>
                    <select
                      value={templateData.config.transitionDuration}
                      onChange={(e) => updateConfig('transitionDuration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="0.1s">Fast (0.1s)</option>
                      <option value="0.3s">Normal (0.3s)</option>
                      <option value="0.5s">Slow (0.5s)</option>
                      <option value="1s">Very Slow (1s)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Global Background Color</label>
                    <input
                      type="color"
                      value={templateData.config.sectionBackgroundColor}
                      onChange={(e) => updateConfig('sectionBackgroundColor', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Preview */}
          {showPreview && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b">
                  <h3 className="font-medium text-gray-700">WordPress Preview</h3>
                </div>
                <div className="p-4">
                  <div 
                    className="w-full border border-gray-200 rounded-lg overflow-hidden custom-scrollbar"
                    style={{ height: '80vh' }}
                  >
                    <iframe
                      srcDoc={generateHTML()}
                      className="w-full h-full"
                      title="WordPress Template Preview"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TemplateBuilder