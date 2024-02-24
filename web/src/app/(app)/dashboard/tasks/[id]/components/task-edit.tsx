import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { revalidateTag } from 'next/cache'

type Props = {
  taskId: string
  name: string
  description: string
  hasCompleted: boolean
}

export function EditTask({ taskId, name, description, hasCompleted }: Props) {
  async function handleSubmit(formData: FormData) {
    'use server'

    const { name, description } = Object.fromEntries(formData) as {
      name: string
      description: string
    }

    if (!name || !description) return

    await fetch(`http://localhost:3333/task/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name, description, hasCompleted }),
    })

    revalidateTag('task')
  }

  return (
    <SheetContent>
      <form action={handleSubmit} id="task-edit-dialog-form">
        <SheetHeader>
          <SheetTitle>Editar Tarefa</SheetTitle>
          <SheetDescription>
            Faça as alterações necessárias e quando acabar clique em Salvar
            alterações
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-left">
              Nome
            </Label>
            <Input id="name" name="name" defaultValue={name} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-left">
              Descrição
            </Label>
            <Textarea
              id="description"
              name="description"
              className="resize-none h-64"
              defaultValue={description}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" form="task-edit-dialog-form">
              Salvar alterações
            </Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </SheetContent>
  )
}
