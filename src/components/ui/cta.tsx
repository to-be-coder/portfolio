import { Button } from './button'

export default function CtaSection() {
  return (
    <div className="bg-[#1C1C1C]">
      <div className="max-w-7xl mx-auto">
        <section className="py-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Let&apos;s make something users will love!</h2>
          <p className="text-gray-400 mb-8">
            If you&apos;re looking for a UX Designer / Design Engineer who combines empathy,
            <br />
            design thinking, and technical expertise, I&apos;m here to help!
          </p>
          <Button className="bg-[#ff9c6a] hover:bg-[#ff9c6a]/90">Send Message</Button>
        </section>
      </div>
    </div>
  )
}
