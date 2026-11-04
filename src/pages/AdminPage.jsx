import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AdminPanel from '../components/AdminPanel'
import AnalyticsPanel from '../components/AnalyticsPanel'
import PhonePreview from '../components/PhonePreview'
import useAdminData from '../hooks/useAdminData'

function AdminPage() {
  const navigate = useNavigate()
  const data = useAdminData()

  // Profile edits are kept here until you press Save. The preview shows them live.
  const [draftChanges, setDraftChanges] = useState({})
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  if (data.needsLogin) {
    return <Navigate to="/auth?mode=login" replace />
  }

  if (data.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading your page…</p>
      </div>
    )
  }

  if (!data.profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gray-100 p-6 text-center">
        <p role="alert" className="max-w-md text-red-700">
          {data.loadError?.message || 'Something went wrong while loading your page.'}
        </p>
        <button
          type="button"
          onClick={data.retry}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
        >
          Try again
        </button>
      </div>
    )
  }

  const draft = { ...data.profile, ...draftChanges }
  const hasChanges = Object.keys(draftChanges).length > 0

  const handleDraftChange = (field, value) => {
    setDraftChanges((current) => ({ ...current, [field]: value }))
  }

  const handleSaveProfile = async () => {
    await data.saveProfile(draftChanges) // throws if the server says no
    setDraftChanges({})
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const loggedOut = await data.logout()

    if (loggedOut) navigate('/')
    else setIsLoggingOut(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-gray-900">Link in Bio</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            Signed in as <strong>{data.profile.username}</strong>
          </span>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-60"
          >
            {isLoggingOut ? 'Logging out…' : 'Log out'}
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Link
          to={`/u/${data.profile.username}`}
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow ring-1 ring-gray-200 hover:bg-gray-100"
          target="_blank"
        >
          View public page →
        </Link>
      </div>

      {data.actionError && (
        <p
          role="alert"
          className="mx-auto mt-4 max-w-5xl rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700"
        >
          {data.actionError}
        </p>
      )}

      <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-8 lg:flex-row lg:items-start">
        <div className="w-full space-y-6 lg:flex-1">
          <AdminPanel
            profile={draft}
            hasChanges={hasChanges}
            onProfileChange={handleDraftChange}
            onSaveProfile={handleSaveProfile}
            links={data.links}
            onAddLink={data.addLink}
            onUpdateLink={data.updateLink}
            onDeleteLink={data.deleteLink}
            onMoveLink={data.moveLink}
          />
          <AnalyticsPanel
            analytics={data.analytics}
            onReset={data.resetClicks}
            onRefresh={data.refreshAnalytics}
          />
        </div>
        <div className="flex w-full justify-center lg:flex-1">
          <PhonePreview profile={draft} links={data.links} />
        </div>
      </div>
    </div>
  )
}

export default AdminPage
