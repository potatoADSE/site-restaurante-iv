'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function ScrollToTop() {
  const { bfcacheId } = useRouter()
  const previousBfcacheId = useRef(bfcacheId)

  useEffect(() => {
    if (previousBfcacheId.current === bfcacheId) return
    previousBfcacheId.current = bfcacheId

    if (window.location.hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [bfcacheId])

  return null
}