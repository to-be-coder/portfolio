import CtaSection from '@/components/ui-block/cta'
import NotionCard from '@/components/ui-block/notion-card'

type LabsProject = {
  title: string
  href: string
  subtitle: string
  category: string
  ctaLabel?: string
  repo?: string
}

const projects: LabsProject[] = [
  {
    title: 'Gridland',
    href: 'https://www.gridland.io/',
    subtitle: 'Build terminal apps that run in the browser and the terminal with React.',
    category: 'GitHub',
    ctaLabel: 'View project',
    repo: 'thoughtfulllc/gridland',
  },
  {
    title: 'Careerbot',
    href: 'https://github.com/thoughtfulllc/careerbot',
    subtitle: 'The least opinionated way to job hunt with AI.',
    category: 'GitHub',
    ctaLabel: 'View project',
    repo: 'thoughtfulllc/careerbot',
  },
]

async function fetchStars(repo: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const data = (await res.json()) as { stargazers_count?: number }
    return typeof data.stargazers_count === 'number' ? data.stargazers_count : null
  } catch {
    return null
  }
}

export default async function LabsPage() {
  const stars = await Promise.all(projects.map((p) => (p.repo ? fetchStars(p.repo) : Promise.resolve(null))))

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-16 h-[30vh] items-center flex flex-col justify-center">
          <p className="text-gray-600 text-lg mb-2">Open source projects</p>
          <h1 className="text-5xl md:text-6xl font-bold text-black">Labs</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <NotionCard
              key={project.href + index}
              title={project.title}
              url={project.href}
              href={project.href}
              category={project.category}
              subtitle={project.subtitle}
              index={index}
              external
              ctaLabel={project.ctaLabel}
              stars={stars[index]}
            />
          ))}
        </div>
      </div>
      <CtaSection />
    </>
  )
}
