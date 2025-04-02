import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'

export default function DemoPage() {
  return (
    <div className="min-h-svh p-8 container mx-auto">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6 ">
          <h1 className="text-5xl font-normal">Join a 20 Minute Demo</h1>
          <div>
            <p className="text-xl text-muted-foreground mb-6">Here&apos;s what you&apos;ll learn in this custom demo:</p>
            <ul className="space-y-4">
              <li className="flex gap-2 text-muted-foreground">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span>Easily configure your network and add users and resources</span>
              </li>
              <li className="flex gap-2 text-muted-foreground">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span>Get the visibility you need to keep your network secure</span>
              </li>
              <li className="flex gap-2 text-muted-foreground">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span>Add zero-trust to your security approach with least privileged access policies</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center">
          <Card className="p-6 w-full">
            <form className="space-y-6">
              <div>
                <Label htmlFor="firstName">Name</Label>
                <Input id="firstName" required />
              </div>
              <div>
                <Label htmlFor="workEmail">Email</Label>
                <Input id="workEmail" type="email" required />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here." />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
