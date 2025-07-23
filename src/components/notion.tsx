import { getArticles } from '@/lib/notion'
import NotionCard from './notion-card'

type Post = {
  title: string
  date?: string
  path: string
  image?: string
  subtitle: string
  category?: string
}

export const NotionPosts = async () => {
  const posts = await getArticles()

  return (
    <>
      {posts
        .filter((post): post is Post => Boolean(post.path && post.title))
        .map((post, index) => (
          <NotionCard key={index} title={post.title} description={post.subtitle} url={post.path} category={post.category || 'Uncategorized'} image={post.image || ''} />
        ))}
    </>
  )
}
