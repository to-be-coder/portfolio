'use client'

import CtaSection from '@/components/ui-block/cta'
import { HorizontalCard, VerticalCard } from '@/components/ui-block/project-card'
import ProjectContent from '@/components/ui-block/project-content'
import ProjectHeroSection from '@/components/ui-block/project-hero-section'
import ProjectSectionTitle from '@/components/ui-block/project-section-title'
import { HorizontalStack, VerticalStack } from '@/components/ui-block/project-stack'
import { ScrollSpy, ScrollSpyLink, ScrollSpyNav, ScrollSpySection, ScrollSpyViewport } from '@/components/ui/scroll-spy'
import { User } from 'lucide-react'
import Image from 'next/image'

export default function VisionTrackPage() {
  return (
    <main>
      <ScrollSpy offset={0} defaultValue="overview" orientation="horizontal">
        <ScrollSpyNav>
          <ScrollSpyLink value="overview" activeClassName="data-[state=active]:text-blue-400">
            Overview
          </ScrollSpyLink>
          <ScrollSpyLink value="conclusion-first" activeClassName="data-[state=active]:text-blue-400 data-[state=active]:font-semibold">
            Conclusion First
          </ScrollSpyLink>
          <ScrollSpyLink value="research-findings" activeClassName="data-[state=active]:text-blue-400 data-[state=active]:font-semibold">
            Research & Findings
          </ScrollSpyLink>
          <ScrollSpyLink value="what-changed-our-mind" activeClassName="data-[state=active]:text-blue-400 data-[state=active]:font-semibold">
            What Changed Our Mind
          </ScrollSpyLink>
          <ScrollSpyLink value="discovery-sprint" activeClassName="data-[state=active]:text-blue-400 data-[state=active]:font-semibold">
            Discovery Sprint
          </ScrollSpyLink>
          <ScrollSpyLink value="hypothesis-1" activeClassName="data-[state=active]:text-blue-400 data-[state=active]:font-semibold">
            Hypothesis #1
          </ScrollSpyLink>
          <ScrollSpyLink value="research-1" activeClassName="data-[state=active]:text-blue-400 data-[state=active]:font-semibold">
            Research #1
          </ScrollSpyLink>
          <ScrollSpyLink value="hypothesis-2" activeClassName="data-[state=active]:text-blue-400 data-[state=active]:font-semibold">
            Hypothesis #2
          </ScrollSpyLink>
          <ScrollSpyLink value="user-personas" activeClassName="data-[state=active]:text-blue-400 data-[state=active]:font-semibold">
            User Personas
          </ScrollSpyLink>
          <ScrollSpyLink value="research-2" activeClassName="data-[state=active]:text-blue-400 data-[state=active]:font-semibold">
            Research #2
          </ScrollSpyLink>
          <ScrollSpyLink value="competitive-analysis" activeClassName="data-[state=active]:text-blue-400 data-[state=active]:font-semibold">
            Competitive Analysis
          </ScrollSpyLink>
        </ScrollSpyNav>
        <ScrollSpyViewport className="flex-1 max-w-3xl mx-auto">
          {/* Hero Section */}
          <ProjectHeroSection title="Vision Track" subtitle="2-Month Discovery Sprint" imageSrc="/vision-track-hero.png" imageAlt="Vision Track hero background" />

          {/* Overview Section */}
          <ScrollSpySection value="overview" className="flex flex-col">
            <ProjectSectionTitle color="text-black" dotColor="text-blue-400">
              Overview
            </ProjectSectionTitle>
            <ProjectContent>
              <HorizontalStack mobileCols={1} desktopCols={3} gapClassName="gap-2 md:gap-4">
                <VerticalCard title="Role:" bgColor="bg-gray-100" titleColor="text-black">
                  UX Research & Product Discovery
                </VerticalCard>
                <VerticalCard title="Timeframe:" bgColor="bg-gray-100" titleColor="text-black">
                  2 months
                </VerticalCard>
                <VerticalCard title="Stage:" bgColor="bg-gray-100" titleColor="text-black">
                  Pre-MVP
                </VerticalCard>
              </HorizontalStack>
              <HorizontalStack mobileCols={1} desktopCols={2} gapClassName="gap-x-16 gap-y-8">
                <VerticalStack title="Overview" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                  <p>
                    VisionTrack helps teams stay aligned in fast-paced, remote environments by translating company goals into daily clarity. We started by designing for startup founders, but early
                    research revealed they didn&apos;t want another tool to log into. More importantly, they weren&apos;t struggling to set goals, they were struggling to act on them. People
                    understood company priorities, but couldn&apos;t connect them to day-to-day decisions. Alignment wasn&apos;t the issue, translation was. So we pivoted to SMB Sales and Marketing
                    teams, cut 80% of features, and defined a Slack-based MVP: one reminder loop, delivered inside the tools they already used.
                  </p>
                </VerticalStack>
                <VerticalStack title="Design Objective" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                  <p>
                    Our main objective was to apply lean startup principles, experimenting, iterating, and pivoting quickly, to define an MVP that meets user needs. We aimed to address the core pain
                    points around goal alignment, while testing innovative ways to keep teams focused and motivated.
                  </p>
                </VerticalStack>
              </HorizontalStack>
            </ProjectContent>
          </ScrollSpySection>

          <ScrollSpySection value="conclusion-first" className="flex flex-col">
            <ProjectSectionTitle color="text-black" dotColor="text-blue-400">
              Conclusion First
            </ProjectSectionTitle>
            <VerticalStack>
              <HorizontalCard title="Outcome" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <p>
                  We uncovered the real gap: teams didn&apos;t struggle to set goals, they struggled to act on them day to day. <br />
                </p>
                <p>
                  We pivoted from startup founders to SMB Sales and Marketing teams, reframed the problem around &ldquo;goal translation,&rdquo; and scoped a focused MVP: one Slack-based reminder
                  loop, delivered inside the tools teams already use. This direction reduced product complexity, aligned tightly with behavior, and eliminated adoption friction, setting a clear
                  foundation for future prototyping.
                </p>
              </HorizontalCard>
              <HorizontalCard title="What I Learned" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <p>
                  We spent too long validating the segment before testing behavior, so by the time we were ready to prototype, we ran out of time. The research gave us confidence in the pivot, but it
                  came at the cost of momentum. I learned that deep research is valuable, but only when balanced with early behavioral validation. In future projects, I&apos;d prototype sooner,
                  testing one high-signal behavior after just 5–6 interviews, rather than waiting for full certainty. Fast feedback beats over-validating assumptions.
                </p>
              </HorizontalCard>
            </VerticalStack>
          </ScrollSpySection>

          <ScrollSpySection value="research-findings" className="flex flex-col bg-blue-50 p-8 rounded-xl">
            <ProjectSectionTitle color="text-black" dotColor="text-blue-400">
              Research & Findings
            </ProjectSectionTitle>
            <ProjectContent>
              <p>
                We ran interviews with 5 startup founders and 20 SMB execs (CPOs, PMs, team leads). Instead of pitching features, we focused on context and behavior. Using open-ended prompts like
                &ldquo;walk me through how your team tracks goals today.&rdquo;
              </p>
              <HorizontalStack mobileCols={1} desktopCols={3} gapClassName="gap-2 md:gap-4" title="Insights That Informed Our MVP Pivot" titleColor="text-black">
                <div className="flex flex-col bg-blue-100 p-4 rounded-xl">
                  <p>Founders didn&apos;t want &ldquo;another dashboard&rdquo;,they defaulted to Excel or Notion.</p>
                </div>
                <div className="flex flex-col bg-blue-100 p-4 rounded-xl">
                  <p>They didn&apos;t want another tool to manage and log into.</p>
                </div>
                <div className="flex flex-col bg-blue-100 p-4 rounded-xl">
                  <p>The real pain was not &ldquo;setting goals,&rdquo; but translating them into meaningful, actionable work.</p>
                </div>
                <div className="flex flex-col bg-blue-100 p-4 rounded-xl">
                  <p>Slack was the best channel for driving behavior change without requiring login friction.</p>
                </div>
                <div className="flex flex-col bg-blue-100 p-4 rounded-xl">
                  <p>Trying to serve every team diluted the value. Narrowing to Sales and Marketing gave us clarity and focus.</p>
                </div>
              </HorizontalStack>

              {/* Value Propositions Section */}
              <VerticalStack title="Value Propositions" titleColor="text-black">
                <div className="w-full flex justify-center">
                  <Image
                    src="/vision-track-value.png"
                    alt="Value proposition diagram showing different roles: IC, Manager, Top-Manager, and Board Member, with their respective workflows and motivations"
                    width={1728}
                    height={900}
                    className="w-full h-auto max-h-[700px] object-contain"
                    priority
                  />
                </div>
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>

          <ScrollSpySection value="what-changed-our-mind" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-blue-400">What Changed Our Mind</ProjectSectionTitle>
            <ProjectContent>
              <VerticalStack title="What Surprised Me" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <p>
                  Most teams didn&apos;t lack strategy, they lacked daily visibility into it. In nearly every interview, people could recite their company&apos;s mission or top-line OKRs. But they
                  struggled to answer: &ldquo;What does this mean for me today?&rdquo; &ldquo;We already have goals. We just don&apos;t know what to do with them day to day.&rdquo; (Marketing
                  Manager). This realization reframed our entire direction. Manager. This realization reframed our entire direction.
                </p>
              </VerticalStack>

              <VerticalStack title="MVP Direction" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <p>
                  We cut <span className="font-bold">80%</span> of our feature ideas, dashboards, metrics views, onboarding flows. Instead, we focused on a single Slack-based reminder loop.
                </p>
                <VerticalStack>
                  <p className=" font-semibold">Why Build on Slack?</p>
                  <VerticalCard>
                    <p>Users told us they didn&apos;t want to log into yet another tool. Slack was already in their flow, and frictionless adoption was a requirement, not a nice-to-have.</p>
                  </VerticalCard>
                </VerticalStack>

                <VerticalStack>
                  <p className=" font-semibold">We designed a lightweight flow:</p>
                  <HorizontalStack>
                    <VerticalCard>
                      <p>
                        <span className="font-bold">1. Manager</span> sets OKRs at the start of the cycle.
                      </p>
                    </VerticalCard>
                    <VerticalCard>
                      <p>
                        <span className="font-bold">2. ICs</span> get simple, periodic Slack reminders: &ldquo;Which of your tasks support this objective?&rdquo;
                      </p>
                    </VerticalCard>
                    <VerticalCard>
                      <p>
                        <span className="font-bold">3. Managers</span> get aggregate insights via Slack thread summaries, no login required.
                      </p>
                    </VerticalCard>
                  </HorizontalStack>
                </VerticalStack>
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Workflow Section */}
          <ScrollSpySection value="discovery-sprint" className="flex flex-col bg-blue-50 p-8 rounded-xl">
            <ProjectSectionTitle dotColor="text-blue-400" textAlign="text-center">
              Discovery Sprint
            </ProjectSectionTitle>

            <ProjectContent>
              <div className="w-full flex justify-center mt-12 bg-blue-200 rounded-lg p-8">
                <Image
                  src="/vision-track-workflow.png"
                  alt="Project workflow timeline showing hypothesis, research, and synthesis phases"
                  width={1728}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Hypothesis #1 Section */}
          <ScrollSpySection value="hypothesis-1" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-blue-400">Hypothesis #1</ProjectSectionTitle>
            <ProjectContent>
              <HorizontalStack mobileCols={1} desktopCols={3}>
                <VerticalCard title="Target Customers" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  Startups in the US.
                </VerticalCard>
                <VerticalCard title="Pain Points (Assumed)" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  Startups struggle to stay focused on their goals amid daily distractions. They need effective ways to set, track, and achieve objectives efficiently.
                </VerticalCard>
                <VerticalCard title="Proposed Solution" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  A goal-alignment app with reminders (e.g., via Slack) to keep teams on track.
                </VerticalCard>
              </HorizontalStack>

              {/* Why we chose this hypothesis */}
              <VerticalStack title="Why we chose this hypothesis?" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <p>I applied lean startup methodology to test our ideas quickly. We hypothesized that startups, given their fast-paced environments, would benefit from an alignment tool.</p>
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Research #1 Section */}
          <ScrollSpySection value="research-1" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-blue-400">Research #1</ProjectSectionTitle>
            <VerticalStack>
              {/* Interviewed */}
              <HorizontalCard title="Interviewed" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <p>5 Founders</p>
                <div className="grid grid-rows-1 gap-1 mt-1 md:mt-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <User key={i} className="w-6 h-6 fill-blue-400 stroke-none" />
                    ))}
                  </div>
                </div>
              </HorizontalCard>

              {/* Challenges */}
              <HorizontalCard title="Challenges" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
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
              </HorizontalCard>

              {/* Decision + Learning */}
              <HorizontalCard title="Decision + Learning" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <p>
                  Through these interviews, I discovered that while startups do struggle with alignment, many wouldn&apos;t invest in a dedicated goal-tracking solution. This prompted me to question
                  our target market and refine our hypothesis to address a different segment. As a result, I made the strategic decision to shift our focus to SMBs and refine our hypothesis to better
                  address their unique challenges and needs.
                </p>
              </HorizontalCard>
            </VerticalStack>
          </ScrollSpySection>

          {/* Hypothesis #2 Section */}
          <ScrollSpySection value="hypothesis-2" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-blue-400">Hypothesis #2</ProjectSectionTitle>
            <ProjectContent>
              <HorizontalStack>
                <VerticalCard title="Target Customers" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  SMB in the US (50-200 people).
                </VerticalCard>
                <div className="flex flex-col bg-gray-100 p-4 rounded-xl">
                  <span className="font-semibold mb-2 text-[#a1a1a1]">Pain Points (Identified)</span>
                  <ul className="list-disc list-inside space-y-1 md:space-y-2">
                    <li> High-level company goals become diluted or lost in translation.</li>
                    <li> Employees struggle to connect daily tasks to broader objectives.</li>
                    <li> Existing tools are overwhelming and fail to provide quick clarity.</li>
                  </ul>
                </div>
                <VerticalCard title="Potential Solution" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  VisionTrack ensures seamless goal alignment from CEOs to individual contributors by translating objectives into tasks, sending reminders, and providing empathetic feedback
                  indicators.
                </VerticalCard>
              </HorizontalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* User Personas Section */}
          <ScrollSpySection value="user-personas" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-blue-400">User Personas</ProjectSectionTitle>
            <ProjectContent>
              <HorizontalStack mobileCols={1} desktopCols={2}>
                <Image src="/vision-track-user-1.png" alt="User personas" width={1728} height={900} className="w-full h-auto rounded-lg border border-gray-200" priority />
                <Image src="/vision-track-user-2.png" alt="User personas" width={1728} height={900} className="w-full h-auto rounded-lg border border-gray-200" priority />
              </HorizontalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Research #2 Section */}
          <ScrollSpySection value="research-2" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-blue-400">Research #2</ProjectSectionTitle>
            <VerticalStack>
              {/* Interviewed */}
              <HorizontalCard title="Interviewed" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
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
              </HorizontalCard>

              {/* Quotes */}
              <HorizontalCard title="Quotes" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <div className="space-y-1 md:space-y-2">
                  <div>
                    <span className="font-semibold ">01</span>
                    <span> &ldquo;Goals often get lost in translation, through constant updates or simply being forgotten.&rdquo;</span>
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
              </HorizontalCard>

              {/* Pain Points */}
              <HorizontalCard title="Pain Points" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
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
                    <span> Not everything is captured by KPIs alone, some critical tasks are unquantifiable yet vital.</span>
                  </div>
                </div>
              </HorizontalCard>

              {/* Decision + Learning */}
              <HorizontalCard title="Decision + Learning" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <p>
                  We decided to focus on a single department within an SMB, specifically Marketing or Sales. This narrower scope makes it easier to pilot new tools, generate measurable results, and
                  avoid developing a watered-down product trying to serve every department at once.
                </p>
              </HorizontalCard>
            </VerticalStack>
          </ScrollSpySection>

          {/* Competitive Analysis Section */}
          <ScrollSpySection value="competitive-analysis" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-blue-400">Competitive Analysis</ProjectSectionTitle>
            <ProjectContent>
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
            </ProjectContent>
          </ScrollSpySection>
        </ScrollSpyViewport>
      </ScrollSpy>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
