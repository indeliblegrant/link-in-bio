import { useState } from 'react'

const inputBase = 'w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2'
const inputOk = 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
const inputBad = 'border-red-500 focus:ring-red-200'

function ProfileForm({ profile, hasChanges, onChange, onSave }) {
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const inputClass = (field) => `${inputBase} ${fieldErrors[field] ? inputBad : inputOk}`

  const handleChange = (field, value) => {
    setSaved(false)
    onChange(field, value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFieldErrors({})
    setFormError('')
    setSaved(false)
    setIsSaving(true)

    try {
      await onSave()
      setSaved(true)
    } catch (error) {
      const fields = error.fields || {}
      setFieldErrors(fields)
      setFormError(Object.keys(fields).length > 0 ? '' : error.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        Profile
      </h3>

      {formError && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {formError}
        </p>
      )}

      <div>
        <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="yourname"
          value={profile.username}
          onChange={(e) =>
            handleChange('username', e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))
          }
          aria-invalid={Boolean(fieldErrors.username)}
          className={inputClass('username')}
        />
        {fieldErrors.username ? (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.username}</p>
        ) : (
          <p className="mt-1 text-xs text-gray-500">
            Your public page: /u/{profile.username || '...'}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="displayName" className="mb-1 block text-sm font-medium text-gray-700">
          Display name
        </label>
        <input
          id="displayName"
          type="text"
          placeholder="Your name"
          value={profile.name}
          onChange={(e) => handleChange('name', e.target.value)}
          aria-invalid={Boolean(fieldErrors.name)}
          className={inputClass('name')}
        />
        {fieldErrors.name && <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>}
      </div>

      <div>
        <label htmlFor="bio" className="mb-1 block text-sm font-medium text-gray-700">
          Bio
        </label>
        <textarea
          id="bio"
          rows="3"
          placeholder="A short bio"
          value={profile.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          aria-invalid={Boolean(fieldErrors.bio)}
          className={inputClass('bio')}
        />
        {fieldErrors.bio && <p className="mt-1 text-sm text-red-600">{fieldErrors.bio}</p>}
      </div>

      <div>
        <label htmlFor="avatarUrl" className="mb-1 block text-sm font-medium text-gray-700">
          Avatar image URL
        </label>
        <input
          id="avatarUrl"
          type="url"
          placeholder="https://example.com/me.jpg"
          value={profile.avatar}
          onChange={(e) => handleChange('avatar', e.target.value)}
          aria-invalid={Boolean(fieldErrors.avatar)}
          className={inputClass('avatar')}
        />
        {fieldErrors.avatar && <p className="mt-1 text-sm text-red-600">{fieldErrors.avatar}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!hasChanges || isSaving}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? 'Saving…' : 'Save profile'}
        </button>
        {saved && !hasChanges && <span className="text-sm text-green-700">Saved.</span>}
        {hasChanges && !isSaving && (
          <span className="text-sm text-gray-500">You have unsaved changes.</span>
        )}
      </div>
    </form>
  )
}

export default ProfileForm
