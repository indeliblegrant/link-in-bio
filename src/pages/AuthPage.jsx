import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthForm from '../components/AuthForm'

const tabs = [
  { value: 'register', label: 'Register' },
  { value: 'login', label: 'Sign in' },
]

function AuthPage() {
  const [searchParams] = useSearchParams()
  // /auth?mode=login opens the Sign in tab (used when your login is missing or has expired)
  const [mode, setMode] = useState(searchParams.get('mode') === 'login' ? 'login' : 'register')
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="text-sm font-medium text-indigo-600 hover:underline">
          ← Back to the demo
        </Link>

        <div className="mt-3 rounded-2xl bg-white p-6 shadow">
          <div
            role="group"
            aria-label="Register or sign in"
            className="mb-5 flex rounded-full bg-gray-100 p-1"
          >
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                aria-pressed={mode === tab.value}
                onClick={() => setMode(tab.value)}
                className={`flex-1 rounded-full px-4 py-1.5 text-sm font-medium ${
                  mode === tab.value
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <h1 className="text-xl font-semibold text-gray-900">
            {mode === 'register' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mb-5 mt-1 text-sm text-gray-600">
            {mode === 'register'
              ? 'Pick a username and password to start your own page.'
              : 'Sign in to keep editing your page.'}
          </p>

          {/* key makes React start a fresh form when you switch tabs */}
          <AuthForm key={mode} mode={mode} onSuccess={() => navigate('/admin')} />
        </div>
      </div>
    </div>
  )
}

export default AuthPage
