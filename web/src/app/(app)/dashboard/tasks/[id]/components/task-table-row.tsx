import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { TableCell, TableRow } from '@/components/ui/table'
import { Task } from '@/interfaces/task'
import clsx from 'clsx'
import { revalidateTag } from 'next/cache'
import { TaskActionsDropDrown } from '../components/task-actions-dropdown'
import { DeleteTask } from '../components/task-delete'
import { EditTask } from '../components/task-edit'

type Props = {
  task: Task
}

export function TaskTableRow({ task }: Props) {
  async function handleChecked() {
    'use server'

    await fetch(`http://localhost:3333/task/${task.taskId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: task.name,
        description: task.description,
        completed: !task.completed,
      }),
    })

    revalidateTag('task')
  }
  return (
    <TableRow className={clsx(task.completed && 'bg-muted/50')}>
      <Sheet>
        <AlertDialog>
          <TableCell className="w-[60px]">
            <form action={handleChecked} className="flex items-center gap-2">
              <Checkbox type="submit" checked={task.completed} />
              <p>{task.completed ? 'concluída' : 'pendente'}</p>
            </form>
          </TableCell>
          <TableCell
            className={clsx(
              'font-medium text-center',
              task.completed && 'line-through',
            )}
          >
            {task.name}
          </TableCell>
          <TableCell className={clsx(task.completed && 'line-through')}>
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

          <DeleteTask taskId={task.taskId} />
          <EditTask
            taskId={task.taskId}
            name={task.name}
            description={task.description ? task.description : ''}
            completed={task.completed}
          />
        </AlertDialog>
      </Sheet>
    </TableRow>
  )
}
