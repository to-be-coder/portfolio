import CtaSection from '@/components/ui/cta'
import { Mail } from 'lucide-react'
import Image from 'next/image'

export default function DemoPage() {
  return (
    <main>
      <div className="min-h-svh p-8 container mx-auto flex flex-col gap-8 justify-between">
        <div className="flex flex-1">
          <div className="mx-auto flex flex-col gap-8 justify-center items-center">
            <div className="flex flex-col gap-2 justify-center items-center">
              <h1 className="text-5xl font-normal">Let&apos;s get to know each other.</h1>
              <div>
                <div className="flex items-center gap-2">
                  <Mail className="w-6 h-6" />
                  <a href="mailto:jessica@thoughtful.llc">jessica@thoughtful.llc</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image src="/hobby-14.jpeg" alt="Hobby 14" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
          <Image src="/hobby-3.jpeg" alt="Hobby 15" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
          <Image src="/hobby-16.jpeg" alt="Hobby 16" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
          <Image src="/hobby-17.jpeg" alt="Hobby 17" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
          <Image src="/hobby-20.jpeg" alt="Hobby 20" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
          <Image src="/hobby-19.jpeg" alt="Hobby 19" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
        </div>
        <div className="flex justify-center items-center">
          <Image src="/hobby-14.jpeg" alt="Hobby 14" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
          <Image src="/hobby-3.jpeg" alt="Hobby 15" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
          <Image src="/hobby-16.jpeg" alt="Hobby 16" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
          <Image src="/hobby-17.jpeg" alt="Hobby 17" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
          <Image src="/hobby-20.jpeg" alt="Hobby 20" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
          <Image src="/hobby-19.jpeg" alt="Hobby 19" width={500} height={300} className="w-full h-40 rounded-lg object-cover" />
        </div>
      </div>

      <CtaSection />
    </main>
  )
}
