import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

type Props = {
  listId: string
}

export function DeleteList({ listId }: Props) {
  async function handleDelete() {
    'use server'

    await fetch(`http://localhost:3333/list/${listId}`, {
      method: 'DELETE',
    })

    revalidateTag('list')
    redirect('/dashboard')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8">
          <TrashIcon className=" text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja excluir essa lista?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <form action={handleDelete}>
            <AlertDialogAction type="submit">Excluir</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
