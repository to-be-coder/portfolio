'use client'

import CtaSection from '@/components/ui/cta'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function LilypadPage() {
  type ImageType = 'desktop' | 'tablet' | 'mobile'
  const [selectedImage, setSelectedImage] = useState<ImageType>('desktop')

  return (
    <main>
      {/* Hero Section */}
      <div className="w-full h-auto flex flex-col relative max-w-7xl mx-auto px-8">
        {/* Background Image with Overlay */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row w-full space-between justify-end lg:items-end my-10 border-b border-gray-200">
          <h1 className="flex-1 text-4xl md:text-5xl font-bold tracking-tight leading-tight text-black">Lilypad</h1>
          <p className="items-end text-lg md:text-2xl mb-1 text-black">EdTech Startup: Student Evaluation Service for School Districts</p>
        </div>
      </div>
      <div className="w-full h-auto max-w-7xl mx-auto px-8 flex flex-col items-center rounded-lg overflow-hidden">
        <Image src="/lilypad-hero.png" alt="Lilypad hero background" width={1000} height={100} className="w-full flex-1 object-cover max-h-[600px] object-center rounded-lg" />
      </div>

      {/* Initial Overview and Challenges Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
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
      </div>

      {/* Typography Section */}
      <div className="relative bg-[#212121] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">
            Typography<span className="text-[#DDA15F] text-[64px]">.</span>
          </h2>

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
        </div>
      </div>

      {/* Colors Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Title */}
          <div>
            <h2 className="text-4xl font-normal">
              Colors<span className="text-[#DDA15F] text-[64px]">.</span>
            </h2>
          </div>

          {/* Primary Colors */}
          <div className="flex flex-col">
            <div className="h-48 bg-[#15423D] rounded-lg flex items-end p-4">
              <span className="text-white">#15423D</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-48 bg-[#FEFAE1] rounded-lg flex items-end p-4">
              <span>#FEFAE1</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-48 bg-[#DDA15F] rounded-lg flex items-end p-4">
              <span>#DDA15F</span>
            </div>
          </div>
        </div>

        {/* Secondary Colors Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <div className="h-48 bg-[#FFFFFF] rounded-lg flex items-end p-4 border border-gray-200">
              <span>#FFFFFF</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-48 bg-[#F8F8F8] rounded-lg flex items-end p-4 border border-gray-200">
              <span>#F8F8F8</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-48 bg-[#494949] rounded-lg flex items-end p-4">
              <span className="text-white">#494949</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-48 bg-[#000000] rounded-lg flex items-end p-4">
              <span className="text-white">#000000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Design Approach Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Left Column - Title */}
          <div>
            <h2 className="text-4xl font-normal">
              Design Approach<span className="text-[#DDA15F] text-[64px]">.</span>
            </h2>
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
                Optimized the layout for mobile and tablet devices since the startup anticipates a significant portion of traffic coming from mobile users. Also ensured images and text scale
                appropriately to maintain readability across various screen sizes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-First Design Section */}
      <div className="relative bg-[#DDA15F] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <div className="flex flex-col gap-16">
            <div className="flex justify-center items-center h-full">
              <h2 className="text-4xl font-normal">
                Mobile-First Design<span className="text-[#af5800] text-[64px]">.</span>
              </h2>
            </div>

            <div className="flex justify-between w-full h-auto space-x-4">
              <div className="flex-1 flex justify-center">
                <Image src="/lilypad-iphone-1.png" alt="First mobile screen of Lilypad's responsive design" width={240} height={480} className="w-full h-auto" priority />
              </div>

              <div className="flex-1 flex justify-center">
                <Image src="/lilypad-iphone-2.png" alt="Second mobile screen of Lilypad's responsive design" width={240} height={480} className="w-full h-auto" priority />
              </div>

              <div className="flex-1 flex justify-center">
                <Image src="/lilypad-iphone-3.png" alt="Third mobile screen of Lilypad's responsive design" width={240} height={480} className="w-full h-auto" priority />
              </div>
              <div className="flex-1 flex justify-center">
                <Image src="/lilypad-iphone-4.png" alt="Fourth mobile screen of Lilypad's responsive design" width={240} height={480} className="w-full h-auto" priority />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Design Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl max-h-[600px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 gap-y-12">
          {/* Left Column - Title and Navigation */}
          <div className="lg:col-span-1 flex flex-col">
            <h2 className="text-4xl font-normal mb-8 lg:mb-12 text-center">
              Responsive Design<span className="text-[#DDA15F] text-[64px]">.</span>
            </h2>

            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div className="pt-[4px] flex-1">
                <button
                  onClick={() => setSelectedImage('desktop')}
                  className={`text-left w-full h-full transition-all flex items-center justify-center px-4 py-3 rounded-lg cursor-pointer ${
                    selectedImage === 'desktop' ? 'bg-green-200 text-black' : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  <h3 className="text-2xl font-regular">Desktop View</h3>
                </button>
              </div>

              <div className="pt-[4px] flex-1">
                <button
                  onClick={() => setSelectedImage('tablet')}
                  className={`text-left w-full h-full transition-all flex items-center justify-center px-4 py-3 rounded-lg cursor-pointer ${
                    selectedImage === 'tablet' ? 'bg-yellow-200 text-black' : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  <h3 className="text-2xl font-regular">Tablet View</h3>
                </button>
              </div>

              <div className="pt-[4px] flex-1">
                <button
                  onClick={() => setSelectedImage('mobile')}
                  className={`text-left w-full h-full transition-all flex items-center justify-center px-4 py-3 rounded-lg cursor-pointer ${
                    selectedImage === 'mobile' ? 'bg-blue-200 text-black' : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  <h3 className="text-2xl font-regular">Mobile View</h3>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div
            className={`lg:col-span-2 flex justify-center items-center w-full max-h-[800px] border  rounded-lg ${
              selectedImage === 'desktop' ? 'bg-green-50 border-green-100' : selectedImage === 'tablet' ? 'bg-yellow-50 border-yellow-100' : 'bg-blue-50 border-blue-100'
            }`}
          >
            {selectedImage === 'mobile' && (
              <Image src="/lilypad-mobile-view.png" alt="Mobile screen of Lilypad's responsive design" width={600} height={800} className="w-full h-full object-contain" priority />
            )}
            {selectedImage === 'tablet' && (
              <Image src="/lilypad-ipad-view.png" alt="Tablet screen of Lilypad's responsive design" width={600} height={800} className="w-full h-full object-contain" priority />
            )}
            {selectedImage === 'desktop' && (
              <Image src="/lilypad-desktop-view.png" alt="Desktop screen of Lilypad's responsive design" width={600} height={800} className="w-full h-full object-contain" priority />
            )}
          </div>
        </div>
      </div>

      {/* UI Kit Section */}
      <div className="relative bg-[#212121] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-8 lg:mb-18 md:text-center text-white">
            Design System from Programmer&apos;s Perspective<span className="text-[#DDA15F] text-[64px]">.</span>
          </h2>
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
                  I designed every section with clear breakpoints in mind — mobile, tablet, desktop — so devs could rely on consistent stacking behavior and spacing logic. The system also leaves room
                  to scale as new content types or layouts are added.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        {/* Title */}
        <h2 className="text-4xl font-normal mb-2">
          Next Steps<span className="text-[#DDA15F] text-[64px]">.</span>
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Gather Real-World Feedback */}
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
      </div>

      {/* Figma Exploration Section */}
      <div className="relative bg-[#DDA15F] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h2 className="text-4xl font-normalmb-8 lg:mb-12">
                Explore the Figma File for This Project<span className="text-[#af5800] text-[64px]">.</span>
              </h2>
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
        </div>
      </div>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
