/**
 * Утилиты для работы с Telegram Web App
 */

interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
      is_premium?: boolean
    }
    auth_date: number
    hash: string
  }
  ready: () => void
  expand: () => void
  close: () => void
  MainButton: {
    show: () => void
    hide: () => void
    setText: (text: string) => void
    onClick: (callback: () => void) => void
  }
  BackButton: {
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
  }
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void
    selectionChanged: () => void
  }
  themeParams: {
    bg_color?: string
    text_color?: string
    hint_color?: string
    link_color?: string
    button_color?: string
    button_text_color?: string
    secondary_bg_color?: string
  }
  colorScheme: 'light' | 'dark'
  viewportHeight: number
  viewportStableHeight: number
  isExpanded: boolean
  isClosingConfirmationEnabled: boolean
  version: string
  platform: string
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

/**
 * Получить объект Telegram WebApp
 */
export function getTelegramWebApp(): TelegramWebApp | null {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    return window.Telegram.WebApp
  }
  return null
}

/**
 * Получить initData для авторизации
 */
export function getInitData(): string | null {
  const webApp = getTelegramWebApp()
  return webApp?.initData || null
}

/**
 * Получить данные текущего пользователя
 */
export function getTelegramUser() {
  const webApp = getTelegramWebApp()
  return webApp?.initDataUnsafe?.user || null
}

/**
 * Проверить, запущено ли приложение в Telegram
 */
export function isTelegramWebApp(): boolean {
  return !!getTelegramWebApp()
}

/**
 * Инициализировать Telegram Web App
 */
export function initTelegramWebApp() {
  const webApp = getTelegramWebApp()
  if (webApp) {
    webApp.ready()
    webApp.expand()
    return true
  }
  return false
}

/**
 * Применить тему Telegram к документу
 */
export function applyTelegramTheme() {
  const webApp = getTelegramWebApp()
  if (webApp?.themeParams) {
    const root = document.documentElement
    const theme = webApp.themeParams
    
    if (theme.bg_color) root.style.setProperty('--tg-theme-bg-color', theme.bg_color)
    if (theme.text_color) root.style.setProperty('--tg-theme-text-color', theme.text_color)
    if (theme.hint_color) root.style.setProperty('--tg-theme-hint-color', theme.hint_color)
    if (theme.link_color) root.style.setProperty('--tg-theme-link-color', theme.link_color)
    if (theme.button_color) root.style.setProperty('--tg-theme-button-color', theme.button_color)
    if (theme.button_text_color) root.style.setProperty('--tg-theme-button-text-color', theme.button_text_color)
    if (theme.secondary_bg_color) root.style.setProperty('--tg-theme-secondary-bg-color', theme.secondary_bg_color)
  }
}

/**
 * Haptic feedback
 */
export const haptic = {
  impact: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') => {
    const webApp = getTelegramWebApp()
    webApp?.HapticFeedback?.impactOccurred(style)
  },
  notification: (type: 'error' | 'success' | 'warning') => {
    const webApp = getTelegramWebApp()
    webApp?.HapticFeedback?.notificationOccurred(type)
  },
  selection: () => {
    const webApp = getTelegramWebApp()
    webApp?.HapticFeedback?.selectionChanged()
  }
}