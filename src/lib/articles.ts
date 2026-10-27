export type ArticleSummary = {
  title: string
  path: string
  subtitle: string
  category: string
  date?: string
  image?: string
}

export type Article = ArticleSummary & {
  paragraphs: readonly string[]
}

// Add reviewed, locally authored articles here when they are ready to publish.
// Plain text paragraphs render through React without accepting raw HTML.
export const articles: readonly Article[] = []

export function getArticleByPath(path: string): Article | undefined {
  return articles.find((article) => article.path === path)
}
