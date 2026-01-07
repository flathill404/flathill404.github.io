import type { Metadata } from "next";
import booksData from "./books.json";

export const metadata: Metadata = {
    title: "Book Shelf | flathill404",
    description: "A list of books I have read.",
};

export default function ShelfPage() {
    // booksData is imported as an array
    const books = Array.isArray(booksData)
        ? booksData
              .sort((a, b) => {
                  // sort by published_at ascending
                  if (!a.published_at) return 1;
                  if (!b.published_at) return -1;
                  return a.published_at.localeCompare(b.published_at);
              })
        : [];

    return (
        <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-5xl flex-col py-32 px-8 bg-white dark:bg-black">
                <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
                    Book Shelf
                </h1>
                <h2 className="text-zinc-700 dark:text-zinc-300 mb-8">
                    A list of books I have read.
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {books.map((book, index) => {
                        const link = book.og_url ? book.og_url : book.url;
                        return (
                            <div key={index} className="flex flex-col items-center">
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center w-full"
                                >
                                    {book.og_image ? (
                                        <img
                                            src={book.og_image}
                                            alt={book.title}
                                            className="rounded shadow-md object-contain w-32 h-48 bg-zinc-100 dark:bg-zinc-800"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-32 h-48 rounded shadow-md bg-zinc-100 dark:bg-zinc-800 border border-dashed border-zinc-300 dark:border-zinc-700">
                                            <span className="text-xs text-zinc-400 dark:text-zinc-600 text-center px-2">No Image</span>
                                        </div>
                                    )}
                                    <span className="mt-2 text-sm text-zinc-800 dark:text-zinc-200 text-center w-32 break-words font-medium">
                                        {book.title}
                                    </span>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}