'use client'

import ProjectColorsSection from '@/components/ui-block/project-colors-section'
import ProjectContent from '@/components/ui-block/project-content'
import ProjectHeroSection from '@/components/ui-block/project-hero-section'
import ProjectHorizontalCard from '@/components/ui-block/project-horizontal-card'
import ProjectSectionTitle from '@/components/ui-block/project-section-title'
import { default as VerticalBlock } from '@/components/ui-block/project-vertical-block'
import CtaSection from '@/components/ui/cta'
import { ScrollSpy, ScrollSpyLink, ScrollSpyNav, ScrollSpySection, ScrollSpyViewport } from '@/components/ui/scroll-spy'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function LilypadPage() {
  return (
    <main>
      <ScrollSpy offset={0} defaultValue="overview" orientation="horizontal" className="w-full max-w-7xl mx-auto">
        <ScrollSpyNav className="hidden lg:flex w-60 p-6 sticky top-0 h-screen flex-col gap-2 shrink-0">
          <ScrollSpyLink value="overview" activeClassName="data-[state=active]:text-[#DDA15F]">
            Overview
          </ScrollSpyLink>
          <ScrollSpyLink value="typography" activeClassName="data-[state=active]:text-[#DDA15F] data-[state=active]:font-semibold">
            Typography
          </ScrollSpyLink>
          <ScrollSpyLink value="colors" activeClassName="data-[state=active]:text-[#DDA15F] data-[state=active]:font-semibold">
            Colors
          </ScrollSpyLink>
          <ScrollSpyLink value="design-approach" activeClassName="data-[state=active]:text-[#DDA15F] data-[state=active]:font-semibold">
            Design Approach
          </ScrollSpyLink>
          <ScrollSpyLink value="mobile-first" activeClassName="data-[state=active]:text-[#DDA15F] data-[state=active]:font-semibold">
            Mobile-First Design
          </ScrollSpyLink>
          <ScrollSpyLink value="responsive-design" activeClassName="data-[state=active]:text-[#DDA15F] data-[state=active]:font-semibold">
            Responsive Design
          </ScrollSpyLink>
          <ScrollSpyLink value="design-system" activeClassName="data-[state=active]:text-[#DDA15F] data-[state=active]:font-semibold">
            Design System
          </ScrollSpyLink>
          <ScrollSpyLink value="next-steps" activeClassName="data-[state=active]:text-[#DDA15F] data-[state=active]:font-semibold">
            Next Steps
          </ScrollSpyLink>
          <ScrollSpyLink value="figma" activeClassName="data-[state=active]:text-[#DDA15F] data-[state=active]:font-semibold">
            Figma
          </ScrollSpyLink>
        </ScrollSpyNav>
        <ScrollSpyViewport className="flex-1 max-w-3xl mx-auto">
          {/* Hero Section */}
          <ProjectHeroSection title="Lilypad" subtitle="EdTech Startup: Student Evaluation Service for School Districts" imageSrc="/lilypad-hero.png" imageAlt="Lilypad hero background" />

          {/* Overview Section */}
          <ScrollSpySection value="overview" className="flex flex-col">
            <ProjectSectionTitle color="text-black" dotColor="text-[#DDA15F]">
              Overview
            </ProjectSectionTitle>
            <ProjectContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                <VerticalBlock title="Overview" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                  <p>
                    I collaborated with a startup to redesign their landing page concept before it was published. With no existing analytics or user feedback to draw from, I focused on creating a
                    clear and compelling layout that highlighted the startup&apos;s value proposition and guided visitors toward key action, such as requesting more information.
                  </p>
                </VerticalBlock>

                <VerticalBlock title="Challenges" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                  <div className="space-y-1 md:space-y-2">
                    <div>
                      <span className="font-semibold">No Historical User Data</span>
                      <p>Since this was the first version of the landing page, all design decisions were based on best practices and internal stakeholder feedback.</p>
                    </div>
                    <div>
                      <span className="font-semibold">Clarity of Value Proposition</span>
                      <p>The startup needed a concise way to explain what they do and why it matters.</p>
                    </div>
                    <div>
                      <span className="font-semibold">Future Scalability</span>
                      <p>The design had to be flexible enough to evolve as the startup&apos;s product offerings expand.</p>
                    </div>
                  </div>
                </VerticalBlock>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Typography Section */}
          <ScrollSpySection value="typography" className="flex flex-col bg-[#212121] text-white p-8 rounded-2xl">
            <ProjectSectionTitle color="text-white" dotColor="text-[#DDA15F]">
              Typography
            </ProjectSectionTitle>
            <ProjectContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                {/* Left Column - Large "Aa" Display */}
                <div className="flex items-center justify-center">
                  <span className="text-[200px] font-regular">Aa</span>
                </div>

                {/* Right Column - Typography Details */}
                <div className="space-y-4 md:space-y-8">
                  {/* Typeface */}
                  <VerticalBlock title="Typeface" titleColor="text-gray-400" borderColor="border-[#C1C1C1]">
                    <p className=" font-['Plus_Jakarta_Sans']">Plus Jakarta Sans</p>
                  </VerticalBlock>

                  {/* Weights */}
                  <VerticalBlock title="Weights" titleColor="text-gray-400" borderColor="border-[#C1C1C1]">
                    <div className="space-y-1 md:space-y-2">
                      <p className=" font-normal">Regular</p>
                      <p className=" font-semibold">Semi-Bold</p>
                      <p className=" font-bold">Bold</p>
                    </div>
                  </VerticalBlock>
                </div>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Colors Section */}
          <ScrollSpySection value="colors" className="flex flex-col">
            <ProjectColorsSection
              title="Colors"
              dotColor="text-[#DDA15F]"
              colors={[
                // Primary Colors (row 1)
                { hex: '#15423D', textClass: 'text-white' },
                { hex: '#FEFAE1', border: true },
                { hex: '#DDA15F' },
                // Secondary Colors (row 2)
                { hex: '#FFFFFF', border: true },
                { hex: '#F8F8F8', border: true },
                { hex: '#494949', textClass: 'text-white' },
                { hex: '#000000', textClass: 'text-white' },
              ]}
            />
          </ScrollSpySection>

          {/* Design Approach Section */}
          <ScrollSpySection value="design-approach" className="flex flex-col">
            <ProjectContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {/* Left Column - Title */}
                <div>
                  <ProjectSectionTitle dotColor="text-[#DDA15F]">Design Approach</ProjectSectionTitle>
                </div>

                {/* Right Column - Approach Details */}
                <div className="space-y-4 md:space-y-8">
                  {/* Content */}
                  <VerticalBlock title="Content" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                    <p>Collaborated with the startup team to define and highlight their core benefits, ensuring every section of the page directly addressed key user questions and pain points.</p>
                  </VerticalBlock>

                  {/* Visual Hierarchy & Layout */}
                  <VerticalBlock title="Visual Hierarchy & Layout" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                    <p>
                      Created a clean, minimalist design that draws attention to the most important information first. I also used consistent typography and spacing so users can quickly scan and
                      understand the page&apos;s content.
                    </p>
                  </VerticalBlock>

                  {/* Calls-to-Action */}
                  <VerticalBlock title="Calls-to-Action" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                    <p>Strategically placed CTAs in prominent locations, making it easy for users to take the next step.</p>
                  </VerticalBlock>

                  {/* Responsive Design */}
                  <VerticalBlock title="Responsive Design" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                    <p>
                      Optimized the layout for mobile and tablet devices since the startup anticipates a significant portion of traffic coming from mobile users. and ensured images and text scaled
                      appropriately to maintain readability across various screen sizes.
                    </p>
                  </VerticalBlock>
                </div>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Mobile-First Design Section */}
          <ScrollSpySection value="mobile-first" className="flex flex-col bg-[#DDA15F] text-white p-8 rounded-2xl">
            <ProjectSectionTitle dotColor="text-[#af5800]" textAlign="text-center">
              Mobile-First Design
            </ProjectSectionTitle>
            <ProjectContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-5 w-full h-auto">
                <div className="flex justify-center">
                  <Image src="/lilypad-iphone-1.png" alt="First mobile screen of Lilypad's responsive design" width={240} height={480} className="w-3/4 sm:w-full h-auto" priority />
                </div>

                <div className="flex justify-center">
                  <Image src="/lilypad-iphone-2.png" alt="Second mobile screen of Lilypad's responsive design" width={240} height={480} className="w-3/4 sm:w-full h-auto" priority />
                </div>

                <div className="flex justify-center">
                  <Image src="/lilypad-iphone-3.png" alt="Third mobile screen of Lilypad's responsive design" width={240} height={480} className="w-3/4 sm:w-full h-auto" priority />
                </div>
                <div className="flex justify-center">
                  <Image src="/lilypad-iphone-4.png" alt="Fourth mobile screen of Lilypad's responsive design" width={240} height={480} className="w-3/4 sm:w-full h-auto" priority />
                </div>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Responsive Design Section */}
          <ScrollSpySection value="responsive-design" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-[#DDA15F]">Responsive Design</ProjectSectionTitle>
            <ProjectContent>
              <Tabs defaultValue="desktop" className="w-full gap-y-4 lg:gap-y-8" pillBgColor="bg-[#DDA15F]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="desktop" className="data-[state=active]:text-black">
                    Desktop
                  </TabsTrigger>
                  <TabsTrigger value="tablet" className="data-[state=active]:text-black">
                    Tablet
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="data-[state=active]:text-black">
                    Mobile
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="desktop" className="flex justify-center bg-[#FEFAE1] p-8 rounded-xl">
                  <Image src="/lilypad-desktop-view.png" alt="Desktop screen of Lilypad's responsive design" width={600} height={800} className="h-auto w-full max-w-full rounded-md" priority />
                </TabsContent>
                <TabsContent value="tablet" className="flex justify-center bg-[#FEFAE1] p-8 rounded-xl">
                  <Image src="/lilypad-ipad-view.png" alt="Tablet screen of Lilypad's responsive design" width={600} height={800} className="h-auto w-full max-w-full rounded-md" priority />
                </TabsContent>
                <TabsContent value="mobile" className="flex justify-center bg-[#FEFAE1] p-8 rounded-xl">
                  <Image src="/lilypad-mobile-view.png" alt="Mobile screen of Lilypad's responsive design" width={600} height={800} className="h-auto w-full max-w-full rounded-md" priority />
                </TabsContent>
              </Tabs>
            </ProjectContent>
          </ScrollSpySection>

          {/* Design System from Programmer's Perspective */}
          <ScrollSpySection value="design-system" className="flex flex-col ">
            <ProjectSectionTitle color="text-black" dotColor="text-[#DDA15F]" textAlign="text-center">
              Design System from Programmer&apos;s Perspective
            </ProjectSectionTitle>
            <ProjectContent>
              <div className="flex flex-col gap-4">
                <ProjectHorizontalCard
                  leftContent={
                    <>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">Consistent Layout Primitives</h3>
                        <p className="mb-4 min-h-[80px]">
                          The layout system was built on a strict, responsive grid, not just for visual balance, but to make development predictable and scalable. Each breakpoint uses a defined column
                          count, gutter width, and max container size (as shown). Instead of custom padding on every section, I used consistent primitives like max-w-7xl, px-8, and my-16.
                        </p>
                      </div>
                    </>
                  }
                  rightContent={
                    <Image
                      src="/lilypad-grid.png"
                      alt="UI Kit showing typography, colors, and responsive grid system for Lilypad's design system"
                      width={800}
                      height={800}
                      className="flex-1 h-auto w-auto rounded-xl border border-gray-200"
                      priority
                    />
                  }
                  bgColor="bg-gray-100"
                />
                <ProjectHorizontalCard
                  leftContent={
                    <>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">Built for Responsive & Future Growth</h3>
                        <p className="mb-4 min-h-[80px]">
                          I designed every section with clear breakpoints in mind, mobile, tablet, desktop, so devs could rely on consistent stacking behavior and spacing logic. The system also leaves
                          room to scale as new content types or layouts are added.
                        </p>
                      </div>
                    </>
                  }
                  rightContent={
                    <Image
                      src="/lilypad-breakpoints.png"
                      alt="UI Kit showing typography, colors, and responsive grid system for Lilypad's design system"
                      width={800}
                      height={400}
                      className="flex-1 h-auto w-auto rounded-xl border border-gray-200"
                      priority
                    />
                  }
                  bgColor="bg-gray-100"
                />
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Next Steps Section */}
          <ScrollSpySection value="next-steps" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-[#DDA15F]">Next Steps</ProjectSectionTitle>
            <ProjectContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <VerticalBlock title="Gather Real-World Feedback" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                  <p>Once the page goes live, we plan to track engagement metrics (e.g., click-through rates, sign-ups) and collect user feedback to evaluate the effectiveness of the design.</p>
                </VerticalBlock>

                <VerticalBlock title="Iterative Improvements" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                  <p>Based on early insights, we will refine the messaging, visuals, and CTA placement to optimize the user journey.</p>
                </VerticalBlock>

                <VerticalBlock title="Potential User Testing" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                  <p>After launch, moderated or unmoderated user testing could provide valuable qualitative feedback to guide future iterations.</p>
                </VerticalBlock>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Figma Exploration Section */}
          <ScrollSpySection value="figma" className="flex flex-col bg-[#DDA15F] p-8 rounded-2xl">
            <ProjectContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {/* Left Column - Text Content */}
                <div>
                  <ProjectSectionTitle dotColor="text-[#af5800]">ExploreFigma File</ProjectSectionTitle>
                  <p className="mb-12">Design speaks louder than words. Check out the full Figma file to see the process, decisions, and iterations behind this project.</p>
                  <Link
                    href="https://www.figma.com/design/QeGLFmUuzV5p7i7X3rTgkw/Lilypad-Landing-Page--Public-?node-id=0-1&t=aKdPgE6gQyG0cSwq-1"
                    className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Check Out Figma
                    <ArrowUpRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>

                {/* Right Column - iPhone Image */}
                <div className="flex justify-center">
                  <Image src="/lilypad-iphone-1.png" alt="iPhone mockup of Lilypad's mobile design" width={240} height={480} className="h-auto max-w-[800px]" priority />
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
