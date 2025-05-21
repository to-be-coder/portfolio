import CtaSection from '@/components/ui/cta'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

      {/* Initial Vision Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <h2 className="text-4xl font-normal mb-8 lg:mb-12">Initial Vision of Mozilla Assist</h2>

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

      {/* Competitive Research Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <h2 className="text-4xl font-normal mb-8 lg:mb-12">Competitive Research</h2>
        <div className="mt-8 md:mt-12">
          <div className="border-t border-[#C1C1C1] pt-[4px]">
            <h3 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Competitive Research</h3>
          </div>
          <p className="text-[18px]">I am not able to show this section due to NDA.</p>
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

      {/* Design Challenge Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* Left Column - Title */}
          <div>
            <h2 className="text-4xl font-normal">Design Challenge</h2>
          </div>

          {/* Right Column - Approach Details */}
          <div className="space-y-4 md:space-y-8">
            {/* Content */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-2 md:mb-4">Technical collaboration</h3>
              <p className="text-[18px]">Partnered closely with engineering to align on limitations around on-device AI, encryption, and data storage.</p>
            </div>

            {/* Privacy-first UX */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-6">Privacy-first UX</h3>
              <p className="text-[18px]">Needed to clearly communicate how data is used, stored, and controlled — without overwhelming users.</p>
            </div>

            {/* Fast-to-ship MVP */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-6">Fast-to-ship MVP</h3>
              <p className="text-[18px]">Prioritized simplicity and speed by using familiar UX patterns and minimizing custom UI logic.</p>
            </div>

            {/* Designing for scale */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-6">Designing for scale</h3>
              <p className="text-[18px]">Created flexible flows that could support both a fully on-device model and a future hybrid architecture (On-Device &lt;&gt; Confidential Cloud).</p>
            </div>

            {/* Reducing friction */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-6">Reducing friction</h3>
              <p className="text-[18px]">Avoided unnecessary novelty in interaction or layout — leveraged established conventions to support user intuition.</p>
            </div>

            {/* De-risking unknowns */}
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-gray-400 mb-6">De-risking unknowns</h3>
              <p className="text-[18px]">Built optionality into the UX to account for technical uncertainties (e.g., fallback states if on-device processing fails).</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ideation Section */}
      <div className="relative bg-gray-100 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">Playground</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            <Image src="/mozilla-v1-1.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-v1-4.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-v1-2.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-v1-3.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
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

      {/* Sign up flow */}
      <div className="relative bg-green-300 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">Sign up flow</h2>

          <div className="flex flex-col gap-y-16">
            <Image src="/mozilla-signup-1.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-signup-2.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-signup-3.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
          </div>
        </div>
      </div>

      {/* chat screens */}
      <div className="relative bg-green-300 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">Chat screens</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-8">
            <Image src="/mozilla-chat-1.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-chat-2.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-chat-3.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
          </div>
        </div>
      </div>

      {/* Warning screens */}
      <div className="relative bg-green-300 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">War screens</h2>
          <p className="text-[18px] mb-8 lg:mb-12">
            These warning screens require A/B testing to determine which version is less disruptive and feels more natural to users while still effectively communicating important safety information.
            We designed a series of warning screens to help users understand the risks of using AI and to help them make informed decisions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-8">
            <Image src="/mozilla-warning-1.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-warning-2.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
          </div>
        </div>
      </div>

      {/* Warning Responsescreens */}
      <div className="relative bg-green-300 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">War screens</h2>
          <p className="text-[18px] mb-8 lg:mb-12">
            These warning screens require A/B testing to determine which version is less disruptive and feels more natural to users while still effectively communicating important safety information.
            We designed a series of warning screens to help users understand the risks of using AI and to help them make informed decisions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-8">
            <Image src="/mozilla-warning-response-1.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-warning-response-2.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
          </div>
        </div>
      </div>

      {/* Warning Responsescreens */}
      <div className="relative bg-green-300 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">War screens</h2>
          <p className="text-[18px] mb-8 lg:mb-12">
            These warning screens require A/B testing to determine which version is less disruptive and feels more natural to users while still effectively communicating important safety information.
            We designed a series of warning screens to help users understand the risks of using AI and to help them make informed decisions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-8">
            <Image src="/mozilla-setting-account.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-setting-billing.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-setting-extentions-1.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-setting-extentions-2.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-setting-memory.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-setting-models.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
          </div>
        </div>
      </div>

      {/* Light and Dark Mode Mockups */}
      <div className="relative bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            <div className="flex flex-col">
              <h2 className="text-4xl font-normal mb-8 lg:mb-12">Can&apos;t leave dark mode behind</h2>
              <p className="text-[18px] mb-8 lg:mb-12">
                I designed a light and dark mode mockup to ensure the product could be used in both environments. The light mode is a more traditional design, while the dark mode is a more modern,
                minimalistic design.
              </p>
            </div>
            <div className="flex">
              <Tabs defaultValue="dark" className="w-full gap-y-8">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="light">Light Mode</TabsTrigger>
                  <TabsTrigger value="dark">Dark Mode</TabsTrigger>
                </TabsList>
                <TabsContent value="light" className="flex justify-center">
                  <Image src="/mozilla-light.png" alt="mozilla mockup" width={800} height={800} className="h-auto w-full max-w-auto rounded-lg border border-gray-800" priority />
                </TabsContent>
                <TabsContent value="dark" className="flex justify-center">
                  <Image src="/mozilla-dark.png" alt="mozilla mockup" width={800} height={800} className="h-auto w-full max-w-auto rounded-lg border border-gray-800" priority />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Mockups */}
      <div className="relative bg-green-300 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">Designing with Mobile in Mind</h2>
          <p className="text-[18px] mb-8 lg:mb-12">
            Although the current product is web-based, I approached the design with a mobile-first mindset where it made sense. From layout choices to interaction patterns, I considered how the
            experience could <strong>translate to smaller screens with minimal rework.</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-8">
            <Image src="/mozilla-mobile-1.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-mobile-2.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
            <Image src="/mozilla-mobile-3.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
          </div>
        </div>
      </div>

      {/*Learning Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        {/* Title */}

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">Learning</h2>

          {/* Build Fast, Learn Faster */}
          <div>
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-[#a0a0a0] mb-2 md:mb-4">Build Fast, Learn Faster</h3>
              <p className="text-[18px]">
                This project reinforced the need for an agile, test-and-learn mindset over a linear build. Given the complexity and ambition of the product, fast iteration based on real-world feedback
                is essential—not just for usability, but for achieving <strong>product-market fit.</strong>
              </p>
            </div>
          </div>

          {/* Balancing Agility with Control */}
          <div>
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-[#a0a0a0] mb-2 md:mb-4">Balancing Agility with Control</h3>
              <p className="text-[18px]">
                One key takeaway was the value of combining an <strong>agile approach with a gated release strategy</strong>—moving quickly, but within clearly defined phases. This allows us to learn
                fast while keeping scope focused and risk manageable at each stage.
              </p>
            </div>
          </div>

          {/* I Am Not the User */}
          <div>
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-[#a0a0a0] mb-2 md:mb-4">I Am Not the User</h3>
              <p className="text-[18px]">
                While I&apos;m personally excited about the vision, I&apos;ve learned to check that excitement against <strong>user behavior, data, and testing signals.</strong> I am not the user—and
                assuming otherwise can derail even the best ideas. The real impact comes from <strong>asking better questions</strong>, observing how people actually use the product, and knowing what
                to test next and why.
              </p>
            </div>
          </div>

          {/* Designing for Trust */}
          <div>
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-[#a0a0a0] mb-2 md:mb-4">Designing for Trust</h3>
              <p className="text-[18px]">
                Designing for privacy and trust adds a unique layer of responsibility. Every opt-in, every permission request, every moment of friction must be intentional. It's not just about
                features—it's about ensuring the <strong>experience reflects user values and long-term strategy.</strong>
              </p>
            </div>
          </div>

          {/* Staying Curious and Outcome-Oriented */}
          <div>
            <div className="border-t border-[#C1C1C1] pt-[4px]">
              <h3 className="text-2xl font-regular text-[#a0a0a0] mb-2 md:mb-4">Staying Curious and Outcome-Oriented</h3>
              <p className="text-[18px]">
                Moving forward, I&apos;m focused on staying curious, integrating feedback loops early, and making sure design decisions are grounded in both user needs and measurable outcomes.
              </p>
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

      {/* Playground Section */}
      <div className="relative bg-gray-100 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-8 lg:mb-12">Playground</h2>

          <div className="flex justify-center ">
            <Image src="/mozilla-ideation.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-auto" priority />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
