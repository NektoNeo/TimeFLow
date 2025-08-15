'use client'

import Container from '@/components/ui/container'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import haptic from '@/lib/haptics'
import { api } from '@/lib/api'

export default function FocusPage() {
  const [duration, setDuration] = useState(25) // минуты
  const [timeLeft, setTimeLeft] = useState(duration * 60) // секунды
  const [isRunning, setIsRunning] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work')

  // Конвертация времени в формат MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Запуск/пауза таймера
  const toggleTimer = async () => {
    if (!isRunning && !sessionId) {
      // Начинаем новую сессию
      haptic.impact('medium')
      const response = await api.startFocusSession(duration)
      if (response.success && response.data) {
        setSessionId(response.data.id)
        setIsRunning(true)
      }
    } else {
      // Пауза/продолжение
      haptic.impact('light')
      setIsRunning(!isRunning)
    }
  }

  // Сброс таймера
  const resetTimer = () => {
    haptic.impact('light')
    setIsRunning(false)
    setTimeLeft(duration * 60)
    setSessionId(null)
  }

  // Завершение сессии
  const completeSession = useCallback(async () => {
    if (sessionId) {
      haptic.notificationSuccess()
      const response = await api.completeFocusSession(sessionId)
      if (response.success && response.data) {
        // Показать полученные очки
        console.log(`Получено ${response.data.points_earned} очков!`)
      }
      
      // Переключаемся на перерыв
      if (sessionType === 'work') {
        setSessionType('break')
        setDuration(5)
        setTimeLeft(5 * 60)
      } else {
        setSessionType('work')
        setDuration(25)
        setTimeLeft(25 * 60)
      }
      
      setSessionId(null)
      setIsRunning(false)
    }
  }, [sessionId, sessionType])

  // Эффект для таймера
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            completeSession()
            return 0
          }
          return time - 1
        })
      }, 1000)
    } else if (timeLeft === 0) {
      completeSession()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, completeSession])

  // Изменение длительности
  const changeDuration = (newDuration: number) => {
    if (!isRunning) {
      setDuration(newDuration)
      setTimeLeft(newDuration * 60)
      haptic.selectionChanged()
    }
  }

  return (
    <Container>
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold text-[var(--tg-theme-text-color)] mb-2">
            Фокус-сессия
          </h1>
          <p className="text-[var(--tg-theme-hint-color)]">
            {sessionType === 'work' ? 'Время работать' : 'Время отдохнуть'}
          </p>
        </div>

        {/* Таймер */}
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="text-6xl font-bold text-[var(--tg-theme-text-color)] mb-8">
                {formatTime(timeLeft)}
              </div>
              
              {/* Кнопки управления */}
              <div className="flex justify-center gap-4 mb-8">
                <Button
                  size="lg"
                  onClick={toggleTimer}
                  className="min-w-[120px]"
                >
                  {isRunning ? (
                    <>
                      <Pause size={20} className="mr-2" />
                      Пауза
                    </>
                  ) : (
                    <>
                      <Play size={20} className="mr-2" />
                      Старт
                    </>
                  )}
                </Button>
                
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={resetTimer}
                  disabled={!sessionId}
                >
                  <RotateCcw size={20} />
                </Button>
              </div>
              
              {/* Быстрый выбор времени */}
              <div className="flex justify-center gap-2">
                <Button
                  variant={duration === 15 ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => changeDuration(15)}
                  disabled={isRunning}
                >
                  15 мин
                </Button>
                <Button
                  variant={duration === 25 ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => changeDuration(25)}
                  disabled={isRunning}
                >
                  25 мин
                </Button>
                <Button
                  variant={duration === 45 ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => changeDuration(45)}
                  disabled={isRunning}
                >
                  45 мин
                </Button>
                <Button
                  variant={duration === 5 ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    changeDuration(5)
                    setSessionType('break')
                  }}
                  disabled={isRunning}
                >
                  <Coffee size={16} className="mr-1" />
                  Перерыв
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Статистика */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Сегодняшняя статистика</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[var(--tg-theme-button-color)]">0</p>
                <p className="text-sm text-[var(--tg-theme-hint-color)]">Сессий</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--tg-theme-button-color)]">0</p>
                <p className="text-sm text-[var(--tg-theme-hint-color)]">Минут</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--tg-theme-button-color)]">0</p>
                <p className="text-sm text-[var(--tg-theme-hint-color)]">Очков</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}