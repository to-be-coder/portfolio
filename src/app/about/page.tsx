'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import CtaSection from '@/components/ui/cta'
import Image from 'next/image'

export default function About() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:my-8 lg:min-h-[calc(100vh-80px)] ">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
              <h1 className="text-2xl font-bold mb-6 md:mb-8 block md:hidden">Hi, I&apos;m Jessica Cheng</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 md:gap-4 gap-0 justify-between ">
                <div className="order-2 md:order-1 w-full col-span-2">
                  <h1 className="text-4xl font-bold mb-6 md:mb-8 hidden md:block">Hi, I&apos;m Jessica Cheng</h1>
                  <p className="text-Black">
                    A <span className="font-semibold">product Designer</span> devoted to creating digital experiences that feel natural. My background in{' '}
                    <span className="font-semibold">psychology</span> helps me uncover the &quot;why&quot; behind user behavior, while my <span className="font-semibold">coding skills </span>
                    let me translate insights into real, working solutions. Whether I&apos;m
                    <span className="font-semibold"> sketching wireframes, running user interviews</span>, or <span className="font-semibold">prototyping in Figma</span>, my goal is always to remove
                    friction so people can just get things done.
                  </p>
                </div>
                <div className="stack space-y-4 h-full w-full block lg:hidden order-1 md:order-2 col-span-1 mb-4 md:mb-0">
                  <Image src="/profile.jpg" alt="Profile image" height={280} width={280} className="object-contain rounded-xl  w-full md:w-fit h-auto md:h-[300px] hidden md:block lg:hidden" />
                  <Image src="/profile-small.jpg" alt="Profile image" height={280} width={280} className="object-contain rounded-xl w-full md:w-fit h-auto md:hidden" />
                </div>
              </div>
              <Accordion type="single" collapsible className="w-full mt-8 ">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How I Can Help</AccordionTrigger>
                  <AccordionContent>
                    I specialize in helping early-stage teams turn ambiguity into clarity. With a background in consulting for startups, I <strong>bring structure to messy problems</strong>—aligning
                    teams quickly, testing ideas early, and evolving UX through constant feedback. Whether it&apos;s product strategy, hands-on design, or rapid prototyping, I build focused, usable
                    experiences that ship fast—across web and mobile.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Empathy-Driven Approach</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-Black">
                      Before UX, I spent <strong>2+ years volunteering</strong> at a hospital, where I learned the <strong>power of active listening</strong> and navigating difficult
                      conversations—skills I now bring to user interviews and team workshops. That foundation in empathy shapes every design decision I make, keeping real human needs at the core of my
                      work.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Experience Highlights</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-8 md:space-y-12 mb-8 border-t border-[#C1C1C1] pt-[4px]">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <h3 className="text-base font-regular">Thoughtful (Co-Founder & Design Engineer)</h3>
                        </div>
                        <div className="md:col-span-2">
                          <ul className="list-disc list-outside space-y-2 text-Black pl-5">
                            <li className="pl-1">
                              <span className="block ml-[-1px]">
                                Bootstrapped 3 internal products from 0→1 — led user research, UX strategy, UI design, and front-end development to validate product–market fit.
                              </span>
                            </li>
                            <li className="pl-1">
                              <span className="block ml-[-1px]">
                                Led UX/UI design for Spiritune and Mozilla Thunderbird, defining core flows and collaborating with engineers to ship responsive, scalable consumer interfaces.
                              </span>
                            </li>
                            <li className="pl-1">
                              <span className="block ml-[-1px]">
                                Defined MVP workflows for early-stage products, stripping non-essential features and prioritizing high-value tasks across client portals and dashboards.
                              </span>
                            </li>
                            <li className="pl-1">
                              <span className="block ml-[-1px]">Built modular design systems reused across projects, improving consistency, speeding dev handoff, and enabling rapid iteration.</span>
                            </li>
                            <li className="pl-1">
                              <span className="block ml-[-1px]">
                                Ran feedback loops with users and stakeholders, helping teams validate assumptions, refine UX, and deliver usable MVPs under tight constraints.
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* Interviewed */}
                    <div className="space-y-8 md:space-y-12 mb-8 border-t border-[#C1C1C1] pt-[4px]">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <h3 className="text-base font-regular]">Fractional (Co-Founder)</h3>
                        </div>
                        <div className="md:col-span-2">
                          <ul className="list-disc list-outside space-y-2 Black pl-5">
                            <li className="pl-1">
                              <span className="block ml-[-1px]">
                                Designed and launched a web-based client portal used by 5+ agencies and freelancers to manage clients, projects, and billing — shipped MVP in under 4 months.
                              </span>
                            </li>
                            <li className="pl-1">
                              <span className="block ml-[-1px]">
                                Led end-to-end UX/UI, from early research and wireframes to polished, responsive UIs — balanced business constraints with user needs to streamline onboarding and daily
                                workflows.
                              </span>
                            </li>
                            <li className="pl-1">
                              <span className="block ml-[-1px]">Built a component-based design system from scratch, enabling faster iteration and visual consistency across the app.</span>
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
                        <ul className="list-disc list-outside space-y-1 md:space-y-2 pl-5">
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Prototyping (Figma, Cursor)</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Interaction Design</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Visual Design</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Design Systems</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Systematic UX</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Modular Thinking</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">User Research</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">0→1 Product Design</span>
                          </li>
                        </ul>
                      </div>

                      <div className="border-t border-[#C1C1C1] pt-[4px]">
                        <h3 className="text-base font-regular mb-2 md:mb-4">Development</h3>
                        <ul className="list-disc list-outside space-y-1 md:space-y-2 pl-5">
                          <li className="pl-1">
                            <span className="block ml-[-1px]">HTML</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">CSS</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">JavaScript</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">TypeScript</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">React.js</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Next.js</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Node.js</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Tailwind CSS</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Shadcn UI</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Mantine UI</span>
                          </li>
                        </ul>
                      </div>

                      <div className="border-t border-[#C1C1C1] pt-[4px]">
                        <h3 className="text-base font-regular mb-2 md:mb-4">Tools</h3>
                        <ul className="list-disc list-outside space-y-1 md:space-y-2 pl-5">
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Figma</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Cursor</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">ChatGPT</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">VS Code</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">UX Pilot</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Midjourney</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">DSLR</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Adobe Photoshop/Lightroom</span>
                          </li>
                        </ul>
                      </div>

                      <div className="border-t border-[#C1C1C1] pt-[4px]">
                        <h3 className="text-base font-regular mb-2 md:mb-4">Languages</h3>
                        <ul className="list-disc list-outside space-y-1 md:space-y-2 pl-5">
                          <li className="pl-1">
                            <span className="block ml-[-1px]">English</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Japanese</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Chinese (Mandarin)</span>
                          </li>
                          <li className="pl-1">
                            <span className="block ml-[-1px]">Taiwanese</span>
                          </li>
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
              <Image src="/profile.jpg" alt="Profile image" height={280} width={280} className="object-cover object-top rounded-xl w-full min-h-[510px]" />
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
    </>
  )
}
