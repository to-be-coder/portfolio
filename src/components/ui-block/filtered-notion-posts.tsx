'use client'

import { ChipTabs } from '@/components/ui/tabs'
import type { ProcessedPageData } from '@/lib/notion'
import { useMemo, useState } from 'react'
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

type Project = {
  title: string
  path: string
  subtitle: string
  category: string
}

type DisplayItem = {
  title: string
  path: string
  subtitle: string
  category: string
  isProject: boolean
}

const projects: readonly Project[] = [
  {
    title: 'Vercel',
    path: 'vercel',
    subtitle: 'Improving Visual Affordances in Chat Interfaces',
    category: 'UX Design',
  },
] as const

export default function FilteredNotionPosts({ posts, tabs }: FilteredNotionPostsProps) {
  const [selectedTab, setSelectedTab] = useState(() => tabs?.[0] || 'All')

  const filteredPosts = useMemo(() => {
    if (selectedTab === 'Works') {
      return []
    }
    return posts.filter((post): post is Post => {
      if (!post.path || !post.title) return false

      if (selectedTab === 'All') {
        return true
      }

      return post.category === selectedTab
    })
  }, [posts, selectedTab])

  const displayItems = useMemo((): DisplayItem[] => {
    const postItems: DisplayItem[] = filteredPosts.map((post) => ({
      title: post.title,
      path: post.path,
      subtitle: post.subtitle,
      category: post.category || 'Uncategorized',
      isProject: false,
    }))

    const projectItems: DisplayItem[] = projects.map((project) => ({
      ...project,
      isProject: true,
    }))

    if (selectedTab === 'Works') {
      return projectItems
    }

    if (selectedTab === 'All') {
      return [...projectItems, ...postItems]
    }

    return postItems
  }, [selectedTab, filteredPosts])

  return (
    <>
      <div className="mb-8">
        <ChipTabs tabs={tabs} selected={selectedTab} onSelectionChange={setSelectedTab} className="bg-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayItems.length === 0 ? (
          <div className="col-span-full py-8 text-center text-gray-500">Currently Working on it.</div>
        ) : (
          displayItems.map((item, index) => (
            <NotionCard key={item.path} title={item.title} url={item.path} category={item.category} subtitle={item.subtitle} index={index} href={item.isProject ? `/${item.path}` : undefined} />
          ))
        )}
      </div>
    </>
  )
}
