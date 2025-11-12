'use client'

import ProjectContent from '@/components/project-content'
import ProjectFlexBlock from '@/components/project-flex-block'
import ProjectHeroSection from '@/components/project-hero-section'
import ProjectHorizontalBlock from '@/components/project-horizontal-block'
import ProjectHorizontalCard from '@/components/project-horizontal-card'
import ProjectSectionTitle from '@/components/project-section-title'
import CtaSection from '@/components/ui/cta'
import { ScrollSpy, ScrollSpyLink, ScrollSpyNav, ScrollSpySection, ScrollSpyViewport } from '@/components/ui/scroll-spy'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function VercelPage() {
  return (
    <main>
      {/* Hero Section */}

      <ScrollSpy offset={0} defaultValue="overview" orientation="horizontal" className="w-full max-w-7xl mx-auto">
        <ScrollSpyNav className="hidden lg:flex w-60 p-6 sticky top-0 h-screen flex-col gap-2 shrink-0">
          <ScrollSpyLink value="overview" activeClassName="data-[state=active]:text-[#9333EA]">
            Overview
          </ScrollSpyLink>
          <ScrollSpyLink value="observation" activeClassName="data-[state=active]:text-[#9333EA] data-[state=active]:font-semibold ">
            Observation & Research
          </ScrollSpyLink>
          <ScrollSpyLink value="problem-statement" activeClassName="data-[state=active]:text-[#9333EA] data-[state=active]:font-semibold ">
            Problem Statement
          </ScrollSpyLink>
          <ScrollSpyLink value="current-state" activeClassName="data-[state=active]:text-[#9333EA] data-[state=active]:font-semibold ">
            Current App Behavior
          </ScrollSpyLink>
          <ScrollSpyLink value="design-exploration" activeClassName="data-[state=active]:text-[#9333EA] data-[state=active]:font-semibold ">
            Design Exploration
          </ScrollSpyLink>
          <ScrollSpyLink value="proposed-solution" activeClassName="data-[state=active]:text-[#9333EA] data-[state=active]:font-semibold ">
            Proposed Solution
          </ScrollSpyLink>
          <ScrollSpyLink value="success-metrics" activeClassName="data-[state=active]:text-[#9333EA] data-[state=active]:font-semibold ">
            Success Metrics
          </ScrollSpyLink>
          <ScrollSpyLink value="constraints" activeClassName="data-[state=active]:text-[#9333EA] data-[state=active]:font-semibold ">
            Constraints & Tradeoffs
          </ScrollSpyLink>
          <ScrollSpyLink value="final-thoughts" activeClassName="data-[state=active]:text-[#9333EA] data-[state=active]:font-semibold ">
            Final Thoughts
          </ScrollSpyLink>
          <ScrollSpyLink value="figma" activeClassName="data-[state=active]:text-[#9333EA] data-[state=active]:font-semibold ">
            Figma
          </ScrollSpyLink>
        </ScrollSpyNav>
        <ScrollSpyViewport className="flex-1 max-w-3xl mx-auto">
          <ProjectHeroSection title="V0 Design Exercise" subtitle="Improving Visual Affordances in Chat Interfaces" imageSrc="/vercel-cover.png" imageAlt="Vercel V0 interface showcase" />

          {/* Overview Section */}
          <ScrollSpySection value="overview" className="flex flex-col">
            <ProjectSectionTitle color="text-black" dotColor="text-[#9333EA]">
              Overview
            </ProjectSectionTitle>
            <ProjectContent>
              <p>
                This is a <strong>design thinking exercise</strong> exploring how I approach product improvement opportunities. I have tremendous respect for Vercel&apos;s design team and the work
                they&apos;ve done with V0.
                <br /> <br />
                As a user of V0, I noticed a recurring moment of friction that sparked this exploration. Rather than a critique of existing decisions, this case study demonstrates{' '}
                <strong>my process</strong>, <strong>systems thinking</strong>, and how I <strong>balance user needs with constraints</strong>.
                <br />
              </p>
              <div className="flex flex-col gap-y-2">
                <h2 className="text-2xl text-[#a1a1a1]">My Approach</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
                  <div className="flex flex-col bg-gray-50 p-4 rounded-xl">
                    <span className="font-semibold">Problem Identification:</span>
                    <p>Observed friction during real usage and defined the user impact.</p>
                  </div>
                  <div className="flex flex-col bg-gray-50 p-4 rounded-xl">
                    <span className="font-semibold">Solution Exploration:</span>
                    <p>Evaluated multiple approaches against clear criteria before recommending one.</p>
                  </div>
                  <div className="flex flex-col bg-gray-50 p-4 rounded-xl">
                    <span className="font-semibold">Strategic Thinking:</span>
                    <p>Considered constraints, tradeoffs, and validation methods throughout.</p>
                  </div>
                </div>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* The Observation Section */}
          <ScrollSpySection value="observation">
            <ProjectSectionTitle color="text-black" dotColor="text-[#9333EA]">
              The Observation & Research
            </ProjectSectionTitle>
            <ProjectContent>
              <p className="text-black">
                While reviewing past interacions in a lengthy V0 chat, I found myself repeatedly clicking on components to discover which ones were expandable. There was no immediate visual cue to
                distinguish between expandable accordions and static content when scanning through the conversation.
              </p>
              <div className="flex-1 gap-y-8 ">
                <h2 className="text-2xl  text-[#a1a1a1] mb-4">Research</h2>
                <ProjectHorizontalBlock title="Participants" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                  <p>3 friends</p>
                  <div className="grid grid-rows-1 gap-1 mt-1 md:mt-2">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <User key={i} className="w-6 h-6 fill-purple-400 stroke-none" />
                      ))}
                    </div>
                  </div>
                </ProjectHorizontalBlock>
                <ProjectHorizontalBlock title="Methods" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                  <div className="space-y-1 md:space-y-2">
                    <div>
                      <span className="font-semibold">Observation:</span>
                      <span> Watched friends naturally navigate through their V0 chat sessions, noting how they interacted with different components</span>
                    </div>
                    <div>
                      <span className="font-semibold">Follow-up Question:</span>
                      <span> Asked if they could tell which components were expandable (accordions) just by looking at them, without hovering or clicking</span>
                    </div>
                  </div>
                </ProjectHorizontalBlock>
                <ProjectHorizontalBlock title="Key Findings" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                  <div className="space-y-1 md:space-y-2">
                    <div>
                      <span className="font-semibold">Trial & Error:</span>
                      <span> All 3 participants clicked or hovered on multiple components to discover which were expandable.</span>
                    </div>
                    <div>
                      <span className="font-semibold">Frustration:</span>
                      <span> Participants expressed minor frustration at having to &quot;guess&quot; which blocks contained hidden content.</span>
                    </div>
                  </div>
                </ProjectHorizontalBlock>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl mb-2 md:mb-4 text-[#a1a1a1]">When This Matters Most</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
                  <div className="flex flex-col">
                    <span className="font-semibold mb-2 text-black">Long Conversations</span>
                    <p className="text-black">When users have 10+ exchanges and need to reference previous outputs quickly.</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold mb-2 text-black">Skimming Mode</span>
                    <p className="text-black">When quickly scanning for specific information without reading every detail.</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold mb-2 text-black">Decision-Making</span>
                    <p className="text-black">When choosing which details to explore without trial-and-error clicking.</p>
                  </div>
                </div>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Problem Statement Section */}
          <ScrollSpySection value="problem-statement" className="bg-purple-50 p-8 rounded-xl">
            <ProjectSectionTitle color="text-black" textAlign="text-center" dotColor="text-[#9333EA]">
              The Problem Statement
            </ProjectSectionTitle>
            <ProjectContent>
              <div className="flex flex-col max-w-3xl mx-auto relative">
                <div className="flex justify-start h-[64px] lg:h-[92px]">
                  <span className="text-[#9333EA] text-[64px] lg:text-[92px]">&quot;</span>
                </div>
                <div className="flex flex-col">
                  <p className="text-[24px] lg:text-[24px] font-medium text-center text-black">
                    When users skim through V0 chat history, there&apos;s <strong>no persistent visual indicator</strong> to distinguish expandable components (accordions) from static ones. This
                    creates <strong>unnecessary cognitive load and friction</strong>, as users must hover or click to discover interactivity.
                  </p>
                </div>
                <div className="flex justify-end h-[64px] lg:h-[92px]">
                  <span className="text-[#9333EA] text-[64px] lg:text-[92px] ">&quot;</span>
                </div>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Current State Section */}
          <ScrollSpySection value="current-state">
            <ProjectSectionTitle dotColor="text-[#9333EA]">Current App Behavior</ProjectSectionTitle>
            <ProjectContent>
              <ProjectFlexBlock
                left={
                  <div className="flex flex-col">
                    <h2 className="text-2xl mb-2 md:mb-4 text-[#a1a1a1]">No Visual Indicator for Expandable Components</h2>
                    <p>
                      When users skim through the V0 chat, there&apos;s no visual indicator to distinguish which components are accordions (expandable) from those that aren&apos;t. This creates
                      unnecessary friction as users must click or hover to discover expandability.
                    </p>
                  </div>
                }
                right={
                  <div className="flex flex-col space-y-8">
                    <Image src="/vercel-chat.png" alt="Vercel chat interface" width={800} height={800} className="p-4 h-auto w-auto rounded-xl border border-border" priority />
                  </div>
                }
                reverseOnDesktop={true}
              />
              <ProjectFlexBlock
                left={
                  <div className="flex flex-col space-y-8">
                    <Image src="/vercel-onhover.png" alt="Vercel chat interface" width={800} height={800} className="p-4 h-auto w-auto rounded-xl border border-border" priority />
                  </div>
                }
                right={
                  <div className="flex flex-col">
                    <h2 className="text-2xl mb-2 md:mb-4 text-[#a1a1a1]">On Hover</h2>
                    <p className=" mb-8 lg:mb-12">
                      Chevron shows up only on hover. Without hovering, it is unclear that this component is an accordion. This will also require Vercel to design a new UI for the mobile view.
                    </p>
                  </div>
                }
              />
              <ProjectFlexBlock
                left={
                  <div className="flex flex-col">
                    <h2 className="text-2xl mb-2 md:mb-4 text-[#a1a1a1]">When Accordion is Expanded</h2>
                    <p className=" mb-8 lg:mb-12">Icon on the left turns into a chevron down icon. </p>
                  </div>
                }
                right={
                  <div className="flex flex-col space-y-8">
                    <Image src="/vercel-chat-expand.png" alt="Vercel chat interface" width={800} height={800} className="p-4 h-auto w-auto rounded-xl border border-border" priority />
                  </div>
                }
                reverseOnDesktop={true}
              />
            </ProjectContent>
          </ScrollSpySection>

          {/* Design Exploration Section */}
          <ScrollSpySection value="design-exploration">
            <ProjectSectionTitle dotColor="text-[#9333EA]">Design Exploration</ProjectSectionTitle>
            <ProjectContent>
              <p className="mx-auto">
                Here are three approaches I considered, evaluated against criteria of <strong>discoverability</strong>, <strong>consistency</strong>, <strong>accessibility</strong>, and{' '}
                <strong>engineering complexity</strong>.
              </p>

              <div className="flex flex-col gap-4">
                {/* Solution 1 */}
                <ProjectHorizontalCard
                  leftContent={
                    <>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">
                          Solution 1: <br />
                          Persistent Chevron Icon
                        </h3>
                        <p className="mb-4 min-h-[80px]">Add an always-visible chevron indicator positioned on the right side of accordion components.</p>
                      </div>
                      <div className="space-y-2 text-sm mt-4">
                        <div>
                          <span className="font-semibold text-gray-500">Pros:</span>
                          <p className="text-gray-700">Clear affordance, minimal visual weight, industry standard pattern</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-500">Cons:</span>
                          <p className="text-gray-700">Adds visual element to every accordion</p>
                        </div>
                      </div>
                    </>
                  }
                  rightContent={<Image src="/vercel-option1.png" alt="Vercel chat interface" width={800} height={800} className="flex-1 h-auto w-auto rounded-xl border border-gray-200" priority />}
                  badge="My Pick"
                  badgeColor="bg-[#9333EA]"
                  border={true}
                  borderColor="border-[#9333EA]"
                  bgColor="bg-gray-50"
                />

                {/* Solution 2 */}
                <ProjectHorizontalCard
                  leftContent={
                    <>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">
                          Solution 2: <br />
                          Subtle Border Treatment
                        </h3>
                        <p className="mb-4 min-h-[80px]">Use a subtle border style to indicate expandable content.</p>
                      </div>
                      <div className="space-y-2 text-sm mt-4">
                        <div>
                          <span className="font-semibold text-gray-500">Pros:</span>
                          <p className="text-gray-700">More visible than just a chevron icon</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-500">Cons:</span>
                          <p className="text-gray-700">More visual noise than just a chevron icon</p>
                        </div>
                      </div>
                    </>
                  }
                  rightContent={<Image src="/vercel-option2.png" alt="Vercel chat interface" width={800} height={800} className="flex-1 h-auto w-auto rounded-xl border border-gray-200" priority />}
                  bgColor="bg-gray-50"
                />

                {/* Solution 3 */}
                <ProjectHorizontalCard
                  leftContent={
                    <>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">
                          Solution 3: <br />
                          Text Label Indicator
                        </h3>
                        <p className="mb-4 min-h-[80px]">Add small &quot;Show all&quot; or &quot;Expand&quot; text label to accordion headers.</p>
                      </div>
                      <div className="space-y-2 text-sm mt-4">
                        <div>
                          <span className="font-semibold text-gray-500">Pros:</span>
                          <p className="text-gray-700">Extremely explicit, accessible with text labels</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-500">Cons:</span>
                          <p className="text-gray-700">Adds visual noise than just a chevron icon</p>
                        </div>
                      </div>
                    </>
                  }
                  rightContent={<Image src="/vercel-option3.png" alt="Vercel chat interface" width={800} height={800} className="flex-1 h-auto w-auto rounded-xl border border-gray-200" priority />}
                  bgColor="bg-gray-50"
                />
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Proposed Solution Section */}
          <ScrollSpySection value="proposed-solution">
            <ProjectSectionTitle dotColor="text-[#9333EA]">Proposed Solution: Persistent Chevron</ProjectSectionTitle>

            <ProjectContent>
              <div className="flex flex-col">
                <h2 className="text-2xl mb-2 md:mb-4 text-[#a1a1a1]">Why This Solution?</h2>

                <p className="mb-6">After exploring these options, the persistent chevron felt like the best fit. Here&apos;s why:</p>
                <ul className="space-y-3">
                  <li className="flex">
                    <span className="mr-3">•</span>
                    <span>
                      It&apos;s a <strong>widely understood pattern</strong> (familiar from file explorers, navigation menus, FAQs)
                    </span>
                  </li>
                  <li className="flex">
                    <span className="mr-3">•</span>
                    <span>
                      It provides <strong>immediate visual feedback</strong> without requiring hover states
                    </span>
                  </li>
                  <li className="flex">
                    <span className="mr-3">•</span>
                    <span>
                      It maintains V0&apos;s <strong>clean aesthetic</strong> while adding functional clarity
                    </span>
                  </li>
                  <li className="flex">
                    <span className="mr-3">•</span>
                    <span>
                      It supports <strong>keyboard navigation and screen reader patterns</strong> naturally
                    </span>
                  </li>
                </ul>
              </div>
              <Tabs defaultValue="1" className="max-w-3xl flex gap-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="1">New Design</TabsTrigger>
                  <TabsTrigger value="2">Current Design</TabsTrigger>
                </TabsList>
                <TabsContent value="1" className="flex justify-center w-full">
                  <Image src="/vercel-after1.png" alt="Vercel chat interface" width={800} height={800} className="flex-1 h-auto w-auto " priority />
                </TabsContent>
                <TabsContent value="2" className="flex justify-center  w-full">
                  <Image src="/vercel-before1.png" alt="Vercel chat interface" width={800} height={800} className="flex-1 h-auto w-auto " priority />
                </TabsContent>
              </Tabs>
            </ProjectContent>
          </ScrollSpySection>

          {/* Success Metrics Section */}
          <ScrollSpySection value="success-metrics">
            <ProjectSectionTitle dotColor="text-[#9333EA]">Expected Impact & Success Metrics</ProjectSectionTitle>
            <ProjectContent>
              <div className="flex flex-col">
                <h2 className="text-2xl mb-2 text-[#a1a1a1]">Expected Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
                  <div className="flex flex-col bg-gray-100 p-4 rounded-xl">
                    <span className="font-semibold">Reduced Friction</span>
                    <p>Designed core flows and built prototypes in Figma for fast iteration.</p>
                  </div>
                  <div className="flex flex-col bg-gray-100 p-4 rounded-xl">
                    <span className="font-semibold">Faster Scanning</span>
                    <p>Reduced Time-to-Expand</p>
                  </div>
                  <div className="flex flex-col bg-gray-100 p-4 rounded-xl">
                    <span className="font-semibold">Increased Confidence</span>
                    <p>More Intentional Expansions</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl mb-2 text-[#a1a1a1]">How to Validate</h2>
                <p>
                  A/B test comparing click patterns, hover frequency, and time-to-interaction between current and proposed designs. Track whether users expand accordions more confidently (fewer
                  hover-then-abandon patterns). Additionally, gather qualitative feedback on whether the visual indicator feels natural and helpful in context.
                </p>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Constraints & Tradeoffs Section */}
          <ScrollSpySection value="constraints">
            <ProjectSectionTitle dotColor="text-[#9333EA]">Constraints & Tradeoffs</ProjectSectionTitle>
            <ProjectContent>
              <p className="text-black">I recognize that design decisions exist within constraints. The Vercel team has likely considered:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border p-6 rounded-xl">
                  <h3 className="font-semibold mb-2">Visual Density</h3>
                  <p className="text-sm">Every icon adds visual weight. Is the tradeoff worth it for improved discoverability?</p>
                </div>
                <div className="border border-border p-6 rounded-xl">
                  <h3 className="font-semibold mb-2">Engineering Cost</h3>
                  <p className="text-sm">How complex is implementation across all accordion instances? What&apos;s the development timeline?</p>
                </div>
                <div className="border border-border p-6 rounded-xl">
                  <h3 className="font-semibold mb-2">Mobile Optimization</h3>
                  <p className="text-sm">Does this work well on smaller screens with touch interactions? Are touch targets sufficient?</p>
                </div>
                <div className="border border-border p-6 rounded-xl">
                  <h3 className="font-semibold mb-2">Brand Aesthetic</h3>
                  <p className="text-sm">Does this align with V0&apos;s minimalist design philosophy and Vercel&apos;s overall brand?</p>
                </div>
                <div className="border border-border p-6 rounded-xl">
                  <h3 className="font-semibold mb-2">User Preference</h3>
                  <p className="text-sm">Some power users may prefer the cleaner, current interface. How do we balance different user needs?</p>
                </div>
                <div className="border border-border p-6 rounded-xl">
                  <h3 className="font-semibold mb-2">Strategic Priorities</h3>
                  <p className="text-sm">Where does this fit within the product roadmap? Are there higher-priority improvements?</p>
                </div>
              </div>

              <div className="">
                <p className="text-black">
                  <strong>The solution should be validated against these constraints with actual user data, not assumptions.</strong> Without access to usage analytics, technical architecture details,
                  and strategic priorities, these are educated hypotheses that would need refinement.
                </p>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Final Thoughts Section */}
          <ScrollSpySection value="final-thoughts">
            <ProjectSectionTitle dotColor="text-[#9333EA]">Final Thoughts</ProjectSectionTitle>

            <ProjectContent>
              <p className="text-lg">
                I share this not as a definitive answer, but as an example of how I approach design opportunities. With access to user analytics, technical constraints, and Vercel&apos;s strategic
                priorities, my recommendations would likely evolve.
              </p>
              <p className="text-lg">
                What I like about Vercel is the attention to craft evident in every interaction. Products like V0 represent the future of how designers and developers work, and my career dream is to
                contribute to that vision.
              </p>
              <p className="text-lg font-semibold">If I have an oppotunity to talk to Vercel&apos;s design team, I&apos;d like to learn:</p>
              <ul className="space-y-2 text-lg">
                <li>• What I might be missing in my analysis</li>
                <li>• How this fits (or doesn&apos;t) with Vercel&apos;s design philosophy</li>
                <li>• What you&apos;ve learned from real user data about the current pattern</li>
                <li>• How the design team approaches similar challenges</li>
              </ul>
            </ProjectContent>
          </ScrollSpySection>
          <ScrollSpySection value="figma" className="flex flex-col bg-[#9233ea18] p-8 rounded-2xl">
            <ProjectContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {/* Left Column - Text Content */}
                <div>
                  <ProjectSectionTitle dotColor="text-[#9233ea]">ExploreFigma File</ProjectSectionTitle>
                  <p className="mb-12">Design speaks louder than words. Check out the full Figma file to see the process, decisions, and iterations behind this project.</p>
                  <Link
                    href="https://www.figma.com/design/M3wsoTlIAYxvTij1XlxVqE/Vercel-V0--Public-?node-id=0-1&t=wb9KeRkJ0PwDqPSw-1"
                    className="inline-flex items-center bg-[#9233ea] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Check Out Figma
                    <ArrowUpRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>

                {/* Right Column - iPhone Image */}
                <div className="flex justify-center">
                  <Image src="/vercel-figma.png" alt="iPhone mockup of Lilypad's mobile design" width={1200} height={1200} className="h-auto w-full" priority />
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
