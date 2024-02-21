'use client'
import { CheckIcon, ReloadIcon } from '@radix-ui/react-icons'
import { useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function NavBarCreateTaskForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { pending } = useFormStatus()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }, [pending])

  return (
    <>
      <Input
        className=" h-8"
        name="name"
        placeholder="Digite o nome da sua nova lista"
        ref={inputRef}
      />
      <Button
        type="submit"
        className="h-8"
        variant="outline"
        size="icon"
        disabled={pending}
      >
        {pending ? (
          <ReloadIcon className="h-4 w-4 animate-spin" />
        ) : (
          <CheckIcon className="w-4 h-4" />
        )}
      </Button>
    </>
  )
}
