export default function Footer() {
	return (
		<footer className="text-center py-4 border-t-2 border-accent-pink mt-8 text-sm">
			<div className="my-3 space-y-1">
				<p className="text-accent-lime">【外部リンク】</p>
				<p>
					<a
						href="https://github.com/flathill404"
						target="_blank"
						rel="noopener noreferrer"
					>
						► GitHub
					</a>
					{" | "}
					<a
						href="https://x.com/flathill404"
						target="_blank"
						rel="noopener noreferrer"
					>
						► X (Twitter)
					</a>
				</p>
			</div>

			<p className="text-accent-pink my-2">
				あなたは <span className="text-accent-yellow font-bold">{}</span>{" "}
				人目の訪問者です
			</p>

			<p className="text-gray-400 my-2">Last Update: 2025-02-10</p>

			<p className="text-gray-400">
				&copy; {new Date().getFullYear()} flathill404
			</p>
		</footer>
	);
}
