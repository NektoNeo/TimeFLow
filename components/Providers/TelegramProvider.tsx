'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import Script from 'next/script'
import { 
  getTelegramWebApp, 
  getTelegramUser, 
  initTelegramWebApp, 
  applyTelegramTheme,
  getInitData
} from '@/lib/telegram'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
}

interface TelegramContextType {
  user?: TelegramUser
  isReady: boolean
  WebApp?: any
  initData?: string
}

const TelegramContext = createContext<TelegramContextType>({
  isReady: false
})

export const useTelegram = () => useContext(TelegramContext)

interface TelegramProviderProps {
  children: ReactNode
}

export default function TelegramProvider({ children }: TelegramProviderProps) {
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState<TelegramUser>()
  const [initData, setInitData] = useState<string>()

  useEffect(() => {
    const init = () => {
      const webApp = getTelegramWebApp()
      
      if (webApp) {
        // Инициализируем WebApp
        initTelegramWebApp()
        
        // Применяем тему
        applyTelegramTheme()
        
        // Получаем данные пользователя
        const telegramUser = getTelegramUser()
        if (telegramUser) {
          setUser(telegramUser)
        }
        
        // Получаем initData
        const telegramInitData = getInitData()
        if (telegramInitData) {
          setInitData(telegramInitData)
        }
        
        setIsReady(true)
      } else if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
        // В режиме разработки устанавливаем тестовые данные
        console.log('🔧 Mock режим: используются тестовые данные')
        setUser({
          id: 123456789,
          first_name: 'Тест',
          last_name: 'Пользователь',
          username: 'test_user',
          language_code: 'ru'
        })
        setInitData('mock_init_data')
        setIsReady(true)
        
        // Применяем дефолтную тему для разработки
        const root = document.documentElement
        root.style.setProperty('--tg-theme-bg-color', '#ffffff')
        root.style.setProperty('--tg-theme-text-color', '#000000')
        root.style.setProperty('--tg-theme-hint-color', '#999999')
        root.style.setProperty('--tg-theme-link-color', '#2481cc')
        root.style.setProperty('--tg-theme-button-color', '#2481cc')
        root.style.setProperty('--tg-theme-button-text-color', '#ffffff')
        root.style.setProperty('--tg-theme-secondary-bg-color', '#f5f5f5')
      }
    }

    // Пробуем инициализировать сразу
    if (typeof window !== 'undefined') {
      if (window.Telegram?.WebApp) {
        init()
      } else {
        // Если Telegram еще не загружен, ждем событие
        window.addEventListener('TelegramWebAppReady', init)
      }
    }

    return () => {
      window.removeEventListener('TelegramWebAppReady', init)
    }
  }, [])

  const contextValue: TelegramContextType = {
    user,
    isReady,
    WebApp: getTelegramWebApp(),
    initData
  }

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
      <TelegramContext.Provider value={contextValue}>
        {children}
      </TelegramContext.Provider>
    </>
  )
}