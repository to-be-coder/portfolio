import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

export default function CraftCard() {
  return (
    <Card className="aspect-square max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
