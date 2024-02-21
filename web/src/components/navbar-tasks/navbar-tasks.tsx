'use client'
import { cn } from '@/lib/utils'
import { Circle } from '@phosphor-icons/react/dist/ssr/Circle'
import { ListBulletIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ListResponseData } from '../navbar'
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
      <AccordionTrigger className="text-base hover:bg-muted p-2 hover:no-underline">
        <p className="flex items-center gap-2">
          <ListBulletIcon className="h-5 w-5" />
          Listas de Tarefas
        </p>
      </AccordionTrigger>
      {data.map((item) => (
        <AccordionContent
          key={item.id}
          className={cn('flex items-center gap-2 ml-8 p-0 hover:underline')}
        >
          <Circle
            className="w-2 h-2"
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
