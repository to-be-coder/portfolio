import CtaSection from '@/components/ui/cta'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
export default function MozillaPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="w-full h-auto flex flex-col relative max-w-7xl mx-auto px-8">
        {/* Background Image with Overlay */}

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row w-full space-between justify-end lg:items-end my-10 border-b border-gray-200">
          <h1 className="flex-1 text-4xl md:text-5xl font-bold tracking-tight leading-tight text-black">Mozilla Assist</h1>
          <p className="items-end text-lg md:text-2xl mb-1 text-black">On-device AI assistant</p>
        </div>
      </div>
      <div className="w-full h-auto max-w-7xl mx-auto px-8 flex flex-col items-center rounded-lg overflow-hidden">
        <Image src="/mozilla-hero.png" alt="Mozilla hero background" width={1000} height={100} className="w-full flex-1 object-cover max-h-[600px] object-center rounded-lg" />
      </div>

      {/* Overview Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <div className="flex flex-col gap-x-16 gap-y-12">
          {/* Left Column - Stacked Overview and Design Objective */}
          <div className=" flex flex-col lg:flex-row space-x-9 space-y-9 lg:space-y-0">
            <div className=" flex-1 border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Overview</h2>
              <p className="text-[18px]">
                <strong>Mozilla Assist</strong> is a privacy-first, on-device AI assistant. Our goal was to design a lightweight prototype to explore a core question:{' '}
                <strong>Can we deliver intelligent, context-aware</strong> assistance without sending user data to the cloud? <br /> <br />
                This raised key UX challenges: How do you build trust in a system that operates mostly in the background? How do you support power users who expect transparency and control—without
                overwhelming them with complexity? <br /> <br />I collaborated closely with engineering to design a prototype for early user testing and stakeholder review. This work laid the
                foundation for understanding how users perceive local AI, and how much visibility and control they actually want.
              </p>
            </div>

            <div className="flex-1 border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Design Objective</h2>
              <p className="text-[18px]">
                Our goal was to <strong>define and test early product hypotheses</strong> for Mozilla Assist—a privacy-first, on-device AI assistant—through rapid prototyping and iteration. The
                experience needed to be lightweight and test-ready, while still reflecting Mozilla's core values: <strong>privacy, transparency, and user control</strong>. <br /> <br />
                Given the technical complexity, I served as a <strong>bridge between design and engineering</strong>, translating constraints like local processing and encryption limits into
                practical, user-friendly design solutions. <br /> <br />
                We took a <strong>lean, hypothesis-driven approach</strong>, prioritizing speed and insight over polish. The focus was to uncover early user signals and inform both the next design
                phase and internal stakeholder alignment.
              </p>
            </div>
          </div>

          <div className=" flex flex-col lg:flex-row space-x-9 space-y-9 lg:space-y-0">
            <div className="flex-1 border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">My Role</h2>
              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-[18px]">UX Strategy & Hypothesis Building:</span>
                  <p className="text-[18px]">I contributed to the hypothesis-driven design process, helping the team frame product assumptions and identify what to test first.</p>
                </div>
                <div>
                  <span className="font-semibold text-[18px]">Design & Prototyping:</span>
                  <p className="text-[18px]">I designed core user flows and created low- to high-fidelity prototypes in Figma, optimized for fast iteration and engineering collaboration.</p>
                </div>
                <div>
                  <span className="font-semibold text-[18px]">Cross-Functional Collaboration:</span>
                  <p className="text-[18px]">Collaborated with engineers to align designs with local LLM and encryption limits, iterating quickly through regular syncs.</p>
                </div>
              </div>
            </div>

            <div className="flex-1 border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Time Frame</h2>
              <p className="text-[18px]">3 months</p>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Section */}

      {/* Workflow Section */}
      <div className="relative bg-green-300">
        <div className="max-w-[1440px] mx-auto px-16 py-16 lg:py-32">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12 text-center text-black">Workflow</h2>
          <div className="w-full flex justify-center">
            <Image src="/mozilla-workflow.png" alt="Project workflow timeline showing hypothesis, research, and synthesis phases" width={1728} height={600} className="w-full h-auto" priority />
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <h2 className="text-4xl font-normal mb-8 lg:mb-12">Initial Vision of Mozilla Assist</h2>

        {/* Why we chose this hypothesis */}
        <div className="mt-8 md:mt-12">
          <div className="border-t border-[#C1C1C1] pt-[4px]">
            <h3 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Our Vision</h3>
          </div>
          <p className="text-[18px]">
            Mozilla Assist aims to be a true personal AI assistant — one that understands your preferences and routines while keeping your data secure and private. Unlike traditional assistants that
            rely on cloud processing, Mozilla Assist builds a local, encrypted, on-device knowledge base. This architecture ensures that user data remains fully under the user's control, even as the
            assistant becomes increasingly personalized and context-aware.
          </p>
        </div>
      </div>

      {/* ResearchSection */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <h2 className="text-4xl font-normal mb-8 lg:mb-12">Research</h2>

        {/* Challenges */}
        <div className="space-y-4 mb-8 border-t border-[#C1C1C1] pt-[4px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <h3 className="text-2xl font-regular text-[#a1a1a1]">Goals</h3>
            </div>
            <div className="md:col-span-2">
              <div className="space-y-1 md:space-y-2">
                <p className="text-[18px]">Understand the evolving landscape of personal productivity tools and uncover both user expectations and opportunities for Mozilla Assist to stand apart.</p>
              </div>
            </div>
          </div>
        </div>
        <Image src="/mozilla-competitive-analysis.png" alt="Mozilla competitive analysis" width={1728} height={900} className="w-full h-auto" priority />

        <div className="space-y-4 mb-8 border-t border-[#C1C1C1] pt-[4px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <h3 className="text-2xl font-regular text-[#a1a1a1]">Notable Competitors</h3>
            </div>
            <div className="md:col-span-2">
              <p className="text-[18px]">
                <strong>AI Assistants for Email & Calendar</strong>
              </p>
              <ul className="list-disc ml-5 text-[18px]">
                <li>Jace – An AI that scans your inbox, calendar, files, and web content to suggest responses and schedule meetings automatically.</li>
                <li>Lobby – A hands-free AI email assistant that aims to eliminate inbox management.</li>
              </ul>

              <p className="text-[18px] mt-4">
                <strong>Privacy-Focused Productivity Tools</strong>
              </p>
              <ul className="list-disc ml-5 text-[18px]">
                <li>Proton – Privacy-first email and calendar suite with limited AI integration.</li>
                <li>Canary Mail – Combines AI assistance with encrypted email and calendar features.</li>
                <li>Superhuman – Optimized for speed and productivity, with growing AI features.</li>
                <li>Amie – Email, calendar, and to-dos in a sleek interface built for Apple users.</li>
                <li>Notion Mail & Calendar – Recently expanded into the space, with AI-assisted productivity tools.</li>
                <li>Dola / Katch – Text-based AI scheduling tools integrated into messaging platforms like WhatsApp.</li>
              </ul>

              <p className="text-[18px] mt-4">
                <strong>General-Purpose AI Assistants</strong>
              </p>
              <ul className="list-disc ml-5 text-[18px]">
                <li>Elephas – Desktop AI tool with customizable model integration and local data access.</li>
                <li>ChatGPT / GPTs / Tasks – Not built for email/calendar yet, but rapidly expanding capabilities.</li>
              </ul>

              <p className="text-[18px] mt-4">
                <strong>Enterprise & Big Tech Ecosystems</strong>
              </p>
              <ul className="list-disc ml-5 text-[18px]">
                <li>Google Workspace + Gemini</li>
                <li>Microsoft 365 + Copilot</li>
                <li>Apple + Siri / System-Level AI Integration</li>
              </ul>

              <p className="text-[18px] mt-4">
                <strong>B2B and Specialized Agents</strong>
              </p>
              <ul className="list-disc ml-5 text-[18px]">
                <li>LindyAI – AI agents for managing business workflows, especially email.</li>
                <li>Clara – AI scheduling assistant for professionals and teams.</li>
                <li>Shortwave – An AI-native email platform built around smart summarization and automation.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="space-y-4 mb-8 border-t border-[#C1C1C1] pt-[4px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <h3 className="text-2xl font-regular text-[#a1a1a1]">Key Takeaways</h3>
            </div>
            <div className="md:col-span-2">
              <div className="space-y-1 md:space-y-2">
                <p className="text-[18px]">
                  <strong>Privacy is becoming table stakes</strong> — Once a niche concern, privacy is now a mainstream marketing message. Apple, for example, has doubled down on its privacy
                  narrative, and Anthropic leads with &quot;privacy-first AI.&quot; This shift signals rising user expectations—even from tools not historically focused on data protection.
                </p>

                <p className="text-[18px]">
                  <strong>Mozilla has a unique positioning</strong> — Beyond privacy, Mozilla is trusted for its openness, neutrality, and public-interest mission. While most competitors compete on
                  speed or convenience, Mozilla can stand out by building trust into the product&apos;s architecture and interaction model.
                </p>

                <p className="text-[18px]">
                  <strong>The space is crowded but unsettled</strong> — While major players like Google, Apple, and Microsoft dominate, a new wave of startups and open-source tools is quickly gaining
                  traction—often by focusing on simplicity, user control, or alternative business models.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Realization: On-Devide AI Has Limits */}
        <div className="space-y-4 mb-8 border-t border-[#C1C1C1] pt-[4px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <h3 className="text-2xl font-regular text-[#a1a1a1]">
                Realization: <br /> On-Devide AI Has Limits
              </h3>
            </div>
            <div className="md:col-span-2">
              <div className="space-y-1 md:space-y-2">
                <p className="text-[18px]">
                  During the research phase, we found that on-device AI—while strong on privacy—may fall short in performance and context handling for more complex tasks. This led us to explore a
                  hybrid model: keeping data local by default, while selectively using Confidential Cloud support to maintain a smooth and capable user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hypothesis Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <h2 className="text-4xl font-normal mb-8 lg:mb-12">Forming Hypothesis</h2>

        <div className="flex flex-col  gap-x-16 gap-y-12">
          {/* Left Column - Stacked Overview and Design Objective */}
          <div className=" flex flex-col lg:flex-row space-x-9 space-y-9 lg:space-y-0">
            <div className=" flex-1 border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Hypothesis</h2>
              <p className="text-[18px]">
                We envision Mozilla Assist as a <strong>privacy-first assistant</strong> built on a <strong>hybrid On-Device &lt;&gt; Confidential Cloud architecture</strong>. The direction emphasizes
                openness, portability, and extendability—enabling users to switch between email or calendar providers, choose different AI models, and easily integrate plugins or extensions.
                <br /> <br />
                Transparency is a core principle: permission requests are clearly surfaced in the UI, and no data would be sent to the cloud without <strong>explicit user opt-in</strong>. The goal is
                to make trusted opt-ins seamless and non-disruptive.
                <br /> <br />
                Security is treated as a <strong>first-class priority</strong>, guiding decisions from architecture to interface.
                <br /> <br />
                To maintain user trust, the proposed business model focuses on <strong>subscriptions</strong>, avoiding ad-based tracking entirely.
                <br /> <br />
                Given the scope, the product would follow a <strong>phased release strategy</strong>, starting with a lightweight MVP focused on high-privacy use cases—such as private chat—to validate
                early assumptions.
              </p>
            </div>

            <div className="flex-1 border-t border-[#C1C1C1] pt-[4px]">
              <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Why This Hypothesis</h2>
              <ul className="list-disc ml-5 text-[18px]">
                <li>Trust is the primary barrier to adoption for AI in privacy-aware audiences.</li>
                <li>Most AI assistants today do not offer local-only functionality — this is a potential differentiator.</li>
                <li>Early user research showed a willingness to engage with AI if it respected data boundaries and explained what it was doing.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Typography Section */}
      <div className="relative bg-[#212121] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">Typography</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {/* Left Column - Large "Aa" Display */}
            <div className="flex items-center justify-center">
              <span className="text-[200px] font-regular font-['Inter'] tracking-tight">Aa</span>
            </div>

            {/* Right Column - Typography Details */}
            <div className="space-y-4 md:space-y-8">
              {/* Typeface */}
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h3 className="text-2xl font-regular text-gray-400 mb-2 md:mb-4">Typeface</h3>
                <p className="text-[18px]">Inter</p>
              </div>

              {/* Weights */}
              <div className="border-t border-[#C1C1C1] pt-[4px]">
                <h3 className="text-2xl font-regular text-gray-400 mb-2 md:mb-4">Weights</h3>
                <div className="space-y-1 md:space-y-2">
                  <p className="text-[18px] font-normal">Regular</p>
                  <p className="text-[18px] font-semibold">Semi-Bold</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Colors Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Title */}
          <div>
            <h2 className="text-4xl font-normal">Main Colors</h2>
          </div>

          {/* Primary Colors */}
          <div className="flex flex-col">
            <div className="h-48 bg-[#BBF3C0] rounded-lg flex items-end p-4">
              <span>#BBF3C0</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-48 bg-[#09320D] rounded-lg flex items-end p-4">
              <span className="text-white">#09320D</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-48 bg-[#FF2E2E] rounded-lg flex items-end p-4">
              <span>#FF2E2E</span>
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
            <div className="h-48 bg-[#F7F7F8] rounded-lg flex items-end p-4 border border-gray-200">
              <span>#F7F7F8</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-48 bg-[#191919] rounded-lg flex items-end p-4">
              <span className="text-white">#191919</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-48 bg-[#000000] rounded-lg flex items-end p-4">
              <span className="text-white">#000000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Light and Dark Mode Mockups */}
      <div className="relative bg-green-300 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">Light and Dark Mode Mockups</h2>

          <div className="flex justify-center gap-x-4 lg:gap-x-8 xl:gap-x-16">
            <div className="flex justify-center">
              <Image src="/mozilla-light.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            </div>

            {/* Right Column - iPhone Image */}
            <div className="flex justify-center">
              <Image src="/mozilla-dark.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            </div>
          </div>
        </div>
      </div>

      {/* Figma Exploration Section */}
      <div className="relative bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h2 className="text-4xl font-normalmb-8 lg:mb-12">Explore the Figma File for This Project</h2>
              <p className="text-[18px] mb-4 md:mb-8">Design speaks louder than words—Check out the full Figma file to see the process, decisions, and iterations behind this project.</p>
              <Link
                href="https://www.figma.com/design/QeGLFmUuzV5p7i7X3rTgkw/Lilypad-Landing-Page?node-id=0-1&p=f&t=J6KoiOK7CWMkXlIR-0"
                className="inline-flex items-center bg-white text-black px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check Out Figma
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            {/* Right Column - iPhone Image */}
            <div className="flex justify-center">
              <Image src="/mozilla-cta.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
