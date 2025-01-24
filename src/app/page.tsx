import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="container mx-auto px-8 lg:px-32 min-h-[calc(100vh-5rem)] flex flex-col justify-center">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Hi I'm Jessica,
            <br />
            a UX designer and developer
            <br />
            who values <span className="text-[#FF9B6A]">simple + human-centered</span>
            <br />
            designs that create lasting connections.
          </h1>

          <div className="flex flex-wrap gap-4 mt-16">
            <span className="px-6 py-3 bg-white border border-gray-200 rounded-full text-base">UI Design</span>
            <span className="px-6 py-3 bg-white border border-gray-200 rounded-full text-base">UX Research</span>
            <span className="px-6 py-3 bg-white border border-gray-200 rounded-full text-base">Prototyping</span>
            <span className="px-6 py-3 bg-white border border-gray-200 rounded-full text-base">Frontend Development</span>
          </div>

          <div className="mt-16">
            <a href="#projects" className="text-gray-900 hover:text-gray-700 flex items-center gap-2 text-base">
              Check Out Projects ↓
            </a>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="container mx-auto my-8 space-y-8" id="projects">
        <Card className="w-full shadow-none">
          <div className="flex">
            <div className="flex-1">
              <CardHeader>
                <CardTitle className="text-2xl">Project One</CardTitle>
                <CardDescription>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </CardDescription>
              </CardHeader>
              <CardContent className="px-4">
                <div className="grid grid-cols-3 gap-3">
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                </div>
              </CardContent>
              <CardFooter className="px-4">
                <Button className="bg-[#ff7043] text-white font-bold w-1/2 hover:bg-[#ff8a65] hover:scale-105 transform transition-all duration-200 rounded-full shadow-lg hover:shadow-xl">
                  <a href="mailto:jessicacheng.code@gmail.com" className="flex items-center gap-2">
                    Check it out
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </Button>
              </CardFooter>
            </div>
            <div className="w-[70%] p-6">
              <Image src="/fractional.png" alt="Profile photo" width={400} height={400} className="rounded-lg shadow-lg w-full h-full object-cover" priority />
            </div>
          </div>
        </Card>

        <Card className="w-full shadow-none">
          <div className="flex">
            <div className="w-[70%] p-6">
              <Image src="/fractional.png" alt="Profile photo" width={400} height={400} className="rounded-lg shadow-lg w-full h-full object-cover" priority />
            </div>
            <div className="flex-1">
              <CardHeader>
                <CardTitle className="text-2xl">Project One</CardTitle>
                <CardDescription>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </CardDescription>
              </CardHeader>
              <CardContent className="px-4">
                <div className="grid grid-cols-3 gap-3">
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                </div>
              </CardContent>
              <CardFooter className="px-4">
                <Button className="bg-[#ff7043] text-white font-bold w-1/2 hover:bg-[#ff8a65] hover:scale-105 transform transition-all duration-200 rounded-full shadow-lg hover:shadow-xl">
                  <a href="mailto:jessicacheng.code@gmail.com" className="flex items-center gap-2">
                    Check it out
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>

        <Card className="w-full shadow-none">
          <div className="flex">
            <div className="flex-1">
              <CardHeader>
                <CardTitle className="text-2xl">Project One</CardTitle>
                <CardDescription>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </CardDescription>
              </CardHeader>
              <CardContent className="px-4">
                <div className="grid grid-cols-3 gap-3">
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                  <Badge className="flex items-center justify-center border border-gray-300 shadow-none rounded-full">Badge</Badge>
                </div>
              </CardContent>
              <CardFooter className="px-4">
                <Button className="bg-[#ff7043] text-white font-bold w-1/2 hover:bg-[#ff8a65] hover:scale-105 transform transition-all duration-200 rounded-full shadow-lg hover:shadow-xl">
                  <a href="mailto:jessicacheng.code@gmail.com" className="flex items-center gap-2">
                    Check it out
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </Button>
              </CardFooter>
            </div>
            <div className="w-[70%] p-6">
              <Image src="/fractional.png" alt="Profile photo" width={400} height={400} className="rounded-lg shadow-lg w-full h-full object-cover" priority />
            </div>
          </div>
        </Card>
      </div>
      {/* <div className="container mx-auto min-h-[calc(100vh-5rem)] px-6 py-16 lg:px-40" id="craft">
        <div className="grid grid-cols-3 gap-4">
          <CraftCard />
          <CraftCard />
          <CraftCard />
          <CraftCard />
          <CraftCard />
          <CraftCard />
        </div>
      </div> */}
    </>
  )
}
