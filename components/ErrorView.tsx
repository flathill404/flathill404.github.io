import Image from "next/image";
import Link from "next/link";

interface ErrorViewProps {
	imageSrc: string;
	altText: string;
	message?: string;
	title?: string;
}

export default function ErrorView({
	imageSrc,
	altText,
	message,
	title = "Error",
}: ErrorViewProps) {
	return (
		<div className="text-center py-8 space-y-4">
			<div className="text-accent-cyan text-xs my-2">
				☆━━━━━━━━━━━━━━━━━━━━☆
			</div>

			<h1 className="text-2xl font-bold text-accent-pink animate-blink">
				‼！ {title} ‼！
			</h1>

			<div className="w-48 mx-auto border-2 border-accent-pink p-1">
				<Image
					src={imageSrc}
					alt={altText}
					width={800}
					height={600}
					className="w-full h-auto object-contain"
					priority
				/>
			</div>

			{message && <p className="text-accent-yellow text-sm">{message}</p>}

			<div className="my-4">
				<Link href="/" className="text-accent-cyan">
					{">>> ホームに戻る <<<"}
				</Link>
			</div>

			<div className="text-accent-cyan text-xs my-2">
				☆━━━━━━━━━━━━━━━━━━━━☆
			</div>
		</div>
	);
}
