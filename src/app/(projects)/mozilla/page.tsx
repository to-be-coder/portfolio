'use client'

import CtaSection from '@/components/ui-block/cta'
import { HorizontalCard, VerticalCard } from '@/components/ui-block/project-card'
import ProjectColorsSection from '@/components/ui-block/project-colors-section'
import ProjectContent from '@/components/ui-block/project-content'
import ProjectFlexBlock from '@/components/ui-block/project-flex-block'
import ProjectHeroSection from '@/components/ui-block/project-hero-section'
import ProjectHorizontalContentCard from '@/components/ui-block/project-horizontal-content-card'
import ProjectSectionTitle from '@/components/ui-block/project-section-title'
import { HorizontalStack, VerticalStack } from '@/components/ui-block/project-stack'
import { ScrollSpy, ScrollSpyLink, ScrollSpyNav, ScrollSpySection, ScrollSpyViewport } from '@/components/ui/scroll-spy'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function MozillaPage() {
  return (
    <main>
      <ScrollSpy offset={0} defaultValue="overview" orientation="horizontal" className="w-full max-w-7xl mx-auto">
        <ScrollSpyNav className="hidden lg:flex w-60 p-6 sticky top-0 h-screen flex-col gap-2 shrink-0">
          <ScrollSpyLink value="overview" activeClassName="data-[state=active]:text-green-500">
            Overview
          </ScrollSpyLink>
          <ScrollSpyLink value="workflow" activeClassName="data-[state=active]:text-green-500 data-[state=active]:font-semibold">
            Workflow
          </ScrollSpyLink>
          <ScrollSpyLink value="initial-vision" activeClassName="data-[state=active]:text-green-500 data-[state=active]:font-semibold">
            Initial Vision
          </ScrollSpyLink>
          <ScrollSpyLink value="hypothesis" activeClassName="data-[state=active]:text-green-500 data-[state=active]:font-semibold">
            Hypothesis
          </ScrollSpyLink>
          <ScrollSpyLink value="design-challenges" activeClassName="data-[state=active]:text-green-500 data-[state=active]:font-semibold">
            Design Challenges
          </ScrollSpyLink>
          <ScrollSpyLink value="transparency" activeClassName="data-[state=active]:text-green-500 data-[state=active]:font-semibold">
            Transparency
          </ScrollSpyLink>
          <ScrollSpyLink value="settings" activeClassName="data-[state=active]:text-green-500 data-[state=active]:font-semibold">
            Settings
          </ScrollSpyLink>
          <ScrollSpyLink value="iteration" activeClassName="data-[state=active]:text-green-500 data-[state=active]:font-semibold">
            Fast Iteration
          </ScrollSpyLink>
          <ScrollSpyLink value="clarity" activeClassName="data-[state=active]:text-green-500 data-[state=active]:font-semibold">
            Clarity at Every Step
          </ScrollSpyLink>
          <ScrollSpyLink value="early-concepts" activeClassName="data-[state=active]:text-green-500 data-[state=active]:font-semibold">
            Early Concepts
          </ScrollSpyLink>
          <ScrollSpyLink value="dark-mode" activeClassName="data-[state=active]:text-green-500 data-[state=active]:font-semibold">
            Dark Mode
          </ScrollSpyLink>
          <ScrollSpyLink value="mobile" activeClassName="data-[state=active]:text-green-500 data-[state=active]:font-semibold">
            Mobile
          </ScrollSpyLink>
          <ScrollSpyLink value="typography" activeClassName="data-[state=active]:text-green-500 data-[state=active]:font-semibold">
            Typography
          </ScrollSpyLink>
          <ScrollSpyLink value="colors" activeClassName="data-[state=active]:text-green-500 data-[state=active]:font-semibold">
            Colors
          </ScrollSpyLink>
          <ScrollSpyLink value="learning" activeClassName="data-[state=active]:text-green-500 data-[state=active]:font-semibold">
            Learning
          </ScrollSpyLink>
          <ScrollSpyLink value="figma" activeClassName="data-[state=active]:text-green-500 data-[state=active]:font-semibold">
            Figma
          </ScrollSpyLink>
        </ScrollSpyNav>
        <ScrollSpyViewport className="flex-1 max-w-3xl mx-auto">
          <ProjectHeroSection title="Mozilla - Thunderbolt" subtitle="Privacy-first AI Assistant" imageSrc="/mozilla-hero.png" imageAlt="Mozilla hero background" />

          {/* Overview Section */}
          <ScrollSpySection value="overview" className="flex flex-col">
            <ProjectSectionTitle color="text-black" dotColor="text-green-500">
              Overview
            </ProjectSectionTitle>
            <ProjectContent>
              <VerticalStack titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <p>
                  Thunderbolt is a <strong>privacy-first</strong>, <strong>on-device AI assistant</strong> built by Mozilla.
                  <br /> <br />
                  The goal wasn&apos;t polish or launch-readiness, it was to explore how Mozilla&apos;s values of <strong>trust</strong>, <strong>transparency</strong>, and{' '}
                  <strong>user control</strong> could shape the product. <br /> <br /> We focused on a few core questions:
                </p>
                <ul className="list-disc ml-5">
                  <li>
                    <strong>How can consent feel seamless, not disruptive?</strong>
                  </li>
                  <li>
                    <strong>How much control can we offer without overwhelming users?</strong>
                  </li>
                  <li>
                    <strong>What familiar patterns work within strict on-device constraints?</strong>
                  </li>
                </ul>
                <p>
                  <br /> I led UX strategy and prototyping, working closely with engineering to align on feasibility and surface design risks early. This work helped Mozilla align cross-functionally
                  and laid the foundation for deeper testing and iteration.
                </p>
              </VerticalStack>
              <HorizontalStack title="My Role" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <VerticalCard title="UX Strategy & Hypothesis Building:" bgColor="bg-gray-100" titleColor="text-black">
                  Framed product assumptions and prioritized what to explore first.
                </VerticalCard>
                <VerticalCard title="Design & Prototyping:" bgColor="bg-gray-100" titleColor="text-black">
                  Designed core flows and built prototypes in Figma for fast iteration.
                </VerticalCard>
                <VerticalCard title="Cross-Functional Collaboration:" bgColor="bg-gray-100" titleColor="text-black">
                  Partnered with engineering to translate technical limits into UX.
                </VerticalCard>
              </HorizontalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Workflow Section */}
          <ScrollSpySection value="workflow" className="flex flex-col bg-green-100 rounded-xl p-8">
            <ProjectContent>
              <ProjectSectionTitle color="text-black" dotColor="text-green-500" textAlign="text-center">
                Workflow
              </ProjectSectionTitle>
              <div className="w-full flex justify-center mt-8">
                <Image src="/mozilla-workflow.png" alt="Project workflow timeline showing hypothesis, research, and synthesis phases" width={1728} height={600} className="w-full h-auto" priority />
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Initial Vision Section */}
          <ScrollSpySection value="initial-vision">
            <ProjectSectionTitle dotColor="text-green-500">Initial Vision of Thunderbolt</ProjectSectionTitle>
            <ProjectContent>
              <VerticalStack title="Our Vision" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <p>
                  Thunderbolt aims to be a true <strong>personal AI assistant</strong>, one that understands users&apos; preferences and routines while keeping data secure and private. It builds a
                  local, encrypted, on-device knowledge base, ensuring that users&apos; information remains fully under their <strong>control</strong>.
                </p>
              </VerticalStack>
              <VerticalStack title="Competitive Research" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <p>I am unable to show this section due to a request.</p>
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/*Hypothesis Section */}
          <ScrollSpySection value="hypothesis" className="flex flex-col bg-green-50 rounded-xl p-8">
            <ProjectContent>
              <ProjectSectionTitle dotColor="text-green-500">Hypothesis</ProjectSectionTitle>
              <div className="flex flex-col p-4 lg:p-8 relative">
                <div className="flex flex-col max-w-3xl mx-auto relative">
                  <div className="flex justify-start h-[64px] lg:h-[92px]">
                    <span className="text-green-500 text-[64px] lg:text-[92px]">&quot;</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[24px] lg:text-[32px] font-medium text-center text-black">
                      For privacy-aware users, trust is the main barrier to AI adoption, and transparent data practices increase both trust and adoption.
                    </p>
                  </div>
                  <div className="flex justify-end h-[64px] lg:h-[92px]">
                    <span className="text-green-500 text-[64px] lg:text-[92px] ">&quot;</span>
                  </div>
                </div>
              </div>
              <HorizontalStack title="How might we design data practices that build trust with privacy-aware users?" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <VerticalCard title="Be transparent about data usage" bgColor="bg-green-100" titleColor="text-black">
                  We ask before collecting data and explain why it&apos;s needed and how it&apos;ll be used, using plain language inside the chat.
                </VerticalCard>
                <VerticalCard title="Let users control their data in settings" bgColor="bg-green-100" titleColor="text-black">
                  Users can delete their account, clear memory, or opt out at any time with no friction or loss of functionality.
                </VerticalCard>
                <VerticalCard title="Use familiar patterns to reduce friction" bgColor="bg-green-100" titleColor="text-black">
                  We leaned on UI patterns people already know to make privacy feel simple, not technical.
                </VerticalCard>
              </HorizontalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Design Challenge Section */}
          <ScrollSpySection value="design-challenges">
            <ProjectSectionTitle dotColor="text-green-500">Design Challenges</ProjectSectionTitle>
            <VerticalStack>
              {/* Designing for a Fast MVP, Aligned with Tech Constraints */}
              <HorizontalCard title="Designing for a Fast MVP, Aligned with Tech Constraints">
                <p className=" text-black">
                  To enable a fast, feasible MVP, I partnered closely with a team of two engineers to understand constraints around on-device AI, encryption, and data storage. This early alignment
                  shaped my UX approach, favoring <strong>familiar patterns</strong> and <strong>lightweight logic</strong> to ensure designs were implementation-ready and flexible as tech decisions
                  evolved.
                </p>
              </HorizontalCard>
              {/* Privacy-first UX */}
              <HorizontalCard title="Privacy-first UX">
                <p className=" text-black">
                  Designing for an AI assistant meant putting privacy and ethics at the core of the experience. It was essential to clearly communicate how user data is collected, stored, and used,
                  while giving people <strong>control without creating friction</strong>. Beyond compliance, the goal was to <strong>build trust</strong>: making transparency intuitive, choices
                  meaningful, and ensuring the assistant felt helpful, not intrusive.
                </p>
              </HorizontalCard>
              {/* Designing for scale */}
              <HorizontalCard title="Designing for scale">
                <p className=" text-black">
                  With many unknowns in the product&apos;s roadmap, designing for scalability was critical. I focused on building flexible components and patterns that could adapt as the product
                  evolved,
                  <strong>minimizing rework</strong> and enabling <strong>faster iteration</strong> down the line.
                </p>
              </HorizontalCard>
            </VerticalStack>
          </ScrollSpySection>

          {/* Transparency about data usage */}
          <ScrollSpySection value="transparency">
            <ProjectSectionTitle dotColor="text-green-500">Transparency about data usage</ProjectSectionTitle>
            <ProjectContent>
              <div className="flex-1 flex-col space-y-8 lg:gap-y-16">
                <ProjectFlexBlock
                  left={
                    <VerticalStack title="Designing for Informed Choice" titleColor="text-black" borderColor="border-[#C1C1C1]">
                      <p>
                        This moment introduces a data-sharing request in plain language, placed directly in the chat to feel contextual. The goal was to offer a clear, timely choices, so users know
                        what&apos;s being asked and why, without digging through settings.
                      </p>
                    </VerticalStack>
                  }
                  right={
                    <div className="flex flex-col space-y-8">
                      <Image src="/mozilla-warning-1.png" alt="mozilla mockup" width={800} height={800} className="h-auto w-auto rounded-md border border-gray-200" priority />
                    </div>
                  }
                  reverseOnDesktop={true}
                />
                <ProjectFlexBlock
                  left={
                    <div className="flex flex-col space-y-8">
                      <Image src="/mozilla-warning-response-1.png" alt="mozilla mockup" width={800} height={800} className="h-auto w-auto rounded-md border border-gray-200" priority />
                    </div>
                  }
                  right={
                    <VerticalStack title="Respectful Transparency" titleColor="text-black" borderColor="border-[#C1C1C1]">
                      <p className=" mb-8 lg:mb-12">
                        When users choose to share data, we acknowledge their choice clearly and let the assistant continue seamlessly. The goal is to reinforce trust by making consent feel natural,
                        without interrupting the flow.
                      </p>
                    </VerticalStack>
                  }
                />
                <ProjectFlexBlock
                  left={
                    <VerticalStack title="Opt-Outs Without Penalty" titleColor="text-black" borderColor="border-[#C1C1C1]">
                      <p className=" mb-8 lg:mb-12">
                        If users decline, the experience continues without pressure or penalty. The assistant adapts accordingly, respecting their choice while keeping the flow smooth and functional.
                      </p>
                    </VerticalStack>
                  }
                  right={
                    <div className="flex flex-col space-y-8">
                      <Image src="/mozilla-warning-response-2.png" alt="mozilla mockup" width={800} height={800} className="h-auto w-auto rounded-md border border-gray-200" priority />
                    </div>
                  }
                  reverseOnDesktop={true}
                />
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Settings screens */}
          <ScrollSpySection value="settings">
            <ProjectSectionTitle dotColor="text-green-500">Designing Trust Through Settings</ProjectSectionTitle>
            <ProjectContent>
              <p>
                Trust in AI begins with <strong>transparency and control</strong>. These settings give users meaningful choices over data, preferences, and assistant behavior, making control a core
                part of the experience.
              </p>
              <div className="flex flex-col gap-4">
                <ProjectHorizontalContentCard
                  leftContent={
                    <>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">Account Deletion</h3>
                        <p className="mb-4 min-h-[80px]">Users can delete their account at any time, no questions asked.</p>
                      </div>
                    </>
                  }
                  rightContent={
                    <Image src="/mozilla-setting-account.png" alt="Account deletion screen" width={800} height={800} className="flex-1 h-auto w-auto rounded-xl border border-gray-200" priority />
                  }
                  bgColor="bg-gray-100"
                />
                <ProjectHorizontalContentCard
                  leftContent={
                    <>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">Clear Memory</h3>
                        <p className="mb-4 min-h-[80px]">Users can clear their memory and past interactions whenever they choose.</p>
                      </div>
                    </>
                  }
                  rightContent={
                    <Image src="/mozilla-setting-memory.png" alt="Clear memory screen" width={800} height={800} className="flex-1 h-auto w-auto rounded-xl border border-gray-200" priority />
                  }
                  bgColor="bg-gray-100"
                />
                <ProjectHorizontalContentCard
                  leftContent={
                    <>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">Model Selection</h3>
                        <p className="mb-4 min-h-[80px]">Users can select which AI model powers their assistant experience.</p>
                      </div>
                    </>
                  }
                  rightContent={
                    <Image src="/mozilla-setting-models.png" alt="Model selection screen" width={800} height={800} className="flex-1 h-auto w-auto rounded-xl border border-gray-200" priority />
                  }
                  bgColor="bg-gray-100"
                />
                <ProjectHorizontalContentCard
                  leftContent={
                    <>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">Extensions Control</h3>
                        <p className="mb-4 min-h-[80px]">Users can enable or disable extensions based on what they need or trust.</p>
                      </div>
                    </>
                  }
                  rightContent={
                    <Image
                      src="/mozilla-setting-extentions-2.png"
                      alt="Extensions control screen"
                      width={800}
                      height={800}
                      className="flex-1 h-auto w-auto rounded-xl border border-gray-200"
                      priority
                    />
                  }
                  bgColor="bg-gray-100"
                />
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Iteration and Familiar Use */}
          <ScrollSpySection value="iteration">
            <ProjectSectionTitle dotColor="text-green-500">Designing for Fast Iteration and Familiar Use</ProjectSectionTitle>
            <ProjectContent>
              <p>
                To speed up iteration, I leaned on <strong>familiar UX patterns</strong> and avoided complex custom UI. This kept the design intuitive, reduced dev effort, and let us{' '}
                <strong>quickly prototype and evolve</strong>, without compromising usability.
              </p>

              <Tabs defaultValue="3" className="w-full gap-y-4 lg:gap-y-8" pillBgColor="bg-green-300">
                <TabsList className="w-full">
                  <TabsTrigger value="3" className="border-r border-gray-200 data-[state=active]:text-black">
                    Full Screen
                  </TabsTrigger>
                  <TabsTrigger value="2" className="border-r border-gray-200 data-[state=active]:text-black">
                    Right Sidebar Closed
                  </TabsTrigger>
                  <TabsTrigger value="1" className="data-[state=active]:text-black">
                    Both Sidebars Closed
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="3" className="flex justify-center bg-green-100 p-8 rounded-xl">
                  <Image src="/mozilla-chat-1.png" alt="mozilla mockup" width={800} height={800} className="h-auto w-full max-w-full rounded-md" priority />
                </TabsContent>
                <TabsContent value="2" className="flex justify-center bg-green-100 p-8 rounded-xl">
                  <Image src="/mozilla-chat-3.png" alt="mozilla mockup" width={800} height={800} className="h-auto w-full max-w-full rounded-md" priority />
                </TabsContent>
                <TabsContent value="1" className="flex justify-center bg-green-100 p-8 rounded-xl">
                  <Image src="/mozilla-chat-2.png" alt="mozilla mockup" width={800} height={800} className="h-auto w-full max-w-full rounded-md" priority />
                </TabsContent>
              </Tabs>
            </ProjectContent>
          </ScrollSpySection>

          {/* Sign up flow */}
          <ScrollSpySection value="clarity">
            <ProjectSectionTitle dotColor="text-green-500">Clarity at Every Step</ProjectSectionTitle>
            <ProjectContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-0 gap-x-8">
                <div className="flex flex-col gap-y-4">
                  <Image src="/mozilla-signup-1.png" alt="Account deletion screen" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
                  <VerticalStack title="1. Account Connection" titleColor="text-black" borderColor="border-[#C1C1C1]">
                    <p>The flow starts with a focused, distraction-free prompt to connect an account, carefully designed to avoid confusion or unnecessary navigation.</p>
                  </VerticalStack>
                </div>
                <div className="flex flex-col gap-y-4">
                  <Image src="/mozilla-signup-2.png" alt="Account deletion screen" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
                  <VerticalStack title="2. Syncing Progress" titleColor="text-black" borderColor="border-[#C1C1C1]">
                    <p>
                      Showing real-time syncing feedback helps manage expectations and prevents user uncertainty. Visual cues and messaging make it clear the system is working, reducing drop-off
                      during wait time.
                    </p>
                  </VerticalStack>
                </div>
                <div className="flex flex-col gap-y-4">
                  <Image src="/mozilla-signup-3.png" alt="Account deletion screen" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
                  <VerticalStack title="3. Ready to Chat" titleColor="text-black" borderColor="border-[#C1C1C1]">
                    <p>
                      Once syncing is complete, users land directly in the chat experience, with full context. No confusion, no extra steps, just a smooth transition that respects their time and keeps
                      momentum going.
                    </p>
                  </VerticalStack>
                </div>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Exploring Early Concepts Section */}
          <ScrollSpySection value="early-concepts">
            <ProjectSectionTitle dotColor="text-green-500">Exploring Early Concepts</ProjectSectionTitle>
            <ProjectContent>
              <VerticalStack>
                {/* Left Column - Text Content */}
                <p>I used low-fidelity wireframes to quickly define core user flows and align early with product and engineering. This lean approach helped us: </p>
                <ul className="list-disc ml-5">
                  <li>
                    <strong>Explore layout and interaction ideas with speed</strong>
                  </li>
                  <li>
                    <strong>Gather fast, actionable feedback from stakeholders</strong>
                  </li>
                  <li>
                    <strong>Identify technical constraints early and adapt confidently</strong>
                  </li>
                </ul>
                <p>Sharing early concepts kept the team aligned, minimized rework, and set us up for high-fidelity design with clarity and momentum.</p>
              </VerticalStack>
              {/* Right Column - Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Image src="/mozilla-v1-1.png" alt="mozilla mockup" width={400} height={400} className="w-full h-auto rounded-xl border border-gray-200" priority />
                <Image src="/mozilla-v1-4.png" alt="mozilla mockup" width={400} height={400} className="w-full h-auto rounded-xl border border-gray-200" priority />
                <Image src="/mozilla-v1-3.png" alt="mozilla mockup" width={400} height={400} className="w-full h-auto rounded-xl border border-gray-200" priority />
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Light and Dark Mode Mockups */}
          <ScrollSpySection value="dark-mode">
            <ProjectSectionTitle dotColor="text-green-500">Dark Mode for Modern Use</ProjectSectionTitle>
            <ProjectContent>
              <p>
                Dark mode was designed not just for aesthetics, but to reduce eye strain and improve comfort in low-light environments, meeting both <strong>user needs</strong> and{' '}
                <strong>modern platform expectations.</strong>
              </p>

              <div className="flex">
                <Tabs defaultValue="dark" className="w-full gap-y-4 lg:gap-y-8" pillBgColor="bg-green-300">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="light" className="data-[state=active]:text-black">
                      Light Mode
                    </TabsTrigger>
                    <TabsTrigger value="dark" className="data-[state=active]:text-black">
                      Dark Mode
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="light" className="flex justify-center bg-green-100 p-8 rounded-xl">
                    <Image src="/mozilla-light.png" alt="mozilla mockup" width={800} height={800} className="h-auto w-full max-w-full rounded-md" priority />
                  </TabsContent>
                  <TabsContent value="dark" className="flex justify-center bg-green-100 p-8 rounded-xl  ">
                    <Image src="/mozilla-dark.png" alt="mozilla mockup" width={800} height={800} className="h-auto w-full max-w-full rounded-md" priority />
                  </TabsContent>
                </Tabs>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Mobile Mockups */}
          <ScrollSpySection value="mobile">
            <div className="flex">
              <div className="flex  flex-1 flex-col space-y-0 justify-center">
                <ProjectSectionTitle dotColor="text-green-500">Mobile First</ProjectSectionTitle>
                <Image src="/mozilla-mobiles.png" alt="mozilla mockup" width={800} height={800} className="flex-1 h-auto block lg:hidden w-auto mb-4 items-center justify-center" priority />
                <p className=" items-center">
                  Although the current product is web-based, I approached the design with a mobile-first mindset where it made sense. From layout choices to interaction patterns, I considered how the
                  experience could <strong>translate to smaller screens with minimal rework.</strong>
                </p>
              </div>
              <div className="flex-2 flex justify-center">
                <Image src="/mozilla-mobiles.png" alt="mozilla mockup" width={800} height={800} className="flex-1 h-auto hidden lg:block w-auto" priority />
              </div>
            </div>
          </ScrollSpySection>

          {/* Typography Section */}
          <ScrollSpySection value="typography" className="bg-[#212121] text-white p-8 rounded-2xl">
            <ProjectSectionTitle color="text-white" dotColor="text-green-500">
              Typography
            </ProjectSectionTitle>
            <ProjectContent>
              {/* Left Column - Large "Aa" Display */}
              <div className="flex-1 flex items-center justify-center">
                <span className='text-[200px] font-regular font-["Inter"] tracking-tight'>Aa</span>
              </div>
              {/* Right Column - Typography Details */}
              <div className="flex-1 flex gap-x-4 justify-center">
                {/* Typeface */}
                <VerticalStack title="Typeface" titleColor="text-gray-400" borderColor="border-[#3b3b3b]" className="flex-1 border border-[#3b3b3b] p-4 rounded-xl">
                  <p>Inter</p>
                </VerticalStack>
                {/* Weights */}
                <VerticalStack title="Weights" titleColor="text-gray-400" borderColor="border-[#3b3b3b]" className="flex-1 border border-[#3b3b3b] p-4 rounded-xl">
                  <p className=" font-normal">Regular</p>
                  <p className=" font-semibold">Semi-Bold</p>
                </VerticalStack>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Colors Section */}
          <ScrollSpySection value="colors">
            <ProjectColorsSection
              title="Main Colors"
              dotColor="text-green-500"
              colors={[
                { hex: '#BBF3C0', textClass: 'text-black' },
                { hex: '#09320D', textClass: 'text-white' },
                { hex: '#FF2E2E', textClass: 'text-white' },
                { hex: '#FFFFFF', textClass: 'text-black', border: true },
                { hex: '#F7F7F8', textClass: 'text-black', border: true },
                { hex: '#191919', textClass: 'text-white' },
                { hex: '#000000', textClass: 'text-white' },
              ]}
            />
          </ScrollSpySection>

          {/* Learning Section */}
          <ScrollSpySection value="learning">
            <ProjectContent>
              {/* Title */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ProjectSectionTitle dotColor="text-green-500">Learning</ProjectSectionTitle>
                {/* Build Fast, Learn Faster */}
                <div className="flex flex-col bg-gray-100 p-4 rounded-xl">
                  <span className="font-semibold">Build Fast, Learn Faster:</span>
                  <p>
                    This project reinforced the need for an agile, test-and-learn mindset over a linear build. Given the complexity and ambition of the product, fast iteration based on real-world
                    feedback is essential, not just for usability, but for achieving <strong>product-market fit.</strong>
                  </p>
                </div>
                {/* Balancing Agility with Control */}
                <div className="flex flex-col bg-gray-100 p-4 rounded-xl">
                  <span className="font-semibold">Balancing Agility with Control:</span>
                  <p>
                    One key takeaway was the value of combining an <strong>agile approach with a gated release strategy</strong>, moving quickly, but within clearly defined phases. This allows us to
                    learn fast while keeping scope focused and risk manageable at each stage.
                  </p>
                </div>
                {/* I Am Not the User */}
                <div className="flex flex-col bg-gray-100 p-4 rounded-xl">
                  <span className="font-semibold">I Am Not the User:</span>
                  <p>
                    While I&apos;m personally excited about the vision, I&apos;ve learned to check that excitement against <strong>user behavior, data, and testing signals.</strong> I am not the user,
                    and assuming otherwise can derail even the best ideas. The real impact comes from <strong>asking better questions</strong>, observing how people actually use the product, and
                    knowing what to test next and why.
                  </p>
                </div>
                {/* Designing for Trust */}
                <div className="flex flex-col bg-gray-100 p-4 rounded-xl">
                  <span className="font-semibold">Designing for Trust:</span>
                  <p>
                    Designing for privacy and trust adds a unique layer of responsibility. Every opt-in, every permission request, every moment of friction must be intentional. It&apos;s not just
                    about features, it&apos;s about ensuring the <strong>experience reflects user values and long-term strategy.</strong>
                  </p>
                </div>
                {/* Staying Curious and Outcome-Oriented */}
                <div className="flex flex-col bg-gray-100 p-4 rounded-xl">
                  <span className="font-semibold">Staying Curious and Outcome-Oriented:</span>
                  <p>
                    Moving forward, I&apos;m focused on staying curious, integrating feedback loops early, and making sure design decisions are grounded in both user needs and measurable outcomes.
                  </p>
                </div>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Figma Exploration Section */}
          <ScrollSpySection value="figma" className="flex flex-col bg-primary rounded-xl p-8 text-white">
            <ProjectContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Left Column - Text Content */}
                <div>
                  <ProjectSectionTitle color="text-white" dotColor="text-green-500">
                    Explore my portfolio in Figma
                  </ProjectSectionTitle>
                  <p className=" mb-4 md:mb-8">Design speaks louder than words. Check out the full Figma file to see the process, decisions, and iterations behind this project.</p>
                  <Link
                    href="https://www.figma.com/design/q77RkGzo90PYeOzwp1ADJm/Jess-s-Portfolio--Public-?node-id=3-13787&t=J3zCiHTUrdhoAr61-1"
                    className="inline-flex items-center bg-green-300 hover:bg-green-500 text-black px-6 py-3 rounded-lg transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Check Out Figma
                    <ArrowUpRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
                {/* Right Column - iPhone Image */}
                <div className="flex justify-center">
                  <Image src="/mozilla-cta.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-full" priority />
                </div>
              </div>
            </ProjectContent>
          </ScrollSpySection>
        </ScrollSpyViewport>
      </ScrollSpy>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
