const inputClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200'

function ProfileForm({ profile, onChange }) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        Profile
      </h3>

      <div>
        <label htmlFor="displayName" className="mb-1 block text-sm font-medium text-gray-700">
          Display name
        </label>
        <input
          id="displayName"
          type="text"
          placeholder="Your name"
          value={profile.name}
          onChange={(e) => onChange('name', e.target.value)}
          className={inputClass}
        />
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
          onChange={(e) => onChange('bio', e.target.value)}
          className={inputClass}
        />
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
          onChange={(e) => onChange('avatar', e.target.value)}
          className={inputClass}
        />
      </div>
    </section>
  )
}

export default ProfileForm