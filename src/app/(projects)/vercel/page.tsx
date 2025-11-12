'use client'

import CtaSection from '@/components/ui-block/cta'
import { HorizontalCard, VerticalCard } from '@/components/ui-block/project-card'
import ProjectContent from '@/components/ui-block/project-content'
import ProjectFigmaSection from '@/components/ui-block/project-figma-section'
import ProjectFlexBlock from '@/components/ui-block/project-flex-block'
import ProjectHeroSection from '@/components/ui-block/project-hero-section'
import ProjectSectionTitle from '@/components/ui-block/project-section-title'
import { HorizontalStack, VerticalStack } from '@/components/ui-block/project-stack'
import { ScrollSpy, ScrollSpyLink, ScrollSpyNav, ScrollSpySection, ScrollSpyViewport } from '@/components/ui/scroll-spy'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User } from 'lucide-react'
import Image from 'next/image'

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
              <VerticalStack>
                <h2 className="text-2xl text-[#a1a1a1]">My Approach</h2>
                <HorizontalStack mobileCols={1} desktopCols={3}>
                  <VerticalCard title="Problem Identification:" bgColor="bg-gray-50" titleColor="text-black">
                    Observed friction during real usage and defined the user impact.
                  </VerticalCard>
                  <VerticalCard title="Solution Exploration:" bgColor="bg-gray-50" titleColor="text-black">
                    Evaluated multiple approaches against clear criteria before recommending one.
                  </VerticalCard>
                  <VerticalCard title="Strategic Thinking:" bgColor="bg-gray-50" titleColor="text-black">
                    Considered constraints, tradeoffs, and validation methods throughout.
                  </VerticalCard>
                </HorizontalStack>
              </VerticalStack>
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
              <VerticalStack title="Research" titleColor="text-[#a1a1a1]">
                <HorizontalCard title="Participants" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                  <p>3 friends</p>
                  <div className="grid grid-rows-1 gap-1 mt-1 md:mt-2">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <User key={i} className="w-6 h-6 fill-purple-400 stroke-none" />
                      ))}
                    </div>
                  </div>
                </HorizontalCard>
                <HorizontalCard title="Methods" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                  <div>
                    <span className="font-semibold">Observation:</span>
                    <span> Watched friends naturally navigate through their V0 chat sessions, noting how they interacted with different components</span>
                  </div>
                  <div>
                    <span className="font-semibold">Follow-up Question:</span>
                    <span> Asked if they could tell which components were expandable (accordions) just by looking at them, without hovering or clicking</span>
                  </div>
                </HorizontalCard>
                <HorizontalCard title="Key Findings" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                  <div>
                    <span className="font-semibold">Trial & Error:</span>
                    <span> All 3 participants clicked or hovered on multiple components to discover which were expandable.</span>
                  </div>
                  <div>
                    <span className="font-semibold">Frustration:</span>
                    <span> Participants expressed minor frustration at having to &quot;guess&quot; which blocks contained hidden content.</span>
                  </div>
                </HorizontalCard>
              </VerticalStack>

              <VerticalStack title="When This Matters Most" titleColor="text-[#a1a1a1]">
                <HorizontalStack mobileCols={1} desktopCols={3}>
                  <VerticalCard title="Long Conversations" titleColor="text-black">
                    When users have 10+ exchanges and need to reference previous outputs quickly.
                  </VerticalCard>
                  <VerticalCard title="Skimming Mode" titleColor="text-black">
                    When quickly scanning for specific information without reading every detail.
                  </VerticalCard>
                  <VerticalCard title="Decision-Making" titleColor="text-black">
                    When choosing which details to explore without trial-and-error clicking.
                  </VerticalCard>
                </HorizontalStack>
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Problem Statement Section */}
          <ScrollSpySection value="problem-statement" className="bg-purple-50 p-8 rounded-xl">
            <ProjectSectionTitle color="text-black" textAlign="text-center" dotColor="text-[#9333EA]">
              The Problem Statement
            </ProjectSectionTitle>
            <ProjectContent>
              <VerticalStack>
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
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Current State Section */}
          <ScrollSpySection value="current-state">
            <ProjectSectionTitle dotColor="text-[#9333EA]">Current App Behavior</ProjectSectionTitle>
            <ProjectContent>
              <ProjectFlexBlock
                left={
                  <VerticalStack title="No Visual Indicator for Expandable Components" titleColor="text-[#a1a1a1]">
                    <p>
                      When users skim through the V0 chat, there&apos;s no visual indicator to distinguish which components are accordions (expandable) from those that aren&apos;t. This creates
                      unnecessary friction as users must click or hover to discover expandability.
                    </p>
                  </VerticalStack>
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
                  <VerticalStack title="On Hover" titleColor="text-[#a1a1a1]">
                    <p className=" mb-8 lg:mb-12">
                      Chevron shows up only on hover. Without hovering, it is unclear that this component is an accordion. This will also require Vercel to design a new UI for the mobile view.
                    </p>
                  </VerticalStack>
                }
              />
              <ProjectFlexBlock
                left={
                  <VerticalStack title="When Accordion is Expanded" titleColor="text-[#a1a1a1]">
                    <p className=" mb-8 lg:mb-12">Icon on the left turns into a chevron down icon. </p>
                  </VerticalStack>
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
                <ProjectFlexBlock
                  variant="card"
                  left={
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
                  right={<Image src="/vercel-option1.png" alt="Vercel chat interface" width={800} height={800} className="flex-1 h-auto w-auto rounded-xl border border-gray-200" priority />}
                  badge="My Pick"
                  badgeColor="bg-[#9333EA]"
                  border={true}
                  borderColor="border-[#9333EA]"
                  bgColor="bg-gray-50"
                />

                {/* Solution 2 */}
                <ProjectFlexBlock
                  variant="card"
                  left={
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
                  right={<Image src="/vercel-option2.png" alt="Vercel chat interface" width={800} height={800} className="flex-1 h-auto w-auto rounded-xl border border-gray-200" priority />}
                  bgColor="bg-gray-50"
                />

                {/* Solution 3 */}
                <ProjectFlexBlock
                  variant="card"
                  left={
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
                  right={<Image src="/vercel-option3.png" alt="Vercel chat interface" width={800} height={800} className="flex-1 h-auto w-auto rounded-xl border border-gray-200" priority />}
                  bgColor="bg-gray-50"
                />
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Proposed Solution Section */}
          <ScrollSpySection value="proposed-solution">
            <ProjectSectionTitle dotColor="text-[#9333EA]">Proposed Solution: Persistent Chevron</ProjectSectionTitle>

            <ProjectContent>
              <VerticalStack title="Why This Solution?" titleColor="text-[#a1a1a1]">
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
              </VerticalStack>
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
              <HorizontalStack mobileCols={1} desktopCols={3} title="Expected Impact" titleColor="text-[#a1a1a1]">
                <VerticalCard title="Reduced Friction" bgColor="bg-gray-100" titleColor="text-black">
                  Designed core flows and built prototypes in Figma for fast iteration.
                </VerticalCard>
                <VerticalCard title="Faster Scanning" bgColor="bg-gray-100" titleColor="text-black">
                  Reduced Time-to-Expand
                </VerticalCard>
                <VerticalCard title="Increased Confidence" bgColor="bg-gray-100" titleColor="text-black">
                  More Intentional Expansions
                </VerticalCard>
              </HorizontalStack>
              <VerticalStack title="How to Validate" titleColor="text-[#a1a1a1]">
                <p>
                  A/B test comparing click patterns, hover frequency, and time-to-interaction between current and proposed designs. Track whether users expand accordions more confidently (fewer
                  hover-then-abandon patterns). Additionally, gather qualitative feedback on whether the visual indicator feels natural and helpful in context.
                </p>
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Constraints & Tradeoffs Section */}
          <ScrollSpySection value="constraints">
            <ProjectSectionTitle dotColor="text-[#9333EA]">Constraints & Tradeoffs</ProjectSectionTitle>
            <ProjectContent>
              <p className="text-black">I recognize that design decisions exist within constraints. The Vercel team has likely considered:</p>

              <HorizontalStack mobileCols={1} desktopCols={2}>
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
              </HorizontalStack>

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
              <VerticalStack>
                <p className="text-lg">
                  I share this not as a definitive answer, but as an example of how I approach design opportunities. With access to user analytics, technical constraints, and Vercel&apos;s strategic
                  priorities, my recommendations would likely evolve.
                </p>
                <p className="text-lg">
                  What I like about Vercel is the attention to craft evident in every interaction. Products like V0 represent the future of how designers and developers work, and my career dream is to
                  contribute to that vision.
                </p>
              </VerticalStack>
              <VerticalStack title="If I have an oppotunity to talk to Vercel's design team, I'd like to learn:" titleColor="text-[#a1a1a1]">
                <ul className="space-y-2 text-lg">
                  <li>• What I might be missing in my analysis</li>
                  <li>• How this fits (or doesn&apos;t) with Vercel&apos;s design philosophy</li>
                  <li>• What you&apos;ve learned from real user data about the current pattern</li>
                  <li>• How the design team approaches similar challenges</li>
                </ul>
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>
          <ProjectFigmaSection
            title="ExploreFigma File"
            description="Design speaks louder than words. Check out the full Figma file to see the process, decisions, and iterations behind this project."
            figmaUrl="https://www.figma.com/design/M3wsoTlIAYxvTij1XlxVqE/Vercel-V0--Public-?node-id=0-1&t=wb9KeRkJ0PwDqPSw-1"
            imageSrc="/vercel-figma.png"
            imageAlt="Vercel V0 Figma design"
            sectionClassName="bg-[#9233ea18] p-8 rounded-2xl"
            dotColor="text-[#9233ea]"
            buttonBgColor="bg-[#9233ea]"
            imageWidth={1200}
            imageHeight={1200}
            imageClassName="h-auto w-full"
          />
        </ScrollSpyViewport>
      </ScrollSpy>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
