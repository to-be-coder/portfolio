import React from 'react'

interface ProjectCardProps {
  title: React.ReactNode
  children: React.ReactNode
  titleColor?: string
  borderColor?: string
}

export default function ProjectCard({ title, children, titleColor = 'text-black', borderColor = 'border-[#000000]' }: ProjectCardProps) {
  return (
    <div className={`${borderColor} space-y-4 mb-4 bg-gray-100 p-4 rounded-xl`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <h3 className={`text-lg ${titleColor}`}>{title}</h3>
        </div>
        <div className="md:col-span-2 space-y-2">{children}</div>
      </div>
    </div>
  )
}
