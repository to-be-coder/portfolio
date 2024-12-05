import Header from '@/components/ui/header'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion'
import Image from 'next/image'

export default function About() {
  return (
    <div className="relative isolate h-screen px-6 lg:px-8 overflow-hidden">
      <Header />
      <div className="mx-auto max-w-7xl px-6 h-[calc(100vh-5rem)] flex items-center lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <Image src="/profile.jpg" alt="Profile photo" width={400} height={400} className="rounded-lg shadow-lg" priority />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">About Me</h1>
            <p className="text-base leading-7 text-gray-600">
              Hello! I&apos;m Jessica Cheng, a passionate software developer with a keen interest in building elegant solutions to complex problems. I specialize in full-stack development with a focus
              on modern web technologies.
            </p>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b">
                <AccordionTrigger className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-medium hover:bg-gray-50">
                  Is it accessible?
                  <svg className="h-4 w-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-2 pt-0 text-sm text-gray-600">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b">
                <AccordionTrigger className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-medium hover:bg-gray-50">
                  Is it styled?
                  <svg className="h-4 w-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-2 pt-0 text-sm text-gray-600">Yes. It comes with default styles that matches the other components&apos; aesthetic.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-medium hover:bg-gray-50">
                  Is it animated?
                  <svg className="h-4 w-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-2 pt-0 text-sm text-gray-600">Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
