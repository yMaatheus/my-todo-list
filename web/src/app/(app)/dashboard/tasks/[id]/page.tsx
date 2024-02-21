import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
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
import { Pencil2Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
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

  if (!id) return null

  const result = await fetch(`http://localhost:3333/task/${id}`, {
    next: {
      revalidate: 3,
      tags: ['task'],
    },
  })

  const data = (await result.json()) as TaskResponseData

  return (
    <div className="flex flex-1 flex-col space-y-8 my-12">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold ml-2">{data.name}</h1>
        <Button size="icon" variant="ghost" className="h-8">
          <PlusIcon />
        </Button>
        <Button size="icon" variant="ghost" className="h-8">
          <Pencil2Icon />
        </Button>
        <Button size="icon" variant="ghost" className="h-8">
          <TrashIcon className=" text-red-500" />
        </Button>
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
