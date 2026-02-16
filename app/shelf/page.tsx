import type { Metadata } from "next";
import { BookCard } from "./BookCard";
import booksData from "./books.json";

export const metadata: Metadata = {
	title: "本棚 | flathill404のホームページ",
	description: "読んだ本の一覧です。",
};

export default function ShelfPage() {
	const books = Array.isArray(booksData)
		? booksData.sort((a, b) => {
				if (!a.published_at) return 1;
				if (!b.published_at) return -1;
				return b.published_at.localeCompare(a.published_at);
			})
		: [];

	return (
		<div className="space-y-4">
			<h2 className="text-center text-accent-yellow font-bold my-4">
				★ 本棚 ★
			</h2>
			<p className="text-center text-sm text-accent-cyan">
				読んだ本の一覧です。クリックで詳細が見れます。
			</p>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{books.map((book) => (
					<BookCard key={book.url} book={book} />
				))}
			</div>
		</div>
	);
}
