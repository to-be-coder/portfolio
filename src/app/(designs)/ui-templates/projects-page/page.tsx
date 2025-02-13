import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// ... existing code ...

export default function ComponentPage({ params }: { params: { category: string; componentId: string } }) {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1">
        <div className="container mx-auto px-8 py-8">
          <h1 className="text-4xl font-bold mb-8">Component {params.componentId}</h1>

          <Tabs defaultValue="preview ">
            <TabsList className="flex gap-4 mb-8 justify-start border-b border-[#c0c0c0]">
              <TabsTrigger
                value="preview"
                className="border-0 px-4 py-2 font-medium data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=inactive]:text-gray-500 hover:text-gray-900 shadow-none"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="border-0 px-4 py-2 font-medium data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=inactive]:text-gray-500 hover:text-gray-900 shadow-none"
              >
                Code
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="border-0 bg-gray-100 rounded-lg min-h-[400px] p-8 shadow-none">
              {/* Preview content */}
            </TabsContent>
            <TabsContent value="code" className="border-0 bg-gray-100 rounded-lg min-h-[400px] p-8 shadow-none">
              {/* Code content */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
