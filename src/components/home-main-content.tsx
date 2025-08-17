
import { NavLink } from '@/components/ui/nav-link'

const navLinks = [
  { href: '/articles', label: 'articles' },
  { href: '/blogs', label: 'blogs' },
  { href: '/utils', label: 'utils' },
]

export const HomeMainContent = () => {
  return (
    <main className="flex flex-col items-center gap-8">
      <ul className="text-center">
        <li className="mb-2">Welcome!!</li>
        <li>This is flathill404&apos;s personal website.</li>
      </ul>
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-center">
        {navLinks.map((link) => (
          <li key={link.href}>
            <NavLink href={link.href}>{link.label}</NavLink>
          </li>
        ))}
      </ul>
    </main>
  )
}
