import CtaSection from '@/components/ui-block/cta'
import FilteredPosts from '@/components/ui-block/filtered-posts'
import { articles } from '@/lib/articles'

export default function BlogPage() {
  const tabs = ['All', 'AI', 'Design System', 'Works']

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-16 h-[30vh] items-center flex flex-col justify-center">
          <p className="text-gray-600 text-lg mb-2">On the Art of Product</p>
          <h1 className="text-5xl md:text-6xl font-bold text-black">Thoughts</h1>
        </div>

        <FilteredPosts posts={articles} tabs={tabs} />
      </div>
      <CtaSection />
    </>
  )
}
