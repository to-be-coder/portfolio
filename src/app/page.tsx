import CtaSection from '@/components/ui/cta'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div className="container max-w-7xl mx-auto px-8 h-[70vh] flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Hi I&apos;m Jessica,
            <br />
            a Design Engineer
            <br />
            who values <span className="text-secondary">simple + human-centered</span>
            <br />
            designs that create lasting connections.
          </h1>
        </div>

        {/* <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-[#C1C1C1] px-4 py-1 text-sm text-black">UI Design</span>
            <span className="rounded-full border border-[#C1C1C1] px-4 py-1 text-sm text-black">UX Research</span>
            <span className="rounded-full border border-[#C1C1C1] px-4 py-1 text-sm text-black">Prototyping</span>
            <span className="rounded-full border border-[#C1C1C1] px-4 py-1 text-sm text-black">Frontend Development</span>
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 flex justify-end">
            <Link href="/#projects" className="group flex items-center gap-1 text-base text-gray-900 hover:text-gray-700">
              Check Out Projects <ArrowDown className="text-[#ff9c6a] w-4 h-4 stroke-3 transition-transform group-hover:translate-y-1" />
            </Link>
          </div>
        </div> */}
      </div>

      {/* Projects Section */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16 mb-8 lg:mb-16 space-y-4 md:space-y-8" id="projects">
        {/* Project Vision Track */}
        <div className="group relative overflow-hidden rounded-3xl bg-gray-100/80 backdrop-blur-sm p-0 h-[500px] border border-white/20">
          <a href="/vision-track" className="w-full h-full md:flex md:flex-col flex-space-between">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-8 h-full">
              <div className="space-y-4 lg:w-1/3 p-8 lg:self-start">
                <h3 className="text-2xl font-bold">Vision Track →</h3>
                <p className="text-lg">Competitive analysis and user interviews for B2B SaaS startup</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">UX Research</span>
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">B2B</span>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 lg:w-2/3 h-full lg:self-end flex items-end justify-end">
                <div className="relative h-[300px] lg:h-[500px] w-full flex items-end justify-end">
                  <Image
                    src="/test-2.jpeg"
                    alt="Vision Track Project"
                    className="object-contain object-right-bottom"
                    width={700}
                    height={600}
                    style={{
                      maxHeight: '100%',
                      width: 'auto',
                      maxWidth: '100%',
                      [typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'transform' : '']: 'scale(1.4)',
                    }}
                  />
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Mozilla */}

        <div className="group relative overflow-hidden rounded-3xl bg-gray-100/80 backdrop-blur-sm p-8 h-[500px] border border-white/20">
          <a href="/vision-track" className="w-full h-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8 h-full">
              <div className="flex items-center justify-center mt-4 order-last lg:order-first lg:mt-0 lg:w-2/3 relative h-[300px] lg:h-auto">
                <div className="relative w-full h-full">
                  <Image
                    src="/tes.jpeg"
                    alt="Vision Track Project"
                    className="rounded-lg object-contain lg:object-contain w-full h-full"
                    {...(typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024 ? { fill: true } : { width: 500, height: 300 })}
                  />
                </div>
              </div>
              <div className="space-y-4 order-first lg:order-last lg:w-1/3 lg:self-start">
                <h3 className="text-2xl font-bold">Vision Track →</h3>
                <p className="text-lg">Competitive analysis and user interviews for B2B SaaS startup</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">UX Research</span>
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">B2B</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="group relative overflow-hidden rounded-3xl bg-gray-100/80 backdrop-blur-sm p-8 h-[500px] border border-white/20">
          <a href="/lilypad" className="w-full h-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8 h-full">
              <div className="space-y-4 lg:w-1/3 lg:self-start">
                <h3 className="text-2xl font-bold">Lilypad →</h3>
                <p className="text-lg">Design and development mobile-first landing page for AI ed-tech startup</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">UI Design</span>
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">Landing Page</span>
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">Responsive Design</span>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4 lg:mt-0 lg:w-2/3 relative h-[300px] lg:h-auto">
                <div className="relative w-full h-full">
                  <Image
                    src="/lilypad-cover.png"
                    alt="Lilypad Project"
                    className="rounded-lg object-contain lg:object-contain w-full h-full"
                    {...(typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024 ? { fill: true } : { width: 500, height: 300 })}
                  />
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="group relative overflow-hidden rounded-3xl bg-gray-100/80 backdrop-blur-sm p-8 h-[500px] border border-white/20">
          <a href="/hobby" className="w-full h-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between h-full">
              <div className="space-y-4 lg:w-1/3 lg:self-start">
                <h3 className="text-2xl font-bold">Other Fun Works →</h3>
                <p className="text-lg">A collection of my photography and camping adventures</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">Photography</span>
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">Camping</span>
                </div>
              </div>
              <div className="flex items-center justify-center mt-8 lg:mt-0 lg:w-2/3">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <Image src="/hobby-14.jpeg" alt="Hobby 14" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
                  <Image src="/hobby-3.jpeg" alt="Hobby 15" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
                  <Image src="/hobby-16.jpeg" alt="Hobby 16" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
                  <Image src="/hobby-17.jpeg" alt="Hobby 17" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
                  <Image src="/hobby-20.jpeg" alt="Hobby 20" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
                  <Image src="/hobby-19.jpeg" alt="Hobby 19" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Mislanious Section*/}
        {/* <div className="space-y-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-3xl bg-gray-200 p-8 h-[500px]">
              <h4 className="text-xl font-semibold text-gray-600">Fractional (Coming Soon)</h4>
            </div>
            <div className="rounded-3xl bg-gray-200 p-8 h-[500px]">
              <h4 className="text-xl font-semibold text-gray-600">To Do List w/ AI (Coming Soon)</h4>
            </div>
          </div>
        </div> */}
      </div>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
