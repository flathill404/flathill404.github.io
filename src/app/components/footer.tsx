import Image from 'next/image'

const socialLinks = [
  {
    href: 'https://twitter.com/flathill404',
    src: '/images/logos/x.svg',
    alt: 'X icon link',
  },
  {
    href: 'https://github.com/flathill404',
    src: '/images/logos/github-mark-white.svg',
    alt: 'Github icon link',
  },
]

const SocialLink = ({
  href,
  src,
  alt,
}: { href: string; src: string; alt: string }) => (
  <a
    className="flex items-center justify-center gap-2 rounded-lg p-2 transition-colors hover:bg-neutral-700"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image src={src} width="24" height="24" alt={alt} />
  </a>
)

export const Footer = () => {
  return (
    <footer className="flex flex-wrap items-center justify-center gap-6">
      {socialLinks.map((link) => (
        <SocialLink key={link.href} {...link} />
      ))}
    </footer>
  )
}
