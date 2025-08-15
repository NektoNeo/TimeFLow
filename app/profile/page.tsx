'use client'

import Container from '@/components/ui/container'
import { useTelegram } from '@/components/Providers/TelegramProvider'
import { Settings, Award, TrendingUp, Calendar } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useTelegram()

  return (
    <Container>
      <div className="space-y-6">
        {/* Профиль пользователя */}
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-[var(--tg-theme-button-color)] rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {user?.first_name?.[0] || 'U'}
            </span>
          </div>
          <h1 className="text-xl font-bold text-[var(--tg-theme-text-color)]">
            {user?.first_name} {user?.last_name}
          </h1>
          {user?.username && (
            <p className="text-[var(--tg-theme-hint-color)]">
              @{user.username}
            </p>
          )}
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={Award}
            value="1,250"
            label="Очков"
          />
          <StatCard
            icon={TrendingUp}
            value="Уровень 5"
            label="Прогресс"
          />
          <StatCard
            icon={Calendar}
            value="45 дней"
            label="С нами"
          />
          <StatCard
            icon={Award}
            value="12"
            label="Достижений"
          />
        </div>

        {/* Меню */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Настройки</h2>
          
          <MenuItem
            icon={Settings}
            title="Общие настройки"
            onClick={() => {}}
          />
          
          <MenuItem
            icon={Award}
            title="История достижений"
            onClick={() => {}}
          />
          
          <MenuItem
            icon={TrendingUp}
            title="Детальная статистика"
            onClick={() => {}}
          />
        </div>

        {/* Версия */}
        <div className="text-center pt-8">
          <p className="text-sm text-[var(--tg-theme-hint-color)]">
            TimeFlow v1.0.0
          </p>
        </div>
      </div>
    </Container>
  )
}

// Компонент карточки статистики
function StatCard({ 
  icon: Icon, 
  value, 
  label 
}: {
  icon: any
  value: string
  label: string
}) {
  return (
    <div className="bg-[var(--tg-theme-section-bg-color)] rounded-xl p-4 text-center">
      <Icon size={24} className="text-[var(--tg-theme-button-color)] mx-auto mb-2" />
      <div className="font-bold text-lg text-[var(--tg-theme-text-color)]">
        {value}
      </div>
      <div className="text-sm text-[var(--tg-theme-hint-color)]">
        {label}
      </div>
    </div>
  )
}

// Компонент пункта меню
function MenuItem({ 
  icon: Icon, 
  title, 
  onClick 
}: {
  icon: any
  title: string
  onClick: () => void
}) {
  const { WebApp } = useTelegram()

  const handleClick = () => {
    if (WebApp?.HapticFeedback) {
      WebApp.HapticFeedback.impactOccurred('light')
    }
    onClick()
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-[var(--tg-theme-section-bg-color)] rounded-lg p-4 flex items-center space-x-3 transition-all active:scale-95"
    >
      <Icon size={20} className="text-[var(--tg-theme-hint-color)]" />
      <span className="flex-1 text-left font-medium text-[var(--tg-theme-text-color)]">
        {title}
      </span>
      <svg
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        className="text-[var(--tg-theme-hint-color)]"
      >
        <path
          d="M1 1L7 7L1 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}