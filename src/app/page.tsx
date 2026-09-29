'use client'
import CtaSection from '@/components/ui-block/cta'
import HomeHeroSection from '@/components/ui-block/home-hero-section'
import { Badge } from '@/components/ui/badge'
import { PausableGif } from '@/components/ui/pausable-gif'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const peasyRef = useRef<HTMLDivElement>(null)
  const careerbotRef = useRef<HTMLDivElement>(null)
  const thunderboltRef = useRef<HTMLDivElement>(null)
  const gridlandRef = useRef<HTMLDivElement>(null)
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
        { id: 'thunderbolt', ref: thunderboltRef.current },
        { id: 'peasy', ref: peasyRef.current },
        { id: 'careerbot', ref: careerbotRef.current },
        { id: 'gridland', ref: gridlandRef.current },
        { id: 'visionTrack', ref: visionTrackRef.current },
        { id: 'lilypad', ref: lilypadRef.current },
        { id: 'hobby', ref: hobbyRef.current },
      ]

      // Find the section that is most visible
      const active: string[] = []

      for (const section of sections) {
        if (!section.ref) continue

        const rect = section.ref.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionBottom = sectionTop + rect.height

        // If the middle of the viewport is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          active.push(section.id)
        }
      }

      setActiveSection(active.join(' '))
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
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-8 mb-8 lg:mb-16 space-y-4 md:space-y-8 scroll-mt-10" id="projects">
        {/* Thunderbolt */}
        <div
          ref={thunderboltRef}
          className={`group relative overflow-hidden rounded-3xl backdrop-blur-sm p-8 min-h-[500px] transition-all duration-300 hover:scale-[1.02]
            ${activeSection === 'thunderbolt' ? 'bg-purple-50' : 'bg-gray-100/80 '}`}
        >
          <a href="/thunderbolt" className="w-full h-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8 h-full">
              <div className="space-y-4 lg:w-1/3 lg:self-start">
                <h3 className="text-4xl font-bold">
                  <span className={activeSection === 'thunderbolt' ? 'bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent' : ''}>Thunderbolt</span>
                </h3>
                <p className="text-lg">Designed an extensible Skills feature for Thunderbolt, Mozilla&apos;s open-source AI client. Ships in one week and absorbs three rounds of feature growth without rewriting the data model.</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${activeSection === 'thunderbolt' ? 'bg-purple-200' : 'bg-gray-200'} `}>Design Lead</Badge>
                  <Badge className={`${activeSection === 'thunderbolt' ? 'bg-purple-200' : 'bg-gray-200'} `}>AI Design</Badge>
                  <Badge className={`${activeSection === 'thunderbolt' ? 'bg-purple-200' : 'bg-gray-200'} `}>Product Strategy</Badge>
                  <Badge className={`${activeSection === 'thunderbolt' ? 'bg-purple-200' : 'bg-gray-200'} `}>0 → 1</Badge>
                  <Badge className={`${activeSection === 'thunderbolt' ? 'bg-purple-200' : 'bg-gray-200'} `}>Agent Skills</Badge>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end lg:self-end mt-4 lg:mt-0 lg:w-2/3 relative h-[300px] lg:h-[460px]">
                <div className="relative max-h-full max-w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '800 / 518' }}>
                  <PausableGif
                    src="/thunderbolt-demo.gif"
                    posterSrc="/thunderbolt-demo-poster.png"
                    alt="Thunderbolt Project"
                    isPlaying={activeSection === 'thunderbolt'}
                    className="block w-full h-full"
                  />
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Peasy */}
        <div
          ref={peasyRef}
          className={`group relative overflow-hidden rounded-3xl backdrop-blur-sm p-8 min-h-[500px] transition-all duration-300 hover:scale-[1.02]
            ${activeSection === 'peasy' ? 'bg-emerald-50' : 'bg-gray-100/80 '}`}
        >
          <a href="/peasy" className="w-full h-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8 h-full">
              <div className="space-y-4 lg:w-1/3 lg:self-start">
                <h3 className="text-4xl font-bold">
                  <span className={activeSection === 'peasy' ? 'bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent' : ''}>Peasy</span>
                </h3>
                <p className="text-lg">Designed and built a cross-platform meal-planning product that turns saved recipes and real household choices into a shopping list people can depend on.</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${activeSection === 'peasy' ? 'bg-emerald-200' : 'bg-gray-200'} `}>Product Strategy</Badge>
                  <Badge className={`${activeSection === 'peasy' ? 'bg-emerald-200' : 'bg-gray-200'} `}>UX/UI</Badge>
                  <Badge className={`${activeSection === 'peasy' ? 'bg-emerald-200' : 'bg-gray-200'} `}>Design Engineering</Badge>
                  <Badge className={`${activeSection === 'peasy' ? 'bg-emerald-200' : 'bg-gray-200'} `}>iOS + Web</Badge>
                  <Badge className={`${activeSection === 'peasy' ? 'bg-emerald-200' : 'bg-gray-200'} `}>0 → 1</Badge>
                </div>
              </div>
              <div className="relative mt-8 flex h-[330px] items-center justify-center overflow-hidden rounded-3xl bg-[#15211a] lg:mt-0 lg:h-[460px] lg:w-2/3">
                <Image src="/peasy-broccoli.png" alt="" width={640} height={640} aria-hidden className="absolute -right-20 -top-20 w-64 rotate-12 opacity-75" />
                <div className="relative z-10 w-full px-4 md:px-8">
                  <div className="overflow-hidden rounded-xl bg-zinc-950 p-1.5 shadow-2xl ring-1 ring-white/20">
                    <div className="flex h-6 items-center gap-1.5 px-2" aria-hidden>
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                    </div>
                    <Image src="/peasy-web-shopping-list.png" alt="Peasy web shopping workspace" width={1440} height={700} className="h-auto w-full rounded-lg" />
                  </div>
                  <div className="absolute -bottom-28 right-2 hidden w-[145px] rotate-3 overflow-hidden rounded-[1.8rem] bg-zinc-950 p-1.5 shadow-2xl ring-1 ring-white/20 sm:block lg:-bottom-36 lg:right-3 lg:w-[185px]">
                    <Image src="/peasy-plan-screen.png" alt="Peasy native iOS meal planner" width={1206} height={2622} className="h-auto w-full rounded-[1.45rem]" />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Careerbot */}
        <div
          ref={careerbotRef}
          className={`group relative overflow-hidden rounded-3xl backdrop-blur-sm p-8 min-h-[500px] transition-all duration-300 hover:scale-[1.02]
            ${activeSection === 'careerbot' ? 'bg-indigo-50' : 'bg-gray-100/80 '}`}
        >
          <a href="/careerbot" className="w-full h-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8 h-full">
              <div className="space-y-4 lg:w-1/3 lg:self-start">
                <h3 className="text-4xl font-bold">
                  <span className={activeSection === 'careerbot' ? 'bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent' : ''}>Careerbot</span>
                </h3>
                <p className="text-lg">Designed and built an agent-first career assistant that lets AI handle open-ended research while a focused dashboard makes review and tracking fast.</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${activeSection === 'careerbot' ? 'bg-indigo-200' : 'bg-gray-200'} `}>Agent-first Design</Badge>
                  <Badge className={`${activeSection === 'careerbot' ? 'bg-indigo-200' : 'bg-gray-200'} `}>Product Strategy</Badge>
                  <Badge className={`${activeSection === 'careerbot' ? 'bg-indigo-200' : 'bg-gray-200'} `}>Design Engineering</Badge>
                  <Badge className={`${activeSection === 'careerbot' ? 'bg-indigo-200' : 'bg-gray-200'} `}>0 → 1</Badge>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end lg:self-end mt-4 lg:mt-0 lg:w-2/3 relative h-[300px] lg:h-[460px]">
                <div className="relative max-h-full max-w-full rounded-2xl overflow-hidden ring-1 ring-black/10 shadow-2xl" style={{ aspectRatio: '1200 / 656' }}>
                  <PausableGif
                    src="/careerbot-demo-latest.gif"
                    posterSrc="/careerbot-demo-poster-latest.png"
                    alt="Careerbot application dashboard and job detail panel"
                    isPlaying={activeSection === 'careerbot'}
                    className="block w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Gridland */}
        <div
          ref={gridlandRef}
          className={`group relative overflow-hidden rounded-3xl backdrop-blur-sm p-8 min-h-[500px] transition-all duration-300 hover:scale-[1.02]
            ${activeSection === 'gridland' ? 'bg-pink-50' : 'bg-gray-100/80 '}`}
        >
          <a href="/gridland" className="w-full h-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-8 h-full">
              <div className="space-y-4 lg:w-1/3 lg:self-start">
                <h3 className="text-4xl font-bold">
                  <span className={activeSection === 'gridland' ? 'bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent' : ''}>gridland</span>
                </h3>
                <p className="text-lg">gridland (300+ ★ on GitHub) is an open-source terminal UI framework I designed and built that renders in both the terminal and the browser, making terminal apps more approachable for non-technical users.</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${activeSection === 'gridland' ? 'bg-pink-200' : 'bg-gray-200'} `}>Developer Tools</Badge>
                  <Badge className={`${activeSection === 'gridland' ? 'bg-pink-200' : 'bg-gray-200'} `}>Design Engineering</Badge>
                  <Badge className={`${activeSection === 'gridland' ? 'bg-pink-200' : 'bg-gray-200'} `}>Component Design</Badge>
                  <Badge className={`${activeSection === 'gridland' ? 'bg-pink-200' : 'bg-gray-200'} `}>TUI</Badge>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start lg:self-end mt-4 lg:mt-0 lg:w-2/3 relative h-[300px] lg:h-[460px]">
                <div className="relative max-h-full max-w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '800 / 529' }}>
                  <PausableGif
                    src="/gridland-demo.gif"
                    posterSrc="/gridland-demo-poster.png"
                    alt="gridland Project"
                    isPlaying={activeSection === 'gridland'}
                    className="block w-full h-full"
                  />
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-3">
          {/* Project Vision Track */}
          <div
            ref={visionTrackRef}
            className={`group relative min-h-[500px] overflow-hidden rounded-3xl p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]
              ${activeSection?.includes('visionTrack') ? 'bg-blue-50' : 'bg-gray-100/80'}`}
          >
            <a href="/vision-track" className="block h-full w-full">
              <div className="flex h-full flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-4">
                <div className="space-y-4 lg:self-start">
                  <h3 className="text-3xl font-bold lg:text-2xl xl:text-3xl">
                    <span className={activeSection?.includes('visionTrack') ? 'bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent' : ''}>Vision Track</span>
                  </h3>
                  <p className="text-base">Competitive analysis and user interviews for a B2B SaaS startup</p>
                  <div className="flex flex-wrap gap-2 lg:hidden">
                    <Badge className={`${activeSection?.includes('visionTrack') ? 'bg-blue-200' : 'bg-gray-200'} `}>UX Research</Badge>
                    <Badge className={`${activeSection?.includes('visionTrack') ? 'bg-blue-200' : 'bg-gray-200'} `}>Competitive Analysis</Badge>
                    <Badge className={`${activeSection?.includes('visionTrack') ? 'bg-blue-200' : 'bg-gray-200'} `}>User Interviews</Badge>
                    <Badge className={`${activeSection?.includes('visionTrack') ? 'bg-blue-200' : 'bg-gray-200'} `}>User Personas</Badge>
                    <Badge className={`${activeSection?.includes('visionTrack') ? 'bg-blue-200' : 'bg-gray-200'} `}>B2B</Badge>
                    <Badge className={`${activeSection?.includes('visionTrack') ? 'bg-blue-200' : 'bg-gray-200'} `}>SaaS</Badge>
                  </div>
                </div>
                <div className="flex min-h-[220px] items-end justify-end lg:min-h-0">
                  <Image src="/vision-track-cover.png" alt="Vision Track Project" className="h-full w-full object-contain object-right-bottom" width={700} height={600} />
                </div>
              </div>
            </a>
          </div>

          {/* Lilypad */}
          <div
            ref={lilypadRef}
            className={`group relative min-h-[500px] overflow-hidden rounded-3xl p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]
              ${activeSection?.includes('lilypad') ? 'bg-[#fff4ea]' : 'bg-gray-100/80'}`}
          >
            <a href="/lilypad" className="block h-full w-full">
              <div className="flex h-full flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-4">
                <div className="space-y-4 lg:self-start">
                  <h3 className="text-3xl font-bold lg:text-2xl xl:text-3xl">
                    <span className={activeSection?.includes('lilypad') ? 'bg-gradient-to-r from-[#ff9f56] to-[#ff5003] bg-clip-text text-transparent' : ''}>Lilypad</span>
                  </h3>
                  <p className="text-base">Designed and developed a mobile-first landing page for an AI ed-tech startup</p>
                  <div className="flex flex-wrap gap-2 lg:hidden">
                    <Badge className={`${activeSection?.includes('lilypad') ? 'bg-orange-200' : 'bg-gray-200'} `}>UI Design</Badge>
                    <Badge className={`${activeSection?.includes('lilypad') ? 'bg-orange-200' : 'bg-gray-200'} `}>Landing Page</Badge>
                    <Badge className={`${activeSection?.includes('lilypad') ? 'bg-orange-200' : 'bg-gray-200'} `}>Responsive Design</Badge>
                  </div>
                </div>
                <div className="flex min-h-[220px] items-center justify-center lg:min-h-0">
                  <Image src="/lilypad-cover.png" alt="Lilypad Project" className="h-full w-full rounded-lg object-contain" width={500} height={300} sizes="(min-width: 1024px) 16vw, 100vw" />
                </div>
              </div>
            </a>
          </div>

          {/* Other Fun Works */}
          <div
            ref={hobbyRef}
            className={`group relative min-h-[500px] overflow-hidden rounded-3xl p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]
              ${activeSection?.includes('hobby') ? 'bg-rose-50' : 'bg-gray-100/80'}`}
          >
            <a href="/hobby" className="block h-full w-full">
              <div className="flex h-full flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-4">
                <div className="space-y-4 lg:self-start">
                  <h3 className="text-3xl font-bold lg:text-2xl xl:text-3xl">
                    <span className={activeSection?.includes('hobby') ? 'bg-gradient-to-r from-rose-400 to-rose-500 bg-clip-text text-transparent' : ''}>Outside of Work</span>
                  </h3>
                  <p className="text-base">Camping and photography</p>
                  <div className="flex flex-wrap gap-2 lg:hidden">
                    <Badge className={`${activeSection?.includes('hobby') ? 'bg-rose-200' : 'bg-gray-200'} `}>Photography</Badge>
                    <Badge className={`${activeSection?.includes('hobby') ? 'bg-rose-200' : 'bg-gray-200'} `}>Camping</Badge>
                  </div>
                </div>
                <div className="grid min-h-[240px] grid-cols-2 gap-2 lg:min-h-0">
                  <Image src="/hobby-14.jpeg" alt="Hobby 14" width={500} height={300} className="h-full min-h-0 w-full rounded-lg object-cover" />
                  <Image src="/hobby-3.jpeg" alt="Hobby 15" width={500} height={300} className="h-full min-h-0 w-full rounded-lg object-cover" />
                  <Image src="/hobby-16.jpeg" alt="Hobby 16" width={500} height={300} className="h-full min-h-0 w-full rounded-lg object-cover" />
                  <Image src="/hobby-17.jpeg" alt="Hobby 17" width={500} height={300} className="h-full min-h-0 w-full rounded-lg object-cover" />
                  <Image src="/hobby-20.jpeg" alt="Hobby 20" width={500} height={300} className="h-full min-h-0 w-full rounded-lg object-cover" />
                  <Image src="/hobby-19.jpeg" alt="Hobby 19" width={500} height={300} className="h-full min-h-0 w-full rounded-lg object-cover" />
                </div>
              </div>
            </a>
          </div>
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
