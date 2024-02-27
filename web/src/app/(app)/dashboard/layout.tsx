import { NavItem } from '@/components/nav-item'
import { NavBar } from '@/components/navbar'
import { SignOut } from '@phosphor-icons/react/dist/ssr/SignOut'
import { GearIcon } from '@radix-ui/react-icons'

type LayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <main className="grid min-h-full grid-cols-10 bg-zinc-900">
      <nav className="col-span-2 mx-6 my-4 flex min-w-[336px] flex-1 flex-col justify-between rounded-2xl bg-zinc-950 p-6">
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
      <div className="col-span-8 flex flex-1">{children}</div>
    </main>
  )
}
