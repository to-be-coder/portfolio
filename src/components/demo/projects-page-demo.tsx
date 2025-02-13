import { PortfolioGrid } from './project-card'

export default function ProjectsPageDemo() {
  return (
    <main className="bg-white relative min-h-screen">
      {/* Column Borders - Absolute positioned to cover full page */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 pointer-events-none h-full w-full md:max-w-7xl mx-auto ">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="relative h-full">
            {/* Gradient Border - positioned at the right of each column */}
            <div
              className="absolute right-0 w-[1px] h-full"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(166, 166, 166, 0.37) 17%, rgba(155, 155, 155, 0.50) 46.5%, #9B9B9B 100%)',
              }}
            />
            {/* Left border for the first column */}
            {i === 0 && (
              <div
                className="absolute left-0 w-[1px] h-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(166, 166, 166, 0.37) 17%, rgba(155, 155, 155, 0.50) 46.5%, #9B9B9B 100%)',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Content with same grid structure */}
      <div className="relative max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col sm:flex-row min-h-[calc(100vh-64px)] items-center justify-center">
          {/* Content Column */}
          <div className="w-full px-8 lg:px-16 bg-white text-center">
            <div className="flex flex-col items-center">
              <h1 className="text-6xl font-bold mb-6">Our Portfolio</h1>
              <p className="text-xl mb-16 max-w-2xl ">We deliver a product in a faster pace by solving your problems with thoughtful blueprint and clean/simple structure.</p>
            </div>
            {/* Stats Section */}
            <div className="flex flex-row sm:space-x-4 justify-around">
              <div className="text-center  flex flex-col items-center">
                <div className="text-2xl sm:text-4xl font-semibold">12+</div>
                <div className="text-sm sm:text-lg">Years in Business</div>
              </div>

              <div className="text-center flex flex-col items-center">
                <div className="text-2xl sm:text-4xl font-semibold">25+</div>
                <div className="text-sm sm:text-lg">Products Launched</div>
              </div>

              <div className="text-center  flex flex-col items-center">
                <div className="text-2xl sm:text-4xl font-semibold">5+</div>
                <div className="text-sm sm:text-lg">Clients Acquired</div>
              </div>
            </div>
          </div>

          {/* Empty Right Half */}
        </div>

        {/* Portfolio Section */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-4">
            <div className="hidden sm:block sm:col-span-2">{/* Space for potential content */}</div>
            <PortfolioGrid />
          </div>
        </section>
      </div>
    </main>
  )
}
