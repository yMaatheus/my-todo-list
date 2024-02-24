'use client'
import { Checkbox } from '@/components/ui/checkbox'
import { Task } from '@/interfaces/task'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useFormStatus } from 'react-dom'

type Props = {
  task: Task
}

export function TaskTableCheckBox({ task }: Props) {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <ReloadIcon className="h-4 w-4 animate-spin" />
      ) : (
        <Checkbox type="submit" checked={task.hasCompleted} />
      )}
      <p>{task.hasCompleted ? 'concluída' : 'pendente'}</p>
    </>
  )
}
