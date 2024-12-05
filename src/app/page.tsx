import CraftCard from '@/components/ui/craft-card'
import Header from '@/components/ui/header'
import Hero from '@/components/ui/hero'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <div className="container mx-auto" id="craft">
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
