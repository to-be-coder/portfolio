'use client'

type PausableGifProps = {
  src: string
  posterSrc: string
  alt: string
  isPlaying: boolean
  className?: string
}

/**
 * Swaps between a static poster (frame 0 of the GIF, extracted at build time) and
 * the live GIF. Both render as <img>, so there's no canvas/hydration timing concern.
 * `key` forces a fresh mount when toggling, so the GIF restarts from frame 0.
 */
export function PausableGif({ src, posterSrc, alt, isPlaying, className }: PausableGifProps) {
  return (
    <img
      key={isPlaying ? 'play' : 'pause'}
      src={isPlaying ? src : posterSrc}
      alt={alt}
      className={className}
    />
  )
}
