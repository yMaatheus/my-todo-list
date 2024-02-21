'use client'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function ModalClose() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const modal = searchParams.get('modal')

  useEffect(() => {
    if (modal === 'close') {
      document.getElementById('closeDialog')?.click()
      redirect(pathname)
    }
  }, [modal, pathname])
  return <></>
}
