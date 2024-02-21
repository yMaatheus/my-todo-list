import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { TableCell, TableRow } from '@/components/ui/table'
import { TaskActionsDropDrown } from '../components/task-actions-dropdown'
import { DeleteTask } from '../components/task-delete'
import { EditTask } from '../components/task-edit'
import { Task } from '../page'

export function TaskTableRow({ task }: { task: Task }) {
  return (
    <TableRow>
      <Sheet>
        <AlertDialog>
          <TableCell className="w-[60px]">
            <Checkbox checked={task.completed} />
          </TableCell>
          <TableCell className="font-medium text-center">{task.name}</TableCell>
          <TableCell>{task.description ? task.description : ''}</TableCell>
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

          <DeleteTask taskId={task.taskId} />
          <EditTask
            taskId={task.taskId}
            name={task.name}
            description={task.name}
            completed={task.completed}
          />
        </AlertDialog>
      </Sheet>
    </TableRow>
  )
}
