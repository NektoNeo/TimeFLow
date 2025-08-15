'use client'

import Container from '@/components/ui/container'
import { Trophy, Star, Zap, Target } from 'lucide-react'

export default function AchievementsPage() {
  return (
    <Container>
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--tg-theme-text-color)]">
            Достижения
          </h1>
          <p className="text-[var(--tg-theme-hint-color)] mt-2">
            12 из 45 разблокировано
          </p>
        </div>

        {/* Прогресс */}
        <div className="bg-[var(--tg-theme-section-bg-color)] rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Общий прогресс</span>
            <span className="text-sm text-[var(--tg-theme-hint-color)]">27%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[var(--tg-theme-button-color)] h-2 rounded-full" style={{ width: '27%' }} />
          </div>
        </div>

        {/* Список достижений */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Последние достижения</h2>
          
          <AchievementItem
            icon={Trophy}
            title="Первые шаги"
            description="Создай первую привычку"
            unlocked={true}
            rarity="common"
          />
          
          <AchievementItem
            icon={Star}
            title="Недельный воин"
            description="7 дней подряд выполнения привычки"
            unlocked={true}
            rarity="rare"
          />
          
          <AchievementItem
            icon={Zap}
            title="Мастер фокуса"
            description="Проведи 100 минут в фокус-сессиях"
            unlocked={false}
            rarity="epic"
          />
          
          <AchievementItem
            icon={Target}
            title="Легенда привычек"
            description="30 дней без пропусков"
            unlocked={false}
            rarity="legendary"
          />
        </div>
      </div>
    </Container>
  )
}

// Компонент достижения
function AchievementItem({ 
  icon: Icon, 
  title, 
  description, 
  unlocked,
  rarity
}: {
  icon: any
  title: string
  description: string
  unlocked: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}) {
  const rarityColors = {
    common: 'border-gray-300',
    rare: 'border-blue-400',
    epic: 'border-purple-400',
    legendary: 'border-yellow-400'
  }

  return (
    <div className={`
      bg-[var(--tg-theme-section-bg-color)] rounded-xl p-4 border-2
      ${unlocked ? rarityColors[rarity] : 'border-gray-200'}
      ${!unlocked && 'opacity-50'}
      transition-all duration-200
    `}>
      <div className="flex items-start space-x-3">
        <div className={`
          w-12 h-12 rounded-lg flex items-center justify-center
          ${unlocked ? 'bg-[var(--tg-theme-button-color)]' : 'bg-gray-200'}
        `}>
          <Icon size={24} className={unlocked ? 'text-white' : 'text-gray-400'} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-[var(--tg-theme-text-color)]">
            {title}
          </h3>
          <p className="text-sm text-[var(--tg-theme-hint-color)] mt-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}