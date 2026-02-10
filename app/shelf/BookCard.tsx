import Image from "next/image";

type Book = {
	title: string;
	url: string;
	published_at?: string;
	og_url: string | null;
	og_image: string | null;
};

type BookCardProps = {
	book: Book;
};

export function BookCard({ book }: BookCardProps) {
	const link = book.og_url ? book.og_url : book.url;
	const hasImage = !!book.og_image;

	return (
		<div className="border border-accent-pink p-2 text-center">
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className="block"
			>
				<div className="relative h-36 w-full mb-2 border border-accent-cyan/30 bg-[#000044]">
					{hasImage && book.og_image ? (
						<Image
							src={book.og_image}
							alt={book.title}
							fill
							className="object-contain"
							loading="lazy"
						/>
					) : (
						<div className="flex items-center justify-center w-full h-full">
							<span className="text-xs text-accent-cyan">No Image</span>
						</div>
					)}
				</div>
				<span className="text-xs break-words hover:text-accent-pink">
					{book.title}
				</span>
			</a>
		</div>
	);
}
