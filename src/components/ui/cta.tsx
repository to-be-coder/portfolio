import { Button } from './button'

export default function CtaSection() {
  return (
    <div className="bg-[#1C1C1C]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-32">
        <section className="py-8 md:py-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Let&apos;s make something users will love!</h2>
          <p className="text-[#ffffff] mb-8">If you&apos;re looking for a design engineer who combines empathy, design thinking, and technical expertise, I&apos;m here to help!</p>
          <Button className="bg-[#ff9c6a] hover:bg-[#ff9c6a]/90">Send Message</Button>
        </section>
      </div>
    </div>
  )
}
