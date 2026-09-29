'use client'

import CtaSection from '@/components/ui-block/cta'
import { VerticalCard } from '@/components/ui-block/project-card'
import ProjectContent from '@/components/ui-block/project-content'
import ProjectPullQuote from '@/components/ui-block/project-pull-quote'
import ProjectSectionTitle from '@/components/ui-block/project-section-title'
import { HorizontalStack, VerticalStack } from '@/components/ui-block/project-stack'
import { ScrollSpy, ScrollSpyLink, ScrollSpyNav, ScrollSpySection, ScrollSpyViewport } from '@/components/ui/scroll-spy'
import { ArrowDown, ArrowUpRight, Bot, Database, Github, LayoutDashboard, Search, ShieldCheck } from 'lucide-react'
import Image from 'next/image'

const mobileScreens = [
  {
    src: '/careerbot-mobile-applications.png',
    alt: 'Careerbot mobile application pipeline with three new roles',
    title: 'Scan the shortlist',
  },
  {
    src: '/careerbot-mobile-role.png',
    alt: 'Careerbot mobile role detail sliding over the application pipeline',
    title: 'Inspect one role',
  },
  {
    src: '/careerbot-mobile-profile.png',
    alt: 'Careerbot mobile Search Profile with role preferences',
    title: 'Tune the search',
  },
  {
    src: '/careerbot-mobile-skills.png',
    alt: 'Careerbot mobile AI Skills list',
    title: 'See every skill',
  },
]

const ExternalCta = ({ href, label, icon: Icon }: { href: string; label: string; icon?: React.ComponentType<{ className?: string }> }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-indigo-700"
  >
    {Icon && <Icon className="w-4 h-4" />}
    {label}
    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
  </a>
)

