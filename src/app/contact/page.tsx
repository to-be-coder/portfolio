import { Marquee } from '@/components/magicui/marquee'
import { Button } from '@/components/ui/button'
import CtaSection from '@/components/ui/cta'
import Image from 'next/image'

export default function DemoPage() {
  // Create arrays of image objects for each row
  const firstRow = [
    { src: '/contact-1.png', alt: 'Contact 1' },
    { src: '/contact-2.png', alt: 'Contact 2' },
    { src: '/contact-3.png', alt: 'Contact 3' },
    { src: '/contact-4.png', alt: 'Contact 4' },
    { src: '/contact-5.png', alt: 'Contact 5' },
    { src: '/contact-6.png', alt: 'Contact 6' },
    { src: '/contact-7.png', alt: 'Contact 7' },
    { src: '/contact-8.png', alt: 'Contact 8' },
    { src: '/contact-9.png', alt: 'Contact 9' },
  ]

  return (
    <main>
      <div className="container max-w-7xl mx-auto px-8 h-[63vh] flex flex-col">
        <div className="mx-auto flex flex-col gap-8 h-full justify-center items-center">
          <div className="flex flex-col gap-8 justify-center items-center">
            <h1 className=" text-4xl lg:text-5xl font-normal text-center">Let&rsquo;s create thoughtful experiences.</h1>
            <div>
              <Button className="flex items-center gap-2 group" variant="contact">
                <a href="mailto:jess@jessicacheng.studio" className="text-secondary group-hover:text-[#00D3CF] text-3xl font-semibold">
                  jess@jessicacheng.studio
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mb-4">
        <Marquee className="[--duration:60s]">
          {firstRow.map((image, index) => (
            <div key={index} className="mx-2">
              <Image src={image.src} alt={image.alt} width={500} height={400} className=" w-60 md:w-80  h-40 md:h-55 rounded-lg object-cover" />
            </div>
          ))}
        </Marquee>
      </div>

      <CtaSection />
    </main>
  )
}
