import Link from 'next/link'

type Props = {
  icon: React.ReactNode
  label: string
  href: string
}

export function NavItem({ icon, label, href }: Props) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 p-2 text-base hover:bg-muted"
    >
      {icon}
      {label}
    </Link>
  )
}
