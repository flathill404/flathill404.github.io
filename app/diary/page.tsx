import type { Metadata } from "next";
import Link from "next/link";
import { getAllDiaryEntries } from "@/lib/diary";

export const metadata: Metadata = {
	title: "日記 | flathill404のホームページ",
	description: "flathill404の日記です。",
};

export default function DiaryPage() {
	const entries = getAllDiaryEntries();

	const grouped = entries.reduce<Record<string, typeof entries>>(
		(acc, entry) => {
			const [year, month] = entry.date.split("-");
			const key = `${year}年${month}月`;
			if (!acc[key]) acc[key] = [];
			acc[key].push(entry);
			return acc;
		},
		{},
	);

	return (
		<div className="space-y-4">
			<h2 className="text-center text-accent-yellow font-bold my-4">
				★ 日記 ★
			</h2>
			<p className="text-center text-sm text-accent-cyan">日々の記録です。</p>

			{Object.keys(grouped).length === 0 ? (
				<p className="text-center text-sm text-gray-400">
					まだ日記がありません。
				</p>
			) : (
				Object.entries(grouped).map(([monthLabel, monthEntries]) => (
					<div key={monthLabel} className="mb-4">
						<h3 className="text-accent-lime font-bold text-sm mb-2">
							【{monthLabel}】
						</h3>
						<div className="space-y-1 pl-2">
							{monthEntries.map((entry) => (
								<div key={entry.slug} className="text-sm">
									<Link href={`/diary/${entry.slug}`}>► {entry.date}</Link>
									<span className="text-gray-400"> - {entry.title}</span>
								</div>
							))}
						</div>
					</div>
				))
			)}
		</div>
	);
}
