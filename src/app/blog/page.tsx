import { NotionPosts } from '@/components/notion'
import CtaSection from '@/components/ui/cta'

export default function BlogPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12 h-[30vh] items-center flex flex-col justify-center">
          <p className="text-gray-600 text-lg mb-2">On the Art of Product</p>
          <h1 className="text-5xl md:text-6xl font-bold text-black">Thoughts</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NotionPosts />
        </div>
      </div>
      <CtaSection />
    </>
  )
}
