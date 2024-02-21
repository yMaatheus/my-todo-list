import { ModalClose } from '@/components/modal-close'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PlusIcon } from '@radix-ui/react-icons'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export function CreateTask({ id }: { id: string }) {
  async function handleSubmit(formData: FormData) {
    'use server'

    const { name, description } = Object.fromEntries(formData) as {
      name: string
      description: string
    }

    if (!name || !description) return

    await fetch(`http://localhost:3333/task/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    })

    revalidatePath(`/dashboard/tasks/${id}`)
    redirect(`/dashboard/tasks/${id}?modal=close`)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleSubmit} id="task-create-dialog-form">
          <DialogHeader>
            <DialogTitle>Criar Tarefa</DialogTitle>
            <DialogDescription>Crie uma tarefa para a lista.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Textarea
                id="description"
                name="description"
                className="col-span-3 resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" form="task-create-dialog-form">
              Salvar alterações
            </Button>
          </DialogFooter>
          <ModalClose />
        </form>
      </DialogContent>
    </Dialog>
  )
}
