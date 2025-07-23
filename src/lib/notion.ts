import { Client } from '@notionhq/client'
import { DatabaseObjectResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import { NotionAPI } from 'notion-client'
import { type ExtendedRecordMap } from 'notion-types'

// Type definitions
type NotionPageProperties = {
  Date: { date: { start: string } | null }
  Image: { files: Array<{ file: { url: string } }> }
  Path: { rich_text: Array<{ plain_text: string }> }
  Name: { title: Array<{ plain_text: string }> }
  Subtitle: { rich_text: Array<{ plain_text: string }> }
  Description: { rich_text: Array<{ plain_text: string }> }
  Category: { select: { name: string } | null }
}

type NotionPage = DatabaseObjectResponse & {
  properties: NotionPageProperties
}

export type ProcessedPageData = {
  date?: string
  title?: string
  path?: string
  image?: string
  subtitle?: string
  description?: string
  category?: string
}

export type PageWithContent = {
  recordMap: ExtendedRecordMap
  pageData: ProcessedPageData
}

// Initialize clients
export const notionX = new NotionAPI()

export const notionOfficialClient = new Client({
  auth: process.env.NOTION_API_KEY,
})

// Dynamic imports
export const CodePlugin = dynamic(() => import('react-notion-x/build/third-party/code').then((m) => m.Code))

// Helper function to process page data
const processPageData = (page: NotionPage): ProcessedPageData => {
  return {
    date: page.properties.Date.date ? dayjs(page.properties.Date.date.start).format('LL') : undefined,
    image: page.properties.Image.files[0]?.file.url,
    path: page.properties.Path.rich_text[0]?.plain_text,
    title: page.properties.Name.title[0]?.plain_text,
    subtitle: page.properties.Subtitle.rich_text[0]?.plain_text,
    description: page.properties.Description.rich_text[0]?.plain_text,
    category: page.properties.Category.select?.name,
  }
}

// Helper function to get processed data from query response
const getProcessedData = (pages: QueryDatabaseResponse): ProcessedPageData[] => {
  return pages.results.map((result) => {
    const page = result as NotionPage
    return processPageData(page)
  })
}

// Database queries
export const getPortfolioPages = async (): Promise<ProcessedPageData[]> => {
  try {
    const data = await notionOfficialClient.databases.query({
      database_id: process.env.NOTION_PAGES_DATABASE_ID!,
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
      filter: {
        property: 'Type',
        multi_select: {
          contains: 'Portfolio',
        },
      },
    })

    return getProcessedData(data)
  } catch (error) {
    console.error('Error fetching portfolio pages:', error)
    return []
  }
}

export const getArticles = async (): Promise<ProcessedPageData[]> => {
  try {
    const data = await notionOfficialClient.databases.query({
      database_id: process.env.NOTION_PAGES_DATABASE_ID!,
    })
    return getProcessedData(data)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

// Get a specific page by its path
export const getPageByPath = async (path: string): Promise<PageWithContent | null> => {
  try {
    const data = await notionOfficialClient.databases.query({
      database_id: process.env.NOTION_PAGES_DATABASE_ID!,
      filter: {
        property: 'Path',
        rich_text: {
          equals: path,
        },
      },
    })

    if (data.results.length === 0) {
      return null
    }

    const page = data.results[0] as NotionPage
    const pageId = page.id

    // Get the page content using notion-client
    const recordMap = await notionX.getPage(pageId)

    return {
      recordMap,
      pageData: processPageData(page),
    }
  } catch (error) {
    console.error(`Error fetching page with path "${path}":`, error)
    return null
  }
}

// Get all available paths for static generation
export const getAllPaths = async (): Promise<string[]> => {
  try {
    const data = await notionOfficialClient.databases.query({
      database_id: process.env.NOTION_PAGES_DATABASE_ID!,
    })

    return data.results.map((result) => (result as NotionPage).properties.Path.rich_text[0]?.plain_text).filter(Boolean) as string[]
  } catch (error) {
    console.error('Error fetching all paths:', error)
    return []
  }
}
