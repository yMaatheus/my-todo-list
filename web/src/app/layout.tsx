import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'My Todo List',
  description: 'Aplicativo de gestão de tarefas',
}

type LayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased dark',
          inter.variable,
        )}
      >
        {children}
      </body>
    </html>
  )
}
