import CtaSection from '@/components/ui/cta'
import { MoveDown } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div className="container mx-auto px-8 h-[90vh] flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Hi I&apos;m Jessica,
            <br />
            a UX designer and developer
            <br />
            who values <span className="text-[#FF9B6A]">simple + human-centered</span>
            <br />
            designs that create lasting connections.
          </h1>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-[#C1C1C1] px-4 py-1 text-sm text-black">UI Design</span>
            <span className="rounded-full border border-[#C1C1C1] px-4 py-1 text-sm text-black">UX Research</span>
            <span className="rounded-full border border-[#C1C1C1] px-4 py-1 text-sm text-black">Prototyping</span>
            <span className="rounded-full border border-[#C1C1C1] px-4 py-1 text-sm text-black">Frontend Development</span>
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 flex justify-end">
            <div className="flex items-center text-base text-gray-900 hover:text-gray-700">
              Check Out Projects <MoveDown className="text-[#ff9c6a] w-6 h-4 stroke-[3]" />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-32 space-y-16" id="projects">
        <div className="group relative overflow-hidden rounded-3xl bg-[#FFC157] p-8 h-[720px]">
          <a href="/vision-track">
            <div className="flex flex-col h-full">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Vision Track →</h3>
                <p className="text-lg">Competitive analysis and user interviews for B2B SaaS startup</p>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-black px-4 py-1 text-sm text-black">UX Research</span>
                  <span className="rounded-full border border-black px-4 py-1 text-sm text-black">B2B</span>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center mt-8">
                <Image src="/vision_track.png" alt="Vision Track Project" width={500} height={300} className="rounded-lg w-auto h-full object-contain" />
              </div>
            </div>
          </a>
        </div>

        <div className="group relative overflow-hidden rounded-3xl bg-[#99C4FF] p-8 h-[720px]">
          <a href="/lilypad">
            <div className="flex flex-col h-full">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Lilypad →</h3>
                <p className="text-lg">Design and development mobile-first landing page for AI ed-tech startup</p>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-black px-4 py-1 text-sm text-black">UI Design</span>
                  <span className="rounded-full border border-black px-4 py-1 text-sm text-black">Landing Page</span>
                  <span className="rounded-full border border-black px-4 py-1 text-sm text-black">Responsive Design</span>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center mt-8">
                <Image src="/lilypad.png" alt="Lilypad Project" width={500} height={300} className="rounded-lg w-auto h-full object-contain" />
              </div>
            </div>
          </a>
        </div>

        <div className="group relative overflow-hidden rounded-3xl bg-[#212121] p-8 h-[720px]">
          <div className="flex flex-col h-full">
            <a href="/hobby">
              <h3 className="text-2xl font-bold text-white">Other Fun Works →</h3>
              <div className="flex-1 columns-2 sm:columns-3 lg:columns-4 gap-4 mt-8 ">
                <div className="w-full h-40 bg-gray-400 rounded-lg mb-4"></div>
                <div className="w-full h-64 bg-gray-400 rounded-lg mb-4"></div>
                <div className="w-full h-48 bg-gray-400 rounded-lg mb-4"></div>
                <div className="w-full h-56 bg-gray-400 rounded-lg mb-4"></div>
                <div className="w-full h-40 bg-gray-400 rounded-lg mb-4"></div>
                <div className="w-full h-52 bg-gray-400 rounded-lg mb-4"></div>
                <div className="w-full h-44 bg-gray-400 rounded-lg mb-4"></div>
                <div className="w-full h-60 bg-gray-400 rounded-lg mb-4"></div>
                <div className="w-full h-48 bg-gray-400 rounded-lg mb-4"></div>
                <div className="w-full h-40 bg-gray-400 rounded-lg mb-4"></div>
                <div className="w-full h-52 bg-gray-400 rounded-lg mb-4"></div>
                <div className="w-full h-44 bg-gray-400 rounded-lg mb-4"></div>
              </div>
            </a>
          </div>
        </div>

        {/* Mislanious Section*/}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-gray-200 p-8 h-[480px]">
              <h4 className="text-xl font-semibold text-gray-600">Fractional (Coming Soon)</h4>
            </div>
            <div className="rounded-3xl bg-gray-200 p-8 h-[480px]">
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
