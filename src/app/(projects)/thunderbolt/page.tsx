'use client'

import CtaSection from '@/components/ui-block/cta'
import { VerticalCard } from '@/components/ui-block/project-card'
import ProjectContent from '@/components/ui-block/project-content'
import ProjectFigmaSection from '@/components/ui-block/project-figma-section'
import ProjectFlexBlock from '@/components/ui-block/project-flex-block'
import ProjectHeroSection from '@/components/ui-block/project-hero-section'
import ProjectPullQuote from '@/components/ui-block/project-pull-quote'
import ProjectSectionTitle from '@/components/ui-block/project-section-title'
import { HorizontalStack, VerticalStack } from '@/components/ui-block/project-stack'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ScrollSpy, ScrollSpyLink, ScrollSpyNav, ScrollSpySection, ScrollSpyViewport } from '@/components/ui/scroll-spy'
import { Check } from 'lucide-react'

type DataModelCard = {
  name: string
  isNew?: boolean
  fadedColumns?: boolean
  columns: { name: string; isNew?: boolean }[]
  unchangedNote?: string
}

const dataModelColumns: { version: string; sublabel: string; cards: DataModelCard[] }[] = [
  {
    version: 'v1',
    sublabel: 'Foundation',
    cards: [
      {
        name: 'Skill',
        columns: [{ name: 'id' }, { name: 'name' }, { name: 'description' }, { name: 'body' }],
      },
    ],
  },
  {
    version: 'v2',
    sublabel: 'Marketplace + uploads',
    cards: [
      {
        name: 'Skill',
        columns: [
          { name: 'id' },
          { name: 'name' },
          { name: 'description' },
          { name: 'body' },
          { name: 'source_type', isNew: true },
          { name: 'source_id', isNew: true },
          { name: 'required_capabilities', isNew: true },
        ],
      },
      {
        name: 'MarketplaceSkill',
        isNew: true,
        columns: [{ name: 'id' }, { name: 'author' }, { name: 'version' }, { name: 'source_url' }],
      },
    ],
  },
  {
    version: 'v3-direction3',
    sublabel: 'Composition',
    cards: [
      {
        name: 'Skill',
        fadedColumns: true,
        columns: [{ name: 'id' }, { name: 'name' }, { name: 'description' }, { name: 'body' }, { name: 'source_type' }, { name: 'source_id' }, { name: 'required_capabilities' }],
        unchangedNote: 'unchanged from v2',
      },
      {
        name: 'MarketplaceSkill',
        fadedColumns: true,
        columns: [{ name: 'id' }, { name: 'author' }, { name: 'version' }, { name: 'source_url' }],
        unchangedNote: 'unchanged from v2',
      },
      {
        name: 'SkillReference',
        isNew: true,
        columns: [{ name: 'parent_skill_id' }, { name: 'referenced_skill_id' }],
      },
    ],
  },
]

type SchemaTable = {
  name: string
  lines: { name: string; pk?: boolean }[]
}

const v3DirectionsComparison: { version: string; sublabel: string; chosen?: boolean; tables: SchemaTable[]; summary: { count: string; description: string } }[] = [
  {
    version: 'v3-direction1',
    sublabel: 'Edit + revert',
    tables: [
      {
        name: 'Skill',
        lines: [{ name: 'id' }, { name: 'name, description, body' }, { name: 'source_type' }, { name: 'install_id  →' }],
      },
      {
        name: 'SkillInstall',
        lines: [{ name: 'id' }, { name: 'marketplace_id  →' }, { name: 'original_hash  →' }, { name: 'current_hash  →' }, { name: 'is_modified' }],
      },
      {
        name: 'SkillBlob',
        lines: [{ name: 'hash', pk: true }, { name: 'content' }, { name: 'ref_count' }],
      },
      {
        name: 'MarketplaceSkill',
        lines: [{ name: 'id, author, version' }, { name: 'canonical_hash  →' }],
      },
    ],
    summary: { count: '4 tables', description: 'Content-addressed storage. Ref-counted blobs. Snapshot per install. Per-install state.' },
  },
  {
    version: 'v3-direction2',
    sublabel: 'App Store model',
    tables: [
      {
        name: 'Skill',
        lines: [{ name: 'id' }, { name: 'name, description, body' }, { name: 'source_type' }, { name: 'install_id  →' }],
      },
      {
        name: 'SkillInstall',
        lines: [{ name: 'id' }, { name: 'marketplace_id  →' }, { name: 'installed_version' }, { name: 'is_modified' }],
      },
      {
        name: 'MarketplaceSkill',
        lines: [{ name: 'id, author, version' }, { name: 'source_url' }],
      },
    ],
    summary: { count: '3 tables', description: 'Per-install state tracking. No recovery from edits. App Store contract.' },
  },
  {
    version: 'v3-direction3',
    sublabel: 'Composition',
    chosen: true,
    tables: [
      {
        name: 'Skill',
        lines: [{ name: 'id' }, { name: 'name, description, body' }, { name: 'source_type' }, { name: 'source_id  →' }],
      },
      {
        name: 'MarketplaceSkill',
        lines: [{ name: 'id, author, version' }, { name: 'source_url' }],
      },
      {
        name: 'SkillReference',
        lines: [{ name: 'parent_skill_id  →' }, { name: 'referenced_skill_id  →' }],
      },
    ],
    summary: { count: '3 tables', description: 'No per-install state. No content-addressing. Just a reference graph.' },
  },
]

