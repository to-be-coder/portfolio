import CtaSection from '@/components/ui/cta'
import { ProjectHero } from '@/components/ui/project-hero'

export default function LilypadPage() {
  return (
    <main>
      {/* Hero Section */}
      <ProjectHero title="Lilypad" subtitle="EdTech Startup: Student Evaluation Service for School Districts" tags={['UI Design', 'Landing Page', 'Responsive Design', 'Stakeholder Management']} />

      {/* Initial Overview and Challenges Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-64 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Left Column - Overview */}
          <div className="border-t border-[#C1C1C1] pt-[4px]">
            <h2 className="text-2xl font-light text-gray-400 mb-6">Overview</h2>
            <p className="text-[18px]">
              I collaborated with a startup to redesign their landing page concept before it was published. With no existing analytics or user feedback to draw from, I focused on creating a clear and
              compelling layout that highlighted the startup&apos;s value proposition and guided visitors toward key actions—such as requesting more information.
            </p>
          </div>

          {/* Right Column - Challenges */}
          <div className="space-y-12">
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-light text-gray-400 mb-6">Challenges</h2>
              <div className="space-y-4">
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
      <div className="relative bg-[#212121] text-white ">
        <div className="max-w-[1728px] mx-auto px-16 py-16">
          <h2 className="text-4xl font-normal mb-16">Typography</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {/* Left Column - Large "Aa" Display */}
            <div className="flex items-center justify-center">
              <span className="text-[200px] font-light">Aa</span>
            </div>

            {/* Right Column - Typography Details */}
            <div className="space-y-12">
              {/* Typeface */}
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h3 className="text-2xl font-light text-gray-400 mb-6">Typeface</h3>
                <p className="text-[18px]">Plus Jakarta Sans</p>
              </div>

              {/* Weights */}
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h3 className="text-2xl font-light text-gray-400 mb-6">Weights</h3>
                <div className="space-y-2">
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-64 mb-32">
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-64 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Left Column - Title */}
          <div>
            <h2 className="text-4xl font-normal">Design Approach</h2>
          </div>

          {/* Right Column - Approach Details */}
          <div className="space-y-12">
            {/* Content */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-light text-gray-400 mb-6">Content</h3>
              <p className="text-[18px]">
                Collaborated with the startup team to define and highlight their core benefits, ensuring every section of the page directly addressed key user questions and pain points.
              </p>
            </div>

            {/* Visual Hierarchy & Layout */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-light text-gray-400 mb-6">Visual Hierarchy & Layout</h3>
              <p className="text-[18px]">
                Created a clean, minimalist design that draws attention to the most important information first. I also used consistent typography and spacing so users can quickly scan and understand
                the page&apos;s content.
              </p>
            </div>

            {/* Calls-to-Action */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-light text-gray-400 mb-6">Calls-to-Action</h3>
              <p className="text-[18px]">Strategically placed CTAs in prominent locations, making it easy for users to take the next step.</p>
            </div>

            {/* Responsive Design */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-light text-gray-400 mb-6">Responsive Design</h3>
              <p className="text-[18px]">
                Optimized the layout for mobile and tablet devices since the startup anticipates a significant portion of traffic coming from mobile users. Also ensured images and text scale
                appropriately to maintain readability across various screen sizes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
