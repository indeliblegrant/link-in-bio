import { useState } from 'react'

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch (error) {
      console.error(`Could not read "${key}" from localStorage`, error)
      return initialValue
    }
  })

  const setStoredValue = (newValue) => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue
      setValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Could not save "${key}" to localStorage`, error)
    }
  }

  return [value, setStoredValue]
}

export default useLocalStorage