import { revalidateTag } from 'next/cache'
import { AccordionContent } from '../ui/accordion'
import { NavBarCreateTaskForm } from './navbar-create-task-form'

export async function NavBarCreateTask() {
  async function handleSubmit(formData: FormData) {
    'use server'

    const { name } = Object.fromEntries(formData) as { name: string }

    if (!name) return

    await fetch('http://localhost:3333/list', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })

    revalidateTag('list')
  }

  return (
    <AccordionContent asChild>
      <form
        action={handleSubmit}
        className="flex flex-1 flex-row gap-4 items-center m-1 hover:no-underline p-0"
      >
        <NavBarCreateTaskForm />
      </form>
    </AccordionContent>
  )
}
