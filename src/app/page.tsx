import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Hero from '@/components/ui/hero'
import { Badge } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto my-8 space-y-8">
        <Card className="w-full">
          <div className=" p-6">
            <CardTitle className="p-6 text-2xl">Project One</CardTitle>
            <div className="flex">
              <div className="flex-1">
                <CardHeader>
                  <CardTitle>Create project</CardTitle>
                  <CardDescription>Deploy your new project in one-click.</CardDescription>
                  <Button className="hover:bg-gray-600 w-1/2">
                    <a href="mailto:jessicacheng.code@gmail.com">Check it out</a>
                  </Button>
                </CardHeader>
                <CardContent className="p-4">
                  <Badge>Badge</Badge>
                  <Badge>Badge</Badge>
                  <Badge>Badge</Badge>
                </CardContent>
                <CardFooter className="flex justify-between"></CardFooter>
              </div>
              <div className="w-[70%] p-6">
                <Image src="/fractional.png" alt="Profile photo" width={400} height={400} className="rounded-lg shadow-lg w-full h-full object-cover" priority />
              </div>
            </div>
          </div>
        </Card>

        <Card className="w-full">
          <div className=" p-6">
            <CardTitle className="p-6 text-2xl">Project One</CardTitle>
            <div className="flex">
              <div className="w-[70%] p-6">
                <Image src="/fractional.png" alt="Profile photo" width={400} height={400} className="rounded-lg shadow-lg w-full h-full object-cover" priority />
              </div>
              <div className="flex-1">
                <CardHeader>
                  <CardTitle>Create project</CardTitle>
                  <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent className="p-4"></CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Check it out</Button>
                </CardFooter>
              </div>
            </div>
          </div>
        </Card>

        <Card className="w-full">
          <div className=" p-6">
            <CardTitle className="p-6 text-2xl">Project One</CardTitle>
            <div className="flex">
              <div className="flex-1">
                <CardHeader>
                  <CardTitle>Create project</CardTitle>
                  <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent className="p-4"></CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Check it out</Button>
                </CardFooter>
              </div>
              <div className="w-[70%] p-6">
                <Image src="/fractional.png" alt="Profile photo" width={400} height={400} className="rounded-lg shadow-lg w-full h-full object-cover" priority />
              </div>
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
