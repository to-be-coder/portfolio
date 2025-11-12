'use client'

import { ChipTabs } from '@/components/ui/tabs'
import type { ProcessedPageData } from '@/lib/notion'
import { useState } from 'react'
import NotionCard from './notion-card'

type FilteredNotionPostsProps = {
  posts: ProcessedPageData[]
  tabs: string[]
}

type Post = {
  title: string
  date?: string
  path: string
  subtitle: string
  category?: string
}

export default function FilteredNotionPosts({ posts, tabs }: FilteredNotionPostsProps) {
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  const filteredPosts = posts.filter((post): post is Post => {
    if (!post.path || !post.title) return false

    if (selectedTab === 'All') {
      return true
    }

    return post.category === selectedTab
  })

  return (
    <>
      <div className="mb-8">
        <ChipTabs tabs={tabs} selected={selectedTab} onSelectionChange={setSelectedTab} className="bg-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">No articles found in this category.</div>
        ) : (
          filteredPosts.map((post, index) => <NotionCard key={post.path} title={post.title} url={post.path} category={post.category || 'Uncategorized'} subtitle={post.subtitle} index={index} />)
        )}
      </div>
    </>
  )
}
