import CtaSection from '@/components/ui/cta'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div className="container mx-auto px-8 lg:px-32 min-h-[calc(100vh-5rem)] flex flex-col justify-center">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Hi I'm Jessica,
            <br />
            a UX designer and developer
            <br />
            who values <span className="text-[#FF9B6A]">simple + human-centered</span>
            <br />
            designs that create lasting connections.
          </h1>

          <div className="flex flex-wrap gap-4 mt-16">
            <span className="px-6 py-3 bg-white border border-gray-200 rounded-full text-base">UI Design</span>
            <span className="px-6 py-3 bg-white border border-gray-200 rounded-full text-base">UX Research</span>
            <span className="px-6 py-3 bg-white border border-gray-200 rounded-full text-base">Prototyping</span>
            <span className="px-6 py-3 bg-white border border-gray-200 rounded-full text-base">Frontend Development</span>
          </div>

          <div className="mt-16">
            <a href="#projects" className="text-gray-900 hover:text-gray-700 flex items-center gap-2 text-base">
              Check Out Projects ↓
            </a>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="container mx-auto space-y-8 px-8 lg:px-32" id="projects">
        {/* Vision Track Project */}
        <div className="group relative overflow-hidden rounded-3xl bg-[#FFD699] p-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Vision Track →</h3>
            <p className="text-lg">Competitive analysis and user interviews for B2B SaaS startup</p>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-black px-4 py-1 text-sm text-white">UX Research</span>
              <span className="rounded-full bg-black px-4 py-1 text-sm text-white">B2B</span>
            </div>
          </div>
        </div>

        {/* Lilypad Project */}
        <div className="group relative overflow-hidden rounded-3xl bg-[#99C4FF] p-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Lilypad →</h3>
            <p className="text-lg">Design and development mobile-first landing page for AI ed-tech startup</p>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-black px-4 py-1 text-sm text-white">UI Design</span>
              <span className="rounded-full bg-black px-4 py-1 text-sm text-white">Landing Page</span>
              <span className="rounded-full bg-black px-4 py-1 text-sm text-white">Responsive Design</span>
            </div>
          </div>
        </div>

        {/* Other Fun Works Section */}
        <div className="group relative overflow-hidden rounded-3xl bg-[#212121] p-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Other Fun Works →</h3>
          </div>
        </div>
        {/* Mislanious Section*/}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-gray-200 p-8">
              <h4 className="text-xl font-semibold text-gray-600">Fractional (Coming Soon)</h4>
            </div>
            <div className="rounded-3xl bg-gray-200 p-8">
              <h4 className="text-xl font-semibold text-gray-600">To Do List w/ AI (Coming Soon)</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
