"use client";

import Link from "next/link";
import {
	BsArrowRight,
	BsCodeSlash,
	BsMusicNoteBeamed,
	BsTerminal,
} from "react-icons/bs";

const allTools = [
	{
		category: "Development",
		icon: <BsCodeSlash className="w-6 h-6" />,
		items: [
			{
				id: "json-formatter",
				name: "JSON Formatter",
				description: "Format and validate JSON data",
				href: "/tools/json-formatter",
			},
			{
				id: "regex-tester",
				name: "Regex Tester",
				description: "Test and debug regular expressions",
				href: "/tools/regex-tester",
			},
			{
				id: "base64",
				name: "Base64 Encoder",
				description: "Encode and decode Base64 strings",
				href: "/tools/base64",
			},
			{
				id: "uuid",
				name: "UUID Generator",
				description: "Generate unique identifiers",
				href: "/tools/uuid",
			},
		],
	},
	{
		category: "Music",
		icon: <BsMusicNoteBeamed className="w-6 h-6" />,
		items: [
			{
				id: "bpm-counter",
				name: "BPM Counter",
				description: "Calculate beats per minute",
				href: "/tools/bpm-counter",
			},
			{
				id: "scale-finder",
				name: "Scale Finder",
				description: "Find musical scales and modes",
				href: "/tools/scale-finder",
			},
			{
				id: "metronome",
				name: "Metronome",
				description: "Simple metronome for practice",
				href: "/tools/metronome",
			},
			{
				id: "melody-gen",
				name: "Melody Generator",
				description: "Generate and download MIDI melodies",
				href: "/tools/music/melody-gen",
			},
		],
	},
];

export default function ToolsPage() {
	return (
		<div className="max-w-5xl mx-auto space-y-12">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">My Tools</h1>
				<p className="text-gray-400">
					A collection of useful developer and music utilities.
				</p>
			</div>

			{allTools.map((category) => (
				<section key={category.category} className="space-y-6">
					<div className="flex items-center gap-3 text-xl font-semibold text-gray-200 border-b border-white/10 pb-2">
						<span className="text-purple-500">{category.icon}</span>
						<h2>{category.category}</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{category.items.map((tool) => (
							<Link
								key={tool.id}
								href={tool.href}
								className="group p-5 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300"
							>
								<div className="flex justify-between items-start mb-3">
									<div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
										<BsTerminal size={20} />
									</div>
									<BsArrowRight className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
								</div>
								<h3 className="font-semibold text-lg mb-1 group-hover:text-purple-300 transition-colors">
									{tool.name}
								</h3>
								<p className="text-sm text-gray-400 leading-relaxed">
									{tool.description}
								</p>
							</Link>
						))}
					</div>
				</section>
			))}
		</div>
	);
}
