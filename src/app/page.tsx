'use client'
import HomeHeroSection from '@/components/home-hero-section'
import { Badge } from '@/components/ui/badge'
import CtaSection from '@/components/ui/cta'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const mozillaRef = useRef<HTMLDivElement>(null)
  const visionTrackRef = useRef<HTMLDivElement>(null)
  const lilypadRef = useRef<HTMLDivElement>(null)
  const hobbyRef = useRef<HTMLDivElement>(null)

  const [activeSection, setActiveSection] = useState<string | null>(null)

  // Set up scroll detection
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      // Get all sections
      const sections = [
        { id: 'mozilla', ref: mozillaRef.current },
        { id: 'visionTrack', ref: visionTrackRef.current },
        { id: 'lilypad', ref: lilypadRef.current },
        { id: 'hobby', ref: hobbyRef.current },
      ]

      // Find the section that is most visible
      let active = null

      for (const section of sections) {
        if (!section.ref) continue

        const rect = section.ref.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionBottom = sectionTop + rect.height

        // If the middle of the viewport is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          active = section.id
          break
        }
      }

      setActiveSection(active)
    }

    // Initial check
    handleScroll()

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <HomeHeroSection />

      {/* Projects Section */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-10 mb-8 lg:mb-16 space-y-4 md:space-y-8" id="projects">
        {/* Mozilla */}
        <div
          ref={mozillaRef}
          className={`group relative overflow-hidden rounded-3xl backdrop-blur-sm p-8 min-h-[500px] transition-all duration-300 hover:scale-[1.02] 
            ${activeSection === 'mozilla' ? 'bg-green-50' : 'bg-gray-100/80 '}`}
        >
          <a href="/mozilla" className="w-full h-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8 h-full">
              <div className="flex items-center justify-center mt-4 lg:mt-0 lg:w-2/3 relative h-[300px] lg:h-[400px]">
                <div className="relative w-full h-full">
                  <Image
                    src="/mozilla-cover.png"
                    alt="Mozilla Project"
                    className="rounded-lg object-contain lg:object-contain w-full h-full"
                    {...(typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024 ? { fill: true } : { width: 500, height: 300 })}
                  />
                </div>
              </div>
              <div className="space-y-4 order-first lg:order-last lg:w-1/3 lg:self-start ">
                <h3 className="text-4xl font-bold">
                  <span className={activeSection === 'mozilla' ? 'bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent' : ''}>Mozilla</span>
                </h3>
                <p className="text-lg">Designed a privacy-first AI assistant from the ground-up.</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${activeSection === 'mozilla' ? 'bg-green-200' : 'bg-gray-200'} `}>AI Design</Badge>
                  <Badge className={`${activeSection === 'mozilla' ? 'bg-green-200' : 'bg-gray-200'} `}>App Design</Badge>
                  <Badge className={`${activeSection === 'mozilla' ? 'bg-green-200' : 'bg-gray-200'} `}>Prototyping</Badge>
                  <Badge className={`${activeSection === 'mozilla' ? 'bg-green-200' : 'bg-gray-200'} `}>Transparency and Trust</Badge>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Project Vision Track */}
        <div
          ref={visionTrackRef}
          className={`group relative overflow-hidden rounded-3xl backdrop-blur-sm pl-8 pt-8 md:pt-10 h-[500px] transition-all duration-300 hover:scale-[1.02] 
            ${activeSection === 'visionTrack' ? 'bg-blue-50' : 'bg-gray-100/80'}`}
        >
          <a href="/vision-track" className="w-full h-full md:flex md:flex-col flex-space-between">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-8 h-full">
              <div className="space-y-4 lg:w-1/3 lg:self-start">
                <h3 className="text-4xl font-bold">
                  <span className={activeSection === 'visionTrack' ? 'bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent' : ''}>Vision Track</span>
                </h3>
                <p className="text-lg">Competitive analysis and user interviews for a B2B SaaS startup</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${activeSection === 'visionTrack' ? 'bg-blue-200' : 'bg-gray-200'} `}>UX Research</Badge>
                  <Badge className={`${activeSection === 'visionTrack' ? 'bg-blue-200' : 'bg-gray-200'} `}>Competitive Analysis</Badge>
                  <Badge className={`${activeSection === 'visionTrack' ? 'bg-blue-200' : 'bg-gray-200'} `}>User Interviews</Badge>
                  <Badge className={`${activeSection === 'visionTrack' ? 'bg-blue-200' : 'bg-gray-200'} `}>User Personas</Badge>
                  <Badge className={`${activeSection === 'visionTrack' ? 'bg-blue-200' : 'bg-gray-200'} `}>B2B</Badge>
                  <Badge className={`${activeSection === 'visionTrack' ? 'bg-blue-200' : 'bg-gray-200'} `}>SaaS</Badge>
                </div>
              </div>
              <div className="mt-0 lg:w-2/3 h-full flex items-end justify-end absolute bottom-0 right-0 lg:relative">
                <div className="relative h-[300px] lg:h-[400px] w-full flex items-end justify-end">
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
                    }}
                  />
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Lilypad */}
        <div
          ref={lilypadRef}
          className={`group relative overflow-hidden rounded-3xl backdrop-blur-sm p-8 h-[500px] transition-all duration-300 hover:scale-[1.02] 
            ${activeSection === 'lilypad' ? 'bg-[#fff4ea]' : 'bg-gray-100/80'}`}
        >
          <a href="/lilypad" className="w-full h-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8 h-full">
              <div className="flex items-center justify-center mt-0 lg:mt-0 lg:w-2/3 relative h-[300px] lg:h-auto">
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
                <h3 className="text-4xl font-bold">
                  <span className={activeSection === 'lilypad' ? 'bg-gradient-to-r from-[#ff9f56] to-[#ff5003] bg-clip-text text-transparent' : ''}>Lilypad</span>
                </h3>
                <p className="text-lg">Designed and developed a mobile-first landing page for an AI ed-tech startup</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${activeSection === 'lilypad' ? 'bg-orange-200' : 'bg-gray-200'} `}>UI Design</Badge>
                  <Badge className={`${activeSection === 'lilypad' ? 'bg-orange-200' : 'bg-gray-200'} `}>Landing Page</Badge>
                  <Badge className={`${activeSection === 'lilypad' ? 'bg-orange-200' : 'bg-gray-200'} `}>Responsive Design</Badge>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Other Fun Works */}
        <div
          ref={hobbyRef}
          className={`group relative overflow-hidden rounded-3xl backdrop-blur-sm p-8 h-[500px] transition-all duration-300 hover:scale-[1.02] 
            ${activeSection === 'hobby' ? 'bg-rose-50' : 'bg-gray-100/80'}`}
        >
          <a href="/hobby" className="w-full h-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between h-full">
              <div className="space-y-4 lg:w-1/3 lg:self-start">
                <h3 className="text-4xl font-bold ">
                  <span className={activeSection === 'hobby' ? 'bg-gradient-to-r from-rose-400 to-rose-500 bg-clip-text text-transparent' : ''}>Outside of Work</span>
                </h3>
                <p className="text-lg">Camping and photography</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${activeSection === 'hobby' ? 'bg-rose-200' : 'bg-gray-200'} `}>Photography</Badge>
                  <Badge className={`${activeSection === 'hobby' ? 'bg-rose-200' : 'bg-gray-200'} `}>Camping</Badge>
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

        {/* Miscellaneous Section*/}
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
