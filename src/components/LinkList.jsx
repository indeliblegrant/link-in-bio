import { useState } from 'react'
import { isValidUrl } from '../utils/isValidUrl'

const inputBase =
  'w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2'
const inputOk =
  'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
const inputBad = 'border-red-500 focus:ring-red-200'

function LinkForm({
  initialTitle = '',
  initialUrl = '',
  submitLabel,
  onSubmit,
  onCancel,
}) {
  const [title, setTitle] = useState(initialTitle)
  const [url, setUrl] = useState(initialUrl)
  const [errors, setErrors] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()

    const cleanTitle = title.trim()
    const cleanUrl = url.trim()
    const newErrors = {}

    if (!cleanTitle) newErrors.title = 'Title is required.'
    if (!isValidUrl(cleanUrl)) {
      newErrors.url = 'URL must start with http:// or https://'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    onSubmit({ title: cleanTitle, url: cleanUrl })
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Title</span>
        <input
          type="text"
          placeholder="My Portfolio"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={Boolean(errors.title)}
          className={`${inputBase} ${errors.title ? inputBad : inputOk}`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">URL</span>
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-invalid={Boolean(errors.url)}
          className={`${inputBase} ${errors.url ? inputBad : inputOk}`}
        />
        {errors.url && (
          <p className="mt-1 text-sm text-red-600">{errors.url}</p>
        )}
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default LinkForm