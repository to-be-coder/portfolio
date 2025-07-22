import ProjectHeroSection from '@/components/project-hero-section'
import ProjectHorizontalBlock from '@/components/project-horizontal-block'
import ProjectSection from '@/components/project-section'
import ProjectSectionTitle from '@/components/project-section-title'
import VerticalBlock from '@/components/project-vertical-block'
import CtaSection from '@/components/ui/cta'
import { User } from 'lucide-react'
import Image from 'next/image'

export default function VisionTrackPage() {
  return (
    <main>
      {/* Hero Section */}
      <ProjectHeroSection title="Vision Track" subtitle="2-Month Discovery Sprint" imageSrc="/vision-track-hero.png" imageAlt="Vision Track hero background" />

      {/* Overview Section */}
      <ProjectSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-16">
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg border border-gray-200">
            <p className=" font-semibold">Role: </p>
            <p>UX Research & Product Discovery</p>
          </div>
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg border border-gray-200">
            <p className=" font-semibold">Timeframe: </p>
            <p> 2 months</p>
          </div>
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg border border-gray-200">
            <p className=" font-semibold">Stage: </p>
            <p> Pre-MVP</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          <VerticalBlock title="Overview" titleColor="text-black" borderColor="border-[#C1C1C1]">
            <p>
              VisionTrack helps teams stay aligned in fast-paced, remote environments by translating company goals into daily clarity. We started by designing for startup founders—but early research
              revealed they didn&apos;t want another tool to log into. More importantly, they weren&apos;t struggling to set goals—they were struggling to act on them. People understood company
              priorities, but couldn&apos;t connect them to day-to-day decisions. Alignment wasn&apos;t the issue—translation was. So we pivoted to SMB Sales and Marketing teams, cut 80% of features,
              and defined a Slack-based MVP: one reminder loop, delivered inside the tools they already used.
            </p>
          </VerticalBlock>
          <VerticalBlock title="Design Objective" titleColor="text-black" borderColor="border-[#C1C1C1]">
            <p>
              Our main objective was to apply lean startup principles—experimenting, iterating, and pivoting quickly—to define an MVP that meets user needs. We aimed to address the core pain points
              around goal alignment, while testing innovative ways to keep teams focused and motivated.
            </p>
          </VerticalBlock>
        </div>
      </ProjectSection>

      <div className="relative bg-[#212121] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <ProjectSectionTitle color="text-white" dotColor="text-blue-400">
            Conclusion First
          </ProjectSectionTitle>
          <ProjectHorizontalBlock title="Outcome" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
            <p>
              We uncovered the real gap: teams didn&apos;t struggle to set goals—they struggled to act on them day to day. <br />
            </p>
            <p>
              We pivoted from startup founders to SMB Sales and Marketing teams, reframed the problem around “goal translation,” and scoped a focused MVP: one Slack-based reminder loop, delivered
              inside the tools teams already use. This direction reduced product complexity, aligned tightly with behavior, and eliminated adoption friction—setting a clear foundation for future
              prototyping.
            </p>
          </ProjectHorizontalBlock>

          <ProjectHorizontalBlock title="What I Learned" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
            <p>
              We spent too long validating the segment before testing behavior—so by the time we were ready to prototype, we ran out of time. The research gave us confidence in the pivot, but it came
              at the cost of momentum. I learned that deep research is valuable, but only when balanced with early behavioral validation. In future projects, I&apos;d prototype sooner—testing one
              high-signal behavior after just 5–6 interviews, rather than waiting for full certainty. Fast feedback beats over-validating assumptions.
            </p>
          </ProjectHorizontalBlock>
        </div>
      </div>

      <div className="relative bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <ProjectSectionTitle dotColor="text-blue-400" showBorder={true} borderColor="border-[#C1C1C1]">
            Research & Findings
          </ProjectSectionTitle>
          <p>
            We ran interviews with 5 startup founders and 20 SMB execs (CPOs, PMs, team leads). Instead of pitching features, we focused on context and behavior. Using open-ended prompts like “walk me
            through how your team tracks goals today.”
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-8 md:mt-12 items-stretch">
            <p className="text-xl font-bold flex-1">Insights That Informed Our MVP Pivot</p>

            <div className="flex flex-col bg-white p-4 rounded-lg border border-gray-200 flex-1">
              <p>Founders didn&apos;t want &ldquo;another dashboard&rdquo;—they defaulted to Excel or Notion.</p>
            </div>
            <div className="flex flex-col bg-white p-4 rounded-lg border border-gray-200 flex-1">
              <p>They didn&apos;t want another tool to manage and log into.</p>
            </div>
            <div className="flex flex-col bg-white p-4 rounded-lg border border-gray-200 flex-1">
              <p>The real pain was not &ldquo;setting goals,&rdquo; but translating them into meaningful, actionable work.</p>
            </div>
            <div className="flex flex-col bg-white p-4 rounded-lg border border-gray-200 flex-1">
              <p>Slack was the best channel for driving behavior change without requiring login friction.</p>
            </div>
            <div className="flex flex-col bg-white p-4 rounded-lg border border-gray-200 flex-1">
              <p>Trying to serve every team diluted the value. Narrowing to Sales and Marketing gave us clarity and focus.</p>
            </div>
          </div>

          {/* Value Propositions Section */}
          <div className="col-span-1 space-y-4 mt-16">
            <p className="text-xl font-bold">Value Propositions</p>
            <div className="w-full flex justify-center rounded-lg border border-[#C1C1C1] p-4">
              <Image
                src="/vision-track-value.png"
                alt="Value proposition diagram showing different roles: IC, Manager, Top-Manager, and Board Member, with their respective workflows and motivations"
                width={1728}
                height={900}
                className="w-full h-auto max-h-[700px] object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <ProjectSectionTitle dotColor="text-blue-400">What Changed Our Mind</ProjectSectionTitle>
          <div className="space-y-4 mb-8 md:mb-12 border-t border-[#C1C1C1] pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <h3 className="text-2xl font-regular text-[#a1a1a1]">What Surprised Me</h3>
              </div>
              <div className="md:col-span-2 space-y-2">
                <p>
                  Most teams didn&apos;t lack strategy—they lacked daily visibility into it. In nearly every interview, people could recite their company&apos;s mission or top-line OKRs. But they
                  struggled to answer: &ldquo;What does this mean for me today?&rdquo; &ldquo;We already have goals. We just don&apos;t know what to do with them day to day.&rdquo; — Marketing
                  Manager. This realization reframed our entire direction.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 mb-8 border-t border-[#C1C1C1] pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <h3 className="text-2xl font-regular text-[#a1a1a1]">MVP Direction</h3>
              </div>
              <div className="md:col-span-2 space-y-6 md:space-y-8">
                <p>
                  We cut <span className="font-bold">80%</span> of our feature ideas—dashboards, metrics views, onboarding flows. Instead, we focused on a single Slack-based reminder loop.
                </p>
                <div className="flex flex-col gap-2">
                  <p className=" font-semibold">Why Build on Slack?</p>
                  <p className=" bg-blue-50 p-4 rounded-lg border border-blue-100">
                    Users told us they didn&apos;t want to log into yet another tool. Slack was already in their flow—and frictionless adoption was a requirement, not a nice-to-have.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className=" font-semibold">We designed a lightweight flow:</p>
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-stretch">
                    <p className=" bg-blue-50 p-4 rounded-lg flex-1 border border-blue-100">
                      <span className="font-bold">1. Manager</span> sets OKRs at the start of the cycle.
                    </p>
                    <p className=" bg-blue-50 p-4 rounded-lg flex-1 border border-blue-100">
                      <span className="font-bold">2. ICs</span> get simple, periodic Slack reminders: “Which of your tasks support this objective?”
                    </p>
                    <p className=" bg-blue-50 p-4 rounded-lg flex-1 border border-blue-100">
                      <span className="font-bold">3. Managers</span> get aggregate insights via Slack thread summaries—no login required.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <ProjectSection bgClassName="bg-blue-50">
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 border-t border-[#C1C1C1] h-8 flex items-center"></div>
          <ProjectSectionTitle dotColor="text-blue-400">Discovery Sprint</ProjectSectionTitle>

          <div className="flex-1 border-t border-[#C1C1C1] h-8 flex items-center"></div>
        </div>
        <div className="w-full flex justify-center mt-12 bg-blue-200 rounded-lg p-8">
          <Image src="/vision-track-workflow.png" alt="Project workflow timeline showing hypothesis, research, and synthesis phases" width={1728} height={600} className="w-full h-auto" priority />
        </div>

        <div className="mt-16 lg:mt-32">
          <h2 className="text-3xl font-normal mb-4">Hypothesis #1</h2>
          {/* Grid for 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Target Customers */}
            <VerticalBlock title="Target Customers" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
              <p>Startups in the US.</p>
            </VerticalBlock>
            {/* Pain Points */}
            <VerticalBlock title="Pain Points (Assumed)" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
              <p>Startups struggle to stay focused on their goals amid daily distractions. They need effective ways to set, track, and achieve objectives efficiently.</p>
            </VerticalBlock>
            {/* Proposed Solution */}
            <VerticalBlock title="Proposed Solution" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
              <p>A goal-alignment app with reminders (e.g., via Slack) to keep teams on track.</p>
            </VerticalBlock>
          </div>

          {/* Why we chose this hypothesis */}
          <VerticalBlock title="Why we chose this hypothesis?" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
            <p>I applied lean startup methodology to test our ideas quickly. We hypothesized that startups, given their fast-paced environments, would benefit from an alignment tool.</p>
          </VerticalBlock>
        </div>

        <div className="mt-16 lg:mt-32">
          <h2 className="text-3xl font-normal mb-4">Research #1</h2>

          {/* Interviewed */}
          <ProjectHorizontalBlock title="Interviewed" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
            <p>5 Founders</p>
            <div className="grid grid-rows-1 gap-1 mt-1 md:mt-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <User key={i} className="w-6 h-6 fill-blue-400 stroke-none" />
                ))}
              </div>
            </div>
          </ProjectHorizontalBlock>

          {/* Challenges */}
          <ProjectHorizontalBlock title="Challenges" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
            <div className="space-y-1 md:space-y-2">
              <div>
                <span className="font-semibold ">Budget Constraints:</span>
                <span> Founders often hesitate to pay for yet another tool.</span>
              </div>
              <div>
                <span className="font-semibold ">Habitual Tools:</span>
                <span> Excel is already free and familiar.</span>
              </div>
            </div>
          </ProjectHorizontalBlock>

          {/* Decision + Learning */}
          <ProjectHorizontalBlock title="Decision + Learning" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
            <p>
              Through these interviews, I discovered that while startups do struggle with alignment, many wouldn&apos;t invest in a dedicated goal-tracking solution. This prompted me to question our
              target market and refine our hypothesis to address a different segment. As a result, I made the strategic decision to shift our focus to SMBs and refine our hypothesis to better address
              their unique challenges and needs.
            </p>
          </ProjectHorizontalBlock>
        </div>

        <div className="mt-16 lg:mt-32">
          <h2 className="text-3xl font-normal mb-4">Hypothesis #2</h2>
          {/* Grid for 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Target Customers */}
            <VerticalBlock title="Target Customers" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
              <p>SMB in the US (50-200 people).</p>
            </VerticalBlock>
            {/* Pain Points */}
            <VerticalBlock title="Pain Points (Identified)" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
              <div className="space-y-1 md:space-y-2">
                <ul className="list-disc list-inside">
                  <li> High-level company goals become diluted or lost in translation.</li>
                  <li> Employees struggle to connect daily tasks to broader objectives.</li>
                  <li> Existing tools are overwhelming and fail to provide quick clarity.</li>
                </ul>
              </div>
            </VerticalBlock>
            {/* Proposed Solution */}
            <VerticalBlock title="Potential Solution" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
              <p>
                VisionTrack ensures seamless goal alignment from CEOs to individual contributors by translating objectives into tasks, sending reminders, and providing empathetic feedback indicators.
              </p>
            </VerticalBlock>
          </div>
        </div>

        <div className="mt-16 lg:mt-32">
          <h2 className="text-3xl font-normal mb-4">User Personas</h2>
          <div className="border-t border-[#C1C1C1] mb-4 md:mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Image src="/vision-track-user-1.png" alt="User personas" width={1728} height={900} className="w-full h-auto rounded-lg border border-gray-200" priority />
            <Image src="/vision-track-user-2.png" alt="User personas" width={1728} height={900} className="w-full h-auto rounded-lg border border-gray-200" priority />
          </div>
        </div>

        <div className="mt-16 lg:mt-32">
          <h2 className="text-3xl font-normal mb-4">Research #2</h2>

          {/* Interviewed */}
          <ProjectHorizontalBlock title="Interviewed" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
            <p>20 People (Product manager, CTO, CEO, CPO, Founder)</p>
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
          </ProjectHorizontalBlock>

          {/* Quotes */}
          <ProjectHorizontalBlock title="Quotes" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
            <div className="space-y-1 md:space-y-2">
              <div>
                <span className="font-semibold ">01</span>
                <span> &ldquo;Goals often get lost in translation—through constant updates or simply being forgotten.&rdquo;</span>
              </div>
              <div>
                <span className="font-semibold ">02</span>
                <span> &ldquo;Great leadership means catching all ideas, nurturing innovation, and knowing when to let go of those that don&apos;t fit.&rdquo;</span>
              </div>
              <div>
                <span className="font-semibold ">03</span>
                <span> &ldquo;We need a way to align our team without overwhelming them with yet another app.&rdquo;</span>
              </div>
            </div>
          </ProjectHorizontalBlock>

          {/* Pain Points */}
          <ProjectHorizontalBlock title="Pain Points" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
            <div className="space-y-1 md:space-y-2">
              <div>
                <span className="font-semibold ">01</span>
                <span> Translating abstract goals into actionable tasks.</span>
              </div>
              <div>
                <span className="font-semibold ">02</span>
                <span> Employees already juggling multiple logins.</span>
              </div>
              <div>
                <span className="font-semibold ">03</span>
                <span> Not everything is captured by KPIs alone—some critical tasks are unquantifiable yet vital.</span>
              </div>
            </div>
          </ProjectHorizontalBlock>

          {/* Decision + Learning */}
          <ProjectHorizontalBlock title="Decision + Learning" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
            <p>
              We decided to focus on a single department within an SMB—specifically Marketing or Sales. This narrower scope makes it easier to pilot new tools, generate measurable results, and avoid
              developing a watered-down product trying to serve every department at once.
            </p>
          </ProjectHorizontalBlock>
        </div>
      </ProjectSection>

      {/* Competitive Analysis Section */}
      <ProjectSection>
        <ProjectSectionTitle dotColor="text-blue-400" showBorder={true} borderColor="border-[#C1C1C1]">
          Competitive Analysis
        </ProjectSectionTitle>
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
      </ProjectSection>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
