import Image from 'next/image'
import Link from 'next/link'

// export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
export default function Page() {
  // const resolvedParams = await params
  // const currentPage = resolvedParams.slug?.[0] || 'ai'

  return (
    <div className="min-h-screen bg-white w-full">
      <main className="container mx-auto ">
        <h1 className="text-2xl font-bold">UI Templates</h1>
        <p className="text-gray-500">Here are some of the UI templates I have created. Click on the card to view the demo.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <Link href="/ui-templates/projects-page" className="group block border border-gray-200 rounded-xl overflow-hidden ">
            <div className="aspect-4/3 rounded-xl overflow-hidden relative transition-all duration-300 hover:shadow-lg">
              <Image src="/project-page-demo-photo.png" alt="Projects Page Demo" layout="fill" objectFit="cover" className="absolute inset-0" />
              <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex h-full items-center justify-center">
                  <span className="text-white font-medium text-lg">Projects Page</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/ui-templates/login-flow" className="group block border border-gray-200 rounded-xl overflow-hidden">
            <div className="aspect-4/3 rounded-xl overflow-hidden relative transition-all duration-300 hover:shadow-lg">
              <Image src="/login-demo-photo.png" alt="Login Flow Demo" layout="fill" objectFit="cover" className="absolute inset-0" />
              <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex h-full items-center justify-center">
                  <span className="text-white font-medium text-lg">Login Flow</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/ui-templates/side-navigation-1" className="group block border border-gray-200 rounded-xl overflow-hidden">
            <div className="aspect-4/3 rounded-xl overflow-hidden relative transition-all duration-300 hover:shadow-lg">
              <Image src="/side-nav-demo-photo.png" alt="Side Navigation Demo" layout="fill" objectFit="cover" className="absolute inset-0" />
              <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex h-full items-center justify-center">
                  <span className="text-white font-medium text-lg">Side Navigation</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/ui-templates/grid-layout" className="group block border border-gray-200 rounded-xl overflow-hidden">
            <div className="aspect-4/3 rounded-xl overflow-hidden relative transition-all duration-300 hover:shadow-lg">
              <Image src="/grid-layout-demo-photo.png" alt="Grid Layout Demo" layout="fill" objectFit="cover" className="absolute inset-0" />
              <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex h-full items-center justify-center">
                  <span className="text-white font-medium text-lg">Grid Layout</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
