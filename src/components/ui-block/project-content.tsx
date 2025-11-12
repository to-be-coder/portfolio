interface ProjectContentProps {
  children: React.ReactNode
  className?: string
}

export default function ProjectContent({ children, className }: ProjectContentProps) {
  return <div className={`flex flex-col gap-y-8 ${className}`}>{children}</div>
}
