"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type ToolItem = {
	id: string;
	name: string;
	href: string;
};

type ToolCategory = {
	id: string;
	name: string;
	items: ToolItem[];
};

const categories: ToolCategory[] = [
	{
		id: "development",
		name: "開発ツール",
		items: [
			{
				id: "json-formatter",
				name: "JSON Formatter",
				href: "/tools/json-formatter",
			},
			{ id: "regex-tester", name: "Regex Tester", href: "/tools/regex-tester" },
			{ id: "base64", name: "Base64 Encoder", href: "/tools/base64" },
			{ id: "uuid", name: "UUID Generator", href: "/tools/uuid" },
		],
	},
	{
		id: "music",
		name: "音楽ツール",
		items: [
			{
				id: "bpm-counter",
				name: "BPM Counter",
				href: "/tools/music/bpm-counter",
			},
			{ id: "metronome", name: "メトロノーム", href: "/tools/music/metronome" },
			{
				id: "melody-gen",
				name: "メロディジェネレーター",
				href: "/tools/music/melody-gen",
			},
		],
	},
];

export default function ToolsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<div className="space-y-4">
			<h2 className="text-center text-accent-yellow font-bold my-4">
				★ ツールBOX ★
			</h2>

			<div className="border-2 border-accent-pink p-3 text-sm">
				{categories.map((category) => (
					<div key={category.id} className="mb-3">
						<p className="text-accent-lime font-bold mb-1">
							【{category.name}】
						</p>
						<div className="space-y-1 pl-2">
							{category.items.map((item) => {
								const isActive = pathname === item.href;
								return (
									<div key={item.id}>
										<Link
											href={item.href}
											className={isActive ? "text-accent-pink font-bold" : ""}
										>
											► {item.name}
											{isActive && " ◄いまココ"}
										</Link>
									</div>
								);
							})}
						</div>
					</div>
				))}
			</div>

			<div className="text-accent-cyan text-xs text-center my-2">
				☆━━━━━━━━━━━━━━━━━━━━☆
			</div>

			{children}
		</div>
	);
}
