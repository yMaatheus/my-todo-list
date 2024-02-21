import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteTaskDialog } from './components/delete-task-dialog'
import { EditTaskSheet } from './components/edit-task-sheet'
import { TaskActionsDropDrown } from './components/task-actions-dropdown'

type PageParams = {
  params: {
    id: string
  }
}

export type Task = {
  taskId: string
  name: string
  description?: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

type TaskResponseData = {
  name: string
  tasks: Task[]
}

export default async function Page({ params }: PageParams) {
  const { id } = params
  const result = await fetch(`http://localhost:3333/task/${id}`, {
    next: {
      revalidate: 3,
    },
  })

  const data = (await result.json()) as TaskResponseData

  return (
    <div className="flex flex-1 w-4/5 flex-col space-y-6 mx-auto my-12">
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
          {data?.tasks?.map((task) => (
            <TableRow key={task.taskId}>
              <Sheet>
                <AlertDialog>
                  <TableCell className="w-[60px]">
                    <Checkbox checked={task.completed} />
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {task.name}
                  </TableCell>
                  <TableCell>
                    {task.description ? task.description : ''}
                  </TableCell>
                  <TableCell>
                    <TaskActionsDropDrown>
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <SheetTrigger asChild>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                      </SheetTrigger>

                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                          Deletar
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                    </TaskActionsDropDrown>
                  </TableCell>

                  <DeleteTaskDialog />
                  <EditTaskSheet name={task.name} description={task.name} />
                </AlertDialog>
              </Sheet>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
