import Image from "next/image";
import Link from "next/link";

export default function Header() {
	return (
		<header className="text-center py-4 border-b-2 border-accent-pink mb-4">
			<div className="mb-2">
				<Image
					src="/images/ducks/duck.webp"
					alt="flathill404"
					width={64}
					height={64}
					className="mx-auto border-2 border-accent-cyan mb-2"
					priority
				/>
				<h1 className="text-xl font-bold animate-rainbow">
					★☆★ flathill404のホームページ ★☆★
				</h1>
			</div>

			<div className="overflow-hidden whitespace-nowrap my-2 border border-accent-cyan py-1">
				<span className="inline-block animate-marquee text-accent-yellow text-sm">
					♪♪♪ ようこそ！flathill404のホームページへ！ ごゆっくりどうぞ♪♪♪
				</span>
			</div>

			<nav className="flex justify-center gap-4 text-sm mt-2">
				<Link href="/">★ ホーム</Link>
				<span className="text-accent-pink">|</span>
				<Link href="/shelf">★ 本棚</Link>
				<span className="text-accent-pink">|</span>
				<Link href="/tools">★ ツール</Link>
			</nav>
		</header>
	);
}
