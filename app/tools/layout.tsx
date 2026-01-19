"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsCodeSlash, BsList, BsMusicNoteBeamed, BsX } from "react-icons/bs";

type ToolCategory = {
	id: string;
	name: string;
	icon: React.ReactNode;
	items: {
		id: string;
		name: string;
		href: string;
	}[];
};

const categories: ToolCategory[] = [
	{
		id: "development",
		name: "Development",
		icon: <BsCodeSlash />,
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
		name: "Music",
		icon: <BsMusicNoteBeamed />,
		items: [
			{ id: "bpm-counter", name: "BPM Counter", href: "/tools/bpm-counter" },
			{ id: "scale-finder", name: "Scale Finder", href: "/tools/scale-finder" },
			{ id: "metronome", name: "Metronome", href: "/tools/metronome" },
			{
				id: "melody-gen",
				name: "Melody Generator",
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
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<div className="min-h-screen bg-[#0a0a0a] text-white flex">
			{/* Mobile Sidebar Overlay */}
			<div
				className={`fixed inset-0 bg-black/50 z-40 lg:hidden ${
					isSidebarOpen ? "block" : "hidden"
				}`}
				onClick={() => setIsSidebarOpen(false)}
			/>

			{/* Sidebar */}
			<aside
				className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#111] border-r border-white/10 transform transition-transform duration-200 ease-in-out ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				}`}
			>
				<div className="p-4 border-b border-white/10 flex justify-between items-center">
					<Link
						href="/tools"
						className="flex items-center gap-2 font-bold text-xl tracking-tight"
					>
						<span className="text-purple-500">My</span>Tools
					</Link>
					<button
						type="button"
						onClick={() => setIsSidebarOpen(false)}
						className="lg:hidden p-2 text-gray-400 hover:text-white"
					>
						<BsX size={24} />
					</button>
				</div>

				<nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-65px)]">
					{categories.map((category) => (
						<div key={category.id}>
							<div className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-2 px-2">
								{category.icon}
								<span>{category.name}</span>
							</div>
							<ul className="space-y-1">
								{category.items.map((item) => {
									const isActive = pathname === item.href;
									return (
										<li key={item.id}>
											<Link
												href={item.href}
												className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
													isActive
														? "bg-purple-500/10 text-purple-400"
														: "text-gray-300 hover:bg-white/5 hover:text-white"
												}`}
											>
												{item.name}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</nav>
			</aside>

			{/* Main Content */}
			<div className="flex-1 flex flex-col min-w-0">
				<header className="lg:hidden p-4 border-b border-white/10 flex items-center bg-[#111]">
					<button
						type="button"
						onClick={() => setIsSidebarOpen(true)}
						className="p-2 text-gray-400 hover:text-white mr-4"
					>
						<BsList size={24} />
					</button>
					<span className="font-bold">Tools</span>
				</header>

				<main className="flex-1 p-4 lg:p-8 overflow-y-auto relative">
					{/* Background Gradients (Simplified) */}
					<div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
						<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
						<div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
					</div>

					{children}
				</main>
			</div>
		</div>
	);
}
