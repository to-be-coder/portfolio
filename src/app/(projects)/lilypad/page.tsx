import CtaSection from '@/components/ui/cta'
import { MoveDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function LilypadPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="w-full h-[90vh] flex flex-col relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image src="/lilypad-hero.jpeg" alt="Lilypad hero background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/85" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center gap-y-2 md:gap-y-4 px-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-center text-white">Lilypad</h1>
          <p className="text-[32px] mt-4 text-center text-white">EdTech Startup: Student Evaluation Service for School Districts</p>
        </div>

        <div className="relative z-10 px-8">
          <div className="flex flex-wrap gap-1 md:gap-2">
            {['UI Design', 'Landing Page', 'Responsive Design', 'Stakeholder Management'].map((tag, index) => (
              <span key={index} className="rounded-full border border-white px-4 py-1 text-sm text-white">
                {tag}
              </span>
            ))}
          </div>

          <div className="border-t border-white/20 mt-4 pt-4 flex justify-end">
            <div className="flex items-center text-base text-white hover:text-white/80">
              Check Out the Project
              <MoveDown className="text-[#ff9c6a] w-6 h-4 stroke-3" />
            </div>
          </div>
        </div>
      </div>
      {/* Initial Overview and Challenges Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Left Column - Overview */}
          <div className="border-t border-[#C1C1C1] pt-[4px]">
            <h2 className="text-2xl font-regular text-gray-400 mb-2 md:mb-4">Overview</h2>
            <p className="text-[18px]">
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
                  <span className="font-semibold text-[18px]">No Historical User Data</span>
                  <p className="text-[18px]">Since this was the first version of the landing page, all design decisions were based on best practices and internal stakeholder feedback.</p>
                </div>
                <div>
                  <span className="font-semibold text-[18px]">Clarity of Value Proposition</span>
                  <p className="text-[18px]">The startup needed a concise way to explain what they do and why it matters.</p>
                </div>
                <div>
                  <span className="font-semibold text-[18px]">Future Scalability</span>
                  <p className="text-[18px]">The design had to be flexible enough to evolve as the startup&apos;s product offerings expand.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Typography Section */}
      <div className="relative bg-[#212121] text-white">
        <div className="max-w-[1728px] mx-auto px-8 lg:px-16 py-16 lg:py-32">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">Typography</h2>

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
                <p className="text-[18px]">Plus Jakarta Sans</p>
              </div>

              {/* Weights */}
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h3 className="text-2xl font-regular text-gray-400 mb-2 md:mb-4">Weights</h3>
                <div className="space-y-1 md:space-y-2">
                  <p className="text-[18px] font-normal">Regular</p>
                  <p className="text-[18px] font-semibold">Semi-Bold</p>
                  <p className="text-[18px] font-bold">Bold</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Colors Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Title */}
          <div>
            <h2 className="text-4xl font-normal">Colors</h2>
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Left Column - Title */}
          <div>
            <h2 className="text-4xl font-normal">Design Approach</h2>
          </div>

          {/* Right Column - Approach Details */}
          <div className="space-y-4 md:space-y-8">
            {/* Content */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-2 md:mb-4">Content</h3>
              <p className="text-[18px]">
                Collaborated with the startup team to define and highlight their core benefits, ensuring every section of the page directly addressed key user questions and pain points.
              </p>
            </div>

            {/* Visual Hierarchy & Layout */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-6">Visual Hierarchy & Layout</h3>
              <p className="text-[18px]">
                Created a clean, minimalist design that draws attention to the most important information first. I also used consistent typography and spacing so users can quickly scan and understand
                the page&apos;s content.
              </p>
            </div>

            {/* Calls-to-Action */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-6">Calls-to-Action</h3>
              <p className="text-[18px]">Strategically placed CTAs in prominent locations, making it easy for users to take the next step.</p>
            </div>

            {/* Responsive Design */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-6">Responsive Design</h3>
              <p className="text-[18px]">
                Optimized the layout for mobile and tablet devices since the startup anticipates a significant portion of traffic coming from mobile users. Also ensured images and text scale
                appropriately to maintain readability across various screen sizes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-First Design Section */}
      <div className="relative bg-[#DDA15F] text-white">
        <div className="max-w-[1728px] mx-auto px-4 sm:px-8 py-16 lg:py-32">
          <h2 className="text-4xl font-normal mb-2 md:mb-4">Mobile-First Design</h2>

          <div className="flex justify-center items-center gap-4">
            <Image src="/lilypad-iphone-1.png" alt="First mobile screen of Lilypad's responsive design" width={120} height={240} className="w-full max-w-[120px]" priority />
            <Image src="/lilypad-iphone-2.png" alt="Second mobile screen of Lilypad's responsive design" width={120} height={240} className="w-full max-w-[120px]" priority />
            <Image src="/lilypad-iphone-3.png" alt="Third mobile screen of Lilypad's responsive design" width={120} height={240} className="w-full max-w-[120px]" priority />
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <Image src="/lilypad-iphone-4.png" alt="Fourth mobile screen of Lilypad's responsive design" width={120} height={240} className="w-full max-w-[120px]" priority />
            <Image src="/lilypad-iphone-5.png" alt="Fifth mobile screen of Lilypad's responsive design" width={120} height={240} className="w-full max-w-[120px]" priority />
          </div>
        </div>
      </div>

      {/* Responsive Design Section */}
      <div className="relative">
        <div className="max-w-[1728px] mx-auto px-16 my-16 lg:my-32">
          <h2 className="text-4xl font-normal mb-2 md:mb-4">Responsive Design</h2>

          <div className="w-full flex justify-center">
            <Image
              src="/lilypad-responsive.png"
              alt="Responsive design mockups showing Lilypad's website layout adapting across desktop, tablet and mobile devices"
              width={864}
              height={450}
              className="w-full lg:w-1/2 h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* UI Kit Section */}
      <div className="relative bg-[#212121]">
        <div className="max-w-[1728px] mx-auto px-4 sm:px-8 py-16 lg:py-32">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12 text-white">UI Kit + Responsive Figma Designs</h2>

          <div className="w-full flex justify-center">
            <Image
              src="/lilypad-ui-kit.png"
              alt="UI Kit showing typography, colors, and responsive grid system for Lilypad's design system"
              width={864}
              height={450}
              className="w-full lg:w-1/2 h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Next Steps Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32">
        {/* Title */}
        <h2 className="text-4xl font-normal mb-8 lg:mb-12">Next Steps</h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Gather Real-World Feedback */}
          <div>
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-[#a0a0a0] mb-2 md:mb-4">Gather Real-World Feedback</h3>
              <p className="text-[18px]">
                Once the page goes live, we plan to track engagement metrics (e.g., click-through rates, sign-ups) and collect user feedback to evaluate the effectiveness of the design.
              </p>
            </div>
          </div>

          {/* Iterative Improvements */}
          <div>
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-[#a0a0a0] mb-2 md:mb-4">Iterative Improvements</h3>
              <p className="text-[18px]">Based on early insights, we will refine the messaging, visuals, and CTA placement to optimize the user journey.</p>
            </div>
          </div>

          {/* Potential User Testing */}
          <div>
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-[#a0a0a0] mb-2 md:mb-4">Potential User Testing</h3>
              <p className="text-[18px]">After launch, moderated or unmoderated user testing could provide valuable qualitative feedback to guide future iterations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Figma Exploration Section */}
      <div className="relative bg-[#DDA15F] text-white">
        <div className="max-w-[1728px] mx-auto px-4 sm:px-8 lg:px-16 py-16 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h2 className="text-4xl font-normalmb-8 lg:mb-12">Explore the Figma File for This Project</h2>
              <p className="text-[18px] mb-4 md:mb-8">Design speaks louder than words—Check out the full Figma file to see the process, decisions, and iterations behind this project.</p>
              <Link
                href="https://www.figma.com/design/QeGLFmUuzV5p7i7X3rTgkw/Lilypad-Landing-Page?node-id=0-1&p=f&t=J6KoiOK7CWMkXlIR-0"
                className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check Out Figma
                <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
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
