'use client'

type PausableGifProps = {
  src: string
  posterSrc: string
  alt: string
  isPlaying: boolean
  className?: string
}

/**
 * Renders a static poster underneath an animated GIF and crossfades the GIF in
 * when `isPlaying`. Both images stay mounted so we never remount on toggle —
 * that's what produced the flash. Uses native <img> because next/image doesn't
 * preserve GIF animation.
 */
export function PausableGif({ src, posterSrc, alt, isPlaying, className }: PausableGifProps) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={posterSrc} alt={alt} className={className} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-300 ${className ?? ''} ${
          isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  )
}
