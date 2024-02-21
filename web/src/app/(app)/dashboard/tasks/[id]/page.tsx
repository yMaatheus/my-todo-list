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
  const result = await fetch(`http://localhost:3333/task/${id}`)

  const data = (await result.json()) as TaskResponseData

  // console.log(data)

  return (
    <div className="flex flex-1 w-4/5 flex-col space-y-6 mx-auto my-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">Status</TableHead>
            <TableHead className="w-[200px] text-center">Nome</TableHead>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
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
