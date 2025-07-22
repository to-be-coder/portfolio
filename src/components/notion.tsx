import { getArticles } from '@/lib/notion'
import NotionCard from './notion-card'

type Post = {
  title: string
  date?: string
  path: string
  image?: string
  subtitle: string
}

export const NotionPosts = async () => {
  const posts = await getArticles()

  return (
    <>
      {posts.map((post: Post, index: number) => (
        <NotionCard key={index} title={post.title} description={post.subtitle} url={post.path} category={'AI'} image={''} />
      ))}
    </>
  )
}
