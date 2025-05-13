import CtaSection from '@/components/ui/cta'

export default function ThoughtfulPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="container mx-auto px-8 h-[100vh] flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center gap-y-2 md:gap-y-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-center">Thoughtful</h1>
          <p className="text-[32px] mt-4 text-center ">Working on it. Coming Soon</p>
        </div>
      </div>
      {/* Contact Section */}
      <CtaSection />
    </main>
  )
}
