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
		<div className="flex flex-col items-center">
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className="group relative w-32 perspective-[1000px]"
			>
				<div className="relative h-48 w-full transition-all duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(0deg)] [transform:rotateY(-24deg)]">
					<div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-700 translate-z-[-6px] translate-x-[4px] rounded shadow-xl" />

					<div className="absolute inset-0 overflow-hidden rounded shadow-sm bg-zinc-100 dark:bg-zinc-800 border-l border-zinc-300 dark:border-zinc-600">
						{hasImage && book.og_image ? (
							<>
								<div className="absolute inset-0 w-full h-full scale-125 blur-md opacity-50">
									<Image
										src={book.og_image}
										alt=""
										fill
										className="object-cover"
										aria-hidden="true"
										unoptimized={false}
									/>
								</div>

								<div className="relative z-10 w-full h-full flex items-center justify-center">
									<div className="relative w-full h-full">
										<Image
											src={book.og_image}
											alt={book.title}
											fill
											className="object-contain shadow-sm"
											loading="lazy"
										/>
									</div>
								</div>
							</>
						) : (
							<div className="flex items-center justify-center w-full h-full relative z-10">
								<span className="text-xs text-zinc-400 text-center px-1">
									No Image
								</span>
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
}
