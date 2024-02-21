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

export function DeleteTask({ taskId }: { taskId: string }) {
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
