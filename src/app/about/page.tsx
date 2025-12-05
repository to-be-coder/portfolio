'use client'
import CtaSection from '@/components/ui-block/cta'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { motion } from 'framer-motion'
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
                  <p className="text-black">
                    I&apos;m a <strong>design engineer</strong> (design + frontend) who uses design to align teams and get people excited about what they&apos;re building. I&apos;ve mostly worked at
                    startups, so I&apos;m comfortable figuring things out when nothing&apos;s clear yet. My strength is my engineering background. It helps me connect with devs quickly and set up
                    design systems and tokens in a way that actually makes collaboration easier. Sometimes that even saves time and resources. And if you don&apos;t have a frontend engineer, I can
                    help build the frontend too. It&apos;s always exciting to see a new idea become a product that users love. <strong>Let&apos;s build something users will love!</strong>
                  </p>
                </div>
                <div className="stack space-y-4 h-full w-full block lg:hidden order-1 md:order-2 col-span-1 mb-4 md:mb-0">
                  <Image src="/profile.jpg" alt="Profile image" height={280} width={280} className="object-contain rounded-xl  w-full md:w-fit h-auto md:h-[300px] hidden md:block lg:hidden" />
                  <Image src="/profile-small.jpg" alt="Profile image" height={280} width={280} className="object-contain rounded-xl w-full md:w-fit h-auto md:hidden" />
                </div>
              </div>
              <Accordion type="single" collapsible className="w-full mt-8 ">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0 }}>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Design Philosophy</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-Black">
                        Design serves two things: the business and the user. Revenue, efficiency, growth on one side. A product people genuinely enjoy using on the other. The best work happens when
                        both are aligned. <br /> <br /> I also see design as a communication tool to align people across different teams. It surfaces problems early, makes goals visible, and sparks
                        excitement for what we&apos;re building.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Experience Highlights</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-8 md:space-y-12 mb-8 border-t border-[#C1C1C1] pt-[4px]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="col-span-1">
                            <h3 className="text-base font-regular">Thoughtful - Product Studio (Product Designer & Engineer)</h3>
                          </div>
                          <div className="md:col-span-2">
                            <ul className="list-disc list-outside space-y-2 text-Black pl-5">
                              <li className="pl-1">
                                <span className="block ml-[-1px]">Designed and built software for 5 clients over 3 years by splitting time between design and front-end development:</span>
                              </li>
                              <li className="pl-1">
                                <span className="block ml-[-1px]">
                                  <strong>Mozilla Thunderbolt</strong> - privacy-focused AI assistant, 3 month project, from market research to high-fidelity Figma designs.
                                </span>
                              </li>
                              <li className="pl-1">
                                <span className="block ml-[-1px]">
                                  <strong>Spiritune</strong> - music streaming that adapts to your mood, ongoing design support, including revamping the sign-up and login flow.
                                </span>
                              </li>
                              <li className="pl-1">
                                <span className="block ml-[-1px]">
                                  <strong>Lilypad Learning</strong> - edtech startup helping schools manage student psychological evaluations, 3-month project to design the SaaS product and website.
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
                            <h3 className="text-base font-regular">Fractional (Product Designer & Engineer - Founding Team)</h3>
                          </div>
                          <div className="md:col-span-2">
                            <ul className="list-disc list-outside space-y-2 Black pl-5">
                              <li className="pl-1">
                                <span className="block ml-[-1px]">
                                  Co-founded SaaS startup as front-end engineer and designer to help fractional consultants manage invoicing, payments, and client communications.
                                </span>
                              </li>
                              <li className="pl-1">
                                <span className="block ml-[-1px]">Conducted market research, more than 60 user interviews, and live user testing to validate market demand and user needs.</span>
                              </li>
                              <li className="pl-1">
                                <span className="block ml-[-1px]">
                                  <strong>Shipped MVP in under 4 months</strong> with a complex onboarding flow where users connect their bank, accept payments, and send contracts to clients.
                                </span>
                              </li>
                              <li className="pl-1">
                                <span className="block ml-[-1px]">
                                  Worked on front-end development, building the UI with React, TypeScript, and the Mantine UI component library, in collaboration with a senior back-end-engineer
                                  co-founder.
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
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
                              <span className="block ml-[-1px]">User Research</span>
                            </li>
                            <li className="pl-1">
                              <span className="block ml-[-1px]">0→1 Product Design</span>
                            </li>
                            <li className="pl-1">
                              <span className="block ml-[-1px]">Cross-functional Collaboration</span>
                            </li>
                          </ul>
                        </div>

                        <div className="border-t border-[#C1C1C1] pt-[4px]">
                          <h3 className="text-base font-regular mb-2 md:mb-4">Development</h3>
                          <ul className="list-disc list-outside space-y-1 md:space-y-2 pl-5">
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
                            <li className="pl-1">
                              <span className="block ml-[-1px]">HTML</span>
                            </li>
                            <li className="pl-1">
                              <span className="block ml-[-1px]">CSS</span>
                            </li>
                          </ul>
                        </div>

                        <div className="border-t border-[#C1C1C1] pt-[4px]">
                          <h3 className="text-base font-regular mb-2 md:mb-4">Favorite Tools</h3>
                          <ul className="list-disc list-outside space-y-1 md:space-y-2 pl-5">
                            <li className="pl-1">
                              <span className="block ml-[-1px]">Figma</span>
                            </li>
                            <li className="pl-1">
                              <span className="block ml-[-1px]">Figma MCP</span>
                            </li>
                            <li className="pl-1">
                              <span className="block ml-[-1px]">Figma Make</span>
                            </li>
                            <li className="pl-1">
                              <span className="block ml-[-1px]">ShadCN MCP</span>
                            </li>
                            <li className="pl-1">
                              <span className="block ml-[-1px]">Cursor</span>
                            </li>

                            <li className="pl-1">
                              <span className="block ml-[-1px]">Claude Code</span>
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
                              <span className="block ml-[-1px]">Mandarin (Chinese)</span>
                            </li>
                            <li className="pl-1">
                              <span className="block ml-[-1px]">Taiwanese</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Outside of Work</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-black">
                        When I&apos;m not designing, I&apos;m often <span className="font-semibold">hiking with my dog (Dr. Fizzy)</span>, exploring national parks, or
                        <span className="font-semibold"> camping</span> and capturing new landscapes on <span className="font-semibold">camera</span>. I also love experimenting with new coding
                        libraries and AI tools to make design workflows smarter and more efficient.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
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
