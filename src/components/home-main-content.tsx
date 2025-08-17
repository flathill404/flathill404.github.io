import { NavLink } from '@/components/ui/nav-link'
import { DynamicIcon } from 'lucide-react/dynamic'
import type { IconName } from 'lucide-react/dynamic'

const navLinks: {
  href: string
  label: string
  icon: IconName
}[] = [
  { href: '/articles', label: 'articles', icon: 'newspaper' },
  { href: '/blogs', label: 'blogs', icon: 'notebook' },
  { href: '/utils', label: 'utils', icon: 'app-window' },
] as const

export const HomeMainContent = () => {
  return (
    <main className="flex flex-col items-center gap-8">
      <ul className="text-center">
        <li className="mb-2 text-xl">Welcome!!</li>
        <li>This is flathill404&apos;s personal website.</li>
      </ul>
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-center">
        {navLinks.map((link) => (
          <li key={link.href}>
            <NavLink href={link.href}>
              <DynamicIcon name={link.icon} size={24} />
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </main>
  )
}
