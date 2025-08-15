'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Trophy, User } from 'lucide-react'
import { useTelegram } from '@/components/Providers/TelegramProvider'

const navItems = [
  {
    href: '/',
    icon: Home,
    label: 'Главная'
  },
  {
    href: '/achievements',
    icon: Trophy,
    label: 'Достижения'
  },
  {
    href: '/profile',
    icon: User,
    label: 'Профиль'
  }
]

export default function BottomNavigation() {
  const pathname = usePathname()
  const { WebApp } = useTelegram()

  const handleClick = () => {
    // Haptic feedback для Telegram
    if (WebApp?.HapticFeedback) {
      WebApp.HapticFeedback.impactOccurred('light')
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--tg-theme-section-bg-color)] border-t border-gray-200 safe-area-bottom">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleClick}
              className={`
                flex flex-col items-center justify-center
                w-full h-full
                transition-all duration-200
                ${isActive 
                  ? 'text-[var(--tg-theme-button-color)]' 
                  : 'text-[var(--tg-theme-hint-color)]'
                }
              `}
            >
              <Icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-xs mt-1 font-medium">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}