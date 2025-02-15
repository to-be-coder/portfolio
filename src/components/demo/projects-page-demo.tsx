import { ProjectGrid } from './project-card'

export default function ProjectsPageDemo() {
  return (
    <main className="bg-white relative min-h-screen">
      {/* Column Borders */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 pointer-events-none h-full w-full md:max-w-7xl mx-auto">
        {[...Array(4)].map((_, i) => (
          <div key={`column-${i}`} className="relative h-full">
            {/* Gradient Border */}
            <div
              className="absolute right-0 w-[1px] h-full"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(166, 166, 166, 0.37) 17%, rgba(155, 155, 155, 0.50) 46.5%, #9B9B9B 100%)',
              }}
            />
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

      {/* Content with flex structure */}
      <div className="relative max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row pt-20 lg:pt-30 mb-20 md:mb-0 ">
          {/* Content Section - Full width on md screens */}
          <div className="w-full md:w-1/2 px-8 lg:px-16 bg-white text-center md:text-left">
            <div className="flex flex-col items-center md:items-start justify-center h-full">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">Our Portfolio</h1>
              <p className="text-xl mb-16 max-w-2xl">We deliver a product in a faster pace by solving your problems with thoughtful blueprint and clean/simple structure.</p>

              {/* Stats Section */}
              <div className="flex flex-row sm:space-x-4 justify-around w-full">
                <div className="text-center flex flex-col items-center">
                  <div className="text-2xl sm:text-4xl font-semibold">12+</div>
                  <div className="text-sm sm:text-lg">Years in Business</div>
                </div>

                <div className="text-center flex flex-col items-center">
                  <div className="text-2xl sm:text-4xl font-semibold">25+</div>
                  <div className="text-sm sm:text-lg">Products Launched</div>
                </div>

                <div className="text-center flex flex-col items-center">
                  <div className="text-2xl sm:text-4xl font-semibold">5+</div>
                  <div className="text-sm sm:text-lg">Clients Acquired</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Half - Hidden on mobile */}
          <div className="hidden md:block md:w-1/2"></div>
        </div>

        {/* Portfolio Section */}
        <section className="portfolio-section">
          <div className="grid grid-cols-1 sm:grid-cols-4">
            <div className="hidden sm:block sm:col-span-2" aria-hidden="true" />
            <ProjectGrid />
          </div>
        </section>
      </div>
    </main>
  )
}
