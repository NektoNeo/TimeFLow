import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AppLayout from '../components/Layout/AppLayout'
import TelegramProvider from '../components/Providers/TelegramProvider'



const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'TimeFlow',
  description: 'Твой персональный ассистент продуктивности',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <TelegramProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </TelegramProvider>
      </body>
    </html>
  )
}