import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TaskResponseData } from '@/interfaces/responses/TaskResponseData'
import { DeleteList } from './components/list-delete'
import { EditList } from './components/list-edit'
import { CreateTask } from './components/task-create'
import { TaskTableRow } from './components/task-table-row'

type PageParams = {
  params: {
    id: string
  }
}

export default async function Page({ params }: PageParams) {
  const { id } = params

  if (!id) return null

  const result = await fetch(`http://localhost:3333/task/${id}`, {
    next: {
      revalidate: 3,
      tags: ['task'],
    },
  })

  const { name, tasks } = (await result.json()) as TaskResponseData

  return (
    <div className="my-12 flex flex-1 flex-col space-y-8">
      <div className="flex items-center gap-2">
        <h1 className="ml-2 text-2xl font-semibold">{name}</h1>
        <CreateTask listId={id} />

        <EditList id={id} name={name} />

        <DeleteList listId={id} />
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Status</TableHead>
              <TableHead className="w-[320px] text-center">Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks?.map((task) => (
              <TaskTableRow key={task.taskId} task={task} />
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
