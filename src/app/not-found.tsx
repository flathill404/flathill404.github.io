import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="grid min-h-screen grid-rows-[32px_1fr_32px] items-center justify-items-center gap-16 p-8 pb-20">
      <div />
      <div className="text-center">
        <h2>404 | Not Found</h2>
        <Image
          unoptimized
          className="m-4 rounded-full"
          src="/images/errors/404.webp"
          width="256"
          height="256"
          alt="not found"
        />
        <Link href="/">Return Home?</Link>
      </div>
    </div>
  )
}
