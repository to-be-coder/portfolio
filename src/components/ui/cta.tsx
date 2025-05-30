import Image from 'next/image'
import { Button } from './button'

const topRowImages = [
  { src: '/contact-1.png', alt: 'Contact 1' },
  { src: '/contact-2.png', alt: 'Contact 2' },
  { src: '/contact-3.png', alt: 'Contact 3' },
  { src: '/contact-4.png', alt: 'Contact 4' },
  { src: '/contact-5.png', alt: 'Contact 5' },
]

const bottomRowImages = [
  { src: '/contact-6.png', alt: 'Contact 6' },
  { src: '/contact-7.png', alt: 'Contact 7' },
  { src: '/contact-8.png', alt: 'Contact 8' },
  { src: '/contact-9.png', alt: 'Contact 9' },
]

export default function CtaSection() {
  return (
    <div className="bg-[#181C19] relative overflow-hidden py-16">
      {/* Background with gradient opacity mask */}
      <div className="absolute inset-0">
        {/* Gradient overlay - darker center with same edge opacity */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#181C19]/90  via-[#181C19]  to-[#181C19]/90 z-10"></div>

        {/* Top row */}
        <div className="absolute top-0 left-0 right-0 h-1/2 flex gap-4 p-4">
          {topRowImages.map((image, index) => (
            <div
              key={index}
              className={`relative flex-1 min-w-0 ${
                // Show only 2 photos on small screens, 3 on medium, all 5 on large
                index >= 2 ? 'hidden md:block' : index >= 3 ? 'hidden lg:block' : ''
              }`}
            >
              <Image src={image.src} alt={image.alt} fill className="object-cover rounded-lg" />
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 flex gap-4 p-4">
          {bottomRowImages.map((image, index) => (
            <div
              key={index}
              className={`relative flex-1 min-w-0 ${
                // Hide last image on medium screens
                index >= 2 ? 'hidden md:block' : index >= 3 ? 'hidden lg:block' : ''
              }`}
            >
              <Image src={image.src} alt={image.alt} fill className="object-cover rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Content section with higher z-index */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <section className="py-8 md:py-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Let&apos;s make something users will love!</h2>
          <p className="text-[#ffffff] mb-8">If you&apos;re looking for a product designer who can bridge the gap between design and code, I&apos;m here to help!</p>
          <Button variant="secondary" asChild>
            <a href={'/contact'}>Contact Me</a>
          </Button>
        </section>
      </div>
    </div>
  )
}
