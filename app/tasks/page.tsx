'use client'

import Container from '@/components/ui/container'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SkeletonList } from '@/components/ui/skeleton'
import { Plus, CheckSquare, Square } from 'lucide-react'
import { useTasks } from '@/hooks/useApi'
import haptic from '@/lib/haptics'
import { useState } from 'react'

export default function TasksPage() {
  const { tasks, loading, toggleTask } = useTasks('today')
  const [toggling, setToggling] = useState<string | null>(null)

  const handleToggle = async (taskId: string) => {
    setToggling(taskId)
    haptic.impact('light')
    
    const success = await toggleTask(taskId)
    
    if (success) {
      haptic.notificationSuccess()
    }
    
    setToggling(null)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500'
      case 'medium': return 'text-yellow-500'
      case 'low': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <Container>
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--tg-theme-text-color)]">
            Задачи на сегодня
          </h1>
          <Button size="sm" onClick={() => haptic.impact('light')}>
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>

        {/* Фильтры */}
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">Все</Button>
          <Button variant="ghost" size="sm">Активные</Button>
          <Button variant="ghost" size="sm">Выполненные</Button>
        </div>

        {/* Список задач */}
        {loading ? (
          <SkeletonList count={4} />
        ) : tasks.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-[var(--tg-theme-hint-color)] mb-4">
                На сегодня задач нет
              </p>
              <Button>Создать задачу</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {tasks.map(task => (
              <Card 
                key={task.id}
                className={task.is_completed ? 'opacity-60' : ''}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <button
                      className="mt-0.5"
                      onClick={() => handleToggle(task.id)}
                      disabled={toggling === task.id}
                    >
                      {task.is_completed ? (
                        <CheckSquare size={20} className="text-[var(--tg-theme-button-color)]" />
                      ) : (
                        <Square size={20} className="text-gray-400" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <h3 className={`font-medium ${task.is_completed ? 'line-through' : ''}`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-[var(--tg-theme-hint-color)] mt-1">
                          {task.description}
                        </p>
                      )}
                      
                      {/* Метаданные */}
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority === 'high' ? 'Высокий' : 
                           task.priority === 'medium' ? 'Средний' : 'Низкий'} приоритет
                        </span>
                        {task.due_date && (
                          <span className="text-xs text-[var(--tg-theme-hint-color)]">
                            До {new Date(task.due_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      
                      {/* Подзадачи */}
                      {task.subtasks && task.subtasks.length > 0 && (
                        <div className="mt-2 text-xs text-[var(--tg-theme-hint-color)]">
                          {task.subtasks.filter(st => st.is_completed).length} из {task.subtasks.length} подзадач выполнено
                        </div>
                      )}
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