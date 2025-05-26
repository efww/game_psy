import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GameProvider } from '@/lib/gameContext'
import { ThemeProvider } from '@/lib/theme-provider'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '극한선택: 숨겨진 나 발견하기',
  description: '극한 상황 딜레마를 통해 당신의 진짜 성격을 발견하세요',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GameProvider>
            <ThemeToggle />
            {children}
          </GameProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}