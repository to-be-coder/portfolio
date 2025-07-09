import CtaSection from '@/components/ui/cta'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function MozillaPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="w-full h-auto flex flex-col relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background Image with Overlay */}

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row w-full space-between justify-end lg:items-end my-10 border-b border-gray-200">
          <h1 className="flex-1 text-4xl md:text-5xl font-bold tracking-tight leading-tight text-black">Mozilla - Ghost Cat</h1>
          <p className="items-end text-lg md:text-2xl mb-1 text-black">On-device AI assistant</p>
        </div>
      </div>
      <div className="w-full h-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center rounded-lg overflow-hidden">
        <Image src="/mozilla-hero.png" alt="Mozilla hero background" width={1000} height={100} className="w-full flex-1 object-cover max-h-[600px] object-center rounded-lg" />
      </div>

      {/* Overview Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 gap-y-12">
          <div className="flex-1 border-t border-[#C1C1C1] pt-2">
            <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Overview</h2>
            <p className="text-[16px]">
              <strong>Ghost Cat</strong> is a privacy-first, on-device AI assistant. Our goal was to design a lightweight prototype to explore a core question: Can we deliver intelligent,
              context-aware assistance without sending user data to the cloud? <br /> <br />
              <strong>This raised key UX challenges</strong>: How do you build trust in a system that operates mostly in the background? How do you support power users who expect transparency and
              control—without overwhelming them with complexity? <br /> <br />I collaborated closely with engineering to design a prototype for early user testing and stakeholder review. This work
              laid the foundation for future research into how people perceive local AI and how much visibility and control they actually want.
            </p>
          </div>

          <div className="flex-1 border-t border-[#C1C1C1] pt-2">
            <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Design Objective</h2>
            <p className="text-[16px]">
              Our goal was to prototype a privacy-first, on-device AI assistant that reflects Mozilla&apos;s core values—<strong>trust</strong>, <strong>transparency</strong>, and{' '}
              <strong>user control</strong>—and test it internally to align teams on product direction.
              <br /> <br />
              We were trying to answe:
            </p>
            <ul className="list-disc ml-5 text-[16px] mb-4">
              <li>How can we ask for consent in a way that feels seamless—not disruptive?</li>
              <li>How much control can we give without overwhelming users?</li>
              <li>What familiar UI patterns work within strict on-device constraints?</li>
            </ul>
            <p className="text-[16px] mt-5">
              I translated these questions into an interactive prototype designed for internal walkthroughs, stakeholder review, and engineering alignment—a foundation to test assumptions and define
              what to learn next.
            </p>
          </div>

          <div className="flex-1 border-t border-[#C1C1C1] pt-2">
            <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">My Role</h2>
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-[16px]">UX Strategy & Hypothesis Building:</span>
                <p className="text-[16px]">Framed product assumptions and prioritized what to explore first.</p>
              </div>
              <div>
                <span className="font-semibold text-[16px]">Design & Prototyping:</span>
                <p className="text-[16px]">Designed core flows and built prototypes in Figma for fast iteration.</p>
              </div>
              <div>
                <span className="font-semibold text-[16px]">Cross-Functional Collaboration:</span>
                <p className="text-[16px]">Partnered with engineering to translate technical limits into UX.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <div className="relative bg-green-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 border-t border-[#C1C1C1]"></div>
            <h2 className="text-4xl font-normal mb-2">
              Workflow<span className="text-green-500 text-[64px]">.</span>
            </h2>
            <div className="flex-1 border-t border-[#C1C1C1]"></div>
          </div>
          <div className="w-full flex justify-center mt-16 lg:mt-24">
            <Image src="/mozilla-workflow.png" alt="Project workflow timeline showing hypothesis, research, and synthesis phases" width={1728} height={600} className="w-full h-auto" priority />
          </div>
        </div>
      </div>

      {/* Initial Vision Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <h2 className="text-4xl font-normal mb-2">
          Initial Vision of Ghost Cat<span className="text-green-500 text-[64px]">.</span>
        </h2>

        <div className="border-t border-[#C1C1C1] pt-2">
          <h3 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Our Vision</h3>
        </div>
        <p className="text-[16px]">
          Ghost Cat aims to be a true <strong>personal AI assistant</strong> — one that understands user&apos;s preferences and routines while keeping data secure and private. It builds a local,
          encrypted, on-device knowledge base, ensuring that user&apos;s information remains fully under <strong>user&apos;s control</strong>.
        </p>

        <div className="mt-8 md:mt-12">
          <div className="border-t border-[#C1C1C1] pt-2">
            <h3 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Competitive Research</h3>
          </div>
          <p className="text-[16px]">I am not able to show this section due to a request.</p>
        </div>
      </div>

      {/* Hypothesis Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32 max-w-7xl">
        <h2 className="text-4xl font-normal mb-2">
          Forming Hypothesis<span className="text-green-500 text-[64px]">.</span>
        </h2>
        <div className="flex flex-col gap-x-16 gap-y-12">
          {/* Left Column - Stacked Overview and Design Objective */}
          <div className="flex flex-col lg:flex-row space-x-9 space-y-9 lg:space-y-0">
            <div className="flex-1 border-t border-[#C1C1C1] pt-2">
              <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Hypothesis</h2>
              <p className="text-[16px]">
                We envision Ghost Cat as a <strong>privacy-first assistant</strong> designed to <strong>prioritize user trust and control</strong>. <br />
                <br />
                <strong>Transparency is a core principle.</strong> Permission requests are clearly surfaced in the interface, and no data is shared without explicit user opt-in. The goal is to make
                data sharing feel intentional, seamless, and respectful—never disruptive. <br />
                <br />
                <strong>Security is treated as a first-class priority</strong>, influencing decisions across both interface and experience design.
              </p>
            </div>

            <div className="flex-1 border-t border-[#C1C1C1] pt-2">
              <h2 className="text-2xl font-regular text-[#a1a1a1] mb-2 md:mb-4">Why This Hypothesis</h2>
              <ul className="list-disc ml-5 text-[16px]">
                <li>Trust is the primary barrier to adoption for AI in privacy-aware audiences.</li>
                <li>Users expect control; transparent, opt-in permissions make data sharing feel safe and intentional.</li>
                <li>Security isn&apos;t optional; it&apos;s foundational to earning and maintaining user confidence.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Design Challenge Section */}
      <div className="relative bg-green-100 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <div className="flex flex-col gap-y-8 lg:gap-y-16">
            {/* top row */}
            <div className="flex flex-col lg:flex-row gap-x-16 gap-y-8 lg:gap-y-0">
              <div className="flex-1">
                <h2 className="text-4xl font-normal mb-2">
                  Design Challenges<span className="text-green-500 text-[64px]">.</span>
                </h2>
              </div>
              {/* Designing for a Fast MVP, Aligned with Tech Constraints */}
              <div className="flex-1 border-t border-gray-600 pt-2">
                <h3 className="text-2xl font-medium text-black mb-2 md:mb-4">Designing for a Fast MVP, Aligned with Tech Constraints</h3>
                <p className="text-[16px]">
                  To enable a fast, feasible MVP, I partnered closely with engineering to understand constraints around on-device AI, encryption, and data storage. This early alignment shaped my UX
                  approach—favoring <strong>familiar patterns</strong> and <strong>lightweight logic</strong> to ensure designs were implementation-ready and flexible as tech decisions evolved.
                </p>
              </div>
            </div>
            {/* bottom row */}
            <div className="flex flex-col lg:flex-row gap-x-16 gap-y-8 lg:gap-y-0">
              {/* Privacy-first UX */}
              <div className="flex-1 border-t border-gray-600 pt-2">
                <h3 className="text-2xl font-medium text-black mb-2 md:mb-4">Privacy-first UX</h3>
                <p className="text-[16px]">
                  Designing for an AI assistant meant putting privacy and ethics at the core of the experience. It was essential to clearly communicate how user data is collected, stored, and
                  used—while giving people <strong>control without creating friction</strong>. Beyond compliance, the goal was to <strong>build trust</strong>: making transparency intuitive, choices
                  meaningful, and ensuring the assistant felt helpful—not intrusive.
                </p>
              </div>

              {/* Designing for scale */}
              <div className="flex-1 border-t border-gray-600 pt-2">
                <h3 className="text-2xl font-medium text-black mb-2 md:mb-4">Designing for scale</h3>
                <p className="text-[16px]">
                  With many unknowns in the product&apos;s roadmap, designing for scalability was critical. I focused on building flexible components and patterns that could adapt as the product
                  evolved—
                  <strong>minimizing rework</strong> and enabling <strong>faster iteration</strong> down the line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exploring Early Concepts Section */}
      <div className="relative bg-white text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left Column - Text Content */}

            <div className="flex-1">
              <h2 className="text-4xl font-normal mb-2">
                Exploring Early Concepts<span className="text-green-500 text-[64px]">.</span>
              </h2>
              <div className="border-t border-[#C1C1C1] mb-8"></div>

              <p className="text-[16px] mb-8">I used low-fidelity wireframes to quickly define core user flows and align early with product and engineering. This lean approach helped us: </p>
              <ul className="list-disc pl-8 mb-8 text-[16px]">
                <li>
                  <strong>Explore layout and interaction ideas with speed</strong>
                </li>
                <li>
                  <strong>Gather fast, actionable feedback from stakeholders</strong>
                </li>
                <li>
                  <strong>Identify technical constraints early and adapt confidently</strong>
                </li>
              </ul>
              <p className="text-[16px]">Sharing early concepts kept the team aligned, minimized rework, and set us up for high-fidelity design with clarity and momentum.</p>
            </div>

            {/* Right Column - Images */}
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <Image src="/mozilla-v1-1.png" alt="mozilla mockup" width={400} height={400} className="w-full h-auto rounded-md border border-gray-200" priority />
                <Image src="/mozilla-v1-4.png" alt="mozilla mockup" width={400} height={400} className="w-full h-auto rounded-md border border-gray-200" priority />
                <Image src="/mozilla-v1-2.png" alt="mozilla mockup" width={400} height={400} className="w-full h-auto rounded-md border border-gray-200" priority />
                <Image src="/mozilla-v1-3.png" alt="mozilla mockup" width={400} height={400} className="w-full h-auto rounded-md border border-gray-200" priority />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign up flow */}
      <div className="relative bg-white text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-2">
            Clarity at Every Step<span className="text-green-500 text-[64px]">.</span>
          </h2>
          <div className="border-t border-[#C1C1C1] mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-y-4 border border-gray-100 p-4 rounded-lg bg-gray-100">
              <Image src="/mozilla-signup-1.png" alt="Account deletion screen" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
              <div className="flex-1 flex-col">
                <h3 className="text-2xl font-regular text-black mb-2">1. Account Connection</h3>
                <p className="text-[16px]">The flow starts with a focused, distraction-free prompt to connect an account—carefully designed to avoid confusion or unnecessary navigation.</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 border border-gray-100 p-4 rounded-lg bg-gray-100">
              <Image src="/mozilla-signup-2.png" alt="Account deletion screen" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
              <div className="flex-1 flex-col">
                <h3 className="text-2xl font-regular text-black mb-2">2. Syncing Progress</h3>
                <p className="text-[16px]">
                  Showing real-time syncing feedback helps manage expectations and prevents user uncertainty. Visual cues and messaging make it clear the system is working—reducing drop-off during
                  wait time.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 border border-gray-100 p-4 rounded-lg bg-gray-100">
              <Image src="/mozilla-signup-3.png" alt="Account deletion screen" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
              <div className="flex-1 flex-col">
                <h3 className="text-2xl font-regular text-black mb-2">3. Ready to Chat</h3>
                <p className="text-[16px]">
                  Once syncing is complete, users land directly in the chat experience, with full context. No confusion, no extra steps—just a smooth transition that respects their time and keeps
                  momentum going.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transparency about data usage */}
      <div className="relative bg-green-100 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-2">
            Transparency about data usage<span className="text-green-500 text-[64px]">.</span>
          </h2>
          <div className="flex-1 flex-col space-y-8 lg:gap-y-16">
            <div className="flex gap-x-8 flex-col lg:flex-row gap-y-8 lg:gap-y-0">
              <div className="flex-1 border-t border-gray-600 pt-2 order-last lg:order-first">
                <h3 className="text-2xl font-regular mb-2 md:mb-4">Designing for Informed Choice</h3>
                <p className="text-[16px] mb-8 lg:mb-12">
                  This moment introduces a data-sharing request in plain language, placed directly in the chat to feel contextual. The goal was to offer a clear, timely choice—so users know
                  what&apos;s being asked and why, without digging through settings.
                </p>
              </div>
              <div className="flex flex-1 flex-col space-y-8 order-first lg:order-last">
                <Image src="/mozilla-warning-1.png" alt="mozilla mockup" width={800} height={800} className="h-auto w-auto rounded-md border border-gray-200" priority />
              </div>
            </div>
            <div className="flex gap-x-8 flex-col lg:flex-row gap-y-8 lg:gap-y-0">
              <div className="flex flex-1 flex-col space-y-8">
                <Image src="/mozilla-warning-response-1.png" alt="mozilla mockup" width={800} height={800} className="h-auto w-auto rounded-md border border-gray-200" priority />
              </div>
              <div className="flex-1 border-t border-gray-600 pt-2">
                <h3 className="text-2xl font-regular mb-2 md:mb-4">Respectful Transparency</h3>
                <p className="text-[16px] mb-8 lg:mb-12">
                  When users choose to share data, we acknowledge their choice clearly and let the assistant continue seamlessly. The goal is to reinforce trust by making consent feel natural—without
                  interrupting the flow.
                </p>
              </div>
            </div>
            <div className="flex gap-x-8 flex-col lg:flex-row gap-y-8 lg:gap-y-0">
              <div className="flex-1 border-t border-gray-600 pt-2 order-last lg:order-first">
                <h3 className="text-2xl font-regular mb-2 md:mb-4">Graceful Opt-Outs Without Penalty</h3>
                <p className="text-[16px] mb-8 lg:mb-12">
                  If users decline, the experience continues without pressure or penalty. The assistant adapts accordingly, respecting their choice while keeping the flow smooth and functional.
                </p>
              </div>
              <div className="flex flex-1 flex-col space-y-8 order-first lg:order-last">
                <Image src="/mozilla-warning-response-2.png" alt="mozilla mockup" width={800} height={800} className="h-auto w-auto rounded-md border border-gray-200" priority />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings screens */}
      <div className="relative bg-white text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-2">
            Designing Trust Through Settings<span className="text-green-500 text-[64px]">.</span>
          </h2>
          <div className="border-t border-[#C1C1C1] mb-8"></div>
          <p className="text-[16px] mb-8 lg:mb-12">
            Trust in AI begins with <strong>transparency and control</strong>. These settings give users meaningful choices over data, preferences, and assistant behavior—making control a core part of
            the experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            <div className="flex flex-col gap-y-4 border border-gray-100 p-4 rounded-lg bg-gray-100">
              <Image src="/mozilla-setting-account.png" alt="Account deletion screen" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
              <p>Users can delete their account at any time—no questions asked.</p>
            </div>
            <div className="flex flex-col gap-y-4 border border-gray-100 p-4 rounded-lg bg-gray-100">
              <Image src="/mozilla-setting-memory.png" alt="Clear memory screen" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
              <p>Users can clear their memory and past interactions whenever they choose.</p>
            </div>
            <div className="flex flex-col gap-y-4 border border-gray-100 p-4 rounded-lg bg-gray-100">
              <Image src="/mozilla-setting-models.png" alt="Model selection screen" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
              <p>Users can select which AI model powers their assistant experience.</p>
            </div>
            <div className="flex flex-col gap-y-4 border border-gray-100 p-4 rounded-lg bg-gray-100">
              <Image src="/mozilla-setting-extentions-2.png" alt="Extensions control screen" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
              <p>Users can enable or disable extensions based on what they need or trust.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Light and Dark Mode Mockups */}
      <div className="relative bg-green-100 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            <div className="flex flex-col">
              <h2 className="text-4xl font-normal mb-2">
                Dark Mode for Modern Use<span className="text-green-500 text-[64px]">.</span>
              </h2>
              <div className="border-t border-[#C1C1C1] mb-8"></div>
              <p className="text-[16px]">
                Dark mode was designed not just for aesthetics, but to reduce eye strain and improve comfort in low-light environments—meeting both <strong>user needs</strong> and{' '}
                <strong>modern platform expectations.</strong>
              </p>
            </div>
            <div className="flex">
              <Tabs defaultValue="dark" className="w-full gap-y-4 lg:gap-y-8">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="light">Light Mode</TabsTrigger>
                  <TabsTrigger value="dark">Dark Mode</TabsTrigger>
                </TabsList>
                <TabsContent value="light" className="flex justify-center">
                  <Image src="/mozilla-light.png" alt="mozilla mockup" width={800} height={800} className="h-auto w-full max-w-full rounded-md" priority />
                </TabsContent>
                <TabsContent value="dark" className="flex justify-center">
                  <Image src="/mozilla-dark.png" alt="mozilla mockup" width={800} height={800} className="h-auto w-full max-w-full rounded-md" priority />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* chat screens */}
      <div className="relative bg-green-200 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <h2 className="text-4xl font-normal mb-2">
            Designing for Fast Iteration and Familiar Use<span className="text-green-500 text-[64px]">.</span>
          </h2>
          <div className="border-t border-[#C1C1C1] mb-8"></div>
          <p className="text-[16px] mb-8 lg:mb-12">
            To speed up iteration, I leaned on <strong>familiar UX patterns</strong> and avoided complex custom UI. This kept the design intuitive, reduced dev effort, and let us{' '}
            <strong>quickly prototype and evolve</strong>—without compromising usability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-8">
            <Image src="/mozilla-chat-1.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
            <Image src="/mozilla-chat-2.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
            <Image src="/mozilla-chat-3.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
          </div>
        </div>
      </div>

      {/* Mobile Mockups */}
      <div className="relative bg-white text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <div className="flex flex-col lg:flex-row space-y-0 lg:space-y-8 lg:space-x-8 items-center justify-center">
            <div className="flex-1 flex-col gap-y-8 items-center w-full lg:w-auto">
              <h2 className="text-4xl font-normal mb-2">
                Designing with Mobile in Mind<span className="text-green-500 text-[64px]">.</span>
              </h2>
              <div className="border-t border-[#C1C1C1] mb-8"></div>
              <Image src="/mozilla-mobiles.png" alt="mozilla mockup" width={800} height={800} className="flex-1 h-auto block lg:hidden w-auto mb-4 items-center justify-center" priority />

              <p className="text-[16px] items-center">
                Although the current product is web-based, I approached the design with a mobile-first mindset where it made sense. From layout choices to interaction patterns, I considered how the
                experience could <strong>translate to smaller screens with minimal rework.</strong>
              </p>
            </div>
            <Image src="/mozilla-mobiles.png" alt="mozilla mockup" width={800} height={800} className="flex-1 h-auto hidden lg:block w-auto" priority />
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
              <span className='text-[200px] font-regular font-["Inter"] tracking-tight'>Aa</span>
            </div>

            {/* Right Column - Typography Details */}
            <div className="space-y-4 md:space-y-8">
              {/* Typeface */}
              <div className="border-t border-[#C1C1C1] pt-2">
                <h3 className="text-2xl font-regular text-gray-400 mb-2 md:mb-4">Typeface</h3>
                <p className="text-[16px]">Inter</p>
              </div>

              {/* Weights */}
              <div className="border-t border-[#C1C1C1] pt-2">
                <h3 className="text-2xl font-regular text-gray-400 mb-2 md:mb-4">Weights</h3>
                <div className="space-y-1 md:space-y-2">
                  <p className="text-[16px] font-normal">Regular</p>
                  <p className="text-[16px] font-semibold">Semi-Bold</p>
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

      {/* Learning Section */}
      <div className="relative bg-gray-100 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          {/* Title */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <h2 className="text-4xl font-normal mb-8 lg:mb-12">Learning</h2>

            {/* Build Fast, Learn Faster */}
            <div>
              <div className="border-t border-[#C1C1C1] pt-2">
                <h3 className="text-2xl font-regular text-black mb-2 md:mb-4">Build Fast, Learn Faster</h3>
                <p className="text-[16px]">
                  This project reinforced the need for an agile, test-and-learn mindset over a linear build. Given the complexity and ambition of the product, fast iteration based on real-world
                  feedback is essential—not just for usability, but for achieving <strong>product-market fit.</strong>
                </p>
              </div>
            </div>

            {/* Balancing Agility with Control */}
            <div>
              <div className="border-t border-[#C1C1C1] pt-2">
                <h3 className="text-2xl font-regular text-black mb-2 md:mb-4">Balancing Agility with Control</h3>
                <p className="text-[16px]">
                  One key takeaway was the value of combining an <strong>agile approach with a gated release strategy</strong>—moving quickly, but within clearly defined phases. This allows us to
                  learn fast while keeping scope focused and risk manageable at each stage.
                </p>
              </div>
            </div>

            {/* I Am Not the User */}
            <div>
              <div className="border-t border-[#C1C1C1] pt-2">
                <h3 className="text-2xl font-regular text-black mb-2 md:mb-4">I Am Not the User</h3>
                <p className="text-[16px]">
                  While I&apos;m personally excited about the vision, I&apos;ve learned to check that excitement against <strong>user behavior, data, and testing signals.</strong> I am not the
                  user—and assuming otherwise can derail even the best ideas. The real impact comes from <strong>asking better questions</strong>, observing how people actually use the product, and
                  knowing what to test next and why.
                </p>
              </div>
            </div>

            {/* Designing for Trust */}
            <div>
              <div className="border-t border-[#C1C1C1] pt-2">
                <h3 className="text-2xl font-regular text-black mb-2 md:mb-4">Designing for Trust</h3>
                <p className="text-[16px]">
                  Designing for privacy and trust adds a unique layer of responsibility. Every opt-in, every permission request, every moment of friction must be intentional. It&apos;s not just about
                  features—it&apos;s about ensuring the <strong>experience reflects user values and long-term strategy.</strong>
                </p>
              </div>
            </div>

            {/* Staying Curious and Outcome-Oriented */}
            <div>
              <div className="border-t border-[#C1C1C1] pt-2">
                <h3 className="text-2xl font-regular text-black mb-2 md:mb-4">Staying Curious and Outcome-Oriented</h3>
                <p className="text-[16px]">
                  Moving forward, I&apos;m focused on staying curious, integrating feedback loops early, and making sure design decisions are grounded in both user needs and measurable outcomes.
                </p>
              </div>
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
              <h2 className="text-4xl font-normal mb-8 lg:mb-12">Explore my portfolio in Figma</h2>
              <p className="text-[16px] mb-4 md:mb-8">Design speaks louder than words—Check out the full Figma file to see the process, decisions, and iterations behind this project.</p>
              <Link
                href="https://www.figma.com/design/q77RkGzo90PYeOzwp1ADJm/Jess-s-Portfolio?node-id=0-1&t=OX7x7y5drKn557ae-1"
                className="inline-flex items-center bg-green-300 hover:bg-green-500 text-black px-6 py-3 rounded-lg transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check Out Figma
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            {/* Right Column - iPhone Image */}
            <div className="flex justify-center">
              <Image src="/mozilla-cta.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-full" priority />
            </div>
          </div>
        </div>
      </div>

      {/* Playground Section */}
      <div className="relative bg-gray-100 text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-16 gap-y-8">
            <div className="flex col-span-2 justify-center items-center">
              <h2 className="text-4xl font-normal">Previous Explorations</h2>
            </div>
            <Image src="/mozilla-playground-1.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
            <Image src="/mozilla-playground-2.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
            <Image src="/mozilla-playground-3.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
            <Image src="/mozilla-playground-4.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
            <Image src="/mozilla-playground-5.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
            <Image src="/mozilla-playground-6.png" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
            <Image src="/mozilla-playground-7.jpg" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
            <Image src="/mozilla-playground-8.jpg" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
            <Image src="/mozilla-playground-9.jpg" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
            <Image src="/mozilla-playground-10.jpg" alt="mozilla mockup" width={800} height={800} className="h-auto max-w-full rounded-md border border-gray-200" priority />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
