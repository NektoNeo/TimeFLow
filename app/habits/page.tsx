'use client'

import Container from '@/components/ui/container'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SkeletonList } from '@/components/ui/skeleton'
import { Plus, CheckCircle } from 'lucide-react'
import { useHabits } from '@/hooks/useApi'
import haptic from '@/lib/haptics'
import { useState } from 'react'

export default function HabitsPage() {
  const { habits, loading, markComplete } = useHabits()
  const [completing, setCompleting] = useState<string | null>(null)

  const handleComplete = async (habitId: string) => {
    setCompleting(habitId)
    haptic.impact('medium')
    
    const points = await markComplete(habitId)
    
    if (points > 0) {
      haptic.notificationSuccess()
      // Можно показать уведомление о получении очков
    }
    
    setCompleting(null)
  }

  return (
    <Container>
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--tg-theme-text-color)]">
            Привычки
          </h1>
          <Button size="sm" onClick={() => haptic.impact('light')}>
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>

        {/* Список привычек */}
        {loading ? (
          <SkeletonList count={3} />
        ) : habits.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-[var(--tg-theme-hint-color)] mb-4">
                У вас пока нет привычек
              </p>
              <Button>Создать первую привычку</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {habits.map(habit => (
              <Card key={habit.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{habit.icon}</div>
                      <div>
                        <h3 className="font-semibold">{habit.name}</h3>
                        <p className="text-sm text-[var(--tg-theme-hint-color)]">
                          {habit.description || `Серия: ${habit.current_streak} дней`}
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant={habit.completed_today ? 'secondary' : 'primary'}
                      disabled={habit.completed_today || completing === habit.id}
                      onClick={() => handleComplete(habit.id)}
                    >
                      {habit.completed_today ? (
                        <>
                          <CheckCircle size={16} className="mr-1" />
                          Выполнено
                        </>
                      ) : completing === habit.id ? (
                        'Сохраняем...'
                      ) : (
                        'Отметить'
                      )}
                    </Button>
                  </div>
                  
                  {/* Прогресс бар */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Выполнение</span>
                      <span>{habit.completion_rate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[var(--tg-theme-button-color)] h-2 rounded-full transition-all"
                        style={{ width: `${habit.completion_rate}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}