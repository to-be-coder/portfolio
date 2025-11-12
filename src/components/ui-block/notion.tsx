import { getArticles } from '@/lib/notion'
import NotionCard from './notion-card'

type Post = {
  title: string
  date?: string
  path: string
  subtitle: string
  category?: string
}

export const NotionPosts = async () => {
  try {
    const posts = await getArticles()

    if (posts.length === 0) {
      console.warn('No posts found from Notion API')
      return <div className="text-center text-gray-500">No articles found.</div>
    }

    return (
      <>
        {posts
          .filter((post): post is Post => Boolean(post.path && post.title))
          .map((post, index) => (
            <NotionCard
              key={index}
              title={post.title}
              url={post.path}
              category={post.category || 'Uncategorized'}
              subtitle={post.subtitle}
              index={index}
            />
          ))}
      </>
    )
  } catch (error) {
    console.error('Error loading Notion posts:', error)
    return <div className="text-center text-red-500">Error loading articles. Please try again later.</div>
  }
}
