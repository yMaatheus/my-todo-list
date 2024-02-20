import '@/app/globals.css'
import { NavBar } from '@/components/navbar'

type TemplateProps = Readonly<{
  children: React.ReactNode
}>

export default function Template({ children }: TemplateProps) {
  return (
    <main className="grid grid-cols-6 flex-1 h-screen bg-zinc-900">
      <nav className="flex flex-1 flex-col bg-zinc-950 col-span-1">
        <NavBar />
      </nav>
      <div className="col-span-5">{children}</div>
    </main>
  )
}
