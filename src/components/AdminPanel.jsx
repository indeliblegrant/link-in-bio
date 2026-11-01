import ProfileForm from './ProfileForm'
import LinkForm from './LinkForm'
import LinkList from './LinkList'

function AdminPanel({
  profile,
  onProfileChange,
  links,
  onAddLink,
  onUpdateLink,
  onDeleteLink,
  onMoveLink,
}) {
  return (
    <div className="space-y-6 rounded-2xl bg-white p-6 shadow">
      <h2 className="text-xl font-semibold text-gray-900">Editor</h2>

      <ProfileForm profile={profile} onChange={onProfileChange} />

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Add a link
        </h3>
        <LinkForm submitLabel="Add" onSubmit={onAddLink} />
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Your links
        </h3>
        <LinkList
          links={links}
          onUpdate={onUpdateLink}
          onDelete={onDeleteLink}
          onMove={onMoveLink}
        />
      </section>
    </div>
  )
}

export default AdminPanel