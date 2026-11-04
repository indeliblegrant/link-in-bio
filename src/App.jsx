import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import AdminPage from './pages/AdminPage'
import PublicPage from './pages/PublicPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/u/:username" element={<PublicPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
