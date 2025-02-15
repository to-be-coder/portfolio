'use client'

import ProjectsPageDemo from '@/components/demo/projects-page-demo'
import ComponentLayout from '../../../../../components/show-component-layout'

const PreviewContent = () => {
  return <ProjectsPageDemo />
}

const CodeContent = () => {
  return (
    <pre className="bg-zinc-950 text-gray-100 p-4 rounded-lg overflow-x-auto">
      <code>{`import { Button } from '@/components/ui/button'

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="font-semibold mb-2 text-lg">Project Alpha</h3>
        <p className="text-gray-600 mb-4">A revolutionary new app</p>
        <Button variant="outline">View Details</Button>
      </div>
      {/* Additional project cards */}
    </div>
  )
}`}</code>
    </pre>
  )
}

export default function ComponentPage() {
  return (
    <ComponentLayout preview={<PreviewContent />} code={<CodeContent />}>
      <h2 className="text-3xl font-bold">Projects Page</h2>
    </ComponentLayout>
  )
}
