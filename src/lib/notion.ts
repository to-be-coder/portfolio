import { Client } from '@notionhq/client'
import { DatabaseObjectResponse, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import { NotionAPI } from 'notion-client'

// Type for Notion page properties
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

export const notionX = new NotionAPI()

export const notionOfficialClient = new Client({
  auth: process.env.NOTION_API_KEY,
})

export const CodePlugin = dynamic(() => import('react-notion-x/build/third-party/code').then((m) => m.Code))

export const getPageData = async (pages: QueryDatabaseResponse) => {
  const data = pages.results.map((result) => {
    const page = result as NotionPage
    const date = page.properties.Date.date ? dayjs(page.properties.Date.date.start).format('LL') : undefined
    const image = page.properties.Image.files[0]?.file.url
    const path = page.properties.Path.rich_text[0]?.plain_text //.split('/').filter((part: string) => part)[0]
    const title = page.properties.Name.title[0]?.plain_text
    const subtitle = page.properties.Subtitle.rich_text[0]?.plain_text
    const description = page.properties.Description.rich_text[0]?.plain_text
    const category = page.properties.Category.select?.name
    return {
      date,
      title,
      path,
      image,
      subtitle,
      description,
      category,
    }
  })
  return data
}

export const getPortfolioPages = async () => {
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

  return getPageData(data)
}

export const getArticles = async () => {
  const data = await notionOfficialClient.databases.query({
    database_id: process.env.NOTION_PAGES_DATABASE_ID!,
    // sorts: [
    //   {
    //     property: 'Date',
    //     direction: 'descending',
    //   },
    // ],
    // filter: {
    //   property: 'Type',
    //   multi_select: {
    //     contains: 'Article',
    //   },
    // },
  })
  return getPageData(data)
}

// Get a specific page by its path
export const getPageByPath = async (path: string) => {
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
    pageData: {
      date: page.properties.Date.date ? dayjs(page.properties.Date.date.start).format('LL') : undefined,
      image: page.properties.Image.files[0]?.file.url,
      path: page.properties.Path.rich_text[0]?.plain_text,
      title: page.properties.Name.title[0]?.plain_text,
      subtitle: page.properties.Subtitle.rich_text[0]?.plain_text,
      description: page.properties.Description.rich_text[0]?.plain_text,
      category: page.properties.Category.select?.name,
    },
  }
}

// Get all available paths for static generation
export const getAllPaths = async () => {
  const data = await notionOfficialClient.databases.query({
    database_id: process.env.NOTION_PAGES_DATABASE_ID!,
  })

  return data.results.map((result) => (result as NotionPage).properties.Path.rich_text[0]?.plain_text).filter(Boolean)
}
