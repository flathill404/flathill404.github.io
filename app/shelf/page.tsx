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
                        const hasImage = !!book.og_image;

                        return (
                            <div key={index} className="flex flex-col items-center">
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-32 perspective-[1000px]"
                                >
                                    <div className="relative h-48 w-full transition-all duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(0deg)] [transform:rotateY(-24deg)]">


                                        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-700 translate-z-[-6px] translate-x-[4px] rounded shadow-xl" />

                                        <div className="absolute inset-0 overflow-hidden rounded shadow-sm bg-zinc-100 dark:bg-zinc-800 border-l border-zinc-300 dark:border-zinc-600">

                                            {hasImage ? (
                                                <>
                                                    <img
                                                        src={book.og_image}
                                                        alt=""
                                                        className="absolute inset-0 w-full h-full object-cover blur-md opacity-50 scale-125"
                                                        aria-hidden="true"
                                                    />

                                                    <div className="relative z-10 w-full h-full flex items-center justify-center p-1">
                                                        <img
                                                            src={book.og_image}
                                                            alt={book.title}
                                                            className="max-w-full max-h-full object-contain shadow-sm"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex items-center justify-center w-full h-full relative z-10">
                                                    <span className="text-xs text-zinc-400 text-center px-1">No Image</span>
                                                </div>
                                            )}


                                            <div className="absolute inset-0 z-20 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />
                                        </div>
                                    </div>

                                    <span className="mt-4 block text-sm text-zinc-800 dark:text-zinc-200 text-center w-full break-words font-medium transition-opacity group-hover:text-black dark:group-hover:text-white">
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