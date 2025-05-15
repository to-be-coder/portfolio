'use client'
import CtaSection from '@/components/ui/cta'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div className="container max-w-7xl mx-auto px-8 h-[50vh] flex">
        <div className="flex-1 flex flex-col justify-center w-full">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight leading-tight text-center">
            Hi, I&apos;m Jessica Cheng,
            <br />a <span className="text-secondary">product designer </span>
            that <span className="text-secondary">codes</span>
          </h1>
        </div>
      </div>

      {/* Projects Section */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-20 mb-8 lg:mb-16 space-y-4 md:space-y-8" id="projects">
        {/* Mozilla */}

        <div className="group relative overflow-hidden rounded-3xl bg-gray-100/80 backdrop-blur-sm p-8 h-[500px] transition-transform duration-300 hover:scale-[1.02] group">
          <a href="/mozilla" className="w-full h-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8 h-full">
              <div className="flex items-center justify-center mt-4 order-last lg:order-first lg:mt-0 lg:w-2/3 relative h-[300px] lg:h-auto">
                <div className="relative w-full h-full ">
                  <Image
                    src="/mozilla-cover.png"
                    alt="Mozilla Project"
                    className="rounded-lg object-contain lg:object-contain w-110 h-auto ml-20"
                    {...(typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024 ? { fill: true } : { width: 500, height: 300 })}
                  />
                </div>
              </div>
              <div className="space-y-4 order-first lg:order-last lg:w-1/3 lg:self-start ">
                <h3 className="text-4xl font-bold group-hover:text-secondary">Mozilla</h3>
                <p className="text-lg">Coming Soon</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">AI Design</span>
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">Web App</span>
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">Prototyping</span>
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">User flow</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Project Vision Track */}
        <div className="group relative overflow-hidden rounded-3xl bg-gray-100/80 pt-8 pl-8 h-[500px] transition-transform duration-300 hover:scale-[1.02] group">
          <a href="/vision-track" className="w-full h-full md:flex md:flex-col flex-space-between">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-8 h-full">
              <div className="space-y-4 lg:w-1/3 p-8 lg:self-start">
                <h3 className="text-4xl font-bold group-hover:text-secondary">Vision Track</h3>
                <p className="text-lg">Competitive analysis and user interviews for B2B SaaS startup</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">UX Research</span>
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">B2B</span>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 lg:w-2/3 h-full lg:self-end flex items-end justify-end">
                <div className="relative h-[300px] lg:h-[500px] w-full flex items-end justify-end">
                  <Image
                    src="/vision-track-cover.png"
                    alt="Vision Track Project"
                    className="object-contain object-right-bottom"
                    width={700}
                    height={600}
                    style={{
                      maxHeight: '100%',
                      width: 'auto',
                      maxWidth: '100%',
                      [typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'transform' : '']: 'scale(1.8)',
                    }}
                  />
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Lilypad */}

        <div className="group relative overflow-hidden rounded-3xl bg-gray-100/80 p-8 h-[500px] transition-transform duration-300 hover:scale-[1.02] group">
          <a href="/lilypad" className="w-full h-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8 h-full">
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
              <div className="space-y-4 lg:w-1/3 lg:self-start order-first lg:order-last">
                <h3 className="text-4xl font-bold group-hover:text-secondary">Lilypad</h3>
                <p className="text-lg">Design and development mobile-first landing page for AI ed-tech startup</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">UI Design</span>
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">Landing Page</span>
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">Responsive Design</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Thoughtful */}

        <div className="group relative overflow-hidden rounded-3xl bg-gray-100/80 backdrop-blur-sm p-8 h-[500px] transition-transform duration-300 hover:scale-[1.02] group">
          <a href="/thoughtful" className="w-full h-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8 h-full">
              <div className="space-y-4 lg:w-1/3 lg:self-start">
                <h3 className="text-4xl font-bold group-hover:text-secondary">Thoughtful</h3>
                <p className="text-lg">Coming Soon</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">UI Design</span>
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">Landing Page</span>
                  <span className="inline-block rounded-sm bg-gray-200 px-4 py-1 text-sm text-black whitespace-nowrap">Responsive Design</span>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4 lg:mt-0 lg:w-2/3 relative h-[300px] lg:h-auto">
                <div className="relative w-full h-full">
                  <Image
                    src="/thoughtful-cover.png"
                    alt="Thoughtful Project"
                    className="rounded-lg object-contain lg:object-contain w-full h-full"
                    {...(typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024 ? { fill: true } : { width: 500, height: 300 })}
                  />
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Other Fun Works */}

        <div className="group relative overflow-hidden rounded-3xl bg-gray-100/80 backdrop-blur-sm p-8 h-[500px] transition-transform duration-300 hover:scale-[1.02] group">
          <a href="/hobby" className="w-full h-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between h-full">
              <div className="space-y-4 lg:w-1/3 lg:self-start">
                <h3 className="text-4xl font-bold group-hover:text-secondary">Outside of Work</h3>
                <p className="text-lg">Camping and photography</p>
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
