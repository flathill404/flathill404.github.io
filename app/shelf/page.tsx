import type { Metadata } from "next";
import { BookCard } from "./BookCard"; // 作ったコンポーネントをインポートじゃ！
import booksData from "./books.json";

export const metadata: Metadata = {
  title: "Book Shelf | flathill404",
  description: "A list of books I have read.",
};

export default function ShelfPage() {
  // booksData is imported as an array
  const books = Array.isArray(booksData)
    ? booksData.sort((a, b) => {
        if (!a.published_at) return 1;
        if (!b.published_at) return -1;
        return b.published_at.localeCompare(a.published_at);
      })
    : [];

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col p-8 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
          Book Shelf
        </h1>
        <h2 className="text-zinc-700 dark:text-zinc-300 mb-8">
          A list of books I have read.
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      </main>
    </div>
  );
}
