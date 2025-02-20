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
    <nav className="w-64 h-full p-4 overflow-hidden flex flex-col justify-between bg-whitea">
      <div className="flex justify-start items-center px-4 mb-8">
        <Image src="/thoughtful-logo.svg" alt="Logo" width={150} height={150} />
      </div>
      <div className="flex flex-col h-full justify-between overflow-y-auto">
        <ul>
          {navItems.map((item) => (
            <li key={item.title}>
              <div
                className={`w-full flex items-center gap-2 text-left text-lg px-4 py-2 rounded-lg transition-colors ${
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
          <div className="w-full flex items-center gap-2 text-left text-lg px-4 py-2">
            <Image src="/hobby-16.jpeg" alt="Profile" width={50} height={50} className="rounded-full object-cover aspect-square" />
            <div className="flex flex-col w-full">
              <p className="text-lg font-bold">John Doe</p>
              <p className="text-sm text-gray-500">john.doe@example.com</p>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  )
}
