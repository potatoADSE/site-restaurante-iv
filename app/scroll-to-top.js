'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()
  const previousPathname = useRef(pathname)
  const historyPathname = useRef(null)

  useEffect(() => {
    const handlePopState = () => {
      historyPathname.current = window.location.pathname
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname

    const restoredPathname = historyPathname.current
    historyPathname.current = null
    if (restoredPathname === window.location.pathname || window.location.hash) return

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}