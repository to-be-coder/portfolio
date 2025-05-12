'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import CtaSection from '@/components/ui/cta'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function About() {
  const [activeSection, setActiveSection] = useState('empathy')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '-20% 0px -50% 0px',
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
    <>
      <main>
        {/* Hero Section */}
        <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:my-8 lg:h-[calc(100vh-80px)] ">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
              <h1 className="text-2xl font-bold mb-6 md:mb-8 block md:hidden">Hi, I&apos;m Jessica Cheng</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 justify-between ">
                <div className="order-2 md:order-1 w-full col-span-2">
                  <h1 className="text-4xl font-bold mb-6 md:mb-8 hidden md:block">Hi, I&apos;m Jessica Cheng</h1>
                  <p className="text-Black">
                    A <span className="font-semibold">Product Designer</span> devoted to creating digital experiences that feel second nature. My background in{' '}
                    <span className="font-semibold">psychology</span> helps me uncover the &quot;why&quot; behind user behavior, while my <span className="font-semibold">coding skills </span>
                    let me translate insights into real, working solutions. Whether I&apos;m
                    <span className="font-semibold"> sketching wireframes, running user interviews</span>, or <span className="font-semibold">prototyping in Figma</span>, my goal is always to remove
                    friction so people can just get things done.
                  </p>
                </div>
                <div className="stack space-y-4 h-full block lg:hidden order-1 md:order-2 w-fit col-span-1">
                  <Image src="/profile.jpg" alt="Profile image" height={280} width={280} className="object-contain rounded-xl  w-full md:w-fit h-automd:h-[300px]" />
                </div>
              </div>
              <Accordion type="single" collapsible className="w-full mt-8">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How I can help</AccordionTrigger>
                  <AccordionContent>
                    Having worked as a consultant for early-stage startups, I know firsthand how messy and iterative finding product–market fit can be. I&apos;m comfortable navigating ambiguity,
                    aligning with stakeholders, and evolving designs through continuous feedback. From research and strategy to UI/UX and testing, I help move ideas forward—building focused, usable
                    products across web and mobile, fast.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Empathy-Driven Approach</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-Black">
                      Before focusing on UX, I <span className="font-semibold">volunteered</span> at Mount Sinai Hospital, where I <span className="font-semibold">learned</span> the power of active
                      listening and how to navigate challenging conversations—skills I now use every day when conducting user interviews or facilitating team workshops. This empathy{' '}
                      <span className="font-semibold">guides</span> every design decision I make, ensuring real human needs remain at the heart of my work.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Experience Highlights</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-8 md:space-y-12 mb-8 border-t border-[#C1C1C1] pt-[4px]">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <h3 className="text-base font-regular">Thoughtful (3 Years)</h3>
                        </div>
                        <div className="md:col-span-2">
                          <ul className="list-disc list-inside space-y-2 text-Black">
                            <li>Partnered with founders to shape MVPs and define intuitive user flows.</li>
                            <li>Conducted user interviews and tests to pinpoint friction points, then proposed and implemented solutions to streamline the product experience.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* Interviewed */}
                    <div className="space-y-8 md:space-y-12 mb-8 border-t border-[#C1C1C1] pt-[4px]">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <h3 className="text-base font-regular]">Fractional (Co-Founder, 2023)</h3>
                        </div>
                        <div className="md:col-span-2">
                          <ul className="list-disc list-inside space-y-2 Black">
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
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Core Skills</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-8">
                      <div className="border-t border-[#C1C1C1] pt-[4px]">
                        <h3 className="text-base font-regular mb-2 md:mb-4">UX & Design</h3>
                        <ul className="list-disc list-inside space-y-1 md:space-y-2">
                          <li>User Research</li>
                          <li>Wireframing</li>
                          <li>Prototyping</li>
                          <li>Design Systems</li>
                          <li>Usability Testing</li>
                        </ul>
                      </div>

                      <div className="border-t border-[#C1C1C1] pt-[4px]">
                        <h3 className="text-base font-regular mb-2 md:mb-4">Development</h3>
                        <ul className="list-disc list-inside space-y-1 md:space-y-2">
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

                      <div className="border-t border-[#C1C1C1] pt-[4px]">
                        <h3 className="text-base font-regular mb-2 md:mb-4">Tools</h3>
                        <ul className="list-disc list-inside space-y-1 md:space-y-2">
                          <li>Figma</li>
                          <li>Adobe Photoshop/Lightroom</li>
                          <li>Webflow</li>
                          <li>ChatGPT</li>
                          <li>Visual Studio Code</li>
                        </ul>
                      </div>

                      <div className="border-t border-[#C1C1C1] pt-[4px]">
                        <h3 className="text-base font-regular mb-2 md:mb-4">Languages</h3>
                        <ul className="list-disc list-inside space-y-1 md:space-y-2">
                          <li>English</li>
                          <li>Japanese</li>
                          <li>Chinese (Mandarin)</li>
                          <li>Taiwanese</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Outside of Work</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-black">
                      When I&apos;m not designing, I&apos;m often <span className="font-semibold">hiking with my dog (Dr. Fizzy)</span>, exploring national parks, or
                      <span className="font-semibold"> camping</span> and capturing new landscapes on <span className="font-semibold">camera</span>. I also love experimenting with new coding libraries
                      and AI tools to make design workflows smarter and more efficient.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="stack space-y-4 h-full hidden lg:block pb-2">
              <Image src="/profile.jpg" alt="Profile image" height={280} width={280} className="object-cover object-top rounded-xl w-full h-full" />
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
    </>
  )
}
