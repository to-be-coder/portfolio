import { Button } from './button'

export default function CtaSection() {
  return (
    <div className="max-w-7xl mx-auto">
      <section className="py-16 text-center">
        <p className="text-[#FFA813] uppercase tracking-wide mb-4">LET&apos;S DESIGN SOMETHING AMAZING</p>
        <h2 className="text-3xl font-bold mb-8">I&apos;m only a message away</h2>
        <Button className="bg-[#FFA813] hover:bg-[#FFA813]/90">Let&apos;s talk →</Button>
      </section>
    </div>
  )
}
