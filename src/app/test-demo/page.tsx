import SideNavigationDemo from '@/components/demo/side-navigation/side-navigation-1'

export default function TestDemoPage() {
  return (
    <div className="h-screen flex border-2 border-red-500">
      <SideNavigationDemo />
      <div className="flex-1 h-full bg-blue-100">
        <h1>Test Demo</h1>
      </div>
    </div>
  )
}
