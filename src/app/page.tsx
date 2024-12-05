import CraftCard from '@/components/ui/craft-card'
import Hero from '@/components/ui/hero'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto py-16" id="craft">
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
