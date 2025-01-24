'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Lilypad() {
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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <main>
          {/* Hero Section */}
          <section className="py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-6">Hi, I&apos;m Jessica Cheng</h1>
                <p className="text-gray-600">
                  A <span className="font-semibold">Design Engineer</span> devoted to creating digital experiences that feel second nature. My background in{' '}
                  <span className="font-semibold">psychology</span> helps me uncover the &quot;why&quot; behind user behavior, while my <span className="font-semibold">coding skills</span>
                  let me translate insights into real, working solutions. Whether I&apos;m
                  <span className="font-semibold"> sketching wireframes, running user interviews</span>, or <span className="font-semibold">prototyping in Figma</span>, my goal is always to remove
                  friction so people can just get things done.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Image
                    key={i}
                    src="/profile.jpg"
                    alt={`Portfolio image ${i}`}
                    width={300}
                    height={300}
                    className={`rounded-lg w-full h-auto object-cover ${i % 2 ? 'bg-[#FFA813]' : 'bg-gray-400'}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Content Section with Sidebar */}
          <section className="relative flex">
            {/* Sidebar */}
            <aside className="hidden lg:block w-64 sticky top-4" style={{ height: 'min-content' }}>
              <nav className="space-y-4">
                {menuItems.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeSection === id ? 'bg-black text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                    aria-current={activeSection === id ? 'true' : undefined}
                    aria-label={`Scroll to ${label} section`}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:ml-16">
              <section id="empathy" className="mb-16 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-6">Empathy-Driven Approach</h2>
                <p className="text-gray-600">
                  Before focusing on UX, I <span className="font-semibold">volunteered</span> at Mount Sinai Hospital, where I <span className="font-semibold">learned</span> the power of active
                  listening and how to navigate challenging conversations—skills I now use every day when conducting user interviews or facilitating team workshops. This empathy{' '}
                  <span className="font-semibold">guides</span> every design decision I make, ensuring real human needs remain at the heart of my work.
                </p>
              </section>

              <section id="experience" className="mb-16 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-6">Experience Highlights</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold mb-4">Thoughtful (3 Years)</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Partnered with founders to shape MVPs and define intuitive user flows.</li>
                      <li>Conducted user interviews and tests to pinpoint friction points, then proposed and implemented solutions to streamline the product experience.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Fractional (Co-Founder, 2023)</h3>
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

              <section id="skills" className="mb-16 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-6">Core Skills</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">UX & Design:</h3>
                    <p className="text-gray-600">User Research, Wireframing, Prototyping, Design Systems, Usability Testing.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Development:</h3>
                    <p className="text-gray-600">HTML, CSS, JavaScript, TypeScript, React.js, Next.js, Node.js, Python.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Tools:</h3>
                    <p className="text-gray-600">Figma, Adobe Photoshop/Lightroom, Webflow, ChatGPT, Visual Studio Code.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Languages:</h3>
                    <p className="text-gray-600">English, Japanese, Chinese (Mandarin), Taiwanese.</p>
                  </div>
                </div>
              </section>

              <section id="outside" className="mb-16 scroll-mt-20">
                <h2 className="text-2xl font-bold mb-6">Outside of Work</h2>
                <p className="text-gray-600">
                  When I&apos;m not designing, I&apos;m often <span className="font-semibold">hiking with my dog (Dr. Fizzy)</span>, exploring national parks, or
                  <span className="font-semibold"> camping</span> and capturing new landscapes on <span className="font-semibold">camera</span>. I also love experimenting with new coding libraries and
                  AI tools to make design workflows smarter and more efficient.
                </p>
              </section>
            </div>
          </section>
        </main>
      </div>

      {/* Dark CTA Section */}
      <div className="bg-[#1C1C1C]">
        <div className="max-w-7xl mx-auto">
          <section className="py-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Let&apos;s make something users will love!</h2>
            <p className="text-gray-400 mb-8">
              If you&apos;re looking for a UX Designer / Design Engineer who combines empathy,
              <br />
              design thinking, and technical expertise, I&apos;m here to help!
            </p>
            <Button className="bg-[#FFA813] hover:bg-[#FFA813]/90" aria-label="Send message to contact">
              Send Message
            </Button>
          </section>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="max-w-7xl mx-auto">
        <section className="py-16 text-center">
          <p className="text-[#FFA813] uppercase tracking-wide mb-4">LET&apos;S DESIGN SOMETHING AMAZING</p>
          <h2 className="text-3xl font-bold mb-8">I&apos;m only a message away</h2>
          <Button className="bg-[#FFA813] hover:bg-[#FFA813]/90" aria-label="Start conversation">
            Let&apos;s talk →
          </Button>
        </section>
      </div>
    </div>
  )
}
