import AdminPanel from './components/AdminPanel'
import PhonePreview from './components/PhonePreview'
import useLocalStorage from './hooks/useLocalStorage'
import { defaultProfile, defaultLinks } from './utils/defaultData'

function App() {
  const [profile, setProfile] = useLocalStorage('linkinbio-profile', defaultProfile)
  const [links, setLinks] = useLocalStorage('linkinbio-links', defaultLinks)

  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value })
  }

  const handleAddLink = ({ title, url }) => {
    setLinks([...links, { id: Date.now(), title, url }])
  }

  const handleUpdateLink = (id, changes) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, ...changes } : link)))
  }

  const handleDeleteLink = (id) => {
    setLinks(links.filter((link) => link.id !== id))
  }

  // direction is -1 (up) or 1 (down)
  const handleMoveLink = (index, direction) => {
    const target = index + direction
    if (target < 0 || target >= links.length) return
    const copy = [...links]
    ;[copy[index], copy[target]] = [copy[target], copy[index]]
    setLinks(copy)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-center text-3xl font-bold text-gray-900">
        Link in Bio
      </h1>

      <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-8 lg:flex-row lg:items-start">
        <div className="w-full lg:flex-1">
          <AdminPanel
            profile={profile}
            onProfileChange={handleProfileChange}
            links={links}
            onAddLink={handleAddLink}
            onUpdateLink={handleUpdateLink}
            onDeleteLink={handleDeleteLink}
            onMoveLink={handleMoveLink}
          />
        </div>
        <div className="flex w-full justify-center lg:flex-1">
          <PhonePreview profile={profile} links={links} />
        </div>
      </div>
    </div>
  )
}

export default App