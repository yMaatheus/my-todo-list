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

export function EditTask({
  name,
  description,
}: {
  name: string
  description: string
}) {
  return (
    <SheetContent>
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
          <Input id="name" value={name} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description" className="text-left">
            Descrição
          </Label>
          <Textarea
            id="description"
            className="resize-none"
            value={description}
          />
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Salvar alterações</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}
