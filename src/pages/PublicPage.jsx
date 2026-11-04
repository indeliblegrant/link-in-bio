import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PhonePreview from '../components/PhonePreview'
import NotFoundPage from './NotFoundPage'
import { api } from '../utils/api'

function PublicPage() {
  const { username } = useParams()
  const [page, setPage] = useState(null) // { profile, links }
  const [status, setStatus] = useState('loading') // loading, ready, notfound or error

  useEffect(() => {
    let cancelled = false

    api(`/api/public/${encodeURIComponent(username)}`)
      .then((data) => {
        if (cancelled) return
        setPage(data)
        setStatus('ready')
      })
      .catch((error) => {
        if (!cancelled) setStatus(error.status === 404 ? 'notfound' : 'error')
      })

    return () => {
      cancelled = true
    }
  }, [username])

  // The link itself opens in a new tab. This only tells the server about the click.
  const handleLinkClick = (linkId) => {
    api(`/api/public/${encodeURIComponent(username)}/click`, {
      method: 'POST',
      body: { linkId },
    }).catch(() => {})
  }

  if (status === 'notfound') {
    return <NotFoundPage />
  }

  if (status !== 'ready') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6 text-center">
        <p className="text-gray-600">
          {status === 'loading' ? 'Loading…' : 'This page could not be loaded. Please try again later.'}
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 sm:flex sm:items-center sm:justify-center sm:p-8">
      <PhonePreview
        profile={page.profile}
        links={page.links}
        isPublic
        onLinkClick={handleLinkClick}
      />
    </div>
  )
}

export default PublicPage
