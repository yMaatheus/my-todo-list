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
import { Pencil2Icon } from '@radix-ui/react-icons'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

type Props = {
  id: string
  name: string
}

export function EditList({ id, name }: Props) {
  async function handleSubmit(formData: FormData) {
    'use server'

    const { name } = Object.fromEntries(formData) as { name: string }

    if (!name) return

    await fetch(`http://localhost:3333/list/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })

    revalidateTag('list')
    revalidatePath(`/dashboard/tasks/${id}`)
    redirect(`/dashboard/tasks/${id}?modal=close`)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8">
          <Pencil2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Lista</DialogTitle>
          <DialogDescription>Faça alterações na lista aqui.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form id="list-edit-form" action={handleSubmit}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={name}
                className="col-span-3"
              />
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button type="submit" form="list-edit-form">
            Salvar alterações
          </Button>
        </DialogFooter>
        <ModalClose />
      </DialogContent>
    </Dialog>
  )
}
