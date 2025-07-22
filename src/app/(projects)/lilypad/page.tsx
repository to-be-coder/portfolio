'use client'

import ProjectColorsSection from '@/components/project-colors-section'
import ProjectHeroSection from '@/components/project-hero-section'
import ProjectSection from '@/components/project-section'
import ProjectSectionTitle from '@/components/project-section-title'
import CtaSection from '@/components/ui/cta'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function LilypadPage() {
  return (
    <main>
      {/* Hero Section */}
      <ProjectHeroSection title="Lilypad" subtitle="EdTech Startup: Student Evaluation Service for School Districts" imageSrc="/lilypad-hero.png" imageAlt="Lilypad hero background" />

      {/* Initial Overview and Challenges Section */}
      <ProjectSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Left Column - Overview */}
          <div className="border-t border-[#C1C1C1] pt-[4px]">
            <h2 className="text-2xl font-regular text-gray-400 mb-2 md:mb-4">Overview</h2>
            <p className="text-[16px]">
              I collaborated with a startup to redesign their landing page concept before it was published. With no existing analytics or user feedback to draw from, I focused on creating a clear and
              compelling layout that highlighted the startup&apos;s value proposition and guided visitors toward key actions—such as requesting more information.
            </p>
          </div>

          {/* Right Column - Challenges */}
          <div className="space-y-12">
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-regular text-gray-400 mb-2 md:mb-4">Challenges</h2>
              <div className="space-y-1 md:space-y-2">
                <div>
                  <span className="font-semibold text-[16px]">No Historical User Data</span>
                  <p className="text-[16px]">Since this was the first version of the landing page, all design decisions were based on best practices and internal stakeholder feedback.</p>
                </div>
                <div>
                  <span className="font-semibold text-[16px]">Clarity of Value Proposition</span>
                  <p className="text-[16px]">The startup needed a concise way to explain what they do and why it matters.</p>
                </div>
                <div>
                  <span className="font-semibold text-[16px]">Future Scalability</span>
                  <p className="text-[16px]">The design had to be flexible enough to evolve as the startup&apos;s product offerings expand.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Typography Section */}
      <ProjectSection bgClassName="bg-[#212121] text-white">
        <ProjectSectionTitle color="text-white" dotColor="text-[#DDA15F]">
          Typography
        </ProjectSectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {/* Left Column - Large "Aa" Display */}
          <div className="flex items-center justify-center">
            <span className="text-[200px] font-regular">Aa</span>
          </div>

          {/* Right Column - Typography Details */}
          <div className="space-y-4 md:space-y-8">
            {/* Typeface */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-2 md:mb-4">Typeface</h3>
              <p className="text-[16px] font-['Plus_Jakarta_Sans']">Plus Jakarta Sans</p>
            </div>

            {/* Weights */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-2 md:mb-4">Weights</h3>
              <div className="space-y-1 md:space-y-2">
                <p className="text-[16px] font-normal">Regular</p>
                <p className="text-[16px] font-semibold">Semi-Bold</p>
                <p className="text-[16px] font-bold">Bold</p>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Colors Section */}
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

      {/* Design Approach Section */}
      <ProjectSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Left Column - Title */}
          <div>
            <ProjectSectionTitle dotColor="text-[#DDA15F]">Design Approach</ProjectSectionTitle>
          </div>

          {/* Right Column - Approach Details */}
          <div className="space-y-4 md:space-y-8">
            {/* Content */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-2 md:mb-4">Content</h3>
              <p className="text-[16px]">
                Collaborated with the startup team to define and highlight their core benefits, ensuring every section of the page directly addressed key user questions and pain points.
              </p>
            </div>

            {/* Visual Hierarchy & Layout */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-6">Visual Hierarchy & Layout</h3>
              <p className="text-[16px]">
                Created a clean, minimalist design that draws attention to the most important information first. I also used consistent typography and spacing so users can quickly scan and understand
                the page&apos;s content.
              </p>
            </div>

            {/* Calls-to-Action */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-6">Calls-to-Action</h3>
              <p className="text-[16px]">Strategically placed CTAs in prominent locations, making it easy for users to take the next step.</p>
            </div>

            {/* Responsive Design */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-6">Responsive Design</h3>
              <p className="text-[16px]">
                Optimized the layout for mobile and tablet devices since the startup anticipates a significant portion of traffic coming from mobile users. and ensured images and text scaled
                appropriately to maintain readability across various screen sizes.
              </p>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Mobile-First Design Section */}
      <ProjectSection bgClassName="bg-[#DDA15F] text-white">
        <ProjectSectionTitle dotColor="text-[#af5800]" textAlign="text-center">
          Mobile-First Design
        </ProjectSectionTitle>

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
      </ProjectSection>

      {/* Responsive Design Section */}
      <ProjectSection>
        <ProjectSectionTitle dotColor="text-[#DDA15F]" showBorder={true} borderColor="border-[#C1C1C1]">
          Responsive Design
        </ProjectSectionTitle>
        <Tabs defaultValue="desktop" className="w-full flex flex-col lg:flex-row gap-4">
          <TabsList className="w-full bg-gray-50 flex-row lg:flex-col  h-auto lg:h-[500px]  lg:w-1/3 border border-gray-200 rounded-lg">
            <TabsTrigger value="desktop" className="w-full data-[state=active]:bg-green-200 data-[state=active]:text-green-700  text-black text-[16px] lg:text-2xl lg:border-b border-gray-200 ">
              Desktop
            </TabsTrigger>
            <TabsTrigger value="tablet" className="w-full data-[state=active]:bg-yellow-200 data-[state=active]:text-yellow-800 text-black  text-[16px] lg:text-2xl lg:border-b border-gray-200">
              Tablet
            </TabsTrigger>

            <TabsTrigger value="mobile" className="w-full data-[state=active]:bg-blue-200 data-[state=active]:text-blue-800 text-black text-[16px] lg:text-2xl ">
              Mobile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="desktop">
            <div className="flex justify-center items-center h-[300px] lg:h-[500px] border border-green-200 bg-green-50 rounded-lg">
              <Image src="/lilypad-desktop-view.png" alt="Desktop screen of Lilypad's responsive design" width={600} height={800} className="w-full h-full object-contain" priority />
            </div>
          </TabsContent>
          <TabsContent value="tablet">
            <div className="flex justify-center items-center  h-[300px] lg:h-[500px] border border-yellow-200 bg-yellow-50 rounded-lg">
              <Image src="/lilypad-ipad-view.png" alt="Tablet screen of Lilypad's responsive design" width={600} height={800} className="w-full h-full object-contain" priority />
            </div>
          </TabsContent>
          <TabsContent value="mobile">
            <div className="flex justify-center items-center h-[300px] lg:h-[500px] border border-blue-200 bg-blue-50 rounded-lg">
              <Image src="/lilypad-mobile-view.png" alt="Mobile screen of Lilypad's responsive design" width={600} height={800} className="w-full h-full object-contain" priority />
            </div>
          </TabsContent>
        </Tabs>
      </ProjectSection>

      <ProjectSection bgClassName="bg-[#212121] text-white">
        <ProjectSectionTitle color="text-white" dotColor="text-[#DDA15F]">
          Design System from Programmer&apos;s Perspective
        </ProjectSectionTitle>
        <div className="flex-1 flex-col space-y-8 lg:gap-y-16">
          <div className="flex gap-x-8 flex-col lg:flex-row gap-y-8 lg:gap-y-0">
            <div className="flex-1 border-t border-gray-600 pt-[4px] order-last lg:order-first">
              <h3 className="text-2xl font-regular mb-2 md:mb-4">Consistent Layout Primitives</h3>
              <p className="text-[16px] mb-8 lg:mb-12">
                The layout system was built on a strict, responsive grid — not just for visual balance, but to make development predictable and scalable. <br />
                <br />
                Each breakpoint uses a defined column count, gutter width, and max container size (as shown). Instead of custom padding on every section, I used consistent primitives like max-w-7xl,
                px-8, and my-16.
              </p>
            </div>
            <div className="flex flex-1 flex-col space-y-8 order-first lg:order-last">
              <Image
                src="/lilypad-grid.png"
                alt="UI Kit showing typography, colors, and responsive grid system for Lilypad's design system"
                width={800}
                height={800}
                className="h-auto w-auto rounded-md border"
                priority
              />
            </div>
          </div>
          <div className="flex gap-x-8 flex-col lg:flex-row gap-y-8 lg:gap-y-0">
            <div className="flex flex-1 flex-col space-y-8">
              <Image
                src="/lilypad-breakpoints.png"
                alt="UI Kit showing typography, colors, and responsive grid system for Lilypad's design system"
                width={800}
                height={400}
                className="w-full h-[400px] rounded-md border object-cover object-top"
                priority
              />
            </div>
            <div className="flex-1 border-t border-gray-600 pt-[4px]">
              <h3 className="text-2xl font-regular mb-2 md:mb-4">Built for Responsive & Future Growth</h3>
              <p className="text-[16px] mb-8 lg:mb-12">
                I designed every section with clear breakpoints in mind — mobile, tablet, desktop — so devs could rely on consistent stacking behavior and spacing logic. The system also leaves room to
                scale as new content types or layouts are added.
              </p>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Next Steps Section */}
      <ProjectSection>
        <ProjectSectionTitle dotColor="text-[#DDA15F]">Next Steps</ProjectSectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-[#a0a0a0] mb-2 md:mb-4">Gather Real-World Feedback</h3>
              <p className="text-[16px]">
                Once the page goes live, we plan to track engagement metrics (e.g., click-through rates, sign-ups) and collect user feedback to evaluate the effectiveness of the design.
              </p>
            </div>
          </div>

          {/* Iterative Improvements */}
          <div>
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-[#a0a0a0] mb-2 md:mb-4">Iterative Improvements</h3>
              <p className="text-[16px]">Based on early insights, we will refine the messaging, visuals, and CTA placement to optimize the user journey.</p>
            </div>
          </div>

          {/* Potential User Testing */}
          <div>
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-[#a0a0a0] mb-2 md:mb-4">Potential User Testing</h3>
              <p className="text-[16px]">After launch, moderated or unmoderated user testing could provide valuable qualitative feedback to guide future iterations.</p>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Figma Exploration Section */}
      <ProjectSection bgClassName="bg-[#DDA15F]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div>
            <ProjectSectionTitle dotColor="text-[#af5800]">Explore the Figma File for This Project</ProjectSectionTitle>
            <p className="text-[16px] mb-4 md:mb-8">Design speaks louder than words—Check out the full Figma file to see the process, decisions, and iterations behind this project.</p>
            <Link
              href="https://www.figma.com/design/QeGLFmUuzV5p7i7X3rTgkw/Lilypad-Landing-Page?node-id=0-1&p=f&t=J6KoiOK7CWMkXlIR-0"
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
      </ProjectSection>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
