'use client'

import { Bell, ChartPie, House, Settings } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const navItems = [
  {
    title: 'Home',
    icon: <House />,
    id: 'home',
  },
  {
    title: 'Analytics',
    id: 'analytics',
    icon: <ChartPie />,
  },
  {
    title: 'Settings',
    id: 'settings',
    icon: <Settings />,
  },
  {
    title: 'Notifications',
    id: 'notifications',
    icon: <Bell />,
  },
]

export default function SideNavigationDemo() {
  const [currentPage, setCurrentPage] = useState('hone')

  return (
    <nav className="w-64 h-full p-4 overflow-hidden flex flex-col justify-between bg-white">
      <div className="flex justify-start items-center px-2 mb-8">
        <Image src="/thoughtful-logo.svg" alt="Logo" width={150} height={150} />
      </div>
      <div className="flex flex-col h-full justify-between overflow-y-auto">
        <ul>
          {navItems.map((item) => (
            <li key={item.title}>
              <div
                className={`w-full flex items-center gap-2 text-left text-lg px-2 py-2 rounded-lg transition-colors ${
                  currentPage === item.id ? 'bg-black text-white' : 'text-black hover:text-gray-900 hover:bg-gray-100'
                }`}
                onClick={() => setCurrentPage(item.id)}
              >
                {item.icon}
                {item.title}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ul>
        <li>
          <div className="w-full flex flex-1 items-center gap-2  px-2 py-2">
            <div className="w-[48px] h-10 border border-gray-300 rounded-md flex items-center justify-center">JD</div>
            <div className="flex flex-col w-full space-y-0">
              <p className="text-md font-bold">John Doe</p>
              <p className="text-sm text-gray-500 -mt-1">john.doe@example.com</p>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  )
}
