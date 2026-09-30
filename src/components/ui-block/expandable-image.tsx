'use client'

import { cn } from '@/lib/utils'
import { Maximize2, X } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

interface ExpandableImageProps {
  src: string
  posterSrc?: string
  alt: string
  width: number
  height: number
  className?: string
  triggerClassName?: string
  imagePosition?: string
  priority?: boolean
  sizes?: string
  unoptimized?: boolean
}

export default function ExpandableImage({
  src,
  posterSrc,
  alt,
  width,
  height,
  className,
  triggerClassName,
  imagePosition = 'center',
  priority = false,
  sizes,
  unoptimized = false,
}: ExpandableImageProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openDialog = () => dialogRef.current?.showModal()
  const closeDialog = () => dialogRef.current?.close()

  const renderImage = (expanded = false) => {
    const renderedClassName = expanded
      ? 'max-h-[calc(100dvh-4rem)] max-w-[calc(100vw-4rem)] h-auto w-auto object-contain'
      : className
    const renderedSizes = expanded ? '100vw' : sizes

    if (posterSrc) {
      return (
        <>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`${renderedClassName ?? ''} motion-reduce:hidden`}
            style={expanded ? undefined : { objectPosition: imagePosition }}
            priority={priority}
            sizes={renderedSizes}
            unoptimized
          />
          <Image
            src={posterSrc}
            alt={alt}
            width={width}
            height={height}
            className={`hidden ${renderedClassName ?? ''} motion-reduce:block`}
            style={expanded ? undefined : { objectPosition: imagePosition }}
            priority={priority}
            sizes={renderedSizes}
            unoptimized
          />
        </>
      )
    }

    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={renderedClassName}
        style={expanded ? undefined : { objectPosition: imagePosition }}
        priority={priority}
        sizes={renderedSizes}
        unoptimized={expanded || unoptimized}
      />
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        aria-label={`Expand image: ${alt}`}
        className={cn(
          'group relative block w-full overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
          triggerClassName
        )}
      >
        {renderImage()}
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100" aria-hidden>
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`Expanded image: ${alt}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog()
        }}
        className="m-auto h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-h-none max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-black/80"
      >
        <div className="relative flex h-full w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
          {renderImage(true)}
          <button
            type="button"
            onClick={closeDialog}
            aria-label="Close expanded image"
            autoFocus
            className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:right-4 md:top-4"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </dialog>
    </>
  )
}
