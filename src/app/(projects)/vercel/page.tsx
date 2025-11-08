import ProjectFlexBlock from '@/components/project-flex-block'
import ProjectHeroSection from '@/components/project-hero-section'
import ProjectHorizontalBlock from '@/components/project-horizontal-block'
import ProjectSection from '@/components/project-section'
import ProjectSectionTitle from '@/components/project-section-title'
import ProjectVerticalBlock, { default as VerticalBlock } from '@/components/project-vertical-block'
import CtaSection from '@/components/ui/cta'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User } from 'lucide-react'
import Image from 'next/image'

export default function VercelPage() {
  return (
    <main>
      {/* Hero Section */}
      <ProjectHeroSection title="V0 Design Thinking Exercise" subtitle="Improving Visual Affordances in Chat Interfaces" imageSrc="/vercel-full-screen.png" imageAlt="Vercel V0 interface showcase" />

      {/* Overview Section */}
      <ProjectSection>
        <VerticalBlock title="Context" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
          <p>
            This is a <strong>design thinking exercise</strong> exploring how I approach product improvement opportunities. I have tremendous respect for Vercel&apos;s design team and the work
            they&apos;ve done with V0.
            <br /> <br />
            As a user of V0, I noticed a recurring moment of friction that sparked this exploration. Rather than a critique of existing decisions, this case study demonstrates{' '}
            <strong>my process</strong>, <strong>systems thinking</strong>, and how I <strong>balance user needs with constraints</strong>.
            <br /> <br />
            The focus is on answering:
          </p>
          <ul className="list-disc ml-5">
            <li>
              <strong>How can visual affordances reduce cognitive load?</strong>
            </li>
            <li>
              <strong>What patterns work without adding unnecessary complexity?</strong>
            </li>
          </ul>
        </VerticalBlock>
        <VerticalBlock title="My Approach" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col bg-gray-100 p-4 rounded-lg border border-gray-200">
              <span className="font-semibold">Problem Identification:</span>
              <p>Observed friction during real usage and defined the user impact.</p>
            </div>
            <div className="flex flex-col bg-gray-100 p-4 rounded-lg border border-gray-200">
              <span className="font-semibold">Solution Exploration:</span>
              <p>Evaluated multiple approaches against clear criteria before recommending one.</p>
            </div>
            <div className="flex flex-col bg-gray-100 p-4 rounded-lg border border-gray-200">
              <span className="font-semibold">Strategic Thinking:</span>
              <p>Considered constraints, tradeoffs, and validation methods throughout.</p>
            </div>
          </div>
        </VerticalBlock>
      </ProjectSection>

      {/* The Observation Section */}
      <ProjectSection bgClassName="bg-[#212121]" textClassName="text-white">
        <ProjectSectionTitle color="text-white" dotColor="text-[#3888D0]" showBorder={true}>
          The Observation & Research
        </ProjectSectionTitle>
        <div className="flex-1 pt-2 mt-4">
          <p className="text-white mb-8">
            While reviewing past interactions in a lengthy V0 chat, I found myself repeatedly clicking on components to discover which ones were expandable. There was no immediate visual cue to
            distinguish between expandable accordions and static content when scanning through the conversation.
          </p>
          <div className="flex-1 pt-2 mt-12 mb-20">
            <h2 className="text-2xl font-regular pb-2 text-white">Reserach</h2>
            <ProjectHorizontalBlock title="Participants" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
              <p>3 friends</p>
              <div className="grid grid-rows-1 gap-1 mt-1 md:mt-2">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <User key={i} className="w-6 h-6 fill-blue-400 stroke-none" />
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

          <div className="flex-1 pt-2 mt-12">
            <h2 className="text-2xl font-regular pb-2 text-white">When This Matters Most </h2>
            <div className="border-t border-[#C1C1C1]"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 mt-8">
              <div className="flex flex-col bg-white p-4 rounded-lg border border-gray-200">
                <span className="font-semibold mb-2 text-black">Long Conversations</span>
                <p className="text-black">When users have 10+ exchanges and need to reference previous outputs quickly.</p>
              </div>
              <div className="flex flex-col bg-white p-4 rounded-lg border border-gray-200">
                <span className="font-semibold mb-2 text-black">Skimming Mode</span>
                <p className="text-black">When quickly scanning for specific information without reading every detail.</p>
              </div>
              <div className="flex flex-col bg-white p-4 rounded-lg border border-gray-200">
                <span className="font-semibold mb-2 text-black">Decision-Making</span>
                <p className="text-black">When choosing which details to explore without trial-and-error clicking.</p>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Problem Statement Section */}
      <ProjectSection bgClassName="bg-[#D7E7F5]" textClassName="text-black">
        <ProjectSectionTitle color="text-black" dotColor="text-[#3888D0]" showBorder={true} borderColor="border-[#000000]">
          The Problem Statement
        </ProjectSectionTitle>
        <div className="flex flex-col p-4 lg:p-8 relative">
          <div className="flex flex-col max-w-3xl mx-auto relative">
            <div className="flex justify-start h-[64px] lg:h-[92px]">
              <span className="text-[#3888D0] text-[64px] lg:text-[92px]">&quot;</span>
            </div>
            <div className="flex flex-col">
              <p className="text-[24px] lg:text-[32px] font-medium text-center text-black">
                When users skim through V0 chat history, there&apos;s <strong>no persistent visual indicator</strong> to distinguish expandable components (accordions) from static ones. This creates{' '}
                <strong>unnecessary cognitive load and friction</strong>, as users must hover or click to discover interactivity.
              </p>
            </div>
            <div className="flex justify-end h-[64px] lg:h-[92px]">
              <span className="text-[#3888D0] text-[64px] lg:text-[92px] ">&quot;</span>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Current State Section */}
      <ProjectSection bgClassName="bg-gray-50" textClassName="text-black">
        <ProjectSectionTitle dotColor="text-[#3888D0]" showBorder={true} borderColor="border-[#C1C1C1]">
          Current App Behavior
        </ProjectSectionTitle>
        <div className="flex-1 flex-col space-y-8 lg:gap-y-16">
          <ProjectFlexBlock
            left={
              <ProjectVerticalBlock title="No Visual Indicator for Expandable Components" titleColor="text-black" borderColor="border-[#C1C1C1]">
                <p>
                  When users skim through the V0 chat, there&apos;s no visual indicator to distinguish which components are accordions (expandable) from those that aren&apos;t. This creates
                  unnecessary friction as users must click or hover to discover expandability.
                </p>
              </ProjectVerticalBlock>
            }
            right={
              <div className="flex flex-col space-y-8">
                <Image src="/vercel-chat.png" alt="Vercel chat interface" width={800} height={800} className="p-4 h-auto w-auto rounded-md border border-gray-200" priority />
              </div>
            }
            reverseOnDesktop={true}
          />
          <ProjectFlexBlock
            left={
              <div className="flex flex-col space-y-8">
                <Image src="/vercel-onhover.png" alt="Vercel chat interface" width={800} height={800} className="p-4 h-auto w-auto rounded-md border border-gray-200" priority />
              </div>
            }
            right={
              <ProjectVerticalBlock title="On Hovered" titleColor="text-black" borderColor="border-[#C1C1C1]">
                <p className=" mb-8 lg:mb-12">
                  Chevron shows up only on hover. Without hovering, it is unclear that this component is an accordion. This will also require Vercel to design a new UI for the mobile view.
                </p>
              </ProjectVerticalBlock>
            }
          />
          <ProjectFlexBlock
            left={
              <ProjectVerticalBlock title="When Accordion is Expanded" titleColor="text-black" borderColor="border-[#C1C1C1]">
                <p className=" mb-8 lg:mb-12">Icon on the left turns into a chevron down icon. </p>
              </ProjectVerticalBlock>
            }
            right={
              <div className="flex flex-col space-y-8">
                <Image src="/vercel-chat-expand.png" alt="Vercel chat interface" width={800} height={800} className="p-4 h-auto w-auto rounded-md border border-gray-200" priority />
              </div>
            }
            reverseOnDesktop={true}
          />
        </div>
      </ProjectSection>

      {/* Design Exploration Section */}
      <ProjectSection bgClassName="bg-wihte" textClassName="text-black">
        <ProjectSectionTitle dotColor="text-[#3888D0]" showBorder={true} borderColor="border-[#C1C1C1]">
          Design Exploration
        </ProjectSectionTitle>
        <p className="mx-auto mb-12">
          Here are three approaches I considered, evaluated against criteria of <strong>discoverability</strong>, <strong>consistency</strong>, <strong>accessibility</strong>, and{' '}
          <strong>engineering complexity</strong>.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Solution 1 */}
          <div className="bg-gray-100 border-2 border-[#3888D0] rounded-lg p-6 relative flex flex-col justify-around items-center">
            <div className="absolute -top-3 left-4 bg-[#3888D0] text-white px-3 py-1 text-sm font-semibold rounded">My Pick</div>
            <h3 className="text-xl font-semibold mb-3 mt-2">Solution 1: Persistent Chevron Icon</h3>
            <p className="mb-4 min-h-[80px]">Add an always-visible chevron indicator positioned on the right side of accordion components.</p>

            <Image src="/vercel-option1.png" alt="Vercel chat interface" width={800} height={800} className="h-auto w-auto  rounded-md border border-gray-200" priority />

            <div className="space-y-2 text-sm mt-4">
              <div>
                <span className="font-semibold text-[#3888D0]">Pros:</span>
                <p className="text-gray-700">Clear affordance, minimal visual weight, industry standard pattern</p>
              </div>
              <div>
                <span className="font-semibold text-red-600">Cons:</span>
                <p className="text-gray-700">Adds visual element to every accordion</p>
              </div>
            </div>
          </div>

          {/* Solution 2 */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 flex flex-col justify-around items-center">
            <h3 className="text-xl font-semibold mb-3">Solution 2: Subtle Border Treatment</h3>
            <p className="mb-4 min-h-[80px]">Use a subtle border style to indicate expandable content.</p>

            <Image src="/vercel-option2.png" alt="Vercel chat interface" width={800} height={800} className="h-auto w-auto rounded-md border border-gray-200" priority />

            <div className="space-y-2 text-sm mt-4">
              <div>
                <span className="font-semibold text-[#3888D0]">Pros:</span>
                <p className="text-gray-700">More visible than just a chevron icon</p>
              </div>
              <div>
                <span className="font-semibold text-red-600">Cons:</span>
                <p className="text-gray-700">More visual noise than just a chevron icon</p>
              </div>
            </div>
          </div>

          {/* Solution 3 */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 flex flex-col justify-around items-center">
            <h3 className="text-xl font-semibold mb-3">Solution 3: Text Label Indicator</h3>
            <p className="mb-4 min-h-[80px]">Add small &quot;Show all&quot; or &quot;Expand&quot; text label to accordion headers.</p>

            <Image src="/vercel-option3.png" alt="Vercel chat interface" width={800} height={800} className="h-auto w-auto rounded-md border border-gray-200" priority />

            <div className="space-y-2 text-sm mt-4">
              <div>
                <span className="font-semibold text-[#3888D0]">Pros:</span>
                <p className="text-gray-700">Extremely explicit, accessible with text labels</p>
              </div>
              <div>
                <span className="font-semibold text-red-600">Cons:</span>
                <p className="text-gray-700">Adds visual noise than just a chevron icon</p>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection bgClassName="bg-[#D7E7F5]" textClassName="text-black">
        <ProjectSectionTitle dotColor="text-[#3888D0]">Proposed Solution: Persistent Chevron</ProjectSectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <div className="flex flex-col">
            <ProjectVerticalBlock title="Why This Solution?" titleColor="text-black" borderColor="border-[#C1C1C1]">
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
            </ProjectVerticalBlock>
          </div>
          <Tabs defaultValue="1" className="max-w-3xl flex gap-y-4 lg:gap-y-8">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 text-black rounded-md">
              <TabsTrigger value="1" className="data-[state=active]:bg-[#3888D0] data-[state=active]:text-white">
                New Design
              </TabsTrigger>
              <TabsTrigger value="2" className="data-[state=active]:bg-[#3888D0] data-[state=active]:text-white">
                Current Design
              </TabsTrigger>
            </TabsList>
            <TabsContent value="1" className="flex justify-center w-full">
              <Image src="/vercel-after1.png" alt="Vercel chat interface" width={800} height={800} className="flex-1 p-4 h-auto w-auto rounded-md border border-gray-200" priority />
            </TabsContent>
            <TabsContent value="2" className="flex justify-center  w-full">
              <Image src="/vercel-before1.png" alt="Vercel chat interface" width={800} height={800} className="flex-1 p-4 h-auto w-auto rounded-md border border-gray-200" priority />
            </TabsContent>
          </Tabs>
        </div>
      </ProjectSection>

      {/* Success Metrics Section */}
      <ProjectSection bgClassName="bg-white" textClassName="text-black">
        <ProjectSectionTitle dotColor="text-[#3888D0]" textAlign="text-center">
          Expected Impact & Success Metrics
        </ProjectSectionTitle>
        <VerticalBlock title="Impact" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col bg-gray-100 p-4 rounded-lg border border-gray-200">
              <span className="font-semibold">Reduced Friction</span>
              <p>Designed core flows and built prototypes in Figma for fast iteration.</p>
            </div>
            <div className="flex flex-col bg-gray-100 p-4 rounded-lg border border-gray-200">
              <span className="font-semibold">Faster Scanning</span>
              <p>Reduced Time-to-Expand</p>
            </div>
            <div className="flex flex-col bg-gray-100 p-4 rounded-lg border border-gray-200">
              <span className="font-semibold">Increased Confidence</span>
              <p>More Intentional Expansions</p>
            </div>
          </div>
        </VerticalBlock>
        <VerticalBlock title="How to Validate" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
          <p>
            A/B test comparing click patterns, hover frequency, and time-to-interaction between current and proposed designs. Track whether users expand accordions more confidently (fewer
            hover-then-abandon patterns). Additionally, gather qualitative feedback on whether the visual indicator feels natural and helpful in context.
          </p>
        </VerticalBlock>
      </ProjectSection>

      {/* Constraints & Tradeoffs Section */}
      <ProjectSection bgClassName="bg-[#212121]" textClassName="text-white">
        <ProjectSectionTitle color="text-white" dotColor="text-[#3888D0]" showBorder={true}>
          Constraints & Tradeoffs
        </ProjectSectionTitle>
        <p className="text-white mb-8">I recognize that design decisions exist within constraints. The Vercel team has likely considered:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white text-black p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Visual Density</h3>
            <p className="text-sm">Every icon adds visual weight. Is the tradeoff worth it for improved discoverability?</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Engineering Cost</h3>
            <p className="text-sm">How complex is implementation across all accordion instances? What&apos;s the development timeline?</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Mobile Optimization</h3>
            <p className="text-sm">Does this work well on smaller screens with touch interactions? Are touch targets sufficient?</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Brand Aesthetic</h3>
            <p className="text-sm">Does this align with V0&apos;s minimalist design philosophy and Vercel&apos;s overall brand?</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg">
            <h3 className="font-semibold mb-2">User Preference</h3>
            <p className="text-sm">Some power users may prefer the cleaner, current interface. How do we balance different user needs?</p>
          </div>
          <div className="bg-white text-black p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Strategic Priorities</h3>
            <p className="text-sm">Where does this fit within the product roadmap? Are there higher-priority improvements?</p>
          </div>
        </div>

        <div className="mt-8 bg-gray-900 border border-gray-700 rounded-lg p-6">
          <p className="text-white">
            <strong>The solution should be validated against these constraints with actual user data, not assumptions.</strong> Without access to usage analytics, technical architecture details, and
            strategic priorities, these are educated hypotheses that would need refinement.
          </p>
        </div>
      </ProjectSection>

      {/* Final Thoughts Section */}
      <ProjectSection bgClassName="bg-white" textClassName="text-black">
        <div className="max-w-4xl mx-auto">
          <ProjectSectionTitle dotColor="text-[#3888D0]" textAlign="text-center">
            Final Thoughts
          </ProjectSectionTitle>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mt-8">
            <p className="text-lg mb-6">
              I share this not as a definitive answer, but as an example of how I approach design opportunities. With access to user analytics, technical constraints, and Vercel&apos;s strategic
              priorities, my recommendations would likely evolve.
            </p>
            <p className="text-lg mb-6">
              What I like about Vercel is the attention to craft evident in every interaction. Products like V0 represent the future of how designers and developers work, and my career dream is to
              contribute to that vision.
            </p>
            <p className="text-lg font-semibold">If I have an oppotunity to talk to Vercel&apos;s design team, I&apos;d like to learn:</p>
            <ul className="mt-4 space-y-2 text-lg">
              <li>• What I might be missing in my analysis</li>
              <li>• How this fits (or doesn&apos;t) with Vercel&apos;s design philosophy</li>
              <li>• What you&apos;ve learned from real user data about the current pattern</li>
              <li>• How the design team approaches similar challenges</li>
            </ul>
          </div>
        </div>
      </ProjectSection>
      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
