import { Barbell } from '@phosphor-icons/react/dist/ssr/Barbell'
import { SignOut } from '@phosphor-icons/react/dist/ssr/SignOut'
import { GearIcon, HomeIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { NavBarTasks } from './navbar-tasks'
import { Accordion } from './ui/accordion'

export type ListResponseData = {
  id: string
  name: string
}

export async function NavBar() {
  const result = await fetch('http://localhost:3333/list')

  const data = (await result.json()) as ListResponseData[]

  return (
    <div className="flex flex-col flex-1 justify-between p-8">
      <Accordion
        type="multiple"
        defaultValue={['tasks']}
        className="flex flex-col space-y-2"
      >
        <Link
          href="/dashboard"
          className="text-base flex items-center gap-2 transition-all hover:bg-muted p-2"
        >
          <HomeIcon className="h-5 w-5" />
          Inicio
        </Link>

        <NavBarTasks data={data} />

        <Link
          href="/dashboard/gym"
          className="transition-all text-base flex items-center gap-2 hover:bg-muted p-2"
        >
          <Barbell className="h-5 w-5" />
          Academia
        </Link>
      </Accordion>
      <div>
        <Link
          href="/dashboard"
          className="transition-all text-base flex items-center gap-2 hover:bg-muted p-2"
        >
          <GearIcon className="h-5 w-5" />
          Settings
        </Link>
        <Link
          href="/dashboard"
          className="transition-all text-base flex items-center gap-2 hover:bg-muted p-2"
        >
          <SignOut className="h-5 w-5" />
          Logout
        </Link>
      </div>
    </div>
  )
}
