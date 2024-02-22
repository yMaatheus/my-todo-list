import { NavItem } from '@/components/nav-item'
import { NavBar } from '@/components/navbar'
import { SignOut } from '@phosphor-icons/react/dist/ssr/SignOut'
import { GearIcon } from '@radix-ui/react-icons'

type LayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <main className="grid grid-cols-10 min-h-full bg-zinc-900">
      <nav className="flex flex-1 flex-col bg-zinc-950 col-span-2 rounded-2xl mx-6 my-4 justify-between p-6 min-w-[336px]">
        <NavBar />
        <div>
          <NavItem
            icon={<GearIcon className="h-5 w-5" />}
            label="Settings"
            href="/dashboard"
          />
          <NavItem
            icon={<SignOut className="h-5 w-5" />}
            label="Logout"
            href="/dashboard"
          />
        </div>
      </nav>
      <div className="flex flex-1 col-span-8">{children}</div>
    </main>
  )
}
