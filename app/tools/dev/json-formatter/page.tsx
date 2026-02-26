"use client";

import { useState } from "react";
import { FiCopy, FiTrash2 } from "react-icons/fi";

export default function JsonFormatter() {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [error, setError] = useState<string | null>(null);

	const formatJson = (spaces: number) => {
		try {
			if (!input.trim()) return;
			const parsed = JSON.parse(input);
			setOutput(JSON.stringify(parsed, null, spaces));
			setError(null);
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "Invalid JSON");
		}
	};

	const minifyJson = () => {
		try {
			if (!input.trim()) return;
			const parsed = JSON.parse(input);
			setOutput(JSON.stringify(parsed));
			setError(null);
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "Invalid JSON");
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(output);
	};

	return (
		<div className="space-y-6 animate-in fade-in duration-500">
			<div className="flex flex-col md:flex-row gap-4">
				<div className="flex-1 space-y-2">
					<div className="flex justify-between items-center text-accent-cyan font-bold">
						<label htmlFor="json-input">入力 (Input JSON)</label>
						<button
							type="button"
							onClick={() => {
								setInput("");
								setOutput("");
								setError(null);
							}}
							className="text-accent-pink hover:text-white flex items-center gap-1 text-sm border border-accent-pink px-2 py-1 rounded transition-colors"
						>
							<FiTrash2 /> Clear
						</button>
					</div>
					<textarea
						id="json-input"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="w-full h-[500px] bg-[#000033] border-2 border-accent-cyan text-white p-4 font-mono text-sm focus:outline-none focus:border-accent-lime"
						placeholder='{"hello": "world"}'
					/>
					{error && (
						<div className="text-red-400 text-sm mt-1 bg-red-900/50 p-2 border-l-4 border-red-500 font-mono">
							エラー: {error}
						</div>
					)}
				</div>

				<div className="flex flex-row md:flex-col gap-2 justify-center pb-8 flex-wrap">
					<button
						type="button"
						onClick={() => formatJson(2)}
						className="bg-accent-cyan text-[#000033] font-bold py-2 px-4 hover:bg-white transition-colors border-2 border-accent-cyan hover:border-white shadow-[0_0_10px_rgba(0,255,255,0.5)]"
					>
						Format (2 spaces)
					</button>
					<button
						type="button"
						onClick={() => formatJson(4)}
						className="bg-accent-cyan text-[#000033] font-bold py-2 px-4 hover:bg-white transition-colors border-2 border-accent-cyan hover:border-white shadow-[0_0_10px_rgba(0,255,255,0.5)]"
					>
						Format (4 spaces)
					</button>
					<button
						type="button"
						onClick={minifyJson}
						className="bg-accent-yellow text-[#000033] font-bold py-2 px-4 hover:bg-white transition-colors border-2 border-accent-yellow hover:border-white shadow-[0_0_10px_rgba(255,255,0,0.5)]"
					>
						Minify
					</button>
				</div>

				<div className="flex-1 space-y-2">
					<div className="flex justify-between items-center text-accent-lime font-bold">
						<label htmlFor="json-output">出力 (Output JSON)</label>
						<button
							type="button"
							onClick={handleCopy}
							disabled={!output}
							className="text-accent-lime hover:text-white disabled:opacity-50 disabled:hover:text-accent-lime flex items-center gap-1 text-sm border border-accent-lime px-2 py-1 rounded transition-colors"
						>
							<FiCopy /> Copy
						</button>
					</div>
					<textarea
						id="json-output"
						value={output}
						readOnly
						className="w-full h-[500px] bg-[#000033] border-2 border-accent-lime text-white p-4 font-mono text-sm focus:outline-none"
						placeholder="結果がここに表示されます..."
					/>
				</div>
			</div>
		</div>
	);
}
