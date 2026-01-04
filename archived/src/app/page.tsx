import { Footer } from '@/components/footer'
import { HomeMainContent } from '@/components/home-main-content'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[48px_1fr_32px] items-center justify-items-center gap-1 pb-20">
      {/* todo: component */}
      <header className="sticky top-0 flex w-full items-center gap-2 border-b-2 px-4 py-2 shadow bg-background">
        <Link href="/">
          <Avatar>
            <AvatarImage src="/images/ducks/duck.webp" />
            <AvatarFallback>FH</AvatarFallback>
          </Avatar>
        </Link>
        <span>quack...</span>
      </header>

      <HomeMainContent />

      <Footer />
    </div>
  )
}
