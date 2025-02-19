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
            <br />
            (Coming Soon...)
          </h1>
        </div>
      </div>

      {/* Masonry Grid Section */}
      <div className="container mx-auto px-8 lg:px-32 mb-16">
        <div className="grid grid-cols-3 gap-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            {[...Array(7)].map((_, i) => (
              <Image key={i} src={`/hobby-${i + 1}.jpeg`} alt={`Hobby Image ${i + 1}`} className="rounded-2xl min-h-[400px]" width={300} height={400} layout="responsive" />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 mt-32">
            {[...Array(7)].map((_, i) => (
              <Image key={i} src={`/hobby-${i + 8}.jpeg`} alt={`Hobby Image ${i + 8}`} className="rounded-2xl min-h-[400px]" width={300} height={400} layout="responsive" />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            {[...Array(6)].map((_, i) => (
              <Image key={i} src={`/hobby-${i + 15}.jpeg`} alt={`Hobby Image ${i + 15}`} className="rounded-2xl min-h-[400px]" width={300} height={400} layout="responsive" />
            ))}
          </div>
        </div>
      </div>

      <CtaSection />
    </main>
  )
}