export default function CareerbotPage() {
  return (
    <main>
      <ScrollSpy offset={0} defaultValue="overview" orientation="horizontal">
        <ScrollSpyNav>
          <ScrollSpyLink value="overview" activeClassName="data-[state=active]:text-indigo-600">
            Overview
          </ScrollSpyLink>
          <ScrollSpyLink value="product-decision" activeClassName="data-[state=active]:text-indigo-600 data-[state=active]:font-semibold">
            Product decision
          </ScrollSpyLink>
          <ScrollSpyLink value="product-tour" activeClassName="data-[state=active]:text-indigo-600 data-[state=active]:font-semibold">
            Product tour
          </ScrollSpyLink>
          <ScrollSpyLink value="architecture" activeClassName="data-[state=active]:text-indigo-600 data-[state=active]:font-semibold">
            Architecture
          </ScrollSpyLink>
          <ScrollSpyLink value="principles" activeClassName="data-[state=active]:text-indigo-600 data-[state=active]:font-semibold">
            Principles
          </ScrollSpyLink>
        </ScrollSpyNav>

        <ScrollSpyViewport className="flex-1 max-w-3xl mx-auto">
          <div className="flex flex-col gap-8">
            <div className="w-full h-auto flex flex-col relative mx-auto">
              <div className="relative z-10 flex-1 flex flex-col w-full justify-end mt-5 border-b border-gray-200">
                <h1 className="flex-1 text-4xl md:text-5xl font-bold tracking-tight leading-tight text-black">Careerbot</h1>
                <p className="items-end text-lg md:text-2xl mb-1 text-black">A career assistant designed around what agents and interfaces each do best.</p>
              </div>
            </div>
            <div className="w-full overflow-hidden rounded-xl bg-white ring-1 ring-black/10 shadow-2xl">
              <Image
                src="/careerbot-dashboard-latest.png"
                alt="Careerbot dashboard showing an application pipeline and a detailed role panel"
                width={1600}
                height={1000}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          <ScrollSpySection value="overview" className="flex flex-col">
            <ProjectSectionTitle color="text-black" dotColor="text-indigo-600">
              Overview
            </ProjectSectionTitle>
            <ProjectContent>
              <VerticalStack>
                <p className="text-lg">
                  Job hunting mixes two very different kinds of work. Researching companies, reading career pages, evaluating fit, and tailoring a resume are open-ended tasks. Reviewing a shortlist,
                  comparing roles, and recording a decision are structured tasks. Careerbot gives each kind of work the right surface.
                </p>
                <p>
                  I designed and built the product end to end. Agent skills handle the research-heavy work. A Next.js dashboard handles the moments where scanning and clicking are faster. Both read and
                  write the same local Markdown files, so there is one source of truth and no sync problem between the two experiences.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <ExternalCta href="https://github.com/thoughtfulllc/careerbot" label="View on GitHub" icon={Github} />
                </div>
              </VerticalStack>
              <HorizontalStack mobileCols={1} desktopCols={3} gapClassName="gap-2 md:gap-4">
                <VerticalCard title="My role" bgColor="bg-gray-100" titleColor="text-gray-500">
                  Product strategy, agent workflows, UX/UI, and full-stack implementation
                </VerticalCard>
                <VerticalCard title="Team" bgColor="bg-gray-100" titleColor="text-gray-500">
                  Solo designer and builder
                </VerticalCard>
                <VerticalCard title="Status" bgColor="bg-gray-100" titleColor="text-gray-500">
                  Open-source product, actively evolving
                </VerticalCard>
              </HorizontalStack>
            </ProjectContent>
          </ScrollSpySection>

          <ScrollSpySection value="product-decision" className="flex flex-col bg-indigo-50 rounded-xl p-6 md:p-8">
            <ProjectSectionTitle color="text-black" dotColor="text-indigo-600">
              The product decision
            </ProjectSectionTitle>
            <ProjectContent>
              <ProjectPullQuote>Let the agent handle intent-driven work. Add structured UI only where structure genuinely helps.</ProjectPullQuote>
              <p>
                The easy pattern would have been to put a chatbox in a dashboard and make every task conversational. That would slow down routine decisions and hide the product&apos;s strongest
                capability behind prompting. I designed Careerbot from the interaction boundary outward instead.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                  <Bot className="w-7 h-7 text-indigo-600 mb-4" />
                  <p className="font-semibold text-lg mb-2">Agent skills</p>
                  <p className="text-sm text-gray-700">Research companies, scan job sources, evaluate fit, add a single role, and prepare a source-grounded tailored resume.</p>
                </div>
                <div className="hidden md:flex flex-col items-center justify-center text-indigo-400" aria-hidden>
                  <ArrowDown className="w-5 h-5 rotate-[-90deg]" />
                  <span className="text-xs font-semibold uppercase tracking-widest [writing-mode:vertical-rl] my-2">Shared files</span>
                  <ArrowDown className="w-5 h-5 rotate-90" />
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-indigo-100">
                  <LayoutDashboard className="w-7 h-7 text-indigo-600 mb-4" />
                  <p className="font-semibold text-lg mb-2">Focused dashboard</p>
                  <p className="text-sm text-gray-700">Scan new roles, inspect the evidence, edit the search profile, download resumes, and record Applied or Skipped.</p>
                </div>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          <ScrollSpySection value="product-tour" className="flex flex-col">
            <ProjectSectionTitle color="text-black" dotColor="text-indigo-600">
              Product tour
            </ProjectSectionTitle>
            <ProjectContent>
              <VerticalStack title="A decision workspace, not another job board" titleColor="text-black">
                <p>
                  The main view keeps the application pipeline and the evidence for one role in the same frame. People can move from scanning to judgment without losing their place or opening a stack
                  of tabs.
                </p>
                <div className="overflow-hidden rounded-xl bg-white ring-1 ring-black/10 shadow-xl">
                  <Image src="/careerbot-dashboard-latest.png" alt="Careerbot application pipeline and role detail side by side" width={1600} height={1000} className="w-full h-auto" />
                </div>
              </VerticalStack>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <figure className="space-y-3">
                  <div className="overflow-hidden rounded-xl bg-white ring-1 ring-black/10">
                    <Image src="/careerbot-pipeline-latest.png" alt="Careerbot application list with status controls" width={1400} height={1576} className="w-full h-auto" />
                  </div>
                  <figcaption className="text-sm text-gray-600">A compact pipeline makes status, freshness, location, and compensation scannable before a role is opened.</figcaption>
                </figure>
                <figure className="space-y-3">
                  <div className="overflow-hidden rounded-xl bg-white ring-1 ring-black/10">
                    <Image src="/careerbot-role-detail-latest.png" alt="Careerbot role detail with quick facts and the full job description" width={1400} height={1576} className="w-full h-auto" />
                  </div>
                  <figcaption className="text-sm text-gray-600">The detail sheet keeps source material, notes, and the final status decision together.</figcaption>
                </figure>
              </div>
              <VerticalStack title="The workflow stays useful on a phone" titleColor="text-black">
                <p>
                  Mobile keeps the same decision flow in a tighter frame. The role detail rises over the list, while the search profile and skill library remain available when the work moves away
                  from a desk.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] gap-6 md:gap-10 items-center rounded-xl bg-indigo-50 p-5 md:p-8">
                  <div className="mx-auto w-full max-w-[300px] rounded-[2.5rem] bg-zinc-950 p-2 shadow-2xl ring-1 ring-black/15">
                    <div className="overflow-hidden rounded-[2rem] bg-zinc-950">
                      <Image
                        src="/careerbot-mobile-demo.gif"
                        alt="Animated Careerbot mobile tour sliding between applications, role detail, search profile, and AI skills"
                        width={344}
                        height={746}
                        className="w-full h-auto motion-reduce:hidden"
                        unoptimized
                      />
                      <Image
                        src="/careerbot-mobile-demo-poster.png"
                        alt="Careerbot mobile application pipeline"
                        width={344}
                        height={746}
                        className="hidden w-full h-auto motion-reduce:block"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-700">Animated mobile tour</p>
                    <p className="text-xl md:text-2xl font-semibold text-black">Four core screens move through one continuous workflow.</p>
                    <p className="text-gray-700">
                      The animation mirrors the sideways browsing pattern below. Reduced-motion settings automatically replace it with a still frame.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-black">Swipe through the mobile screens</p>
                    <p className="text-xs text-gray-500">Drag sideways</p>
                  </div>
                  <div
                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    role="region"
                    aria-label="Careerbot mobile screen gallery"
                    tabIndex={0}
                  >
                    {mobileScreens.map((screen) => (
                      <figure key={screen.src} className="w-[78vw] max-w-[300px] shrink-0 snap-center space-y-3 first:snap-start">
                        <div className="overflow-hidden rounded-[2rem] bg-zinc-950 p-1.5 ring-1 ring-black/15 shadow-lg">
                          <Image src={screen.src} alt={screen.alt} width={430} height={932} className="w-full h-auto rounded-[1.65rem]" />
                        </div>
                        <figcaption className="text-sm font-medium text-gray-700">{screen.title}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </VerticalStack>
              <VerticalStack title="Search rules stay explicit" titleColor="text-black">
                <p>
                  The Search Profile turns job-search preferences into inspectable product rules. Titles, compensation, location, company, work style, culture, and voice each have their own surface,
                  while the connection state makes it clear which personal context the agent can use.
                </p>
                <div className="overflow-hidden rounded-xl bg-white ring-1 ring-black/10 shadow-xl">
                  <Image src="/careerbot-search-profile-latest.png" alt="Careerbot Search Profile with role filters and vault connection status" width={1600} height={1000} className="w-full h-auto" />
                </div>
              </VerticalStack>
              <VerticalStack title="The agent interface is visible too" titleColor="text-black">
                <p>
                  AI Skills documents the open-ended capabilities that sit beside the dashboard. Each skill explains its job and writes to the same Markdown records the interface renders, making the
                  split between agent work and structured review concrete.
                </p>
                <div className="overflow-hidden rounded-xl bg-white ring-1 ring-black/10 shadow-xl">
                  <Image src="/careerbot-ai-skills-latest.png" alt="Careerbot AI Skills page listing the available agent workflows" width={1600} height={1000} className="w-full h-auto" />
                </div>
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>

          <ScrollSpySection value="architecture" className="flex flex-col bg-violet-50 rounded-xl p-6 md:p-8">
            <ProjectSectionTitle color="text-black" dotColor="text-violet-600">
              One source of truth
            </ProjectSectionTitle>
            <ProjectContent>
              <p>
                The agent and dashboard are two interfaces over the same local data model. Status lives in the folder structure. Decisions keep their dates. Search preferences have a typed document.
                The product stays inspectable and portable because the source of truth is readable without the app.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch text-center">
                <div className="rounded-xl bg-white p-5 ring-1 ring-violet-100 flex flex-col items-center">
                  <Bot className="w-7 h-7 text-violet-600 mb-3" />
                  <p className="font-semibold">Agent</p>
                  <p className="text-sm text-gray-600 mt-1">Reads context and writes researched results</p>
                </div>
                <div className="rounded-xl bg-violet-600 p-5 text-white flex flex-col items-center">
                  <Database className="w-7 h-7 mb-3" />
                  <p className="font-semibold">Local Markdown</p>
                  <p className="text-sm text-violet-100 mt-1">Applications, companies, preferences, and status</p>
                </div>
                <div className="rounded-xl bg-white p-5 ring-1 ring-violet-100 flex flex-col items-center">
                  <LayoutDashboard className="w-7 h-7 text-violet-600 mb-3" />
                  <p className="font-semibold">Dashboard</p>
                  <p className="text-sm text-gray-600 mt-1">Reads the same files and writes decisions back</p>
                </div>
              </div>
              <VerticalStack title="Memory that compounds" titleColor="text-black">
                <p>
                  Careerbot reads durable personal context from Icca, my implementation of Andrej Karpathy&apos;s LLM Wiki pattern. Instead of asking the model to rediscover me from a pile of
                  documents for every role, I compile evidence into a maintained memory layer that becomes more useful as new sources arrive.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
                  <div className="rounded-xl bg-white p-5 ring-1 ring-violet-100">
                    <ShieldCheck className="w-7 h-7 text-violet-600 mb-3" />
                    <p className="font-semibold">Raw evidence</p>
                    <p className="text-sm text-gray-600 mt-1">Resumes, project notes, and explicit corrections are captured as immutable sources. The model can cite them, but never rewrite them.</p>
                  </div>
                  <div className="rounded-xl bg-violet-600 p-5 text-white">
                    <Database className="w-7 h-7 mb-3" />
                    <p className="font-semibold">Compiled wiki</p>
                    <p className="text-sm text-violet-100 mt-1">The LLM updates interlinked Markdown pages, reconciles new evidence with existing claims, and keeps an index and append-only history.</p>
                  </div>
                  <div className="rounded-xl bg-white p-5 ring-1 ring-violet-100">
                    <Bot className="w-7 h-7 text-violet-600 mb-3" />
                    <p className="font-semibold">Governed access</p>
                    <p className="text-sm text-gray-600 mt-1">A schema decides which facts can update automatically and which interpretations or preferences require my review. Careerbot reads live pages but cannot write back.</p>
                  </div>
                </div>
                <p>
                  At this scale, index-first reading, cross-links, and linting are enough. There is no RAG pipeline or embedding database.{' '}
                  <a
                    href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-violet-700 underline decoration-violet-300 underline-offset-4 hover:text-violet-900"
                  >
                    Read Karpathy&apos;s original LLM Wiki idea
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  .
                </p>
              </VerticalStack>
              <HorizontalStack mobileCols={1} desktopCols={3} gapClassName="gap-3">
                <VerticalCard title="No sync layer" bgColor="bg-white" titleColor="text-violet-700">
                  One data model means the agent and dashboard cannot drift into separate versions of the job search.
                </VerticalCard>
                <VerticalCard title="No hidden database" bgColor="bg-white" titleColor="text-violet-700">
                  The records stay readable, editable, and portable outside the interface.
                </VerticalCard>
                <VerticalCard title="No automatic submission" bgColor="bg-white" titleColor="text-violet-700">
                  Careerbot prepares and tracks the work. The person stays in control of the final application.
                </VerticalCard>
              </HorizontalStack>
            </ProjectContent>
          </ScrollSpySection>

          <ScrollSpySection value="principles" className="flex flex-col">
            <ProjectSectionTitle color="text-black" dotColor="text-indigo-600">
              What the system optimizes for
            </ProjectSectionTitle>
            <ProjectContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl bg-gray-100 p-5">
                  <Search className="w-7 h-7 text-indigo-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Breadth before repetition</h3>
                  <p className="text-sm text-gray-700">Search spans employer pages and public sources, then filters early so deeper judgment is spent on plausible roles.</p>
                </div>
                <div className="rounded-xl bg-gray-100 p-5">
                  <ShieldCheck className="w-7 h-7 text-indigo-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Private by default</h3>
                  <p className="text-sm text-gray-700">The resume, preferences, identity details, and application history stay local and are excluded from the public repository.</p>
                </div>
                <div className="rounded-xl bg-gray-100 p-5">
                  <Database className="w-7 h-7 text-indigo-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Diagnosable automation</h3>
                  <p className="text-sm text-gray-700">The pipeline records where results came from and why candidates were filtered, so a small result set can be explained and improved.</p>
                </div>
              </div>
              <VerticalStack title="What I learned" titleColor="text-black">
                <p>
                  Agent-first design is mostly boundary design. The important question was never how to make every task feel intelligent. It was where ambiguity helps, where structure helps, and how
                  both surfaces can share state without making the system harder to understand.
                </p>
                <p>
                  Careerbot turned that principle into a working product: the agent gets freedom where judgment is needed, the interface gets structure where repetition is costly, and the user keeps
                  control at the moment a real-world commitment is made.
                </p>
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>
        </ScrollSpyViewport>
      </ScrollSpy>
      <CtaSection />
    </main>
  )
}
