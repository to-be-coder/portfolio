'use client'

import ProjectsPageDemo from '@/components/demo/projects-page-demo'

// const PreviewContent = () => {
//   return <ProjectsPageDemo />
// }

// const CodeContent = () => {
//   const [activeFile, setActiveFile] = useState('demo')

//   return (
//     <div className="space-y-4">
//       <div className="flex gap-2">
//         <button onClick={() => setActiveFile('demo')} className={`px-4 py-2 rounded-lg ${activeFile === 'demo' ? 'bg-zinc-800 text-white' : 'text-black hover:bg-gray-200'}`}>
//           projects-page-demo.tsx
//         </button>
//         <button onClick={() => setActiveFile('card')} className={`px-4 py-2 rounded-lg ${activeFile === 'card' ? 'bg-zinc-800 text-white' : 'text-black hover:bg-gray-200'}`}>
//           project-card.tsx
//         </button>
//       </div>
//       <CodeBlock code={activeFile === 'demo' ? demoCode : cardCode} maxHeight="600px" language="typescript" />{' '}
//     </div>
//   )
// }

// const demoCode = `import { ProjectGrid } from './project-card'

// export default function ProjectsPageDemo() {
//   return (
//     <main className="bg-white relative min-h-screen">
//       {/* Column Borders */}
//       <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 pointer-events-none h-full w-full md:max-w-7xl mx-auto">
//         {[...Array(4)].map((_, i) => (
//           <div key={\`column-\${i}\`} className="relative h-full">
//             {/* Gradient Border */}
//             <div
//               className="absolute right-0 w-[1px] h-full"
//               style={{
//                 background: \`linear-gradient(
//                   180deg,
//                   rgba(255, 255, 255, 0.10) 0%,
//                   rgba(166, 166, 166, 0.37) 17%,
//                   rgba(155, 155, 155, 0.50) 46.5%,
//                   #9B9B9B 100%
//                 )\`,
//               }}
//             />
//             {i === 0 && (
//               <div
//                 className="absolute left-0 w-[1px] h-full"
//                 style={{
//                   background: \`linear-gradient(
//                   180deg,
//                   rgba(255, 255, 255, 0.10) 0%,
//                   rgba(166, 166, 166, 0.37) 17%,
//                   rgba(155, 155, 155, 0.50) 46.5%,
//                   #9B9B9B 100%
//                 )\`,
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Content with flex structure */}
//       <div className="relative max-w-7xl mx-auto">
//         {/* Hero Section */}
//         <div className="flex flex-col md:flex-row pt-20 lg:pt-30 mb-20 sm:-mb-20 ">
//           {/* Content Section - Full width on md screens */}
//           <div className="w-full md:w-1/2 px-8 lg:px-16 bg-white text-center md:text-left">
//             <div className="flex flex-col items-center md:items-start justify-center h-full">
//               <h1 className="text-5xl lg:text-6xl font-bold mb-6">Our Portfolio</h1>
//               <p className="text-xl mb-16 max-w-2xl">We deliver a product in a faster pace by solving your problems with thoughtful blueprint and clean/simple structure.</p>

//               {/* Stats Section */}
//               <div className="flex flex-row sm:space-x-4 justify-around w-full">
//                 <div className="text-center flex flex-col items-center">
//                   <div className="text-2xl sm:text-4xl font-semibold">12+</div>
//                   <div className="text-sm sm:text-lg">Years in Business</div>
//                 </div>

//                 <div className="text-center flex flex-col items-center">
//                   <div className="text-2xl sm:text-4xl font-semibold">25+</div>
//                   <div className="text-sm sm:text-lg">Products Launched</div>
//                 </div>

//                 <div className="text-center flex flex-col items-center">
//                   <div className="text-2xl sm:text-4xl font-semibold">5+</div>
//                   <div className="text-sm sm:text-lg">Clients Acquired</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Half - Hidden on mobile */}
//           <div className="hidden md:block md:w-1/2"></div>
//         </div>

//         {/* Portfolio Section */}
//         <section className="portfolio-section">
//           <div className="grid grid-cols-1 sm:grid-cols-4">
//             <div className="hidden sm:block sm:col-span-2" aria-hidden="true" />
//             <ProjectGrid />
//           </div>
//         </section>
//       </div>
//     </main>
//   )
// }`

// const cardCode = `import { ArrowRight } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// export interface PortfolioItemType {
//   id: number
//   name: string
//   href: string
//   bgColor: string
//   image: string
//   tags: string[]
//   imageSize?: {
//     width: number
//     height: number
//   }
// }

