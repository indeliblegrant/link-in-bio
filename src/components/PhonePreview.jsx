import LinkButton from './LinkButton'

const editClasses =
  'h-[640px] w-full max-w-xs overflow-y-auto rounded-[2.5rem] border-8 border-gray-900 bg-gradient-to-b from-indigo-50 to-white px-6 py-10 shadow-xl'

const publicClasses =
  'min-h-screen w-full overflow-y-auto bg-gradient-to-b from-indigo-50 to-white px-6 pb-24 pt-10 sm:h-[640px] sm:min-h-0 sm:max-w-xs sm:rounded-[2.5rem] sm:border-8 sm:border-gray-900 sm:pb-10 sm:shadow-xl'

function PhonePreview({ profile, links, isPublic = false, onLinkClick }) {
  return (
    <div className={isPublic ? publicClasses : editClasses}>
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
          <LinkButton
            key={link.id}
            title={link.title}
            url={link.url}
            onClick={onLinkClick ? () => onLinkClick(link.id) : undefined}
          />
        ))}
      </div>
    </div>
  )
}

export default PhonePreview