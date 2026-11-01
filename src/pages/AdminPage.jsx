import { Link } from 'react-router-dom'
import AdminPanel from '../components/AdminPanel'
import AnalyticsPanel from '../components/AnalyticsPanel'
import PhonePreview from '../components/PhonePreview'

function AdminPage({
  profile,
  onProfileChange,
  links,
  clicks,
  onAddLink,
  onUpdateLink,
  onDeleteLink,
  onMoveLink,
  onResetClicks,
}) {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-center text-3xl font-bold text-gray-900">
        Link in Bio
      </h1>

      <div className="mt-4 flex justify-center">
        {profile.username ? (
          <Link
            to={`/u/${profile.username}`}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow ring-1 ring-gray-200 hover:bg-gray-100"
          >
            View public page →
          </Link>
        ) : (
          <p className="text-sm text-gray-500">
            Set a username to get a public page.
          </p>
        )}
      </div>

      <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-8 lg:flex-row lg:items-start">
        <div className="w-full space-y-6 lg:flex-1">
          <AdminPanel
            profile={profile}
            onProfileChange={onProfileChange}
            links={links}
            onAddLink={onAddLink}
            onUpdateLink={onUpdateLink}
            onDeleteLink={onDeleteLink}
            onMoveLink={onMoveLink}
          />
          <AnalyticsPanel
            links={links}
            clicks={clicks}
            onReset={onResetClicks}
          />
        </div>
        <div className="flex w-full justify-center lg:flex-1">
          <PhonePreview profile={profile} links={links} />
        </div>
      </div>
    </div>
  )
}

export default AdminPage