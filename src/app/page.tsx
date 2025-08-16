import Image from 'next/image'

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <ul className="text-center font-[family-name:var(--font-geist-mono)] text-sm sm:text-left">
          <li className="mb-2">Welcome!!</li>
          <li>This is flathill404&apos;s personal website.</li>
        </ul>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-center text-sm sm:justify-start">
          <li>
            <a
              className="rounded-lg border border-neutral-800 bg-neutral-800 p-2 transition-colors hover:bg-neutral-700"
              href="/notes"
            >
              notes
            </a>
          </li>
          <li>
            <a
              className="rounded-lg border border-neutral-800 bg-neutral-800 p-2 transition-colors hover:bg-neutral-700"
              href="/blogs"
            >
              blogs
            </a>
          </li>
          <li>
            <a
              className="rounded-lg border border-neutral-800 bg-neutral-800 p-2 transition-colors hover:bg-neutral-700"
              href="/utils"
            >
              utils
            </a>
          </li>
        </ul>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center justify-center gap-2 rounded-lg p-2 text-sm transition-colors hover:bg-neutral-700"
          href="https://twitter.com/flathill404"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/logos/x.svg"
            width="24"
            height="24"
            alt="X icon link"
          />
        </a>
        <a
          className="flex items-center justify-center gap-2 rounded-lg p-2 text-sm transition-colors hover:bg-neutral-700"
          href="https://github.com/flathill404"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/logos/github-mark-white.svg"
            width="24"
            height="24"
            alt="Github icon link"
          />
        </a>
      </footer>
    </div>
  )
}
