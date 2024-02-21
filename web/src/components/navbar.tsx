import { ListResponseData } from '@/interfaces/responses/ListResponseData'
import { Barbell } from '@phosphor-icons/react/dist/ssr/Barbell'
import { HomeIcon } from '@radix-ui/react-icons'
import { NavItem } from './nav-item'
import { NavBarCreateTask } from './navbar-tasks/navbar-create-task'
import { NavBarTasks } from './navbar-tasks/navbar-tasks'
import { Accordion } from './ui/accordion'

export async function NavBar() {
  const result = await fetch('http://localhost:3333/list', {
    next: { tags: ['list'] },
  })

  const data = (await result.json()) as ListResponseData[]

  return (
    <Accordion
      type="multiple"
      defaultValue={['tasks']}
      className="flex flex-col space-y-2"
    >
      <NavItem
        icon={<HomeIcon className="h-5 w-5" />}
        label="Inicio"
        href="/dashboard"
      />

      <NavBarTasks data={data}>
        <NavBarCreateTask />
      </NavBarTasks>

      <NavItem
        icon={<Barbell className="h-5 w-5" />}
        label="Academia"
        href="/dashboard/gym"
      />
    </Accordion>
  )
}
