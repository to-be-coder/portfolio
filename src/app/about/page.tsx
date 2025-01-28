'use client'
import CtaSection from '@/components/ui/cta'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function About() {
  const [activeSection, setActiveSection] = useState('empathy')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When scrolling down
          if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
            setActiveSection(entry.target.id)
          }
          // When scrolling up
          else if (entry.isIntersecting && entry.boundingClientRect.top <= 0) {
            setActiveSection(entry.target.id)
          }
          // When section exits viewport
          else if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            const nextSection = entry.target.nextElementSibling as HTMLElement
            if (nextSection?.id) {
              setActiveSection(nextSection.id)
            }
          }
        })
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: '-20% 0px -80% 0px',
      }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      setActiveSection(sectionId)
    }
  }

  const menuItems = [
    { id: 'empathy', label: 'Empathy-Driven Approach' },
    { id: 'experience', label: 'Experience Highlights' },
    { id: 'skills', label: 'Core Skills' },
    { id: 'outside', label: 'Outside of Work' },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:my-16 space-y-8 sm:space-y-8 md:space-y-8">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-6">Hi, I&apos;m Jessica Cheng</h1>
            <p className="text-gray-600">
              A <span className="font-semibold">Design Engineer</span> devoted to creating digital experiences that feel second nature. My background in{' '}
              <span className="font-semibold">psychology</span> helps me uncover the &quot;why&quot; behind user behavior, while my <span className="font-semibold">coding skills</span>
              let me translate insights into real, working solutions. Whether I&apos;m
              <span className="font-semibold"> sketching wireframes, running user interviews</span>, or <span className="font-semibold">prototyping in Figma</span>, my goal is always to remove
              friction so people can just get things done.
            </p>
          </div>
          <div className="stack space-y-4 h-full">
            <div className="grid grid-cols-8 gap-3 h-auto">
              <Image src="/profile.jpg" alt="Profile image" width={200} height={200} className="col-span-5 object-cover rounded-lg w-full h-[280px]" />
              <div className="w-full h-full bg-[#FFA813] rounded-lg col-span-3"></div>
            </div>
            <div className="hidden md:grid grid-cols-8 gap-3 h-auto">
              <div className="w-full h-full bg-[#FFA813] rounded-lg col-span-3"></div>
              <Image src="/profile-2.jpg" alt="Profile image" width={100} height={100} className="col-span-5 object-cover rounded-lg w-full h-[100px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section with Sidebar */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:my-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 sticky top-4" style={{ height: 'min-content' }}>
            <nav className="space-y-4">
              {menuItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeSection === id ? 'bg-black text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <section id="empathy" className="mb-4 md:mb-6 scroll-mt-10">
              <h2 className="text-2xl font-bold mb-2 md:mb-4">Empathy-Driven Approach</h2>
              <p className="text-gray-600">
                Before focusing on UX, I <span className="font-semibold">volunteered</span> at Mount Sinai Hospital, where I <span className="font-semibold">learned</span> the power of active
                listening and how to navigate challenging conversations—skills I now use every day when conducting user interviews or facilitating team workshops. This empathy{' '}
                <span className="font-semibold">guides</span> every design decision I make, ensuring real human needs remain at the heart of my work.
              </p>
            </section>

            <section id="experience" className="mb-4 md:mb-6 scroll-mt-10">
              <h2 className="text-2xl font-bold mb-2 md:mb-4">Experience Highlights</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold mb-1 md:mb-2">Thoughtful (3 Years)</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Partnered with founders to shape MVPs and define intuitive user flows.</li>
                    <li>Conducted user interviews and tests to pinpoint friction points, then proposed and implemented solutions to streamline the product experience.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 md:mb-2">Fractional (Co-Founder, 2023)</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>
                      <span className="font-semibold">UX Lead:</span> Designed an all-in-one client portal, reducing onboarding times for agencies and freelancers.
                    </li>
                    <li>
                      <span className="font-semibold">Cross-Functional Collaboration:</span> Worked closely with engineers to ensure designs transitioned smoothly from prototype to production,
                      maintaining consistency and clarity.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="skills" className="mb-4 md:mb-6 scroll-mt-10">
              <h2 className="text-2xl font-bold mb-2 md:mb-4">Core Skills</h2>
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold mb-1 md:mb-2">UX & Design</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>User Research</li>
                    <li>Wireframing</li>
                    <li>Prototyping</li>
                    <li>Design Systems</li>
                    <li>Usability Testing</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 md:mb-2">Development</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                    <li>TypeScript</li>
                    <li>React.js</li>
                    <li>Next.js</li>
                    <li>Node.js</li>
                    <li>Python</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 md:mb-2">Tools</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Figma</li>
                    <li>Adobe Photoshop/Lightroom</li>
                    <li>Webflow</li>
                    <li>ChatGPT</li>
                    <li>Visual Studio Code</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 md:mb-2">Languages</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>English</li>
                    <li>Japanese</li>
                    <li>Chinese (Mandarin)</li>
                    <li>Taiwanese</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="outside" className="mb-4 md:mb-6 scroll-mt-10">
              <h2 className="text-2xl font-bold mb-2 md:mb-4">Outside of Work</h2>
              <p className="text-gray-600">
                When I&apos;m not designing, I&apos;m often <span className="font-semibold">hiking with my dog (Dr. Fizzy)</span>, exploring national parks, or
                <span className="font-semibold"> camping</span> and capturing new landscapes on <span className="font-semibold">camera</span>. I also love experimenting with new coding libraries and
                AI tools to make design workflows smarter and more efficient.
              </p>
            </section>
          </div>
        </div>
      </section>
      <CtaSection />
    </main>
  )
}
