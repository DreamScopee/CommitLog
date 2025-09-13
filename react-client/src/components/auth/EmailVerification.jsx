import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function EmailVerification() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('verifying')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token')
      const type = searchParams.get('type')

      if (!token || type !== 'signup') {
        setStatus('error')
        setMessage('Invalid verification link')
        return
      }

      try {
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup'
        })

        if (error) {
          setStatus('error')
          setMessage(error.message)
        } else {
          setStatus('success')
          setMessage('Email verified successfully! You can now sign in to your account.')
        }
      } catch (err) {
        setStatus('error')
        setMessage('An error occurred during verification')
      }
    }

    verifyEmail()
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img src="/devscentral.jpg" alt="DevsCentral" className="mx-auto h-16 w-16 rounded-lg mb-4" />
          <h2 className="text-3xl font-bold text-white">Email Verification</h2>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 text-center">
          {status === 'verifying' && (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-300">Verifying your email...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Verification Successful!</h3>
              <p className="text-gray-300">{message}</p>
              <Link
                to="/login"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Sign In Now
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Verification Failed</h3>
              <p className="text-gray-300">{message}</p>
              <div className="space-y-2">
                <Link
                  to="/signup"
                  className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Try Again
                </Link>
                <Link
                  to="/login"
                  className="block text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