export default function ThunderboltPage() {
  return (
    <main>
      <ScrollSpy offset={0} defaultValue="intro" orientation="horizontal">
        <ScrollSpyNav>
          <ScrollSpyLink value="intro" activeClassName="data-[state=active]:text-purple-500">
            Overview
          </ScrollSpyLink>
          <ScrollSpyLink value="impact" activeClassName="data-[state=active]:text-purple-500 data-[state=active]:font-semibold">
            Impact I Made
          </ScrollSpyLink>
          <ScrollSpyLink value="final-design" activeClassName="data-[state=active]:text-purple-500 data-[state=active]:font-semibold">
            Final Design
          </ScrollSpyLink>
          <ScrollSpyLink value="walkthrough" activeClassName="data-[state=active]:text-purple-500 data-[state=active]:font-semibold">
            Walkthrough
          </ScrollSpyLink>
          <ScrollSpyLink value="prototype" activeClassName="data-[state=active]:text-purple-500 data-[state=active]:font-semibold">
            Try the Prototype
          </ScrollSpyLink>
          <ScrollSpyLink value="where-it-started" activeClassName="data-[state=active]:text-purple-500 data-[state=active]:font-semibold">
            Where It Started
          </ScrollSpyLink>
          <ScrollSpyLink value="defining-solution" activeClassName="data-[state=active]:text-purple-500 data-[state=active]:font-semibold">
            Defining the Solution
          </ScrollSpyLink>
          <ScrollSpyLink value="breaking-stages" activeClassName="data-[state=active]:text-purple-500 data-[state=active]:font-semibold">
            Breaking Down the MVP
          </ScrollSpyLink>
          <ScrollSpyLink value="biggest-challenge" activeClassName="data-[state=active]:text-purple-500 data-[state=active]:font-semibold">
            The Biggest Challenge
          </ScrollSpyLink>
          <ScrollSpyLink value="why-chose" activeClassName="data-[state=active]:text-purple-500 data-[state=active]:font-semibold">
            Why I Chose the Final Design
          </ScrollSpyLink>
          <ScrollSpyLink value="original-goals" activeClassName="data-[state=active]:text-purple-500 data-[state=active]:font-semibold">
            Serving the Original Goals
          </ScrollSpyLink>
        </ScrollSpyNav>

        <ScrollSpyViewport className="flex-1 max-w-3xl mx-auto">
          {/* Hero */}
          <ProjectHeroSection title="Thunderbolt" subtitle="Skills feature: shipping in three phases" imageSrc="/thunderbolt-hero.jpg" imageAlt="Thunderbolt hero background" />

          {/* Intro */}
          <ScrollSpySection value="intro" className="flex flex-col">
            <ProjectSectionTitle color="text-black" dotColor="text-purple-500">
              Overview
            </ProjectSectionTitle>
            <ProjectContent>
              <VerticalStack>
                <p>
                  Thunderbolt is an open-source AI client launched by Mozilla. I designed the <strong>Skills feature</strong>, a way to save and reuse prompts that replaces the existing Shortcuts and
                  Automation features.
                </p>
              </VerticalStack>
              <HorizontalStack mobileCols={1} desktopCols={3} gapClassName="gap-2 md:gap-4">
                <VerticalCard title="My role" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  Design lead: design strategy, UI, UX
                </VerticalCard>
                <VerticalCard title="Team" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  Me, Product Manager, 3 Engineers, Product Designer
                </VerticalCard>
                <VerticalCard title="Status" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  v1 is in active build. Internal rollout begins [month]. The metrics at the end of this case study are the ones I&apos;ll be tracking.
                </VerticalCard>
              </HorizontalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Impact I Made */}
          <ScrollSpySection value="impact" className="flex flex-col bg-purple-50 rounded-xl p-8">
            <ProjectSectionTitle color="text-black" dotColor="text-purple-500">
              Impact I Made
            </ProjectSectionTitle>
            <ProjectContent>
              <HorizontalStack mobileCols={1} desktopCols={2}>
                <VerticalCard title="Designed a data structure that engineering can build on, not rewrite." bgColor="bg-purple-100" titleColor="text-black">
                  Each version (v1 → v2 → v3 Direction 3) extends the foundation by addition, not redesign. Two table additions, zero schema migrations across three product releases. Less code to
                  maintain, fewer bugs to chase, less engineering time spent on architectural cleanup.
                </VerticalCard>
                <VerticalCard title="Caught the cascading-deletion problem in v3 Direction 3 before it shipped." bgColor="bg-purple-100" titleColor="text-black">
                  Cannot remove a skill while other skills in the user&apos;s library depend on it. One rule for delete, uninstall, and remove a class of broken-state bugs prevented by structure, not
                  by error handling.
                </VerticalCard>
                <VerticalCard title="Aligned the design with Thunderbolt's brand promise of &ldquo;no vendor lock-in.&rdquo;" bgColor="bg-purple-100" titleColor="text-black">
                  A user&apos;s skill library now travels in either direction between Thunderbolt, Claude Code, Cursor, and Claude.ai. The portability claim isn&apos;t a marketing line; it&apos;s a
                  design property.
                </VerticalCard>
                <VerticalCard title="Brought scope from a 6-month build down to a one-week v1 ship." bgColor="bg-purple-100" titleColor="text-black">
                  When the team&apos;s first direction (v3 Direction 1) was sized, it required document editing, version tracking, and revert UX. That was effectively a second app on top of
                  Thunderbolt. I drove the team toward v3 Direction 3, which keeps the open-source positioning intact and makes v1 buildable in a week.
                </VerticalCard>
              </HorizontalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Final Design + Impacts */}
          <ScrollSpySection value="final-design" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-purple-500">Final Design</ProjectSectionTitle>
            <ProjectContent>
              <VerticalStack>
                <img src="/thunderbolt-final-1.png" alt="Skills settings page with the meeting-notes skill selected and the starter-skills welcome banner" className="w-full h-auto rounded-xl" />
                <HorizontalStack mobileCols={1} desktopCols={2}>
                  <img src="/thunderbolt-final-2.png" alt="Marketplace with the tast-triage skill detail panel open" className="w-full h-auto rounded-xl" />
                  <img src="/thunderbolt-final-3.png" alt="Marketplace grid view showing installable skills" className="w-full h-auto rounded-xl" />
                </HorizontalStack>
                <HorizontalStack mobileCols={1} desktopCols={2}>
                  <img src="/thunderbolt-final-4.png" alt="Chat input with the slash skill picker open" className="w-full h-auto rounded-xl" />
                  <img src="/thunderbolt-final-5.png" alt="Reorder skills modal above the chat input" className="w-full h-auto rounded-xl" />
                </HorizontalStack>
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Walkthrough video */}
          <ScrollSpySection value="walkthrough" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-purple-500">Walkthrough</ProjectSectionTitle>
            <ProjectContent>
              <div className="aspect-video w-full rounded-xl bg-gray-100 flex items-center justify-center text-[#a1a1a1] text-center overflow-hidden">
                <span className="text-5xl md:text-6xl font-semibold">Coming soon</span>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Live Prototype */}
          <ScrollSpySection value="prototype" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-purple-500">Try the Prototype</ProjectSectionTitle>
            <ProjectContent>
              <p>
                Click through the actual Skills feature: create a skill, pin it to the chat input, invoke it via slash, install one from the marketplace, and reference it from a custom skill. The
                prototype is a clickable Vercel deployment of the final design.
              </p>
              <div className="bg-purple-50 rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-semibold text-black">Skill feature: Live prototype</span>
                  <span className="text-[#a1a1a1] text-base">thunderbolt-skill-feature.vercel.app</span>
                </div>
                <a
                  href="https://thunderbolt-skill-feature.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start md:self-auto rounded-full bg-purple-600 px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-purple-700"
                >
                  Open prototype →
                </a>
              </div>
            </ProjectContent>
          </ScrollSpySection>

          {/* Where It Started */}
          <ScrollSpySection value="where-it-started" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-purple-500">Where It Started</ProjectSectionTitle>
            <ProjectContent>
              <p>We had two features that solved overlapping problems in different places.</p>
              <HorizontalStack mobileCols={1} desktopCols={2}>
                <VerticalCard title="Automation" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  Automation was a settings page where users linked a prompt to a model. Hit play, and the prompt ran against the selected model, optionally on a schedule.
                </VerticalCard>
                <VerticalCard title="Shortcuts" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  Shortcuts was a row of buttons above the chat input. Press one, and its saved prompt filled the chat input, ready for the user to edit and send.
                </VerticalCard>
              </HorizontalStack>
              <p>Same primitive (a saved prompt), two surfaces, two mental models, two pages of docs trying to explain the difference.</p>
              <VerticalCard title="The PM ask" titleColor="text-[#a1a1a1]" bgColor="bg-gray-100">
                <p>
                  &ldquo;Remove Automation and Shortcuts. Replace them with Skills. We want a Skills page in settings, a shortcut button row above the chat input, navigation to the Skills page from the
                  side nav, the ability to edit skills, and eventually a marketplace where users can install skills authored by others.&rdquo;
                </p>
              </VerticalCard>
            </ProjectContent>
          </ScrollSpySection>

          {/* Defining the Solution */}
          <ScrollSpySection value="defining-solution" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-purple-500">Defining the Solution</ProjectSectionTitle>
            <ProjectContent>
              <p>
                I anchored the design on Anthropic&apos;s Agent Skills standard, an open format for packaging reusable prompts as folders with a <code>SKILL.md</code> manifest, already adopted by
                Claude Code, Cursor, and VS Code Copilot. Adopting it made portability a structural property of Thunderbolt&apos;s data model rather than a feature we&apos;d need to build.
              </p>
              <HorizontalStack mobileCols={1} desktopCols={2}>
                <VerticalCard title="Business goal" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  <ul className="list-disc ml-5 space-y-2">
                    <li>Make Thunderbolt&apos;s anti-lock-in promise real, not just claimed</li>
                    <li>Open a path for third-party skill distribution (deepset/Haystack and others)</li>
                  </ul>
                </VerticalCard>
                <VerticalCard title="User goals" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                  <ul className="list-disc ml-5 space-y-2">
                    <li>Stop retyping the same prompts</li>
                    <li>Bring an existing prompt library in from other AI tools without rebuilding it</li>
                    <li>Build skills that compose: a skill that calls another skill that calls another</li>
                  </ul>
                </VerticalCard>
              </HorizontalStack>
              <VerticalStack title="We listed every feature we wanted to ship:" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <ul className="list-disc ml-5 space-y-2">
                  <li>Create / edit / delete skills</li>
                  <li>Search and pin skills for faster access</li>
                  <li>Slash invocation in the chat composer</li>
                  <li>Pinned shortcut buttons above the chat input</li>
                  <li>Marketplace install / uninstall</li>
                  <li>Upload skills from local device</li>
                  <li>Capability-aware skill compatibility (&ldquo;requires code execution&rdquo;)</li>
                </ul>
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Breaking It Into Stages */}
          <ScrollSpySection value="breaking-stages" className="flex flex-col bg-purple-50 rounded-xl p-8">
            <ProjectSectionTitle dotColor="text-purple-500" textAlign="text-center">
              Breaking Down the MVP
            </ProjectSectionTitle>
            <ProjectContent>
              <p className="text-center">We broke the work into three phases so v1 could ship in one week without committing to surface no one had vetted.</p>
              <HorizontalStack mobileCols={1} desktopCols={3}>
                <VerticalCard title="v1" bgColor="bg-purple-100" titleColor="text-purple-700">
                  Skills as a single-file primitive. Create, edit, invoke. Foundation only.
                </VerticalCard>
                <VerticalCard title="v2" bgColor="bg-purple-100" titleColor="text-purple-700">
                  Marketplace + uploads + capability awareness. Skills become folders with multiple files.
                </VerticalCard>
                <VerticalCard title="v3 Direction 1" bgColor="bg-purple-100" titleColor="text-purple-700">
                  Composition with full editability. Users can install marketplace skills, edit them, and revert to original at any time.
                </VerticalCard>
              </HorizontalStack>
            </ProjectContent>
          </ScrollSpySection>

          <ProjectContent>
            <div className="flex justify-center">
              <div className="h-40 border-l-2 border-dashed border-[#C1C1C1]" />
            </div>

            <p className="text-4xl font-normal leading-snug text-center text-black">There were a lot of design challenges, but lets focus on the biggest one</p>
            <div className="flex justify-center">
              <div className="h-40 border-l-2 border-dashed border-[#C1C1C1]" />
            </div>
          </ProjectContent>

          {/* The Biggest Challenge */}
          <ScrollSpySection value="biggest-challenge" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-purple-500">The Biggest Challenge</ProjectSectionTitle>
            <ProjectContent>
              <p>
                v3&apos;s goal was to give users more control over the skills in their library, to install one from the marketplace and shape it to their own work, not just use it as-shipped. We were
                also merging Shortcuts and Automation into Skills and laying the marketplace foundation in v2, but v3 was where user control became the design question.
              </p>
              <p>I worked through three design directions before landing on the one that ships. Each one came out of what the previous one got wrong.</p>
              <VerticalStack title="Direction 1: Edit-and-revert, control through editing with a safety net" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]" className="bg-gray-50 rounded-xl p-6 md:p-8">
                <p>
                  The first direction I designed delivered control through editing. Users could install a marketplace skill, edit it freely, and revert to the original at any point. The user model was
                  familiar, closer to Google Docs. Edit anything, undo anything.
                </p>
                <p className="text-lg font-bold text-black">The cost lived in the data model</p>
                <p>
                  Revert required snapshots of the original at install time. Content-addressed storage so two users installing the same skill shared bytes. Ref-counted references so a marketplace
                  skill couldn&apos;t be deleted while any user still depended on a snapshot of it. On top of that, the UI needed an in-app editor for skill folders, including markdown, prompts,
                  possibly code.
                </p>
                <p className="text-lg font-bold text-black">It was two apps</p>
                <p>
                  One was Thunderbolt. The other was a document editor with version history, revert flows, and a snapshot system underneath. A multi-month build for three engineers already split
                  across other work, sitting on top of an app that isn&apos;t a document editor.
                </p>
                <p className="text-lg font-bold text-black">The challenge</p>
                <p>Deliver user control without committing the team to building a second app to support it. I needed a smaller version.</p>
              </VerticalStack>
              <VerticalStack title="Direction 2: Edit-only, control through editing without the safety net" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]" className="bg-gray-50 rounded-xl p-6 md:p-8">
                <p>
                  Revert was the most expensive feature in edit-and-revert. It was what forced the snapshot system, content-addressed storage, and ref-counted references. I cut it and redesigned
                  around the constraint.
                </p>
                <ProjectFlexBlock
                  left={
                    <h3 className="text-base font-bold tracking-tight leading-tight text-black">What was removed</h3>
                  }
                  right={
                    <div className="text-2xl leading-loose text-[#a1a1a1]">
                      <div className="line-through decoration-[0.5px]">Snapshot per install</div>
                      <div className="line-through decoration-[0.5px]">Content-addressed storage</div>
                      <div className="line-through decoration-[0.5px]">Ref-counted references</div>
                      <div className="line-through decoration-[0.5px]">One-click revert UX</div>
                    </div>
                  }
                  variant="card"
                  bgColor="bg-gray-100"
                />
                <p>I stress-tested edit-only with Claude before committing to it. The pressure-test surfaced two problems I hadn&apos;t seen.</p>
                <HorizontalStack mobileCols={1} desktopCols={2}>
                  <VerticalCard title="1. Both versions are still effectively second apps." bgColor="bg-gray-100" titleColor="text-black">
                    Even without revert, Direction 2 still requires document editing inside Thunderbolt, and Thunderbolt isn&apos;t a document editor. The skill files in v2 would be folders containing
                    multiple files (markdown, prompts, possibly code). Letting users edit those folders in-app means we&apos;d need a folder editor. The whole highlight of the product, open-source
                    extensibility, gets buried under editor scope.
                  </VerticalCard>
                  <VerticalCard title="2. The data model demands migration." bgColor="bg-gray-100" titleColor="text-black">
                    Direction 1 needs snapshot storage and reference tracking. Direction 2 sheds some of that but still tracks per-install state. Both versions force a migration path from v1 to v2.
                    Migration is where bugs live.
                  </VerticalCard>
                </HorizontalStack>
                <p>
                  The conclusion was clear: <strong>Direction 1 and Direction 2 are both adding apps on top of an app.</strong> There had to be a simpler version that solved the same user problem.
                </p>
              </VerticalStack>
              <VerticalStack title="Direction 3: Reference, control through composition instead of editing" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]" className="bg-gray-50 rounded-xl p-6 md:p-8">
                <p>
                  Edit-and-revert and edit-only both demanded heavy engineering, and both were variations of the same shape. I stepped back from the screens and asked a different question:{' '}
                  <em>what&apos;s the simplest version of this that still solves the user problem?</em>
                </p>
                <p>
                  The user&apos;s actual need was customization: <em>&ldquo;I want this skill, but slightly different.&rdquo;</em> I&apos;d been assuming that meant editing. But editing is one of
                  several ways to customize. Composition is another. Parameterization is a third. Editing was just the first one I&apos;d reached for.
                </p>
                <p>
                  The shift: <strong>stop letting users edit marketplace skills at all.</strong> If they want a skill that does something different, they don&apos;t fork it; they author their own
                  custom skill that <em>references</em> it.
                </p>
                <VerticalStack borderColor="border-[#C1C1C1]">
                  <p className="text-lg font-bold text-black">How reference model works</p>
                  <ProjectFlexBlock
                    left={
                      <>
                        <div className="flex flex-col gap-4">
                          <h3 className="text-xl font-semibold">1. Install</h3>
                          <p className="mb-4 min-h-[80px]">
                            A user installs a skill from the marketplace. It enters their library as a read-only entry. Thunderbolt holds a reference to the marketplace version, not a copy of it.
                          </p>
                        </div>
                      </>
                    }
                    right={
                      <img src="/thunderbolt-final-2.png" alt="Marketplace with the tast-triage skill detail panel open" className="flex-1 w-full h-auto rounded-lg" />
                    }
                    variant="card"
                    bgColor="bg-gray-100"
                  />
                  <ProjectFlexBlock
                    left={
                      <>
                        <div className="flex flex-col gap-4">
                          <h3 className="text-xl font-semibold">2. Compose</h3>
                          <p className="mb-4 min-h-[80px]">
                            Instead of editing the installed skill, the user creates a new skill that calls it. The custom skill references the marketplace skill by ID. The marketplace skill stays
                            untouched.
                          </p>
                        </div>
                      </>
                    }
                    right={
                      <img src="/thunderbolt-skill-reference.png" alt="Create Skill form referencing /product-strategy in the instructions" className="flex-1 w-full h-auto rounded-lg" />
                    }
                    reverseOnDesktop={true}
                    variant="card"
                    bgColor="bg-gray-100"
                  />
                  <ProjectFlexBlock
                    left={
                      <>
                        <div className="flex flex-col gap-4">
                          <h3 className="text-xl font-semibold">3. Update</h3>
                          <p className="mb-4 min-h-[80px]">
                            When the marketplace publishes a new version, the user pulls it in cleanly. Their custom skill keeps working. No merge against an edited fork. No revert. No migration.
                          </p>
                        </div>
                      </>
                    }
                    right={
                      <img src="/thunderbolt-marketplace-update.png" alt="Skills settings showing the marketplace tast-triage skill with version 1.0.0" className="flex-1 w-full h-auto rounded-lg" />
                    }
                    variant="card"
                    bgColor="bg-gray-100"
                  />
                </VerticalStack>
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Why I chose the final design */}
          <ScrollSpySection value="why-chose" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-purple-500">Why I Chose the Final Design</ProjectSectionTitle>
            <ProjectContent>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-2">Additive growth in the data model</h3>
                  <p className="text-[#a1a1a1] text-base">Existing tables stay stable. New capabilities arrive as new tables.</p>
                </div>
                <HorizontalStack mobileCols={1} desktopCols={3} gapClassName="gap-4 md:gap-6">
                  {dataModelColumns.map((col) => (
                    <div key={col.version} className="flex flex-col">
                      <div className="flex flex-col mb-4 pb-4 border-b-2 border-[#C1C1C1]">
                        <span className="font-semibold text-base">{col.version}</span>
                        <span className="text-[#a1a1a1] text-base uppercase tracking-wide mt-1 min-h-[2.5rem] leading-tight">{col.sublabel}</span>
                      </div>
                      <div className="flex flex-col gap-3 flex-1">
                        {col.cards.map((card) => (
                          <Card key={card.name} className={`p-3 shadow-none ${card.isNew ? 'bg-purple-50 border-purple-200' : 'bg-white'}`}>
                            <div className={`text-base font-semibold pb-2 mb-2 border-b ${card.isNew ? 'border-purple-200' : 'border-[#C1C1C1]'}`}>
                              {card.isNew && <span className="text-purple-500 mr-1.5">+</span>}
                              {card.name}
                            </div>
                            <div className={`text-base leading-[1.85] ${card.fadedColumns ? 'text-[#a1a1a1]' : ''}`}>
                              {card.columns.map((c) => (
                                <div key={c.name}>
                                  {c.isNew && <span className="text-purple-500 font-semibold mr-1">+</span>}
                                  {c.name}
                                </div>
                              ))}
                            </div>
                            {card.unchangedNote && <div className="text-base text-[#a1a1a1] mt-2 pt-2 border-t border-[#C1C1C1] italic">{card.unchangedNote}</div>}
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </HorizontalStack>
                <div className="mt-8">
                  <VerticalCard title="What additive growth avoids" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                    <p>
                      <span className="font-semibold">Three product versions. Two table additions. Existing tables grow only by appending optional columns.</span> No data restructuring, no destructive
                      migrations. Engineering ships v2 and v3 by adding to the foundation, not by reopening it.
                    </p>
                  </VerticalCard>
                </div>
              </div>

              <ProjectPullQuote>Three product versions. Two table additions. Zero schema migrations. The reference model lets us test the premise in weeks instead of months.</ProjectPullQuote>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-2">Three v3 schemas, side by side</h3>
                  <p className="text-[#a1a1a1] text-base">The data model is where the cost of each direction becomes visible.</p>
                </div>
                <HorizontalStack mobileCols={1} desktopCols={3} gapClassName="gap-4 md:gap-6">
                  {v3DirectionsComparison.map((dir) => (
                    <div key={dir.version} className="flex flex-col">
                      <div className={`flex flex-col mb-4 pb-4 border-b-2 ${dir.chosen ? 'border-purple-300' : 'border-[#C1C1C1]'}`}>
                        <div className="flex items-center gap-2 min-h-7">
                          <span className="font-semibold text-base">{dir.version}</span>
                          {dir.chosen && (
                            <Badge className="bg-purple-200 text-purple-900 px-2 py-0.5 text-base gap-1">
                              <Check className="w-3 h-3" strokeWidth={2.5} />
                              chosen
                            </Badge>
                          )}
                        </div>
                        <span className="text-[#a1a1a1] text-base uppercase tracking-wide mt-1 min-h-[2.5rem] leading-tight">{dir.sublabel}</span>
                      </div>
                      <div className="flex flex-col gap-3 flex-1">
                        {dir.tables.map((table) => (
                          <Card key={table.name} className="p-3 shadow-none bg-white">
                            <div className="text-base font-medium pb-2 mb-2 border-b border-[#C1C1C1]">{table.name}</div>
                            <div className="text-base leading-[1.85] text-[#a1a1a1]">
                              {table.lines.map((line, i) => (
                                <div key={i}>
                                  {line.name}
                                  {line.pk && <span> (pk)</span>}
                                </div>
                              ))}
                            </div>
                          </Card>
                        ))}
                      </div>
                      <div className="pt-3 mt-3 text-base leading-relaxed">
                        <div className="font-semibold mb-1">{dir.summary.count}</div>
                        <div className="text-[#a1a1a1]">{dir.summary.description}</div>
                      </div>
                    </div>
                  ))}
                </HorizontalStack>
                <div className="mt-8">
                  <VerticalCard title="What the table count hides" bgColor="bg-gray-100" titleColor="text-[#a1a1a1]">
                    <p>
                      <span className="font-medium">v3-direction2 and v3-direction3 both have three tables.</span> The difference is what those tables track. v3-direction2&apos;s third table tracks per-install
                      state. Every install of a marketplace skill creates a new row recording version, modified flag, and lifecycle. v3-direction3&apos;s third table is a reference graph, a flat list of
                      &ldquo;this skill points to that skill,&rdquo; with no per-install or per-user complexity. The same table count hides a meaningful difference in what the data model has to manage.
                    </p>
                  </VerticalCard>
                </div>
              </div>
              <VerticalStack title="What the reference model unlocks" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <ul className="list-disc ml-5 space-y-2">
                  <li>
                    <strong>Updates without conflict.</strong> When the marketplace publishes a new version of a skill, the user pulls it in cleanly. There&apos;s no edited fork to merge against.
                  </li>
                  <li>
                    <strong>Skill authors debug their own folders.</strong> Marketplace skills stay maintained at their source: GitHub for marketplace skills, the original local file for uploads.
                    Authors update where they author. Thunderbolt isn&apos;t trying to be the editor.
                  </li>
                  <li>
                    <strong>Simpler to build, without compromising goals.</strong> The user still gets reusable, composable skills. The business still gets portability and a marketplace path.
                    Engineering ships in stages without architectural rework.
                  </li>
                </ul>
              </VerticalStack>
              <p>
                <strong>The reference model is what ships.</strong>
              </p>
            </ProjectContent>
          </ScrollSpySection>

          {/* How the final design served the original goals */}
          <ScrollSpySection value="original-goals" className="flex flex-col">
            <ProjectSectionTitle dotColor="text-purple-500">Serving the Original Goals</ProjectSectionTitle>
            <ProjectContent>
              <p>Returning to where this started: three user hypotheses and two business goals. Here&apos;s how v3 Direction 3 maps back to each.</p>
              <VerticalStack title="User hypotheses" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <ProjectFlexBlock
                  left={
                    <>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">Users retype the same prompts repeatedly and want a faster reuse path.</h3>
                        <p className="mb-4 min-h-[80px]">
                          The pinned shortcut row and slash invocation in the chat composer cover this directly. A user can save a prompt once and reach it in two keystrokes from then on. v1 ships
                          this.
                        </p>
                      </div>
                    </>
                  }
                  right={<img src="/thunderbolt-final-4.png" alt="Chat input with the slash skill picker open" className="flex-1 w-full h-auto rounded-lg" />}
                  variant="card"
                  bgColor="bg-gray-100"
                />
                <ProjectFlexBlock
                  left={
                    <>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">Power users want skills that compose, not just standalone snippets.</h3>
                        <p className="mb-4 min-h-[80px]">
                          v3 Direction 3&apos;s reference model lets a user build a skill that calls another skill, without forking, without editing the original. Composition arrives as a clean
                          addition to the data model, not a retrofit.
                        </p>
                      </div>
                    </>
                  }
                  right={<img src="/thunderbolt-skill-reference.png" alt="Create Skill form referencing /product-strategy in the instructions" className="flex-1 w-full h-auto rounded-lg" />}
                  variant="card"
                  bgColor="bg-gray-100"
                />
              </VerticalStack>
              <VerticalStack title="Business goals" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <ProjectFlexBlock
                  left={
                    <>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">Make Thunderbolt&apos;s anti-lock-in promise structural, not rhetorical.</h3>
                        <p className="mb-4 min-h-[80px]">
                          Because the file format is the same one Claude Code, Cursor, and VS Code Copilot use, portability isn&apos;t a feature Thunderbolt has to maintain; it&apos;s a property of
                          the format. The marketing claim and the engineering reality are the same thing.
                        </p>
                      </div>
                    </>
                  }
                  right={<img src="/thunderbolt-final-3.png" alt="Marketplace grid view showing installable skills" className="flex-1 w-full h-auto rounded-lg" />}
                  reverseOnDesktop={true}
                  variant="card"
                  bgColor="bg-gray-100"
                />
                <ProjectFlexBlock
                  left={
                    <>
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">Open a path for third-party skill distribution.</h3>
                        <p className="mb-4 min-h-[80px]">
                          The marketplace in v2 and the reference model in v3 Direction 3 together mean partners like deepset/Haystack can publish skills that users compose with their own work,
                          without Thunderbolt mediating the relationship.
                        </p>
                      </div>
                    </>
                  }
                  right={<img src="/thunderbolt-final-3.png" alt="Marketplace grid view showing installable skills" className="flex-1 w-full h-auto rounded-lg" />}
                  variant="card"
                  bgColor="bg-gray-100"
                />
              </VerticalStack>

              <VerticalStack title="What the design cut from the engineering bill" titleColor="text-[#a1a1a1]" borderColor="border-[#C1C1C1]">
                <p>The shift from v3 Direction 1 to v3 Direction 3 didn&apos;t just produce a cleaner user experience. It removed work the team would otherwise have had to do:</p>
                <HorizontalStack mobileCols={1} desktopCols={2}>
                  <VerticalCard title="No document editor." bgColor="bg-gray-100" titleColor="text-black">
                    v3 Direction 1 required an in-app folder editor for marketplace skills, a multi-week build for three engineers, plus ongoing maintenance. v3 Direction 3 removes the requirement
                    entirely; marketplace skills are read-only inside Thunderbolt.
                  </VerticalCard>
                  <VerticalCard title="No version-tracking system." bgColor="bg-gray-100" titleColor="text-black">
                    v3 Direction 1 needed <code>original_blob_hash</code>, content-addressed storage, and ref-counted references to support revert. None of that exists in v3 Direction 3.
                  </VerticalCard>
                  <VerticalCard title="No schema migrations." bgColor="bg-gray-100" titleColor="text-black">
                    v1 → v2 → v3 Direction 3 is two table additions, zero migrations. Migration work, along with the bug surface that comes with it, was removed from the roadmap before it was
                    scheduled.
                  </VerticalCard>
                  <VerticalCard title="No fork-merge logic." bgColor="bg-gray-100" titleColor="text-black">
                    When the marketplace publishes a skill update, v3 Direction 1 would have needed conflict-resolution UX for users who&apos;d edited their copy. v3 Direction 3 has no forks, so the
                    update flow is a clean replace.
                  </VerticalCard>
                </HorizontalStack>
                <p>
                  The net: a feature that initially scoped to roughly six months of engineering ships its first version in a week, with v2 and v3 Direction 3 phased on top of the same foundation. The
                  engineering capacity that would have gone to building a document editor is available for the rest of Thunderbolt&apos;s roadmap.
                </p>
              </VerticalStack>
            </ProjectContent>
          </ScrollSpySection>

          {/* Figma Exploration Section */}
          <ProjectFigmaSection
            title="Explore my portfolio"
            description="Design speaks louder than words. Check out the full Figma file to see the process, decisions, and iterations behind this project."
            descriptionClassName="mb-4 md:mb-8"
            figmaUrl="https://www.figma.com/design/q77RkGzo90PYeOzwp1ADJm/Jess-s-Portfolio--Public-?node-id=3-13787&t=J3zCiHTUrdhoAr61-1"
            imageSrc="/mozilla-cta.png"
            imageAlt="mozilla mockup"
            sectionClassName="bg-primary p-8 text-white"
            titleColor="text-white"
            dotColor="text-purple-500"
            buttonBgColor="bg-purple-300"
            buttonTextColor="text-black"
            buttonHoverColor="hover:bg-purple-500"
          />
        </ScrollSpyViewport>
      </ScrollSpy>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
