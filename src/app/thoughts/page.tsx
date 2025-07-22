import { NotionPosts } from '@/components/notion'
import CtaSection from '@/components/ui/cta'

// Filter tabs for article categories
// const filterTabs = [
//   { id: 'all', label: 'All' },
//     { id: 'ai', label: 'AI' },
//     { id: 'design', label: 'Design' },
//     { id: 'startups', label: 'Startups' },
//     { id: 'others', label: 'Others' },
// ]

// Sample article data
const articles = [
  {
    id: 1,
    title: 'The 10 minute LangChain crash course',
    category: 'ai',
    image: '/mozilla-cover.png',
    url: '/articles/langchain-crash-course',
  },
]

export default function ThoughtsPage() {
  //   const [activeFilter, setActiveFilter] = useState('all')

  // Filter articles based on selected category
  //   const filteredArticles = activeFilter === 'all' ? articles : articles.filter((article) => article.category === activeFilter)

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12 h-[30vh] items-center flex flex-col justify-center">
          <p className="text-gray-600 text-lg mb-2">On the Art of Product</p>
          <h1 className="text-5xl md:text-6xl font-bold text-black">Thoughts</h1>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-0 mb-8 border-b border-gray-100"></div>
        {/* Filter tabs */}
        {/* <div className="flex overflow-x-auto space-x-4 pb-0 mb-8 border-b border-gray-100">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`py-2 px-4 text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === tab.id ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-800'}`}
            >
              {tab.label}
            </button>
          ))}
        </div> */}

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NotionPosts />
        </div>
      </div>
      <CtaSection />
    </>
  )
}
