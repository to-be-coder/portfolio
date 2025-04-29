import { Marquee } from '@/components/magicui/marquee'
import CtaSection from '@/components/ui/cta'
import { Mail } from 'lucide-react'
import Image from 'next/image'

export default function DemoPage() {
  // Create arrays of image objects for each row
  const firstRow = [
    { src: '/hobby-14.jpeg', alt: 'Hobby 14' },
    { src: '/hobby-3.jpeg', alt: 'Hobby 3' },
    { src: '/hobby-16.jpeg', alt: 'Hobby 16' },
    { src: '/hobby-17.jpeg', alt: 'Hobby 17' },
    { src: '/hobby-20.jpeg', alt: 'Hobby 20' },
    { src: '/hobby-19.jpeg', alt: 'Hobby 19' },
  ]

  const secondRow = [
    { src: '/hobby-14.jpeg', alt: 'Hobby 14' },
    { src: '/hobby-3.jpeg', alt: 'Hobby 3' },
    { src: '/hobby-16.jpeg', alt: 'Hobby 16' },
    { src: '/hobby-17.jpeg', alt: 'Hobby 17' },
    { src: '/hobby-20.jpeg', alt: 'Hobby 20' },
    { src: '/hobby-19.jpeg', alt: 'Hobby 19' },
  ]

  return (
    <main>
      <div className="min-h-svh p-8 container mx-auto flex flex-col gap-8 justify-between">
        <div className="flex flex-1">
          <div className="mx-auto flex flex-col gap-8 justify-center items-center">
            <div className="flex flex-col gap-2 justify-center items-center">
              <h1 className="text-5xl font-normal">Let&apos;s get to know each other.</h1>
              <div>
                <div className="flex items-center gap-2">
                  <Mail className="w-6 h-6" />
                  <a href="mailto:jessica@thoughtful.llc">jessica@thoughtful.llc</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee className="[--duration:60s]">
            {firstRow.map((image, index) => (
              <div key={index} className="mx-2">
                <Image src={image.src} alt={image.alt} width={500} height={300} className="w-80 h-40 rounded-lg object-cover" />
              </div>
            ))}
          </Marquee>
          <Marquee reverse className="[--duration:60s]">
            {secondRow.map((image, index) => (
              <div key={index} className="mx-2">
                <Image src={image.src} alt={image.alt} width={500} height={300} className="w-80 h-40 rounded-lg object-cover" />
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </div>

      <CtaSection />
    </main>
  )
}
