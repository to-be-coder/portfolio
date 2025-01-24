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

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
