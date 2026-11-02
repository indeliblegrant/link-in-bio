import { useState } from 'react'
import { api } from '../utils/api'

const inputBase = 'w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2'
const inputOk = 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
const inputBad = 'border-red-500 focus:ring-red-200'

function AuthForm({ mode, onSuccess }) {
  const isRegister = mode === 'register'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFieldErrors({})
    setFormError('')
    setIsLoading(true)

    try {
      const data = await api(isRegister ? '/api/register' : '/api/login', {
        method: 'POST',
        body: { username, password },
      })
      onSuccess(data)
    } catch (error) {
      const fields = error.fields || {}
      const hasFieldErrors = Object.keys(fields).length > 0

      setFieldErrors(fields)
      // Field messages show under their inputs; anything else shows at the top
      setFormError(hasFieldErrors ? '' : error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {formError && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {formError}
        </p>
      )}

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Username</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          aria-invalid={Boolean(fieldErrors.username)}
          className={`${inputBase} ${fieldErrors.username ? inputBad : inputOk}`}
        />
        {fieldErrors.username && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.username}</p>
        )}
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isRegister ? 'new-password' : 'current-password'}
          aria-invalid={Boolean(fieldErrors.password)}
          className={`${inputBase} ${fieldErrors.password ? inputBad : inputOk}`}
        />
        {fieldErrors.password && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
        )}
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Please wait…' : isRegister ? 'Create my account' : 'Sign in'}
      </button>
    </form>
  )
}

export default AuthForm
