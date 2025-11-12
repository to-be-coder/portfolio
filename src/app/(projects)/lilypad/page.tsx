'use client'

import CtaSection from '@/components/ui-block/cta'
import { VerticalCard } from '@/components/ui-block/project-card'
import ProjectColorsSection from '@/components/ui-block/project-colors-section'
import ProjectContent from '@/components/ui-block/project-content'
import ProjectFigmaSection from '@/components/ui-block/project-figma-section'
import ProjectFlexBlock from '@/components/ui-block/project-flex-block'
import ProjectHeroSection from '@/components/ui-block/project-hero-section'
import ProjectSectionTitle from '@/components/ui-block/project-section-title'
import { HorizontalStack, VerticalStack } from '@/components/ui-block/project-stack'
import ProjectTypographySection from '@/components/ui-block/project-typography-section'
import { ScrollSpy, ScrollSpyLink, ScrollSpyNav, ScrollSpySection, ScrollSpyViewport } from '@/components/ui/scroll-spy'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

export default function LilypadPage() {
  return (
    <main>
      <ScrollSpy offset={0} defaultValue="overview" orientation="horizontal">
        <ScrollSpyNav>
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
              <VerticalStack>
                <p>
                  I collaborated with a startup to redesign their landing page concept before it was published. With no existing analytics or user feedback to draw from, I focused on creating a clear
                  and compelling layout that highlighted the startup&apos;s value proposition and guided visitors toward key action, such as requesting more information.
                </p>
              </VerticalStack>

              <VerticalStack title="Challenges" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
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
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Typography Section */}
          <ScrollSpySection value="typography" className="flex flex-col bg-[#212121] text-white p-8 rounded-xl">
            <ProjectTypographySection
              title="Typography"
              titleColor="text-white"
              dotColor="text-[#DDA15F]"
              typeface="Plus Jakarta Sans"
              typefaceClassName="font-['Plus_Jakarta_Sans']"
              weights={[
                { name: 'Regular', className: 'font-normal' },
                { name: 'Semi-Bold', className: 'font-semibold' },
                { name: 'Bold', className: 'font-bold' },
              ]}
            />
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
            <ProjectFlexBlock
              left={<ProjectSectionTitle dotColor="text-[#DDA15F]">Design Approach</ProjectSectionTitle>}
              right={
                <ProjectContent>
                  {/* Content */}
                  <VerticalStack title="Content" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                    <p>Collaborated with the startup team to define and highlight their core benefits, ensuring every section of the page directly addressed key user questions and pain points.</p>
                  </VerticalStack>

                  {/* Visual Hierarchy & Layout */}
                  <VerticalStack title="Visual Hierarchy & Layout" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                    <p>
                      Created a clean, minimalist design that draws attention to the most important information first. I also used consistent typography and spacing so users can quickly scan and
                      understand the page&apos;s content.
                    </p>
                  </VerticalStack>

                  {/* Calls-to-Action */}
                  <VerticalStack title="Calls-to-Action" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                    <p>Strategically placed CTAs in prominent locations, making it easy for users to take the next step.</p>
                  </VerticalStack>

                  {/* Responsive Design */}
                  <VerticalStack title="Responsive Design" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                    <p>
                      Optimized the layout for mobile and tablet devices since the startup anticipates a significant portion of traffic coming from mobile users. and ensured images and text scaled
                      appropriately to maintain readability across various screen sizes.
                    </p>
                  </VerticalStack>
                </ProjectContent>
              }
            />
          </ScrollSpySection>

          {/* Mobile-First Design Section */}
          <ScrollSpySection value="mobile-first" className="flex flex-col bg-[#DDA15F] text-white p-8 rounded-xl">
            <ProjectContent>
              <ProjectSectionTitle dotColor="text-[#af5800]" textAlign="text-center">
                Mobile-First Design
              </ProjectSectionTitle>
              <HorizontalStack mobileCols={2} desktopCols={4} gapClassName="gap-2 md:gap-5">
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
              </HorizontalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Responsive Design Section */}
          <ScrollSpySection value="responsive-design" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-[#DDA15F]">Responsive Design</ProjectSectionTitle>
            <ProjectContent>
              <Tabs defaultValue="desktop" className="w-full gap-y-4" pillBgColor="bg-[#DDA15F]">
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
                  <Image src="/lilypad-desktop-view.png" alt="Desktop screen of Lilypad's responsive design" width={600} height={800} className="h-auto w-full max-w-full rounded-xl" priority />
                </TabsContent>
                <TabsContent value="tablet" className="flex justify-center bg-[#FEFAE1] p-8 rounded-xl">
                  <Image src="/lilypad-ipad-view.png" alt="Tablet screen of Lilypad's responsive design" width={600} height={800} className="h-auto w-full max-w-full rounded-xl" priority />
                </TabsContent>
                <TabsContent value="mobile" className="flex justify-center bg-[#FEFAE1] p-8 rounded-xl">
                  <Image src="/lilypad-mobile-view.png" alt="Mobile screen of Lilypad's responsive design" width={600} height={800} className="h-auto w-full max-w-full rounded-xl" priority />
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
              <VerticalStack>
                <ProjectFlexBlock
                  variant="card"
                  left={
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
                  right={
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
                <ProjectFlexBlock
                  variant="card"
                  left={
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
                  right={
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
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Next Steps Section */}
          <ScrollSpySection value="next-steps" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-[#DDA15F]">Next Steps</ProjectSectionTitle>
            <ProjectContent>
              <HorizontalStack mobileCols={1} desktopCols={3}>
                <VerticalCard title="Gather Real-World Feedback" titleColor="text-[#a1a1a1]">
                  <p className="text-black">
                    Once the page goes live, we plan to track engagement metrics (e.g., click-through rates, sign-ups) and collect user feedback to evaluate the effectiveness of the design.
                  </p>
                </VerticalCard>

                <VerticalCard title="Iterative Improvements" titleColor="text-[#a1a1a1]">
                  <p className="text-black">Based on early insights, we will refine the messaging, visuals, and CTA placement to optimize the user journey.</p>
                </VerticalCard>

                <VerticalCard title="Potential User Testing" titleColor="text-[#a1a1a1]">
                  <p className="text-black">After launch, moderated or unmoderated user testing could provide valuable qualitative feedback to guide future iterations.</p>
                </VerticalCard>
              </HorizontalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Figma Exploration Section */}
          <ProjectFigmaSection
            title="Explore Figma File"
            description="Design speaks louder than words. Check out the full Figma file to see the process, decisions, and iterations behind this project."
            figmaUrl="https://www.figma.com/design/QeGLFmUuzV5p7i7X3rTgkw/Lilypad-Landing-Page--Public-?node-id=0-1&t=aKdPgE6gQyG0cSwq-1"
            imageSrc="/lilypad-iphone-1.png"
            imageAlt="iPhone mockup of Lilypad's mobile design"
            sectionClassName="bg-[#FEFAE1] p-8"
            dotColor="text-[#af5800]"
            buttonBgColor="bg-[#DDA15F]"
            imageWidth={240}
            imageHeight={480}
            imageClassName="h-auto max-w-[800px]"
          />
        </ScrollSpyViewport>
      </ScrollSpy>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
