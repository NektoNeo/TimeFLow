'use client'

import Container from '@/components/ui/container'
import { useTelegram } from '@/components/Providers/TelegramProvider'
import { Calendar, Target, Timer, ListTodo } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import haptic from '@/lib/haptics'

export default function HomePage() {
  const { user, isReady } = useTelegram()
  const router = useRouter()

  const handleNavigation = (path: string) => {
    haptic.impact('light')
    router.push(path)
  }

  return (
    <Container>
      <div className="space-y-6">
        {/* Приветствие */}
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-[var(--tg-theme-text-color)] mb-2">
            Привет{user?.first_name ? `, ${user.first_name}` : ''}! 👋
          </h1>
          <p className="text-[var(--tg-theme-hint-color)]">
            Что будем делать сегодня?
          </p>
        </div>

        {/* Карточки функций */}
        <div className="grid grid-cols-2 gap-4">
          <FeatureCard
            icon={Target}
            title="Привычки"
            description="5 активных"
            color="bg-blue-500"
            onClick={() => handleNavigation('/habits')}
          />
          <FeatureCard
            icon={ListTodo}
            title="Задачи"
            description="3 на сегодня"
            color="bg-green-500"
            onClick={() => handleNavigation('/tasks')}
          />
          <FeatureCard
            icon={Timer}
            title="Фокус"
            description="25 минут"
            color="bg-purple-500"
            onClick={() => handleNavigation('/focus')}
          />
          <FeatureCard
            icon={Calendar}
            title="Статистика"
            description="7 дней подряд"
            color="bg-orange-500"
            onClick={() => handleNavigation('/stats')}
          />
        </div>

        {/* Быстрые действия */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Быстрые действия</h2>
          <Button 
            className="w-full"
            onClick={() => handleNavigation('/focus')}
          >
            Начать фокус-сессию
          </Button>
          <Button 
            variant="secondary"
            className="w-full"
            onClick={() => handleNavigation('/tasks')}
          >
            Добавить задачу
          </Button>
        </div>
      </div>
    </Container>
  )
}

// Компонент карточки функции
function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  color,
  onClick 
}: {
  icon: any
  title: string
  description: string
  color: string
  onClick: () => void
}) {
  return (
    <Card 
      className="cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
          <Icon size={24} className="text-white" />
        </div>
        <h3 className="font-semibold text-[var(--tg-theme-text-color)]">
          {title}
        </h3>
        <p className="text-sm text-[var(--tg-theme-hint-color)] mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}