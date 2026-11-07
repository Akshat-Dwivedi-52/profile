'use client'

import { Sun, Moon } from 'lucide-react'

// Icons are swapped purely by CSS on [data-theme], so the server and client markup always match.
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'

    // Briefly enable colour transitions everywhere so the whole page fades between themes.
    root.classList.add('theme-transition')
    root.setAttribute('data-theme', next)
    window.setTimeout(() => root.classList.remove('theme-transition'), 450)

    try {
      localStorage.setItem('theme', next)
    } catch {}
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle light and dark theme">
      <Sun className="icon-sun" size={16} strokeWidth={1.75} />
      <Moon className="icon-moon" size={16} strokeWidth={1.75} />
    </button>
  )
}
