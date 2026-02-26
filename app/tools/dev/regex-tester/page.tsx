"use client";

import { useMemo, useState } from "react";

export default function RegexTester() {
	const [pattern, setPattern] = useState("");
	const [flags, setFlags] = useState("g");
	const [testString, setTestString] = useState("");

	const { matches, error, highlightedElements } = useMemo(() => {
		if (!pattern)
			return { matches: [], error: null, highlightedElements: null };

		try {
			const regex = new RegExp(pattern, flags);
			const matchesArray = [];
			const highlighted = [];

			if (flags.includes("g")) {
				let match: RegExpExecArray | null = null;
				const str = testString;
				let lastIndex = 0;
				let safeCounter = 0;

				while (safeCounter <= 5000) {
					match = regex.exec(str);
					if (match === null) break;

					matchesArray.push(match);
					highlighted.push({
						text: str.slice(lastIndex, match.index),
						isMatch: false,
					});
					highlighted.push({ text: match[0], isMatch: true });
					lastIndex = regex.lastIndex;
					if (match.index === regex.lastIndex) regex.lastIndex++; // Handle zero-length matches

					safeCounter++;
				}
				highlighted.push({ text: str.slice(lastIndex), isMatch: false });
			} else {
				const match = regex.exec(testString);
				if (match) {
					matchesArray.push(match);
					highlighted.push({
						text: testString.slice(0, match.index),
						isMatch: false,
					});
					highlighted.push({ text: match[0], isMatch: true });
					highlighted.push({
						text: testString.slice(match.index + match[0].length),
						isMatch: false,
					});
				} else {
					highlighted.push({ text: testString, isMatch: false });
				}
			}

			const elements = highlighted.map((chunk) => {
				const id = crypto.randomUUID();
				return chunk.isMatch ? (
					<mark
						key={id}
						className="bg-accent-pink text-[#000033] rounded-sm py-0.5"
					>
						{chunk.text}
					</mark>
				) : (
					<span key={id}>{chunk.text}</span>
				);
			});

			return {
				matches: matchesArray,
				error: null,
				highlightedElements: elements,
			};
		} catch (e: unknown) {
			return {
				matches: [],
				error: e instanceof Error ? e.message : "Invalid Regular Expression",
				highlightedElements: null,
			};
		}
	}, [pattern, flags, testString]);

	return (
		<div className="space-y-6 animate-in fade-in duration-500">
			<div className="space-y-4 bg-[#000044] p-4 border-2 border-accent-cyan rounded-xl">
				<div className="flex flex-col md:flex-row gap-4 items-center text-xl">
					<div className="flex-1 flex w-full items-center gap-2">
						<span className="text-accent-cyan font-bold text-2xl">/</span>
						<input
							type="text"
							value={pattern}
							onChange={(e) => setPattern(e.target.value)}
							className="flex-1 bg-[#000033] border-b-2 border-accent-cyan text-white p-2 font-mono focus:outline-none focus:border-accent-pink"
							placeholder="正規表現パターン (例: [a-z]+)"
						/>
						<span className="text-accent-cyan font-bold text-2xl">/</span>
					</div>
					<div className="w-full md:w-auto flex items-center gap-2">
						<input
							type="text"
							value={flags}
							onChange={(e) => setFlags(e.target.value)}
							className="w-full md:w-24 bg-[#000033] border-b-2 border-accent-cyan text-white p-2 font-mono focus:outline-none focus:border-accent-pink text-center"
							placeholder="flags (g, i, m...)"
						/>
					</div>
				</div>
				{error && (
					<div className="text-red-400 text-sm bg-red-900/50 p-2 border-l-4 border-red-500 font-mono">
						エラー: {error}
					</div>
				)}
			</div>

			<div className="flex flex-col lg:flex-row gap-4">
				<div className="flex-1 space-y-2">
					<label htmlFor="test-string" className="text-accent-lime font-bold">
						テスト文字列 (Test String)
					</label>
					<textarea
						id="test-string"
						value={testString}
						onChange={(e) => setTestString(e.target.value)}
						className="w-full h-64 bg-[#000033] border-2 border-accent-lime text-white p-4 font-mono focus:outline-none focus:border-accent-yellow"
						placeholder="ここにテストする文字列を入力..."
					/>
				</div>

				<div className="flex-1 space-y-2">
					<div className="text-accent-pink font-bold">
						ハイライト結果 (Highlight)
					</div>
					<div className="w-full h-64 bg-[#000033] border-2 border-accent-pink text-white p-4 font-mono whitespace-pre-wrap break-words overflow-y-auto">
						{testString ? (
							highlightedElements || testString
						) : (
							<span className="text-gray-500">結果がここに表示されます...</span>
						)}
					</div>
				</div>
			</div>

			<div className="space-y-4 border-2 border-accent-yellow p-4 rounded-xl">
				<h3 className="text-accent-yellow font-bold text-lg flex items-center justify-between">
					<span>マッチした結果 (Matches):</span>
					<span className="bg-accent-yellow text-[#000033] px-3 py-1 rounded-full text-sm">
						{matches.length}件
					</span>
				</h3>
				{matches.length > 0 ? (
					<ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
						{matches.map((m, i) => {
							const matchId = crypto.randomUUID();
							return (
								<li
									key={matchId}
									className="text-sm font-mono bg-[#000055] p-3 rounded border border-accent-yellow/30 break-all"
								>
									<div className="text-accent-pink font-bold border-b border-accent-pink/30 pb-1 mb-2">
										Match {i + 1}
									</div>
									<div className="text-white bg-[#000033] p-2 rounded">
										{m[0]}
									</div>
									{m.length > 1 && (
										<div className="pl-4 mt-3 border-l-2 border-accent-cyan space-y-2">
											{Array.from(m)
												.slice(1)
												.map((g, j) => {
													const groupId = crypto.randomUUID();
													return (
														<div
															key={groupId}
															className="text-accent-cyan text-xs"
														>
															Group {j + 1}:{" "}
															<code className="bg-[#000033] text-white px-2 py-1 rounded ml-1">
																{g !== undefined ? g : "undefined"}
															</code>
														</div>
													);
												})}
										</div>
									)}
								</li>
							);
						})}
					</ul>
				) : (
					<p className="text-gray-400 text-sm italic">
						該当するマッチはありません
					</p>
				)}
			</div>
		</div>
	);
}
