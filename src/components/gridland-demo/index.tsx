'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const GridlandMultiSelectApp = dynamic(() => import('./gridland-multiselect-app'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#0D0B10] text-pink-300 text-sm">Booting gridland canvas…</div>
  ),
})

export function GridlandMultiSelectDemo() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el || shouldMount) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldMount(true)
            observer.disconnect()
            return
          }
        }
      },
      { rootMargin: '0px', threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shouldMount])

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden rounded-xl border border-pink-200 bg-[#0D0B10]" style={{ height: 380 }}>
      {shouldMount ? (
        <GridlandMultiSelectApp />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-pink-300 text-sm">Scroll to load demo</div>
      )}
    </div>
  )
}
