import LinkButton from './LinkButton'

function PhonePreview({ profile, links }) {
  return (
    <div className="h-[640px] w-full max-w-xs overflow-y-auto rounded-[2.5rem] border-8 border-gray-900 bg-gradient-to-b from-indigo-50 to-white px-6 py-10 shadow-xl">
      <div className="flex flex-col items-center text-center">
        {profile.avatar ? (
          <img
            src={profile.avatar}
            alt={`${profile.name || 'Profile'} avatar`}
            className="h-24 w-24 rounded-full object-cover shadow"
          />
        ) : (
          <div className="h-24 w-24 rounded-full bg-gray-300" />
        )}
        <h2 className="mt-4 text-xl font-bold text-gray-900">
          {profile.name || 'Your name'}
        </h2>
        {profile.bio && (
          <p className="mt-1 text-sm text-gray-600">{profile.bio}</p>
        )}
      </div>

      <div className="mt-8 space-y-3">
        {links.map((link) => (
          <LinkButton key={link.id} title={link.title} url={link.url} />
        ))}
      </div>
    </div>
  )
}

export default PhonePreview