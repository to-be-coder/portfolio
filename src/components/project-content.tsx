interface ProjectContentProps {
  children: React.ReactNode
}

export default function ProjectContent({ children }: ProjectContentProps) {
  return <div className="flex flex-col gap-y-8">{children}</div>
}
