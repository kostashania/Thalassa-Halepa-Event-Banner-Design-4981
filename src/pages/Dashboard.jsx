import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit3, FiTrash2, FiCopy, FiDownload, FiUser, FiLogOut, FiEye } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    // Load templates from localStorage
    const savedTemplates = localStorage.getItem(`templates_${user.id}`)
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates))
    }
  }, [user.id])

  const handleCreateTemplate = () => {
    navigate('/builder')
  }

  const handleEditTemplate = (templateId) => {
    navigate(`/builder/${templateId}`)
  }

  const handleDeleteTemplate = (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      const updatedTemplates = templates.filter(t => t.id !== templateId)
      setTemplates(updatedTemplates)
      localStorage.setItem(`templates_${user.id}`, JSON.stringify(updatedTemplates))
    }
  }

  const handleCopyHTML = (template) => {
    navigator.clipboard.writeText(template.html)
    alert('HTML copied to clipboard!')
  }

  const handleDownloadHTML = (template) => {
    const blob = new Blob([template.html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${template.name.replace(/\s+/g, '-').toLowerCase()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePreviewTemplate = (template) => {
    const newWindow = window.open('', '_blank')
    newWindow.document.write(template.html)
    newWindow.document.close()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">TB</span>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Template Builder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FiUser className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Templates</h2>
          <p className="text-gray-600">Create and manage your custom templates</p>
        </div>

        {/* Create New Template Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreateTemplate}
          className="mb-8 flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
        >
          <FiPlus className="w-5 h-5" />
          <span>Create New Template</span>
        </motion.button>

        {/* Templates Grid */}
        {templates.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiEdit3 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates yet</h3>
            <p className="text-gray-600 mb-4">Create your first template to get started</p>
            <button
              onClick={handleCreateTemplate}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Template
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  <span className="text-4xl">{template.icon || '📄'}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                  <div className="text-xs text-gray-500 mb-4">
                    Created: {new Date(template.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePreviewTemplate(template)}
                      className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors text-sm"
                    >
                      <FiEye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => handleEditTemplate(template.id)}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm"
                    >
                      <FiEdit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleCopyHTML(template)}
                      className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-600 rounded hover:bg-purple-200 transition-colors text-sm"
                    >
                      <FiCopy className="w-4 h-4" />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={() => handleDownloadHTML(template)}
                      className="flex items-center space-x-1 px-3 py-1 bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 transition-colors text-sm"
                    >
                      <FiDownload className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors text-sm"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard