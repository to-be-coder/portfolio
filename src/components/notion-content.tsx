'use client'

import { type ExtendedRecordMap } from 'notion-types'
import { NotionRenderer, type MapImageUrlFn, type MapPageUrlFn, type NotionComponents, type SearchNotionFn } from 'react-notion-x'
import { Code } from 'react-notion-x/build/third-party/code'

// Taken from react-notion-x/build/renderer.d.ts
export type NotionContentProps = {
  recordMap: ExtendedRecordMap
  components?: Partial<NotionComponents>
  mapPageUrl?: MapPageUrlFn
  mapImageUrl?: MapImageUrlFn
  searchNotion?: SearchNotionFn
  isShowingSearch?: boolean
  onHideSearch?: () => void
  rootPageId?: string
  rootDomain?: string
  fullPage?: boolean
  darkMode?: boolean
  previewImages?: boolean
  forceCustomImages?: boolean
  showCollectionViewDropdown?: boolean
  linkTableTitleProperties?: boolean
  isLinkCollectionToUrlProperty?: boolean
  isImageZoomable?: boolean
  showTableOfContents?: boolean
  minTableOfContentsItems?: number
  defaultPageIcon?: string
  defaultPageCover?: string
  defaultPageCoverPosition?: number
  className?: string
  bodyClassName?: string
  header?: React.ReactNode
  footer?: React.ReactNode
  pageHeader?: React.ReactNode
  pageFooter?: React.ReactNode
  pageTitle?: React.ReactNode
  pageAside?: React.ReactNode
  pageCover?: React.ReactNode
  blockId?: string
  hideBlockId?: boolean
  disableHeader?: boolean
}

export default function NotionContent(props: NotionContentProps) {
  return (
    <NotionRenderer
      components={{
        Code,
      }}
      {...props}
    />
  )
}
