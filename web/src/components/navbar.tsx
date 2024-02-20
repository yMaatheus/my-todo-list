import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Barbell } from '@phosphor-icons/react/dist/ssr/Barbell'
import { HomeIcon, ListBulletIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

type listResponseData = {
  id: string
  name: string
}

export async function NavBar() {
  const result = await fetch('http://localhost:3333/list')

  const data = (await result.json()) as listResponseData[]

  return (
    <Accordion type="multiple" className="p-8 flex flex-col space-y-2 ">
      <Link
        href="/dashboard"
        className="transition-all hover:underline text-lg flex items-center gap-2"
      >
        <HomeIcon className="h-5 w-5" />
        Inicio
      </Link>

      <AccordionItem value="tasks" className="flex flex-col space-y-4 border-0">
        <AccordionTrigger className="text-lg py-0">
          <p className="flex items-center gap-2">
            <ListBulletIcon className="h-5 w-5" />
            Listas de Tarefas
          </p>
        </AccordionTrigger>

        {data.map((item) => (
          <AccordionContent key={item.id} className="hover:underline">
            <Link href={`/dashboard/tasks/${item.id}`}>{item.name}</Link>
          </AccordionContent>
        ))}
      </AccordionItem>

      <Link
        href="/dashboard"
        className="transition-all hover:underline text-lg flex items-center gap-2"
      >
        <Barbell className="h-5 w-5" />
        Academia
      </Link>
    </Accordion>
  )
}
