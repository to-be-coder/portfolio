import Link from 'next/link'
import React from 'react'

const GridLayoutDemo: React.FC = () => {
  return (
    <div className="w-full h-full bg-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(9)].map((_, i) => (
          <Link key={i} href="#" className="group block">
            <div className="aspect-4/3 rounded-xl bg-gray-100 overflow-hidden relative transition-all duration-300 hover:shadow-lg">
              <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex h-full items-center justify-center">
                  <span className="text-white font-medium text-lg">View Project</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default GridLayoutDemo
