import Link from 'next/link'

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params
  const currentPage = resolvedParams.slug?.[0] || 'ai'

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <Link key={i} href={`/designs/${currentPage}/${i + 1}`} className="group block">
              <div className="aspect-4/3 rounded-xl bg-gray-100 overflow-hidden relative transition-all duration-300 hover:shadow-lg">
                <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex h-full items-center justify-center">
                    <span className="text-white font-medium text-lg">View Code</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
