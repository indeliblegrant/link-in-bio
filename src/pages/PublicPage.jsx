import { Link, useParams } from 'react-router-dom'
import PhonePreview from '../components/PhonePreview'
import NotFoundPage from './NotFoundPage'

function PublicPage({ profile, links, onRecordClick }) {
  const { username } = useParams()

  if (!profile.username || username.toLowerCase() !== profile.username) {
    return <NotFoundPage />
  }

  return (
    <div className="min-h-screen bg-gray-100 sm:flex sm:items-center sm:justify-center sm:p-8">
      <PhonePreview
        profile={profile}
        links={links}
        isPublic
        onLinkClick={onRecordClick}
      />
      <Link
        to="/admin"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow ring-1 ring-gray-200 hover:bg-gray-100"
      >
        ← Back to editor
      </Link>
    </div>
  )
}

export default PublicPage