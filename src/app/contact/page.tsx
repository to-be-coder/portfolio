import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'

export default function DemoPage() {
  return (
    <div className="min-h-svh p-8 container mx-auto">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-5xl font-normal">Let&apos;s get to know each other.</h1>
          <div>
            <p className="text-xl text-muted-foreground mb-6">I&apos;m a UX/UI & Frontend engineer based</p>
            <a href="mailto:jessica@thoughtful.llc">jessica@thoughtful.llc</a>
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
