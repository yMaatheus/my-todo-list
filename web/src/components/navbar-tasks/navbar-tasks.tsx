'use client'
import { ListResponseData } from '@/interfaces/responses/ListResponseData'
import { cn } from '@/lib/utils'
import { Circle } from '@phosphor-icons/react/dist/ssr/Circle'
import { ListBulletIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

type Props = {
  data: ListResponseData[]
  children: React.ReactNode
}

export function NavBarTasks({ data, children }: Props) {
  const pathname = usePathname()

  return (
    <AccordionItem value="tasks" className="flex flex-col space-y-4 border-0">
      <AccordionTrigger className="p-2 text-base hover:bg-muted hover:no-underline">
        <p className="flex items-center gap-2">
          <ListBulletIcon className="h-5 w-5" />
          Listas de Tarefas
        </p>
      </AccordionTrigger>
      {data?.map((item) => (
        <AccordionContent
          key={item.id}
          className={cn('ml-8 flex items-center gap-2 p-0 hover:underline')}
        >
          <Circle
            className="h-2 w-2"
            weight={
              pathname.startsWith(`/dashboard/tasks/${item.id}`)
                ? 'fill'
                : 'regular'
            }
          />
          <Link href={`/dashboard/tasks/${item.id}`}>{item.name}</Link>
        </AccordionContent>
      ))}
      {children}
    </AccordionItem>
  )
}
