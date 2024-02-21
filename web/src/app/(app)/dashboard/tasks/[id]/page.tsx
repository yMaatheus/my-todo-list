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
    <div className="flex flex-1 flex-col space-y-8 my-12">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold ml-2">{name}</h1>
        <CreateTask id={id} />

        <EditList id={id} name={name} />

        <DeleteList id={id} />
      </div>
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
          {tasks?.map((task) => <TaskTableRow key={task.taskId} task={task} />)}
        </TableBody>
      </Table>
    </div>
  )
}
