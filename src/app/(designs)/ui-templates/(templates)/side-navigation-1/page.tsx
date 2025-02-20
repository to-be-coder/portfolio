import SideNavigationDemo from '@/components/demo/side-navigation/side-navigation-1'

export default function SideNavigationOneDemoPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold">Projects Page</h2>
      <div className="mt-8 bg-gray-400 p-8 rounded-md">
        <div className="flex h-[700px]">
          <SideNavigationDemo />
          <div className="flex-1 h-full bg-gray-100"></div>
        </div>
      </div>
    </div>
  )
}
