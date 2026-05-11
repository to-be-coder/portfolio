'use client'

import { GridlandMultiSelectDemo } from '@/components/gridland-demo'
import CtaSection from '@/components/ui-block/cta'
import { VerticalCard } from '@/components/ui-block/project-card'
import ProjectContent from '@/components/ui-block/project-content'
import ProjectFlexBlock from '@/components/ui-block/project-flex-block'
import ProjectHeroSection from '@/components/ui-block/project-hero-section'
import ProjectSectionTitle from '@/components/ui-block/project-section-title'
import { HorizontalStack, VerticalStack } from '@/components/ui-block/project-stack'
import { ScrollSpy, ScrollSpyLink, ScrollSpyNav, ScrollSpySection, ScrollSpyViewport } from '@/components/ui/scroll-spy'
import { ArrowUpRight, Github } from 'lucide-react'

const ImagePlaceholder = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-gray-100 rounded-xl p-12 flex items-center justify-center text-[#a1a1a1] text-base text-center ${className}`}>{children}</div>
)

const ExternalCta = ({ href, label, icon: Icon }: { href: string; label: string; icon?: React.ComponentType<{ className?: string }> }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-pink-700"
  >
    {Icon && <Icon className="w-4 h-4" />}
    {label}
    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
  </a>
)

type Feature = {
  title: string
  description: string
  placeholder: string
  imageSrc?: string
  imageAlt?: string
}

const features: Feature[] = [
  {
    title: 'Same React tree, terminal + browser',
    description:
      'Write components once. They render to a real terminal via @gridland/bun and to an HTML5 canvas via @gridland/web. No separate web port. A non-technical user opens a browser tab; a power user runs the same app in their shell.',
    placeholder: '[Side-by-side: identical UI in a terminal and a browser canvas]',
    imageSrc: '/gridland-feature-runtimes.jpg',
    imageAlt: 'gridland landing page rendered side-by-side in a terminal window and a browser tab',
  },
  {
    title: 'Share your terminal app through a web link',
    description:
      'Demo your app in the browser without forcing users to install it before they’re invested. Send a link, they see the running app, TUI included. The install pitch only happens after they want it.',
    placeholder: '[Teammate previewing a gridland app in a browser tab from a shared link]',
    imageSrc: '/gridland-feature-share.jpg',
    imageAlt: 'A gridland TUI app (component reference docs) running in a browser tab at localhost:5175',
  },
  {
    title: 'Shadcn-style terminal components',
    description:
      'gridland ships a library of terminal-native UI components (chat, prompt input, multi-select, table, spinner, status bar, side nav and more) distributed through a shadcn registry. Run bunx create-gridland add chat and the source lands in your repo as plain .tsx files. The web ecosystem already has shadcn for the browser; gridland brings the same ergonomics to the terminal.',
    placeholder: '[Component gallery: chat, multi-select, table, spinner, status bar]',
    imageSrc: '/gridland-feature-shadcn.jpg',
    imageAlt: 'bunx create-gridland add spinner installs the spinner component as plain .tsx source in the user\'s project',
  },
]

