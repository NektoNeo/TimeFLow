/**
 * Mock данные для режима разработки
 */

import type {
  UserData,
  HabitData,
  TaskData,
  AchievementData,
  SettingsData
} from '@/types/api'

export const mockData = {
  user: {
    id: 'user-123',
    telegram_id: 123456789,
    username: 'test_user',
    first_name: 'Тест',
    last_name: 'Пользователь',
    language_code: 'ru',
    is_premium: false,
    
    points_balance: 1250,
    total_points_earned: 5430,
    level: 5,
    streak_days: 7,
    achievements_count: 12,
    
    onboarding_completed: true,
    timezone: 'Europe/Moscow',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T12:00:00Z'
  } as UserData,
  
  habits: [
    {
      id: 'habit-1',
      user_id: 'user-123',
      name: 'Утренняя зарядка',
      description: '15 минут упражнений',
      icon: '🏃',
      color: '#4CAF50',
      
      frequency: 'daily',
      target_count: 1,
      reminder_time: '07:00',
      
      current_streak: 7,
      best_streak: 14,
      total_completions: 45,
      completion_rate: 85,
      
      is_active: true,
      completed_today: true,
      completions_today: 1,
      
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-15T07:30:00Z'
    },
    {
      id: 'habit-2',
      user_id: 'user-123',
      name: 'Чтение',
      description: '30 минут в день',
      icon: '📚',
      color: '#2196F3',
      
      frequency: 'daily',
      target_count: 1,
      reminder_time: '20:00',
      
      current_streak: 3,
      best_streak: 21,
      total_completions: 67,
      completion_rate: 75,
      
      is_active: true,
      completed_today: false,
      completions_today: 0,
      
      created_at: '2024-01-05T00:00:00Z',
      updated_at: '2024-01-14T20:00:00Z'
    },
    {
      id: 'habit-3',
      user_id: 'user-123',
      name: 'Медитация',
      description: '10 минут осознанности',
      icon: '🧘',
      color: '#9C27B0',
      
      frequency: 'daily',
      target_count: 1,
      reminder_time: '08:00',
      
      current_streak: 1,
      best_streak: 5,
      total_completions: 12,
      completion_rate: 60,
      
      is_active: true,
      completed_today: false,
      completions_today: 0,
      
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2024-01-14T08:00:00Z'
    }
  ] as HabitData[],
  
  tasks: [
    {
      id: 'task-1',
      user_id: 'user-123',
      title: 'Подготовить презентацию',
      description: 'Для встречи в пятницу',
      priority: 'high',
      due_date: '2024-01-19T00:00:00Z',
      tags: ['работа', 'важное'],
      is_completed: false,
      subtasks: [
        {
          id: 'subtask-1',
          title: 'Собрать данные',
          is_completed: true,
          completed_at: '2024-01-15T10:00:00Z'
        },
        {
          id: 'subtask-2',
          title: 'Создать слайды',
          is_completed: false
        },
        {
          id: 'subtask-3',
          title: 'Подготовить речь',
          is_completed: false
        }
      ],
      created_at: '2024-01-14T00:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 'task-2',
      user_id: 'user-123',
      title: 'Купить продукты',
      priority: 'medium',
      due_date: '2024-01-15T00:00:00Z',
      tags: ['личное'],
      is_completed: false,
      created_at: '2024-01-15T08:00:00Z',
      updated_at: '2024-01-15T08:00:00Z'
    },
    {
      id: 'task-3',
      user_id: 'user-123',
      title: 'Позвонить маме',
      priority: 'low',
      tags: ['личное', 'семья'],
      is_completed: true,
      completed_at: '2024-01-15T11:00:00Z',
      created_at: '2024-01-15T09:00:00Z',
      updated_at: '2024-01-15T11:00:00Z'
    }
  ] as TaskData[],
  
  achievements: [
    {
      id: 'ach-1',
      code: 'first_habit',
      name: 'Первый шаг',
      description: 'Создайте свою первую привычку',
      icon: '🌱',
      progress: 100,
      is_unlocked: true,
      unlocked_at: '2024-01-01T00:00:00Z',
      points_reward: 50,
      category: 'habits'
    },
    {
      id: 'ach-2',
      code: 'week_streak',
      name: 'Неделя дисциплины',
      description: 'Поддерживайте привычку 7 дней подряд',
      icon: '🔥',
      progress: 100,
      is_unlocked: true,
      unlocked_at: '2024-01-08T00:00:00Z',
      points_reward: 100,
      category: 'habits'
    },
    {
      id: 'ach-3',
      code: 'focus_master',
      name: 'Мастер фокуса',
      description: 'Завершите 10 фокус-сессий',
      icon: '🎯',
      progress: 60,
      is_unlocked: false,
      points_reward: 150,
      category: 'focus'
    },
    {
      id: 'ach-4',
      code: 'task_warrior',
      name: 'Воин задач',
      description: 'Выполните 50 задач',
      icon: '⚔️',
      progress: 30,
      is_unlocked: false,
      points_reward: 200,
      category: 'tasks'
    }
  ] as AchievementData[],
  
  settings: {
    user_id: 'user-123',
    
    notifications_enabled: true,
    habit_reminder_enabled: true,
    daily_summary_enabled: true,
    achievement_notifications: true,
    
    morning_reminder_time: '08:00',
    evening_summary_time: '21:00',
    
    theme: 'system',
    language: 'ru',
    
    default_focus_duration: 25,
    default_break_duration: 5,
    default_long_break_duration: 15,
    long_break_interval: 4,
    
    sound_enabled: true,
    vibration_enabled: true,
    
    updated_at: '2024-01-15T12:00:00Z'
  } as SettingsData
}