import CraftCard from '@/components/ui/craft-card'
import Hero from '@/components/ui/hero'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto min-h-[calc(100vh-5rem)] px-6 py-16 lg:px-40" id="craft">
        <div className="grid grid-cols-3 gap-4">
          <CraftCard />
          <CraftCard />
          <CraftCard />
          <CraftCard />
          <CraftCard />
          <CraftCard />
        </div>
      </div>
    </>
  )
}
