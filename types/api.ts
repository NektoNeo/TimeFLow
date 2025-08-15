/**
 * Типы данных для API
 */

/**
 * Базовый ответ API
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

/**
 * Пагинированный ответ
 */
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  per_page: number
  has_next: boolean
}

/**
 * Данные пользователя
 */
export interface UserData {
  id: string
  telegram_id: number
  username?: string
  first_name: string
  last_name?: string
  language_code?: string
  is_premium?: boolean
  
  // Статистика
  points_balance: number
  total_points_earned: number
  level: number
  streak_days: number
  achievements_count: number
  
  // Профиль
  onboarding_completed: boolean
  timezone?: string
  created_at: string
  updated_at: string
}

/**
 * Данные привычки
 */
export interface HabitData {
  id: string
  user_id: string
  name: string
  description?: string
  icon: string
  color: string
  
  // Настройки
  frequency: 'daily' | 'weekly' | 'custom'
  target_days?: number[] // Для weekly: 0-6 (вс-сб)
  target_count?: number // Сколько раз в день/неделю
  reminder_time?: string // HH:MM
  
  // Статистика
  current_streak: number
  best_streak: number
  total_completions: number
  completion_rate: number // 0-100
  
  // Состояние
  is_active: boolean
  completed_today: boolean
  completions_today: number
  
  created_at: string
  updated_at: string
}

/**
 * Данные задачи
 */
export interface TaskData {
  id: string
  user_id: string
  title: string
  description?: string
  
  // Настройки
  priority: 'low' | 'medium' | 'high'
  due_date?: string
  tags?: string[]
  
  // Состояние
  is_completed: boolean
  completed_at?: string
  
  // Подзадачи
  subtasks?: SubtaskData[]
  
  created_at: string
  updated_at: string
}

/**
 * Подзадача
 */
export interface SubtaskData {
  id: string
  title: string
  is_completed: boolean
  completed_at?: string
}

/**
 * Данные фокус-сессии
 */
export interface FocusSessionData {
  id: string
  user_id: string
  
  // Настройки сессии
  duration: number // в минутах
  type: 'work' | 'break' | 'long_break'
  
  // Время
  started_at: string
  completed_at?: string
  paused_at?: string
  total_pause_time?: number // в секундах
  
  // Результат
  is_completed: boolean
  points_earned?: number
  
  created_at: string
  updated_at: string
}

/**
 * Данные достижения
 */
export interface AchievementData {
  id: string
  code: string
  name: string
  description: string
  icon: string
  
  // Прогресс
  progress: number // 0-100
  is_unlocked: boolean
  unlocked_at?: string
  
  // Награда
  points_reward: number
  
  // Категория
  category: 'habits' | 'tasks' | 'focus' | 'special'
}

/**
 * Настройки пользователя
 */
export interface SettingsData {
  user_id: string
  
  // Уведомления
  notifications_enabled: boolean
  habit_reminder_enabled: boolean
  daily_summary_enabled: boolean
  achievement_notifications: boolean
  
  // Время уведомлений
  morning_reminder_time?: string // HH:MM
  evening_summary_time?: string // HH:MM
  
  // Интерфейс
  theme: 'system' | 'light' | 'dark'
  language: string
  
  // Фокус-сессии
  default_focus_duration: number // минуты
  default_break_duration: number
  default_long_break_duration: number
  long_break_interval: number // после скольких сессий
  
  // Звуки
  sound_enabled: boolean
  vibration_enabled: boolean
  
  updated_at: string
}