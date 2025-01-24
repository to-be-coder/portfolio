import CtaSection from '@/components/ui/cta'
import { MoveDown } from 'lucide-react'
import Image from 'next/image'

export default function VisionTrackPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="container mx-auto px-8 h-[90vh] flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-center">Vision Track</h1>
          <p className="text-[32px] mt-4 text-center">&ldquo;Team alignment through OKRs&rdquo;</p>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-[#C1C1C1] px-4 py-1 text-sm text-black">UX Research</span>
            <span className="rounded-full border border-[#C1C1C1] px-4 py-1 text-sm text-black">Competitive Analysis</span>
            <span className="rounded-full border border-[#C1C1C1] px-4 py-1 text-sm text-black">User Interviews</span>
            <span className="rounded-full border border-[#C1C1C1] px-4 py-1 text-sm text-black">User Persona</span>
            <span className="rounded-full border border-[#C1C1C1] px-4 py-1 text-sm text-black">B2B</span>
            <span className="rounded-full border border-[#C1C1C1] px-4 py-1 text-sm text-black">SaaS</span>
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 flex justify-end">
            <div className="flex items-center text-base text-gray-900 hover:text-gray-700">
              Check Out the Project <MoveDown className="text-[#ff9c6a] w-6 h-4 stroke-[3]" />
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="container  mx-auto px-4 sm:px-6 lg:px-8 mt-64 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Left Column - Stacked Overview and Design Objective */}
          <div className="space-y-12">
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-light text-gray-400 mb-6">Overview</h2>
              <p className="text-[18px]">
                VisionTrack is designed to keep everyone on the same page in a remote, fast-paced workplace. Our aim was to help teams stay connected, aligned, and empowered to achieve both their
                individual goals and the company&apos;s broader vision.
              </p>
            </div>

            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-light text-gray-400 mb-6">Design Objective</h2>
              <p className="text-[18px]">
                Our main objective was to apply lean startup principles—experimenting, iterating, and pivoting quickly—to define an MVP that meets user needs. We aimed to address the core pain points
                around goal alignment, while testing innovative ways to keep teams focused and motivated.
              </p>
            </div>
          </div>

          {/* Right Column - Team, My Role, and Time Frame */}
          <div className="space-y-12">
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-light text-gray-400 mb-6">Team</h2>
              <div className="space-y-2">
                <p className="text-[18px]">Chris Roth</p>
                <p className="text-[18px]">Jessica Cheng</p>
              </div>
            </div>

            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-light text-gray-400 mb-6">My Role</h2>
              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-[18px]">User Research:</span>
                  <p className="text-[18px]">
                    I led the user research efforts, including defining hypotheses, conducting user interviews, synthesizing findings, and guiding the pivot toward a more viable target audience.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-light text-gray-400 mb-6">Time Frame</h2>
              <p className="text-[18px]">2 months</p>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <div className="relative bg-[#FFC157]">
        <div className="max-w-[1440px] mx-auto px-16 py-32">
          <h2 className="text-2xl font-light text-black mb-16 text-center">Workflow</h2>

          <div className="w-full flex justify-center">
            <Image src="/workflow.png" alt="Project workflow timeline showing hypothesis, research, and synthesis phases" width={1728} height={600} className="w-full h-auto" priority />
          </div>
        </div>
      </div>

      {/* Hypothesis #1 Section */}
      <div className="relative">
        <div className="max-w-[1728px] mx-auto px-16 py-32">
          <h2 className="text-4xl font-normal mb-16">Hypothesis #1</h2>
          {/* Grid for 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Target Customers */}
            <div className="space-y-4">
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h3 className="text-2xl font-light text-gray-400">Target Customers</h3>
              </div>
              <p className="text-[18px]">Startups in the US.</p>
            </div>
            {/* Pain Points */}
            <div className="space-y-4">
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h3 className="text-2xl font-light text-gray-400">Pain Points (Assumed)</h3>
              </div>
              <p className="text-[18px]">Startups struggle to stay focused on their goals amid daily distractions. They need effective ways to set, track, and achieve objectives efficiently.</p>
            </div>
            {/* Proposed Solution */}
            <div className="space-y-4">
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h3 className="text-2xl font-light text-gray-400">Proposed Solution</h3>
              </div>
              <p className="text-[18px]">A goal-alignment app with reminders (e.g., via Slack) to keep teams on track.</p>
            </div>
          </div>

          {/* Why we chose this hypothesis */}
          <div className="mt-16">
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-light text-gray-400 mb-4">Why we chose this hypothesis?</h3>
            </div>
            <p className="text-[18px]">
              I applied lean startup methodology to test our ideas quickly. We hypothesized that startups, given their fast-paced environments, would benefit from an alignment tool.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
