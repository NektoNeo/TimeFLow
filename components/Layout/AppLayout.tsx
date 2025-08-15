'use client'

import { usePathname } from 'next/navigation'
import BottomNavigation from './BottomNavigation'

export default function AppLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  return (
    <div className="min-h-screen bg-[var(--tg-theme-bg-color)] flex flex-col">
      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}