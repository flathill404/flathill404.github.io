
const navLinks = [
  { href: '/articles', label: 'articles' },
  { href: '/blogs', label: 'blogs' },
  { href: '/utils', label: 'utils' },
]

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <a
      className="rounded-lg border border-neutral-800 bg-neutral-800 p-2 transition-colors hover:bg-neutral-700"
      href={href}
    >
      {label}
    </a>
  </li>
)

export const HomeMainContent = () => {
  return (
    <main className="flex flex-col items-center gap-8">
      <ul className="text-center">
        <li className="mb-2">Welcome!!</li>
        <li>This is flathill404&apos;s personal website.</li>
      </ul>
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-center">
        {navLinks.map((link) => (
          <NavLink key={link.href} {...link} />
        ))}
      </ul>
    </main>
  )
}
