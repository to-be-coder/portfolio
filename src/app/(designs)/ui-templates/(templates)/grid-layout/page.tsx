import GridLayoutDemo from '@/components/demo/grid-layout/grid-layout-demo'

export default function GridLayoutDemoPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold">Grid Layout Demo</h2>
      <div className="mt-8 bg-gray-400 p-8 rounded-md">
        <div className="flex h-[700px]">
          <GridLayoutDemo />
          <div className="flex-1 h-full bg-gray-100"></div>
        </div>
      </div>
    </div>
  )
}
