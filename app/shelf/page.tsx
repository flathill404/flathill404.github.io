import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Shelf | flathill404",
    description: "A list of books I have read.",
};

const books = [
    {
        title: "チェンソーマン",
        author: "藤本タツキ",
        comment: "最高の漫画じゃ！猫も出てくるしな！",
    },
    {
        title: "リーダブルコード",
        author: "Dustin Boswell",
        comment: "人間が読むためのコードを書けということらしいな。",
    },
    {
        title: "ドメイン駆動設計入門",
        author: "成瀬允宣",
        comment: "難しいが、これを読むと強くなれる気がするぞ。",
    },
];

export default function ShelfPage() {
    return (
        <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col py-32 px-8 bg-white dark:bg-black">
                <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
                    Book Shelf
                </h1>

                <div className="space-y-6">
                    {books.map((book, index) => (
                        <div
                            key={index}
                            className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                        >
                            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
                                {book.title}
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-2">
                                {book.author}
                            </p>
                            <p className="text-zinc-700 dark:text-zinc-300">
                                {book.comment}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}