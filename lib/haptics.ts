/**
 * Утилиты для работы с Haptic Feedback в Telegram Web App
 */

import { getTelegramWebApp } from './telegram'

/**
 * Типы haptic feedback
 */
export type ImpactStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
export type NotificationType = 'error' | 'success' | 'warning'

/**
 * Класс для работы с Haptic Feedback
 */
class HapticFeedback {
  notificationSuccess() {
      throw new Error('Method not implemented.')
  }
  light() {
      throw new Error('Method not implemented.')
  }
  private webApp = getTelegramWebApp()

  /**
   * Проверяет доступность Haptic Feedback
   */
  isAvailable(): boolean {
    return !!this.webApp?.HapticFeedback
  }

  /**
   * Физический отклик (удар)
   */
  impact(style: ImpactStyle = 'light'): void {
    if (this.isAvailable()) {
      this.webApp?.HapticFeedback.impactOccurred(style)
    }
  }

  /**
   * Уведомление с вибрацией
   */
  notification(type: NotificationType): void {
    if (this.isAvailable()) {
      this.webApp?.HapticFeedback.notificationOccurred(type)
    }
  }

  /**
   * Вибрация при выборе
   */
  selectionChanged(): void {
    if (this.isAvailable()) {
      this.webApp?.HapticFeedback.selectionChanged()
    }
  }
}

// Экспортируем единственный экземпляр
export const haptic = new HapticFeedback()

// Default export для удобства
export default haptic

// Удобные функции для быстрого доступа
export const impactLight = () => haptic.impact('light')
export const impactMedium = () => haptic.impact('medium')
export const impactHeavy = () => haptic.impact('heavy')
export const impactRigid = () => haptic.impact('rigid')
export const impactSoft = () => haptic.impact('soft')

export const notificationError = () => haptic.notification('error')
export const notificationSuccess = () => haptic.notification('success')
export const notificationWarning = () => haptic.notification('warning')

export const selectionChanged = () => haptic.selectionChanged()

/**
 * Hook для использования в React компонентах
 */
export function useHaptic() {
  return {
    impact: haptic.impact.bind(haptic),
    notification: haptic.notification.bind(haptic),
    selectionChanged: haptic.selectionChanged.bind(haptic),
    isAvailable: haptic.isAvailable.bind(haptic),
    
    // Shortcuts
    impactLight,
    impactMedium,
    impactHeavy,
    notificationError,
    notificationSuccess,
    notificationWarning,
  }
}