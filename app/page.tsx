import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start gap-8">

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Welcome to flathill404.github.io!
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 sm:text-lg">
            This is the personal website of flathill404.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/shelf"
            className="rounded bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Go to Book Shelf
          </Link>
        </div>
      </main>
    </div>
  );
}