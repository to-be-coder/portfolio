import CtaSection from '@/components/ui/cta'
import { User } from 'lucide-react'
import Image from 'next/image'

export default function VisionTrackPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="w-full h-auto flex flex-col relative max-w-7xl mx-auto px-8">
        {/* Background Image with Overlay */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row w-full space-between justify-end lg:items-end my-10 border-b border-gray-200">
          <h1 className="flex-1 text-4xl md:text-5xl font-bold tracking-tight leading-tight text-black">Vision Track</h1>
          <p className="items-end text-lg md:text-2xl mb-1 text-black">Team alignment through OKRs</p>
        </div>
      </div>
      <div className="w-full h-auto max-w-7xl mx-auto px-8 flex flex-col items-center rounded-lg overflow-hidden">
        <Image src="/vision-track-hero.png" alt="Vision Track hero background" width={1000} height={100} className="w-full flex-1 object-cover max-h-[600px] object-center rounded-lg" />
      </div>
      {/* Overview Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <h2 className="text-4xl font-normal mb-8 lg:mb-12">Project Introduction</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Left Column - Stacked Overview and Design Objective */}
          <div className="space-y-8 md:space-y-12">
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Overview</h2>
              <p className="text-[16px]">
                VisionTrack is designed to keep everyone on the same page in a remote, fast-paced workplace. Our aim was to help teams stay connected, aligned, and empowered to achieve both their
                individual goals and the company&apos;s broader vision.
              </p>
            </div>

            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Design Objective</h2>
              <p className="text-[16px]">
                Our main objective was to apply lean startup principles—experimenting, iterating, and pivoting quickly—to define an MVP that meets user needs. We aimed to address the core pain points
                around goal alignment, while testing innovative ways to keep teams focused and motivated.
              </p>
            </div>
          </div>

          {/* Right Column - Team, My Role, and Time Frame */}
          <div className="space-y-8 md:space-y-12">
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-regular text-[#a1a1a1] mmb-2 md:mb-4">My Role</h2>
              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-[16px]">User Research:</span>
                  <p className="text-[16px]">
                    I led the user research efforts, including defining hypotheses, conducting user interviews, synthesizing findings, and guiding the pivot toward a more viable target audience.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Time Frame</h2>
              <p className="text-[16px]">2 months</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Summary Section */}
      <div className="relative bg-[#212121] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">Project Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {/* Left Column - Stacked Overview and Design Objective */}
            <div className="space-y-8 md:space-y-12">
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Project Summary</h2>
                <p className="text-[16px]">
                  We started building for startup founders. But they didn&apos;t want another tool. Interviews revealed that alignment wasn&apos;t the problem—translation was. People understood
                  company goals, but couldn&apos;t map them to their day-to-day work. So we pivoted to SMB Sales and Marketing teams, cut 80% of features, and designed a Slack-based MVP: one goal
                  reminder loop, delivered inside a tool they already used.
                </p>
              </div>

              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Findings</h2>
                <div className="space-y-1 md:space-y-2">
                  <ul className="list-disc list-inside">
                    <li> Founders didn&apos;t want “another dashboard”—they defaulted to Excel or Notion.</li>
                    <li> The real pain was not “setting goals,” but translating them into meaningful, actionable work.</li>
                    <li> Slack was the best channel for driving behavior change without requiring login friction.</li>
                    <li> A one-size-fits-all alignment platform diluted value—department-level focus gave us clarity.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Team, My Role, and Time Frame */}
            <div className="space-y-8 md:space-y-12">
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h2 className="text-2xl font-regular text-[#a1a1a1] mmb-2 md:mb-4">What Surprised Me</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-[16px]">
                      Most teams didn’t lack strategy—they lacked daily visibility into it. In nearly every interview, people could recite their company’s mission or top-line OKRs. But they struggled
                      to answer: “What does this mean for me today?” “We already have goals. We just don’t know what to do with them day to day.” — Marketing Manager This realization reframed our
                      entire direction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">How UXR Drove the Pivot</h2>
                <div className="space-y-4">
                  <p className="text-[16px]">
                    We ran interviews with 5 startup founders and 20 SMB execs (CPOs, PMs, team leads). Instead of validating our feature ideas, we focused on context and behavior. Using open-ended
                    prompts like “walk me through how your team tracks goals today,” we uncovered behavioral truths that challenged our assumptions:
                  </p>
                  <div className="space-y-1 md:space-y-2">
                    <ul className="list-disc list-inside">
                      <li> Startup founders made alignment decisions verbally or in Notion.</li>
                      <li> They wouldn&apos;t pay for a dedicated goal-setting app.</li>
                      <li> SMB teams had OKRs, but needed help making them feel actionable.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h2 className="text-2xl font-regular text-[#a1a1a1] mmb-2 md:mb-4">The Strategic Pivot</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-[16px]">
                      We killed our startup-focused direction. We pivoted to SMB Sales/Marketing teams and reframed the problem from “goal setting” to “goal translation.” These teams had structure,
                      repeatable tasks, and measurable outcomes—but they lacked clarity. New direction: Help teams translate company goals into daily action, without adding another tool to manage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h2 className="text-2xl font-regular text-[#a1a1a1] mmb-2 md:mb-4">MVP Direction</h2>
                <div className="space-y-4">
                  <div className="space-y-4">
                    <p className="text-[16px]">We cut 80% of our feature ideas—dashboards, metrics views, onboarding flows. Instead, we focused on a single Slack-based reminder loop.</p>
                    <p className="text-[16px] font-bold ">
                      Why Slack? <br />
                      Users told us they didn&apos;t want to log into yet another tool. Slack was already in their flow—and frictionless adoption was a requirement, not a nice-to-have.{' '}
                    </p>
                    <p className="text-[16px]">
                      We designed a lightweight flow:
                      <ul className="list-disc list-inside">
                        <li>Manager sets OKRs at the start of the cycle.</li>
                        <li>ICs get simple, periodic Slack nudges: “Which of your tasks support this objective?”</li>
                        <li>Managers get aggregate insights via Slack thread summaries—no login required.</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h2 className="text-2xl font-regular text-[#a1a1a1] mmb-2 md:mb-4">Outcome</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-[16px]">
                      We killed our startup-focused direction, reframed the problem from “goal setting” to “goal translation,” and scoped an MVP for SMB Sales/Marketing teams: a single Slack-based
                      reminder loop. Users didn’t want another tool—so we built where they already work. This let us validate behavior fast, reduce product complexity, and avoid adoption friction.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h2 className="text-2xl font-regular text-[#a1a1a1] mmb-2 md:mb-4">What I&apos;d Do Differently</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-[16px]">
                      We spent too long validating the segment before testing the behavior. In future projects, I’d prototype much sooner—test one high-signal behavior after just 5 interviews instead
                      of over-validating with 25.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <div className="relative bg-blue-400">
        <div className="max-w-[1440px] mx-auto px-16 py-16 lg:py-32">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12 text-center">Workflow</h2>
          <div className="w-full flex justify-center">
            <Image src="/vision-track-workflow.png" alt="Project workflow timeline showing hypothesis, research, and synthesis phases" width={1728} height={600} className="w-full h-auto" priority />
          </div>
        </div>
      </div>

      {/* Hypothesis #1 Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <div className="mx-auto">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">Hypothesis #1</h2>
          {/* Grid for 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Target Customers */}
            <div className="space-y-4">
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h3 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Target Customers</h3>
              </div>
              <p className="text-[16px]">Startups in the US.</p>
            </div>
            {/* Pain Points */}
            <div className="space-y-4">
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h3 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Pain Points (Assumed)</h3>
              </div>
              <p className="text-[16px]">Startups struggle to stay focused on their goals amid daily distractions. They need effective ways to set, track, and achieve objectives efficiently.</p>
            </div>
            {/* Proposed Solution */}
            <div className="space-y-4">
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h3 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Proposed Solution</h3>
              </div>
              <p className="text-[16px]">A goal-alignment app with reminders (e.g., via Slack) to keep teams on track.</p>
            </div>
          </div>

          {/* Why we chose this hypothesis */}
          <div className="mt-8 md:mt-12">
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Why we chose this hypothesis?</h3>
            </div>
            <p className="text-[16px]">
              I applied lean startup methodology to test our ideas quickly. We hypothesized that startups, given their fast-paced environments, would benefit from an alignment tool.
            </p>
          </div>
        </div>
      </div>

      {/* Research #1 Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <div className="mx-auto">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">Research #1</h2>

          {/* Interviewed */}
          <div className="space-y-4 mb-8 border-t border-[#C1C1C1] pt-[4px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <h3 className="text-2xl font-regular text-[#a1a1a1]">Interviewed</h3>
              </div>
              <div className="md:col-span-2">
                <p className="text-[16px]">5 Founders</p>
                <div className="grid grid-rows-1 gap-1 mt-1 md:mt-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <User key={i} className="w-6 h-6 fill-blue-400 stroke-none" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Challenges */}
          <div className="space-y-4 mb-8 border-t border-[#C1C1C1] pt-[4px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <h3 className="text-2xl font-regular text-[#a1a1a1]">Challenges</h3>
              </div>
              <div className="md:col-span-2">
                <div className="space-y-1 md:space-y-2">
                  <div>
                    <span className="font-semibold text-[16px]">Budget Constraints:</span>
                    <span className="text-[16px] "> Founders often hesitate to pay for yet another tool.</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[16px]">Habitual Tools:</span>
                    <span className="text-[16px]"> Excel is already free and familiar.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decision + Learning */}
          <div className="space-y-4 mb-8 border-t border-[#C1C1C1] pt-[4px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <h3 className="text-2xl font-regular text-[#a1a1a1]">Decision + Learning</h3>
              </div>
              <div className="md:col-span-2">
                <p className="text-[16px]">
                  Through these interviews, I discovered that while startups do struggle with alignment, many wouldn&apos;t invest in a dedicated goal-tracking solution. This prompted me to question
                  our target market and refine our hypothesis to address a different segment. As a result, I made the strategic decision to shift our focus to SMBs and refine our hypothesis to better
                  address their unique challenges and needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hypothesis #2 Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <div className="mx-auto">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">Hypothesis #2</h2>
          {/* Grid for 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Target Customers */}
            <div className="space-y-4">
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h3 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Target Customers</h3>
              </div>
              <p className="text-[16px]">SMB in the US (50-200 people).</p>
            </div>
            {/* Pain Points */}
            <div className="space-y-4">
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h3 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Pain Points (Identified)</h3>
              </div>
              <div className="space-y-1 md:space-y-2">
                <ul className="list-disc list-inside">
                  <li> High-level company goals become diluted or lost in translation.</li>
                  <li> Employees struggle to connect daily tasks to broader objectives.</li>
                  <li> Existing tools are overwhelming and fail to provide quick clarity.</li>
                </ul>
              </div>
            </div>
            {/* Proposed Solution */}
            <div className="space-y-4">
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h3 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Potential Solution</h3>
              </div>
              <p className="text-[16px]">
                VisionTrack ensures seamless goal alignment from CEOs to individual contributors by translating objectives into tasks, sending reminders, and providing empathetic feedback indicators.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Research #2 Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <div className="mx-auto">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">Research #2</h2>

          {/* Interviewed */}
          <div className="space-y-8 md:space-y-12 mb-8 border-t border-[#C1C1C1] pt-[4px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <h3 className="text-2xl font-regular text-[#a1a1a1]">Interviewed</h3>
              </div>
              <div className="md:col-span-2">
                <p className="text-[16px]">20 People (Product manager, CTO, CEO, CPO, Founder)</p>
                <div className="grid grid-rows-2 gap-1 mt-1 md:mt-2">
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, i) => (
                      <User key={i} className="w-6 h-6 fill-blue-400 stroke-none" />
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, i) => (
                      <User key={i + 10} className="w-6 h-6 fill-blue-400 stroke-none" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quotes */}
          <div className="space-y-4 mb-8 border-t border-[#C1C1C1] pt-[4px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <h3 className="text-2xl font-regular text-[#a1a1a1]">Quotes</h3>
              </div>
              <div className="md:col-span-2">
                <div className="space-y-1 md:space-y-2">
                  <div>
                    <span className="font-semibold text-[16px]">01</span>
                    <span className="text-[16px]"> &ldquo;Goals often get lost in translation—through constant updates or simply being forgotten.&rdquo;</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[16px]">02</span>
                    <span className="text-[16px]"> &ldquo;Great leadership means catching all ideas, nurturing innovation, and knowing when to let go of those that don&apos;t fit.&rdquo;</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[16px]">03</span>
                    <span className="text-[16px]"> &ldquo;We need a way to align our team without overwhelming them with yet another app.&rdquo;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pain Points */}
          <div className="space-y-4 mb-8 border-t border-[#C1C1C1] pt-[4px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <h3 className="text-2xl font-regular text-[#a1a1a1]">Pain Points</h3>
              </div>
              <div className="md:col-span-2">
                <div className="space-y-1 md:space-y-2">
                  <div>
                    <span className="font-semibold text-[16px]">01</span>
                    <span className="text-[16px]"> Translating abstract goals into actionable tasks.</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[16px]">02</span>
                    <span className="text-[16px]"> Employees already juggling multiple logins.</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[16px]">03</span>
                    <span className="text-[16px]"> Not everything is captured by KPIs alone—some critical tasks are unquantifiable yet vital.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decision + Learning */}
          <div className="space-y-4 mb-8 border-t border-[#C1C1C1] pt-[4px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <h3 className="text-2xl font-regular text-[#a1a1a1]">Decision + Learning</h3>
              </div>
              <div className="md:col-span-2">
                <p className="text-[16px]">
                  We decided to focus on a single department within an SMB—specifically Marketing or Sales. This narrower scope makes it easier to pilot new tools, generate measurable results, and
                  avoid developing a watered-down product trying to serve every department at once.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Value Propositions Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <div className="mx-auto">
          <h2 className="text-4xl font-normal  mb-8 lg:mb-12">Value Propositions</h2>

          <div className="w-full flex justify-center">
            <Image
              src="/vision-track-value.png"
              alt="Value proposition diagram showing different roles: IC, Manager, Top-Manager, and Board Member, with their respective workflows and motivations"
              width={1728}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Competitive Analysis Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <div className="mx-auto">
          <h2 className="text-4xl font-normal  mb-8 lg:mb-12">Competitive Analysis</h2>

          <div className="w-full flex justify-center">
            <Image
              src="/vision-track-table.png"
              alt="Competitive analysis table comparing different tools: ClickUp, Weekdone, WorkBoard, and Lattice, showing their focus, integrations, and key differentiators"
              width={1728}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Reflection Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <div className="mx-auto">
          <h2 className="text-4xl font-normal  mb-8 lg:mb-12">Reflection</h2>

          <div className="space-y-4 md:space-y-8">
            <p className="text-[16px]">
              VisionTrack started as a research-driven project to explore how startups and SMBs align their goals. Through interviews with founders, executives, and product managers, I uncovered
              recurring pain points—lack of transparency, misalignment between high-level goals and daily tasks, and tool overload.
            </p>

            <p className="text-[16px]">
              Although we didn&apos;t fully prototype and validate a final solution within the project&apos;s timeframe, this experience underscored the importance of balancing in-depth research with
              iterative prototyping and testing. In future projects, I plan to allocate more time to prototyping and user feedback loops, ensuring I can refine solutions based on real-world input as
              early as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
