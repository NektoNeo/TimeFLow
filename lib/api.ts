/**
 * Единый API клиент для взаимодействия с сервером
 */

import { getInitData } from './telegram'
import type { 
  UserData, 
  HabitData, 
  TaskData, 
  FocusSessionData,
  AchievementData,
  SettingsData,
  ApiResponse,
  PaginatedResponse
} from '@/types/api'

// Mock данные для режима разработки
import { mockData } from './mockData'

class ApiClient {
  private baseUrl: string
  private useMock: boolean

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
    this.useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true'
  }

  /**
   * Базовый метод для выполнения запросов
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // В mock режиме возвращаем тестовые данные
    if (this.useMock) {
      return this.getMockData(endpoint, options)
    }

    // Получаем initData для авторизации
    const initData = getInitData()
    if (!initData) {
      throw new Error('Telegram initData не найден. Убедитесь, что приложение запущено в Telegram.')
    }

    // Добавляем заголовки
    const headers = {
      'Content-Type': 'application/json',
      'X-Telegram-InitData': initData,
      ...options.headers,
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Ошибка сервера' }))
        throw new Error(error.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return {
        success: true,
        data,
      }
    } catch (error) {
      console.error('API Error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Неизвестная ошибка',
      }
    }
  }

  /**
   * Mock данные для разработки
   */
  private async getMockData<T>(endpoint: string, options: RequestInit): Promise<ApiResponse<T>> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 300))

    // Парсим endpoint и метод
    const method = options.method || 'GET'
    
    try {
      let data: any

      // Роутинг mock данных
      if (endpoint === '/api/user' && method === 'GET') {
        data = mockData.user
      } else if (endpoint === '/api/habits' && method === 'GET') {
        data = mockData.habits
      } else if (endpoint === '/api/tasks' && method === 'GET') {
        data = mockData.tasks
      } else if (endpoint === '/api/achievements' && method === 'GET') {
        data = mockData.achievements
      } else if (endpoint === '/api/settings' && method === 'GET') {
        data = mockData.settings
      } else if (endpoint.startsWith('/api/habits/') && method === 'POST') {
        // Отметка привычки
        data = { success: true, points_earned: 10 }
      } else if (endpoint === '/api/focus/start' && method === 'POST') {
        // Начало фокус-сессии
        data = { session_id: 'mock-session-123', started_at: new Date().toISOString() }
      } else {
        throw new Error(`Mock endpoint not found: ${method} ${endpoint}`)
      }

      return {
        success: true,
        data: data as T,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Mock error',
      }
    }
  }

  // API методы

  /**
   * Получить данные пользователя
   */
  async getUser(): Promise<ApiResponse<UserData>> {
    return this.request<UserData>('/api/user')
  }

  /**
   * Обновить данные пользователя
   */
  async updateUser(data: Partial<UserData>): Promise<ApiResponse<UserData>> {
    return this.request<UserData>('/api/user', {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  /**
   * Получить список привычек
   */
  async getHabits(): Promise<ApiResponse<HabitData[]>> {
    return this.request<HabitData[]>('/api/habits')
  }

  /**
   * Создать новую привычку
   */
  async createHabit(habit: Omit<HabitData, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<HabitData>> {
    return this.request<HabitData>('/api/habits', {
      method: 'POST',
      body: JSON.stringify(habit),
    })
  }

  /**
   * Отметить выполнение привычки
   */
  async markHabitComplete(habitId: string): Promise<ApiResponse<{ success: boolean; points_earned: number }>> {
    return this.request<{ success: boolean; points_earned: number }>(`/api/habits/${habitId}/complete`, {
      method: 'POST',
    })
  }

  /**
   * Получить список задач
   */
  async getTasks(filter?: 'today' | 'week' | 'all'): Promise<ApiResponse<TaskData[]>> {
    const params = filter ? `?filter=${filter}` : ''
    return this.request<TaskData[]>(`/api/tasks${params}`)
  }

  /**
   * Создать новую задачу
   */
  async createTask(task: Omit<TaskData, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<TaskData>> {
    return this.request<TaskData>('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })
  }

  /**
   * Обновить задачу
   */
  async updateTask(taskId: string, updates: Partial<TaskData>): Promise<ApiResponse<TaskData>> {
    return this.request<TaskData>(`/api/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
  }

  /**
   * Начать фокус-сессию
   */
  async startFocusSession(duration: number): Promise<ApiResponse<FocusSessionData>> {
    return this.request<FocusSessionData>('/api/focus/start', {
      method: 'POST',
      body: JSON.stringify({ duration }),
    })
  }

  /**
   * Завершить фокус-сессию
   */
  async completeFocusSession(sessionId: string): Promise<ApiResponse<{ points_earned: number }>> {
    return this.request<{ points_earned: number }>(`/api/focus/${sessionId}/complete`, {
      method: 'POST',
    })
  }

  /**
   * Получить достижения
   */
  async getAchievements(): Promise<ApiResponse<AchievementData[]>> {
    return this.request<AchievementData[]>('/api/achievements')
  }

  /**
   * Получить настройки
   */
  async getSettings(): Promise<ApiResponse<SettingsData>> {
    return this.request<SettingsData>('/api/settings')
  }

  /**
   * Обновить настройки
   */
  async updateSettings(settings: Partial<SettingsData>): Promise<ApiResponse<SettingsData>> {
    return this.request<SettingsData>('/api/settings', {
      method: 'PATCH',
      body: JSON.stringify(settings),
    })
  }
}

// Экспортируем единственный экземпляр
export const api = new ApiClient()