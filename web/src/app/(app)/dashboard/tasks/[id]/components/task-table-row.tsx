import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
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
import { TaskTableCheckBox } from './task-table-checkbox'

type Props = {
  task: Task
}

export function TaskTableRow({ task }: Props) {
  const hasCompletedTask = task.hasCompleted
  const hasTaskDescription = Boolean(task.description)
  const description = task.description
    ?.split('\n')
    ?.map((item, index) => <p key={index}>{item}</p>)

  async function handleChecked() {
    'use server'

    await fetch(`http://localhost:3333/task/${task.taskId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: task.name,
        description: hasTaskDescription && task.description,
        hasCompleted: !task.hasCompleted,
      }),
    })

    revalidateTag('task')
  }
  return (
    <TableRow className={clsx(hasCompletedTask && 'bg-muted/50')}>
      <Sheet>
        <AlertDialog>
          <TableCell className="w-[60px]">
            <form action={handleChecked} className="flex items-center gap-2">
              <TaskTableCheckBox task={task} />
            </form>
          </TableCell>
          <TableCell
            className={clsx(
              'font-medium text-center',
              hasCompletedTask && 'line-through',
            )}
          >
            {task.name}
          </TableCell>
          <TableCell className={clsx(hasCompletedTask && 'line-through')}>
            {hasTaskDescription && description}
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
            hasCompleted={hasCompletedTask}
          />
        </AlertDialog>
      </Sheet>
    </TableRow>
  )
}
