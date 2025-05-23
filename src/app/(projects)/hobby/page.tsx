import CtaSection from '@/components/ui/cta'
import Image from 'next/image'

export default function Hobby() {
  return (
    <main>
      {/* Hero Section */}
      <div className="container mx-auto px-8 lg:px-32 min-h-[calc(60vh)] flex flex-col justify-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            When I am not working...
            <br />I am a self-taught <span className="text-[#FFA149]">photographer</span> <br /> who loves <span className="text-[#FFA149]">camping</span> with my{' '}
            <span className="text-[#FFA149]">dog</span>.
          </h1>
        </div>
      </div>

      {/* Masonry Grid Section */}
      <div className="container mx-auto px-8 lg:px-32 mb-16">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {/* Images */}
          {[...Array(40)].map((_, i) => (
            <div key={i} className="break-inside-avoid">
              <Image src={`/hobby-${i + 1}.jpeg`} alt={`Hobby Image ${i + 1}`} className="rounded-md w-full h-auto object-cover" width={600} height={600} />
            </div>
          ))}
        </div>
      </div>

      <CtaSection />
    </main>
  )
}
