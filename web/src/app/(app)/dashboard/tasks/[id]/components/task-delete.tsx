import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { revalidateTag } from 'next/cache'

type Props = {
  taskId: string
}

export function DeleteTask({ taskId }: Props) {
  async function handleSubmit() {
    'use server'

    await fetch(`http://localhost:3333/task/${taskId}`, {
      method: 'DELETE',
    })

    revalidateTag('task')
  }

  return (
    <AlertDialogContent>
      <form action={handleSubmit}>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja excluir essa tarefa?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction type="submit">Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  )
}
