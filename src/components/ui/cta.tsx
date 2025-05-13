import { Button } from './button'

export default function CtaSection() {
  return (
    <div className="bg-[#181C19]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-8 md:py-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Let&apos;s make something users will love!</h2>
          <p className="text-[#ffffff] mb-8">If you&apos;re looking for a product designer who can bridge the gap between design and code, I&apos;m here to help!</p>
          <Button variant="secondary" asChild>
            <a href={'/contact'}>Contact Me</a>
          </Button>
        </section>
      </div>
    </div>
  )
}
