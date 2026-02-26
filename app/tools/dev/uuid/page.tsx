"use client";

import { useCallback, useEffect, useState } from "react";
import { FiCopy, FiRefreshCw } from "react-icons/fi";

export default function UuidGenerator() {
	const [count, setCount] = useState(1);
	const [hyphens, setHyphens] = useState(true);
	const [uppercase, setUppercase] = useState(false);
	const [uuids, setUuids] = useState<string[]>([]);

	const generateUuids = useCallback(() => {
		const newUuids = Array.from({ length: count }, () => {
			let uuid = crypto.randomUUID();
			if (!hyphens) uuid = uuid.replace(/-/g, "");
			if (uppercase) uuid = uuid.toUpperCase();
			return uuid;
		});
		setUuids(newUuids);
	}, [count, hyphens, uppercase]);

	// Generate initially
	useEffect(() => {
		generateUuids();
	}, [generateUuids]);

	const handleCopy = () => {
		const text = uuids.join("\n");
		navigator.clipboard.writeText(text);
	};

	return (
		<div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
			<div className="bg-[#000044] p-6 border-2 border-accent-cyan rounded-xl space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<label
							htmlFor="uuid-count"
							className="text-accent-cyan font-bold block mb-2"
						>
							生成する数: {count}
						</label>
						<input
							id="uuid-count"
							type="range"
							min="1"
							max="100"
							value={count}
							onChange={(e) => setCount(parseInt(e.target.value, 10))}
							className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-cyan"
						/>
						<div className="flex justify-between text-xs text-gray-400 px-1 mt-1">
							<span>1</span>
							<span>50</span>
							<span>100</span>
						</div>
					</div>

					<div className="space-y-4">
						<div className="text-accent-cyan font-bold block">オプション</div>
						<div className="space-y-3">
							<label
								htmlFor="uuid-hyphens"
								className="flex items-center gap-3 text-white cursor-pointer group"
							>
								<div className="relative flex items-center">
									<input
										id="uuid-hyphens"
										type="checkbox"
										checked={hyphens}
										onChange={(e) => setHyphens(e.target.checked)}
										className="w-5 h-5 appearance-none border-2 border-accent-pink rounded checked:bg-accent-pink cursor-pointer transition-colors"
									/>
									{hyphens && (
										<span className="absolute text-[#000033] left-0.5 top-0 pointer-events-none text-sm font-bold">
											✓
										</span>
									)}
								</div>
								<span className="group-hover:text-accent-pink transition-colors">
									ハイフンを含める (Include Hyphens)
								</span>
							</label>

							<label
								htmlFor="uuid-uppercase"
								className="flex items-center gap-3 text-white cursor-pointer group"
							>
								<div className="relative flex items-center">
									<input
										id="uuid-uppercase"
										type="checkbox"
										checked={uppercase}
										onChange={(e) => setUppercase(e.target.checked)}
										className="w-5 h-5 appearance-none border-2 border-accent-lime rounded checked:bg-accent-lime cursor-pointer transition-colors"
									/>
									{uppercase && (
										<span className="absolute text-[#000033] left-0.5 top-0 pointer-events-none text-sm font-bold">
											✓
										</span>
									)}
								</div>
								<span className="group-hover:text-accent-lime transition-colors">
									大文字にする (Uppercase)
								</span>
							</label>
						</div>
					</div>
				</div>

				<div className="pt-4 border-t border-accent-cyan/30 flex justify-center">
					<button
						type="button"
						onClick={generateUuids}
						className="flex items-center gap-2 bg-accent-yellow text-[#000033] font-bold py-3 px-8 rounded hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(255,255,0,0.4)]"
					>
						<FiRefreshCw className="animate-spin-hover" />
						UUIDを生成する (Generate)
					</button>
				</div>
			</div>

			<div className="space-y-3">
				<div className="flex justify-between items-end border-b-2 border-accent-lime pb-2">
					<h3 className="text-accent-lime font-bold text-xl">
						生成結果 (Results)
					</h3>
					<button
						type="button"
						onClick={handleCopy}
						disabled={uuids.length === 0}
						className="text-accent-lime hover:text-[#000033] hover:bg-accent-lime border border-accent-lime px-3 py-1.5 rounded transition-all flex items-center gap-2 font-bold disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-accent-lime"
					>
						<FiCopy /> 全てコピー (Copy All)
					</button>
				</div>
				<div className="bg-[#000033] border-2 border-accent-lime p-4 h-[400px] overflow-y-auto font-mono text-white text-base md:text-lg">
					{uuids.map((uuid) => (
						<button
							type="button"
							key={uuid}
							className="block w-full text-left py-1 hover:bg-[#000055] px-2 rounded -mx-2 transition-colors cursor-pointer group"
							onClick={() => {
								navigator.clipboard.writeText(uuid);
							}}
						>
							{uuid}{" "}
							<span className="opacity-0 group-hover:opacity-100 text-accent-pink text-xs ml-2 tracking-widest transition-opacity">
								(クリックでコピー)
							</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
