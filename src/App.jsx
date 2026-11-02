import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import AdminPage from './pages/AdminPage'
import PublicPage from './pages/PublicPage'
import NotFoundPage from './pages/NotFoundPage'
import useLocalStorage from './hooks/useLocalStorage'
import { defaultProfile, defaultLinks } from './utils/defaultData'

function App() {
  const [storedProfile, setProfile] = useLocalStorage('linkinbio-profile', defaultProfile)
  const [links, setLinks] = useLocalStorage('linkinbio-links', defaultLinks)
  const [clicks, setClicks] = useLocalStorage('linkinbio-clicks', [])

  // Older saved profiles have no username, so fill gaps from the defaults
  const profile = { ...defaultProfile, ...storedProfile }

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
    setClicks(clicks.filter((click) => click.linkId !== id))
  }

  // direction is -1 (up) or 1 (down)
  const handleMoveLink = (index, direction) => {
    const target = index + direction
    if (target < 0 || target >= links.length) return
    const copy = [...links]
    ;[copy[index], copy[target]] = [copy[target], copy[index]]
    setLinks(copy)
  }

  const handleRecordClick = (linkId) => {
    setClicks([...clicks, { linkId, timestamp: new Date().toISOString() }])
  }

  const handleResetClicks = () => {
    setClicks([])
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/admin"
        element={
          <AdminPage
            profile={profile}
            onProfileChange={handleProfileChange}
            links={links}
            clicks={clicks}
            onAddLink={handleAddLink}
            onUpdateLink={handleUpdateLink}
            onDeleteLink={handleDeleteLink}
            onMoveLink={handleMoveLink}
            onResetClicks={handleResetClicks}
          />
        }
      />
      <Route
        path="/u/:username"
        element={
          <PublicPage
            profile={profile}
            links={links}
            onRecordClick={handleRecordClick}
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
