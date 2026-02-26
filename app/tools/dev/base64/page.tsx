"use client";

import { useEffect, useState } from "react";
import { FiCopy, FiRepeat, FiTrash2 } from "react-icons/fi";

const encodeBase64 = (text: string) => {
	const bytes = new TextEncoder().encode(text);
	const binString = Array.from(bytes, (byte) =>
		String.fromCodePoint(byte),
	).join("");
	return btoa(binString);
};

const decodeBase64 = (base64: string) => {
	const binString = atob(base64);
	const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0) ?? 0);
	return new TextDecoder().decode(bytes);
};

export default function Base64Encoder() {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [mode, setMode] = useState<"encode" | "decode">("encode");
	const [error, setError] = useState<string | null>(null);

	// Auto-process on input or mode change
	useEffect(() => {
		if (!input) {
			setOutput("");
			setError(null);
			return;
		}

		try {
			if (mode === "encode") {
				setOutput(encodeBase64(input));
			} else {
				setOutput(decodeBase64(input));
			}
			setError(null);
		} catch (e: unknown) {
			setError(
				`変換エラー: ${e instanceof Error ? e.message : "Invalid input"}`,
			);
			setOutput("");
		}
	}, [input, mode]);

	const handleCopy = () => {
		navigator.clipboard.writeText(output);
	};

	const toggleMode = () => {
		setMode(mode === "encode" ? "decode" : "encode");
		// Swap input and output for better UX
		if (!error && output) {
			setInput(output);
		}
	};

	return (
		<div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
			<div className="flex justify-center mb-8">
				<button
					type="button"
					onClick={toggleMode}
					className="group flex items-center gap-3 bg-[#000044] border-2 border-accent-cyan rounded-full px-6 py-3 hover:bg-accent-cyan hover:text-[#000033] transition-all font-bold text-lg"
				>
					<span
						className={
							mode === "encode"
								? "text-accent-pink group-hover:text-[#000033]"
								: "text-gray-400"
						}
					>
						Text
					</span>
					<FiRepeat
						className={`transition-transform duration-500 ${mode === "decode" ? "rotate-180" : ""}`}
					/>
					<span
						className={
							mode === "decode"
								? "text-accent-lime group-hover:text-[#000033]"
								: "text-gray-400"
						}
					>
						Base64
					</span>
				</button>
			</div>

			<div className="space-y-6">
				<div className="space-y-2">
					<div className="flex justify-between items-center text-accent-pink font-bold">
						<label htmlFor="base64-input">
							{mode === "encode" ? "テキストを入力" : "Base64文字列を入力"}
						</label>
						<button
							type="button"
							onClick={() => {
								setInput("");
								setError(null);
							}}
							className="text-accent-pink hover:text-white flex items-center gap-1 text-sm border border-accent-pink px-2 py-1 rounded transition-colors"
						>
							<FiTrash2 /> Clear
						</button>
					</div>
					<textarea
						id="base64-input"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className={`w-full h-48 bg-[#000033] border-2 ${mode === "encode" ? "border-accent-pink focus:border-white" : "border-accent-lime focus:border-white"} text-white p-4 font-mono text-sm focus:outline-none`}
						placeholder={
							mode === "encode"
								? "エンコードしたい文字列を入力..."
								: "デコードしたいBase64文字列を入力..."
						}
					/>
					{error && (
						<div className="text-red-400 text-sm bg-red-900/50 p-2 border-l-4 border-red-500 font-mono">
							{error}
						</div>
					)}
				</div>

				<div className="flex items-center justify-center">
					<div className="w-1 bg-accent-cyan h-8 rounded-full"></div>
				</div>

				<div className="space-y-2">
					<div className="flex justify-between items-center text-accent-lime font-bold">
						<label htmlFor="base64-output">
							{mode === "encode" ? "結果 (Base64)" : "結果 (Text)"}
						</label>
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
						id="base64-output"
						value={output}
						readOnly
						className={`w-full h-48 bg-[#000044] border-2 ${mode === "encode" ? "border-accent-lime" : "border-accent-pink"} text-white p-4 font-mono text-sm focus:outline-none`}
						placeholder="変換結果がここに表示されます..."
					/>
				</div>
			</div>
		</div>
	);
}
