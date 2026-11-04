import { useEffect, useRef, useState } from 'react'
import { api } from '../utils/api'

// Loads everything the admin page shows from the backend and gives back
// the functions that change it. Nothing is stored in the browser.
function useAdminData() {
  const [profile, setProfile] = useState(null)
  const [links, setLinks] = useState([])
  const [analytics, setAnalytics] = useState({ links: [], total: 0 })

  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null) // the server could not be reached
  const [needsLogin, setNeedsLogin] = useState(false) // no valid login cookie
  const [actionError, setActionError] = useState('') // a delete, move or reset failed
  const [reloadKey, setReloadKey] = useState(0)

  const isBusy = useRef(false)

  // Runs when the page opens, and again whenever retry() is used
  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [me, linkData, analyticsData] = await Promise.all([
          api('/api/me'),
          api('/api/links'),
          api('/api/analytics'),
        ])
        if (cancelled) return

        setProfile(me.profile)
        setLinks(linkData.links)
        setAnalytics(analyticsData)
      } catch (error) {
        if (cancelled) return

        if (error.status === 401) setNeedsLogin(true)
        else setLoadError(error)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [reloadKey])

  // Like api(), but notices when the login has expired
  async function call(path, options) {
    try {
      return await api(path, options)
    } catch (error) {
      if (error.status === 401) setNeedsLogin(true)
      throw error
    }
  }

  // Runs one delete/move/reset at a time, and shows its error in the page banner
  async function runAction(action) {
    if (isBusy.current) return
    isBusy.current = true
    setActionError('')

    try {
      await action()
    } catch (error) {
      if (error.status !== 401) setActionError(error.message)
    } finally {
      isBusy.current = false
    }
  }

  async function fetchAnalytics() {
    setAnalytics(await call('/api/analytics'))
  }

  // These three throw on failure, so the form that called them can show the error
  const saveProfile = async (changes) => {
    const data = await call('/api/profile', { method: 'PUT', body: changes })
    setProfile(data.profile)
  }

  const addLink = async ({ title, url }) => {
    const data = await call('/api/links', { method: 'POST', body: { title, url } })
    setLinks((current) => [...current, data.link])
    await fetchAnalytics().catch(() => {})
  }

  const updateLink = async (id, changes) => {
    const data = await call(`/api/links/${id}`, { method: 'PUT', body: changes })
    setLinks((current) => current.map((link) => (link.id === id ? data.link : link)))
    await fetchAnalytics().catch(() => {})
  }

  // These show their errors in the page banner instead
  const deleteLink = (id) =>
    runAction(async () => {
      await call(`/api/links/${id}`, { method: 'DELETE' })
      setLinks((current) => current.filter((link) => link.id !== id))
      await fetchAnalytics()
    })

  // direction is -1 (up) or 1 (down)
  const moveLink = (index, direction) => {
    const target = index + direction
    if (target < 0 || target >= links.length) return Promise.resolve()

    const ids = links.map((link) => link.id)
    ;[ids[index], ids[target]] = [ids[target], ids[index]]

    return runAction(async () => {
      const data = await call('/api/links/reorder', { method: 'POST', body: { ids } })
      setLinks(data.links)
      await fetchAnalytics()
    })
  }

  const resetClicks = () =>
    runAction(async () => {
      await call('/api/analytics', { method: 'DELETE' })
      await fetchAnalytics()
    })

  const refreshAnalytics = () => runAction(fetchAnalytics)

  // Returns true when the login was ended
  const logout = async () => {
    setActionError('')
    try {
      await api('/api/logout', { method: 'POST' })
      return true
    } catch (error) {
      setActionError(error.message)
      return false
    }
  }

  const retry = () => {
    setLoadError(null)
    setIsLoading(true)
    setReloadKey((key) => key + 1)
  }

  return {
    profile,
    links,
    analytics,
    isLoading,
    loadError,
    needsLogin,
    actionError,
    retry,
    saveProfile,
    addLink,
    updateLink,
    deleteLink,
    moveLink,
    resetClicks,
    refreshAnalytics,
    logout,
  }
}

export default useAdminData
