import { useState, useEffect } from 'react'

const THEME_KEY = 'cleantify-theme'

export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'dark'

        const saved = localStorage.getItem(THEME_KEY)
        if (saved) return saved

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    })

    useEffect(() => {
        const root = document.documentElement
        root.setAttribute('data-theme', theme)
        localStorage.setItem(THEME_KEY, theme)
    }, [theme])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e) => {
            const saved = localStorage.getItem(THEME_KEY)
            if (!saved) {
                setTheme(e.matches ? 'dark' : 'light')
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }

    return { theme, toggleTheme, setTheme }
}

export default useTheme
