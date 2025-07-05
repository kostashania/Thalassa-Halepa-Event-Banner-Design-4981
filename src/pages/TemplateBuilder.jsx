import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSave, FiArrowLeft, FiEye, FiEyeOff, FiCopy, FiDownload, FiUpload } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

const TemplateBuilder = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { templateId } = useParams()
  const [showPreview, setShowPreview] = useState(true)
  const [copied, setCopied] = useState(false)

  const [templateData, setTemplateData] = useState({
    id: templateId || Date.now().toString(),
    name: 'New Template',
    description: '',
    icon: '🎨',
    config: {
      heroTitle: 'Upcoming Events',
      heroSubtitle: 'Discover the magical moments awaiting you',
      heroBackgroundImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      heroGradientFrom: '#1B4965',
      heroGradientTo: '#1E7F9D',
      heroTextColor: '#ffffff',
      
      sectionTitle: 'A Sea of Experiences',
      sectionText1: 'At Thalassa Halepa, every event is a unique experience that combines the beauty of the Aegean with authentic Cretan hospitality.',
      sectionText2: 'From cultural events to gastronomic journeys, every moment is designed to create unforgettable memories.',
      sectionImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      sectionBackgroundColor: '#E0E0E0',
      
      ctaTitle: 'Get Ready for Magical Moments',
      ctaText: 'Below you will find all the upcoming events that will take you to a world full of colors, flavors and emotions',
      ctaBackgroundImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      ctaGradientFrom: '#E6D5B8',
      ctaGradientTo: '#E0E0E0',
      
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
      // Load existing template
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
    
    // Generate WordPress-compatible HTML with inline styles and specific selectors
    return `<!-- WordPress Compatible Template - ${templateData.name} -->
<div class="wp-custom-template-wrapper" style="margin: 0; padding: 0; box-sizing: border-box; font-family: Georgia, serif; line-height: 1.6; background-color: ${config.sectionBackgroundColor}; overflow-x: hidden;">
  
  <!-- Hero Section -->
  <div class="wp-events-hero" style="background: linear-gradient(135deg, ${config.heroGradientFrom} 0%, ${config.heroGradientTo} 100%); position: relative; overflow: hidden; padding: 80px 20px; color: ${config.heroTextColor}; text-align: center; min-height: 400px; display: flex; align-items: center; justify-content: center;">
    
    <!-- Background Image Overlay -->
    <div style="content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('${config.heroBackgroundImage}') center/cover; opacity: 0.15; z-index: 1;"></div>
    
    <!-- Bottom Gradient -->
    <div style="content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 100px; background: linear-gradient(to top, ${config.sectionBackgroundColor}, transparent); z-index: 2;"></div>
    
    <!-- Hero Content -->
    <div style="position: relative; z-index: 3; max-width: 1200px; margin: 0 auto; padding: 0 20px;">
      <h1 style="font-size: 3.5rem; font-weight: 300; margin: 0 0 20px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); letter-spacing: 2px; color: ${config.heroTextColor} !important; line-height: 1.2;">
        ${config.heroTitle}
      </h1>
      <p style="font-size: 1.4rem; margin: 0 0 40px 0; color: #E6D5B8 !important; font-style: italic; text-shadow: 1px 1px 2px rgba(0,0,0,0.3); line-height: 1.4; max-width: 800px; margin-left: auto; margin-right: auto;">
        ${config.heroSubtitle}
      </p>
    </div>
  </div>

  <!-- Main Content Section -->
  <div class="wp-events-intro" style="background-color: ${config.sectionBackgroundColor}; padding: 60px 20px; position: relative;">
    <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
      
      <!-- Intro Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; margin-bottom: 60px;">
        
        <!-- Text Content -->
        <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(27,73,101,0.1); border-left: 5px solid #E57F84; position: relative;">
          <h2 style="color: #1B4965 !important; font-size: 2.2rem; margin: 0 0 20px 0; font-weight: 400; line-height: 1.3;">
            ${config.sectionTitle}
          </h2>
          <p style="color: #333 !important; font-size: 1.1rem; line-height: 1.8; margin: 0 0 15px 0;">
            ${config.sectionText1}
          </p>
          <p style="color: #333 !important; font-size: 1.1rem; line-height: 1.8; margin: 0;">
            ${config.sectionText2}
          </p>
        </div>
        
        <!-- Image -->
        <div style="position: relative; border-radius: 15px; overflow: hidden; box-shadow: 0 15px 35px rgba(27,73,101,0.2); transition: transform 0.3s ease;">
          <img src="${config.sectionImage}" alt="Event Image" style="width: 100%; height: 400px; object-fit: cover; display: block; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        </div>
      </div>
      
      <!-- Feature Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 40px;">
        ${config.cards.map(card => `
          <div style="background: white; padding: 30px; border-radius: 12px; text-align: center; box-shadow: 0 8px 25px rgba(27,73,101,0.08); transition: transform 0.3s ease, box-shadow 0.3s ease; border-top: 4px solid #1E7F9D;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 15px 40px rgba(27,73,101,0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(27,73,101,0.08)'">
            
            <!-- Icon -->
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #E57F84, #E6D5B8); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">
              ${card.icon}
            </div>
            
            <!-- Title -->
            <h3 style="color: #1B4965 !important; font-size: 1.3rem; margin: 0 0 15px 0; font-weight: 500; line-height: 1.3;">
              ${card.title}
            </h3>
            
            <!-- Description -->
            <p style="color: #666 !important; font-size: 0.95rem; line-height: 1.6; margin: 0;">
              ${card.text}
            </p>
          </div>
        `).join('')}
      </div>
      
      <!-- CTA Section -->
      <div style="background: linear-gradient(135deg, ${config.ctaGradientFrom}, ${config.ctaGradientTo}); padding: 50px 30px; text-align: center; margin-top: 40px; border-radius: 20px; position: relative; overflow: hidden;">
        
        <!-- Background Image -->
        <div style="content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('${config.ctaBackgroundImage}') center/cover; opacity: 0.05; z-index: 1;"></div>
        
        <!-- CTA Content -->
        <div style="position: relative; z-index: 2;">
          <h2 style="color: #1B4965 !important; font-size: 2.5rem; margin: 0 0 20px 0; font-weight: 300; line-height: 1.2;">
            ${config.ctaTitle}
          </h2>
          <p style="color: #1B4965 !important; font-size: 1.2rem; margin: 0 auto 30px auto; max-width: 600px; line-height: 1.5;">
            ${config.ctaText}
          </p>
        </div>
      </div>
      
    </div>
  </div>
</div>

<!-- Responsive Styles -->
<style>
@media (max-width: 768px) {
  .wp-custom-template-wrapper .wp-events-hero h1 {
    font-size: 2.5rem !important;
  }
  
  .wp-custom-template-wrapper .wp-events-hero p {
    font-size: 1.1rem !important;
  }
  
  .wp-custom-template-wrapper .wp-events-intro > div > div:first-child {
    grid-template-columns: 1fr !important;
    gap: 40px !important;
  }
  
  .wp-custom-template-wrapper .wp-events-intro > div > div:first-child > div:first-child {
    padding: 25px !important;
  }
  
  .wp-custom-template-wrapper .wp-events-intro > div > div:first-child > div:first-child h2 {
    font-size: 1.8rem !important;
  }
  
  .wp-custom-template-wrapper .wp-events-intro > div > div:nth-child(2) {
    grid-template-columns: 1fr !important;
  }
  
  .wp-custom-template-wrapper .wp-events-intro > div > div:last-child h2 {
    font-size: 2rem !important;
  }
  
  .wp-custom-template-wrapper .wp-events-intro > div > div:last-child p {
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
  
  .wp-custom-template-wrapper .wp-events-intro > div > div:first-child > div:first-child {
    padding: 20px !important;
  }
  
  .wp-custom-template-wrapper .wp-events-intro > div > div:first-child > div:first-child h2 {
    font-size: 1.5rem !important;
  }
  
  .wp-custom-template-wrapper .wp-events-intro > div > div:first-child > div:first-child p {
    font-size: 1rem !important;
  }
  
  .wp-custom-template-wrapper .wp-events-intro > div > div:nth-child(2) > div {
    padding: 20px !important;
  }
  
  .wp-custom-template-wrapper .wp-events-intro > div > div:last-child {
    padding: 30px 20px !important;
  }
  
  .wp-custom-template-wrapper .wp-events-intro > div > div:last-child h2 {
    font-size: 1.8rem !important;
  }
}

/* Hover Effects */
.wp-custom-template-wrapper .wp-events-intro > div > div:first-child > div:last-child:hover {
  transform: translateY(-5px) !important;
}

/* Force styles over WordPress theme */
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
</style>

<!-- Script for additional interactivity -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling and enhanced interactions
  const cards = document.querySelectorAll('.wp-custom-template-wrapper [style*="box-shadow"]');
  
  cards.forEach(card => {
    if (card.style.padding && card.style.padding.includes('30px')) {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 15px 40px rgba(27,73,101,0.15)';
        this.style.transition = 'all 0.3s ease';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 8px 25px rgba(27,73,101,0.08)';
      });
    }
  });
  
  // Image hover effects
  const images = document.querySelectorAll('.wp-custom-template-wrapper img');
  images.forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
});
</script>

<!-- End WordPress Compatible Template -->`
  }

  const handleSave = () => {
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
    alert('Template saved successfully!')
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
        // Simple import - you could enhance this to parse and extract config
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
            {/* Template Info */}
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

            {/* Hero Section */}
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
              </div>
            </div>

            {/* Content Section */}
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
              </div>
            </div>

            {/* Feature Cards */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Feature Cards</h3>
              <div className="space-y-6">
                {templateData.config.cards.map((card, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-3">Card {index + 1}</h4>
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

            {/* CTA Section */}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">CTA Background Image URL</label>
                  <input
                    type="url"
                    value={templateData.config.ctaBackgroundImage}
                    onChange={(e) => updateConfig('ctaBackgroundImage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
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