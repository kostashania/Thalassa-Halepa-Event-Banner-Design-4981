import React, { useState, useEffect } from 'react'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'
import { useCreations } from '../hooks/useCreations'
import { useAuth } from '../hooks/useAuth'

const { FiSave, FiFolder, FiTrash2, FiHeart, FiEdit3, FiDownload, FiUpload, FiCopy, FiCheck, FiPlus, FiX } = FiIcons

const CreationManager = ({ 
  currentHtml, 
  currentConfig, 
  onLoadCreation, 
  onCopyHtml,
  onImportHtml 
}) => {
  const { user } = useAuth()
  const { creations, loading, saveCreation, updateCreation, deleteCreation, toggleFavorite } = useCreations()
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [editingCreation, setEditingCreation] = useState(null)
  const [copied, setCopied] = useState(false)
  const [importText, setImportText] = useState('')

  const [saveForm, setSaveForm] = useState({
    title: '',
    description: ''
  })

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      if (editingCreation) {
        await updateCreation(
          editingCreation.id,
          saveForm.title,
          saveForm.description,
          currentHtml,
          currentConfig
        )
      } else {
        await saveCreation(
          saveForm.title,
          saveForm.description,
          currentHtml,
          currentConfig
        )
      }
      setShowSaveModal(false)
      setEditingCreation(null)
      setSaveForm({ title: '', description: '' })
    } catch (error) {
      alert('Σφάλμα αποθήκευσης: ' + error.message)
    }
  }

  const handleEdit = (creation) => {
    setEditingCreation(creation)
    setSaveForm({
      title: creation.title,
      description: creation.description || ''
    })
    setShowSaveModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το template;')) {
      try {
        await deleteCreation(id)
      } catch (error) {
        alert('Σφάλμα διαγραφής: ' + error.message)
      }
    }
  }

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(currentHtml).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleImport = () => {
    try {
      if (importText.trim()) {
        onImportHtml(importText)
        setImportText('')
        setShowImportModal(false)
      }
    } catch (error) {
      alert('Σφάλμα εισαγωγής: ' + error.message)
    }
  }

  const handleExport = (creation) => {
    const blob = new Blob([creation.html_content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${creation.title.replace(/[^a-zA-Z0-9]/g, '_')}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <SafeIcon icon={FiFolder} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Συνδεθείτε για να αποθηκεύσετε
          </h3>
          <p className="text-gray-600">
            Συνδεθείτε για να αποθηκεύσετε και να διαχειριστείτε τα templates σας
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Διαχείριση Templates
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={handleCopyHtml}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <SafeIcon icon={copied ? FiCheck : FiCopy} className="w-4 h-4" />
            {copied ? 'Αντιγράφηκε!' : 'Αντιγραφή HTML'}
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <SafeIcon icon={FiUpload} className="w-4 h-4" />
            Εισαγωγή
          </button>
          <button
            onClick={() => setShowSaveModal(true)}
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            Αποθήκευση
          </button>
        </div>
      </div>

      {/* Creations List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση templates...</p>
        </div>
      ) : creations.length === 0 ? (
        <div className="text-center py-8">
          <SafeIcon icon={FiFolder} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Δεν έχετε αποθηκευμένα templates</p>
        </div>
      ) : (
        <div className="space-y-3">
          {creations.map(creation => (
            <div key={creation.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{creation.title}</h4>
                    {creation.is_favorite && (
                      <SafeIcon icon={FiHeart} className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  {creation.description && (
                    <p className="text-sm text-gray-600 mb-2">{creation.description}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {new Date(creation.created_at).toLocaleDateString('el-GR')}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleFavorite(creation.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      creation.is_favorite
                        ? 'text-red-500 hover:bg-red-50'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <SafeIcon icon={FiHeart} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onLoadCreation(creation)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiFolder} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(creation)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleExport(creation)}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(creation.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingCreation ? 'Επεξεργασία Template' : 'Αποθήκευση Template'}
              </h3>
              <button
                onClick={() => {
                  setShowSaveModal(false)
                  setEditingCreation(null)
                  setSaveForm({ title: '', description: '' })
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Τίτλος
                </label>
                <input
                  type="text"
                  value={saveForm.title}
                  onChange={(e) => setSaveForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Εισάγετε τίτλο..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Περιγραφή
                </label>
                <textarea
                  value={saveForm.description}
                  onChange={(e) => setSaveForm(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Προαιρετική περιγραφή..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowSaveModal(false)
                    setEditingCreation(null)
                    setSaveForm({ title: '', description: '' })
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Ακύρωση
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingCreation ? 'Ενημέρωση' : 'Αποθήκευση'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Εισαγωγή HTML
              </h3>
              <button
                onClick={() => {
                  setShowImportModal(false)
                  setImportText('')
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HTML Κώδικας
                </label>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  rows="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                  placeholder="Επικολλήστε τον HTML κώδικα εδώ..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowImportModal(false)
                    setImportText('')
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Ακύρωση
                </button>
                <button
                  onClick={handleImport}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Εισαγωγή
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreationManager