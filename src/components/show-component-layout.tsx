'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ComponentLayout({ children, preview, code }: { children: React.ReactNode; preview?: React.ReactNode; code?: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1">
        <div className="container mx-auto  pb-8">
          {children}

          <Tabs defaultValue="preview">
            <TabsList className="flex gap-4 justify-start border-b border-[#c0c0c0] mb-8 mt-2">
              <TabsTrigger
                value="preview"
                className="text-xl border-0 px-4 pb-0 pt-2 font-medium data-[state=active]:border-b-2 data-[state=active]:border-[#FFA813] data-[state=active]:text-[#FFA813] data-[state=inactive]:text-gray-500 hover:text-gray-900 shadow-none cursor-pointer"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="text-xl border-0 px-4 pb-0 pt-2 font-medium data-[state=active]:border-b-2 data-[state=active]:border-[#FFA813] data-[state=active]:text-[#FFA813] data-[state=inactive]:text-gray-500 hover:text-gray-900 shadow-none cursor-pointer"
              >
                Code
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="border-0 bg-gray-100 rounded-lg min-h-[400px] p-8 shadow-none">
              {preview}
            </TabsContent>
            <TabsContent value="code" className="border-0 bg-gray-100 rounded-lg min-h-[400px] p-8 shadow-none">
              {code}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
