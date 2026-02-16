import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDiaryEntry, getDiarySlugs } from "@/lib/diary";

type Props = {
	params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
	return getDiarySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const entry = await getDiaryEntry(slug);
	if (!entry) return { title: "日記 | flathill404のホームページ" };
	return {
		title: `${entry.title} | flathill404のホームページ`,
		description: `${entry.date}の日記`,
	};
}

export default async function DiaryEntryPage({ params }: Props) {
	const { slug } = await params;
	const entry = await getDiaryEntry(slug);
	if (!entry) notFound();

	return (
		<div className="space-y-4">
			<div className="text-center">
				<p className="text-accent-cyan text-sm">{entry.date}</p>
				<h2 className="text-accent-yellow font-bold my-2">
					★ {entry.title} ★
				</h2>
			</div>

			<div className="border-2 border-accent-pink p-4">
				<div
					className="diary-content"
					dangerouslySetInnerHTML={{ __html: entry.html }}
				/>
			</div>

			<div className="text-center text-sm">
				<Link href="/diary">{"<<< 日記一覧に戻る"}</Link>
			</div>
		</div>
	);
}
