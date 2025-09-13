import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function UserAuth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage('Check your email for the confirmation link!')
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage('Signed in successfully!')
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">User Authentication</h2>
      
      <form className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </form>
      
      {message && (
        <div className="mt-4 p-3 bg-gray-700 text-white rounded-md">
          {message}
        </div>
      )}
    </div>
  )
}
