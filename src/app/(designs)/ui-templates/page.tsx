// export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
export default function Page() {
  // const resolvedParams = await params
  // const currentPage = resolvedParams.slug?.[0] || 'ai'

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <meta httpEquiv="refresh" content="0;url=/ui-templates/projects-page" />
      </main>
    </div>
  )
}
