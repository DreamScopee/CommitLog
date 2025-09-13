import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function UserProfile() {
  const { user, userProfile, signOut } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setShowDropdown(false)
  }

  if (!user) return null

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold">
            {userProfile?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="hidden md:block text-sm font-medium">
          {userProfile?.username || user.email}
        </span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-700">
            <p className="text-sm font-medium text-white">{userProfile?.username || 'User'}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
          
          <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-200">
            Profile Settings
          </button>
          
          <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-200">
            Reading History
          </button>
          
          <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-200">
            Bookmarks
          </button>
          
          <div className="border-t border-gray-700 my-1"></div>
          
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
