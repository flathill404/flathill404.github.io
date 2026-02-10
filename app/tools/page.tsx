import Link from "next/link";

const allTools = [
	{
		category: "開発ツール",
		items: [
			{ name: "JSON Formatter", description: "JSONの整形と検証", href: "/tools/json-formatter" },
			{ name: "Regex Tester", description: "正規表現のテスト", href: "/tools/regex-tester" },
			{ name: "Base64 Encoder", description: "Base64のエンコード・デコード", href: "/tools/base64" },
			{ name: "UUID Generator", description: "UUIDの生成", href: "/tools/uuid" },
		],
	},
	{
		category: "音楽ツール",
		items: [
			{ name: "BPM Counter", description: "タップでBPMを計測", href: "/tools/music/bpm-counter" },
			{ name: "メトロノーム", description: "Web Audio APIを使ったメトロノーム", href: "/tools/music/metronome" },
			{ name: "メロディジェネレーター", description: "MIDIメロディの生成とダウンロード", href: "/tools/music/melody-gen" },
		],
	},
];

export default function ToolsPage() {
	return (
		<div className="space-y-4">
			<p className="text-center text-sm">
				便利なツールを集めました。ご自由にお使いください。
			</p>

			{allTools.map((category) => (
				<div key={category.category} className="mb-4">
					<h3 className="text-accent-lime font-bold text-sm mb-2">
						【{category.category}】
					</h3>
					<div className="space-y-2 pl-2">
						{category.items.map((tool) => (
							<div key={tool.name} className="text-sm">
								<Link href={tool.href}>
									► {tool.name}
								</Link>
								<span className="text-gray-400"> - {tool.description}</span>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