export default function GridlandPage() {
  return (
    <main>
      <ScrollSpy offset={0} defaultValue="overview" orientation="horizontal">
        <ScrollSpyNav>
          <ScrollSpyLink value="overview" activeClassName="data-[state=active]:text-pink-600">
            Overview
          </ScrollSpyLink>
          <ScrollSpyLink value="live-demo" activeClassName="data-[state=active]:text-pink-600 data-[state=active]:font-semibold">
            Live demo
          </ScrollSpyLink>
          <ScrollSpyLink value="features" activeClassName="data-[state=active]:text-pink-600 data-[state=active]:font-semibold">
            Highlighted features
          </ScrollSpyLink>
          <ScrollSpyLink value="try-it" activeClassName="data-[state=active]:text-pink-600 data-[state=active]:font-semibold">
            Try it
          </ScrollSpyLink>
        </ScrollSpyNav>

        <ScrollSpyViewport className="flex-1 max-w-3xl mx-auto">
          {/* Hero */}
          <ProjectHeroSection
            title="gridland"
            subtitle="An open-source TUI framework that runs in the terminal and the browser, so non-technical users can use terminal apps too."
            imageSrc="/gridland-cover.jpg"
            imageAlt="gridland hero background"
          />

          {/* Overview */}
          <ScrollSpySection value="overview" className="flex flex-col">
            <ProjectSectionTitle color="text-black" dotColor="text-pink-600">
              Overview
            </ProjectSectionTitle>
            <ProjectContent>
              <VerticalStack>
                <p>
                  gridland is a React-based TUI framework I co-designed and co-built with Chris Roth. The same component tree renders to a browser canvas, a real terminal, and plain text for AI agents:
                  one codebase, three audiences. The project has 300+ stars on GitHub, hit the front page of Hacker News with 111 upvotes on launch, and ships UI components through a shadcn-style
                  registry, so developers own the source instead of pulling in an opaque dependency.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <ExternalCta href="https://gridland.io" label="gridland.io" />
                  <ExternalCta href="https://github.com/thoughtfulllc/gridland" label="GitHub (300+ ★)" icon={Github} />
                  <ExternalCta href="https://news.ycombinator.com/item?id=47505731" label="Hacker News (111 ▲)" />
                  <ExternalCta href="https://www.npmjs.com/org/gridland" label="npm" />
                </div>
              </VerticalStack>
              <HorizontalStack mobileCols={1} desktopCols={3} gapClassName="gap-2 md:gap-4">
                <VerticalCard title="My role" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  Co-creator: framework design, component API, design system, docs site
                </VerticalCard>
                <VerticalCard title="Team" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  Me and Chris Roth, co-builders
                </VerticalCard>
                <VerticalCard title="Status" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  Public on npm and GitHub. 300+ stars. 111 upvotes on Hacker News. Used to build gridland.io itself.
                </VerticalCard>
              </HorizontalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Live demo */}
          <ScrollSpySection value="live-demo" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-pink-600">Live demo: Focus with Multi-Select</ProjectSectionTitle>
            <ProjectContent>
              <p>
                Below is the same <code>FocusApp</code> demo that appears on{' '}
                <a href="https://gridland.io/docs/interaction/focus" target="_blank" rel="noopener noreferrer" className="text-pink-600 underline">
                  gridland.io/docs/interaction/focus
                </a>
                , running here on an HTML <code>&lt;canvas&gt;</code> via <code>@gridland/web</code>. Click the canvas to focus it, then <strong>Tab</strong> moves between columns, <strong>↑/↓</strong>{' '}
                navigates options, <strong>Space/Enter</strong> toggles. Selected items show in cyan; the focused panel gets a dashed pink border.
              </p>
              <GridlandMultiSelectDemo />
              <p className="text-center text-[#a1a1a1] text-base">The same JSX, run with <code>bunx</code>, renders to your real terminal.</p>
            </ProjectContent>
          </ScrollSpySection>

          {/* Highlighted features */}
          <ScrollSpySection value="features" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-pink-600">Highlighted features</ProjectSectionTitle>
            <ProjectContent>
              <div className="flex flex-col gap-y-8 md:gap-y-12">
                {features.map((feature, i) => {
                  const text = (
                    <div className="flex flex-col gap-4">
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  )
                  const image = feature.imageSrc ? (
                    <img src={feature.imageSrc} alt={feature.imageAlt ?? feature.title} className="w-full h-auto rounded-xl" />
                  ) : (
                    <ImagePlaceholder className="h-[240px] w-full">{feature.placeholder}</ImagePlaceholder>
                  )
                  const imageOnLeftDesktop = i % 2 === 1
                  return (
                    <ProjectFlexBlock
                      key={feature.title}
                      left={text}
                      right={image}
                      leftClassName={imageOnLeftDesktop ? 'md:order-2' : ''}
                      rightClassName={imageOnLeftDesktop ? 'md:order-1' : ''}
                    />
                  )
                })}
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Try it */}
          <ScrollSpySection value="try-it" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-pink-600">Try it</ProjectSectionTitle>
            <ProjectContent>
              <p>Spin up a new gridland project in seconds, or run a demo without cloning anything.</p>
              <HorizontalStack mobileCols={1} desktopCols={2}>
                <VerticalCard title="Create a new project" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  <code className="block bg-white rounded-md p-3 text-sm">bunx create-gridland my-app</code>
                </VerticalCard>
                <VerticalCard title="Run a demo" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  <code className="block bg-white rounded-md p-3 text-sm">bunx @gridland/demo landing</code>
                </VerticalCard>
              </HorizontalStack>
              <div className="flex flex-wrap gap-3 pt-2">
                <ExternalCta href="https://gridland.io" label="Visit gridland.io" />
                <ExternalCta href="https://github.com/thoughtfulllc/gridland" label="View on GitHub" icon={Github} />
                <ExternalCta href="https://gridland.io/docs" label="Read the docs" />
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