// export const portfolioItems: PortfolioItemType[] = [
//   {
//     id: 1,
//     name: 'Thoughtful',
//     href: '/ui-templates/projects-page',
//     bgColor: '#FF66D4',
//     image: '/demo-logo-thoughtful.svg',
//     tags: ['Co-Founder'],
//   },
//   {
//     id: 2,
//     name: 'Fractional',
//     href: '/ui-templates/projects-page',
//     bgColor: '#FFAD56',
//     image: '/demo-logo-fractional.svg',
//     tags: ['Founder'],
//   },

//   {
//     id: 3,
//     name: 'Spiritune',
//     href: '/ui-templates/projects-page',
//     bgColor: '#36CDFF',
//     image: '/demo-logo-spiritune.svg',
//     tags: ['Frontend Engineer'],
//   },

//   {
//     id: 4,
//     name: 'Company',
//     href: '/ui-templates/projects-page',
//     bgColor: '#3E98FE',
//     image: '/demo-logo-3.svg',
//     tags: ['AI'],
//   },
//   {
//     id: 5,
//     name: 'Company',
//     href: '/ui-templates/projects-page',
//     bgColor: '#FFFC3B',
//     image: '/demo-logo-2.svg',
//     tags: ['Project Leader'],
//   },

//   {
//     id: 6,
//     name: 'Company',
//     href: '/ui-templates/projects-page',
//     bgColor: '#C44FFF',
//     image: '/demo-logo-1.svg',
//     tags: ['Design'],
//   },
// ]

// interface ProjectCardProps {
//   item: PortfolioItemType
//   showDetails?: boolean
// }

// const ProjectCard = ({ item, showDetails = false }: ProjectCardProps) => {
//   const { id, name, bgColor, image, tags, href } = item

//   if (showDetails) {
//     return (
//       <Link href={href} className="block">
//         <div className="p-4 relative aspect-square group" style={{ backgroundColor: bgColor }}>
//           <div className="flex flex-col h-full">
//             <div className="flex-1 flex items-center justify-center">
//               <Image src={image} alt={name} width={120} height={120} className="object-contain transition-transform duration-300 group-hover:scale-120" />
//             </div>
//             <div className="flex justify-end items-center">
//               <div className="flex gap-1">
//                 {tags.map((tag, index) => (
//                   <span key={index} className="inline-block bg-white/70 text-black border border-gray-500 rounded-full px-2 py-1 text-xs">
//                     {tag}
//                   </span>
//                 ))}
//                 <ArrowRight className="w-6 h-6 text-gray-500 transition-all duration-300 group-hover:text-gray-500 group-hover:translate-x-2" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </Link>
//     )
//   }

//   return (
//     <Link href={href} className="block">
//       <div className="p-2 relative  aspect-none sm:aspect-square">
//         <div className="flex justify-between items-end h-full">
//           <h3 className="text-2xl font-medium">{name}</h3>
//           <span className="text-3xl md:text-4xl font-medium">{String(id).padStart(2, '0')}</span>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export const ProjectGrid = () => {
//   const sortedItems = portfolioItems.sort((a, b) => a.id - b.id)

//   return (
//     <div className="col-span-4 md:col-span-2 w-full">
//       <div className="grid grid-cols-1 sm:grid-cols-2">
//         {/* Mobile view */}
//         <div className="sm:hidden">
//           {sortedItems.map((item) => (
//             <React.Fragment key={item.id}>
//               <ProjectCard item={item} />
//               <ProjectCard item={item} showDetails />
//             </React.Fragment>
//           ))}
//         </div>

//         {/* Desktop view */}
//         <div className="hidden sm:block">
//           {sortedItems
//             .filter((_, index) => index % 2 === 0)
//             .map((item) => (
//               <React.Fragment key={item.id}>
//                 <ProjectCard item={item} />
//                 <ProjectCard item={item} showDetails />
//               </React.Fragment>
//             ))}
//         </div>
//         <div className="hidden sm:block">
//           <div className="p-6 relative aspect-square" aria-hidden="true" /> {/* Empty first cell */}
//           {sortedItems
//             .filter((_, index) => index % 2 === 1)
//             .map((item) => (
//               <React.Fragment key={item.id}>
//                 <ProjectCard item={item} />
//                 <ProjectCard item={item} showDetails />
//               </React.Fragment>
//             ))}
//         </div>
//       </div>
//     </div>
//   )
// }`

export default function ComponentPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold">Projects Page</h2>
      <div className="mt-8 bg-gray-400 p-8 rounded-md">
        <ProjectsPageDemo />
      </div>
    </div>
  )
}
