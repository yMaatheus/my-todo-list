import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Todo List',
  description: 'Aplicativo de gestão de tarefas',
}

type LayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <main className="bg-slate-950 flex flex-1 h-screen text-white flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}
