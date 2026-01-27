"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { FaRedo } from "react-icons/fa";

export default function BPMCounterPage() {
	const [taps, setTaps] = useState<number[]>([]);
	const [bpm, setBpm] = useState<number>(0);
	const [lastTapTime, setLastTapTime] = useState<number>(0);

	const calculateBPM = useCallback((currentTaps: number[]) => {
		if (currentTaps.length < 2) return 0;

		// Calculate intervals between taps
		const intervals = [];
		for (let i = 1; i < currentTaps.length; i++) {
			intervals.push(currentTaps[i] - currentTaps[i - 1]);
		}

		// Calculate average interval
		const averageInterval =
			intervals.reduce((a, b) => a + b, 0) / intervals.length;

		// Convert to BPM (60000ms in a minute)
		const calculatedBpm = 60000 / averageInterval;

		return Math.round(calculatedBpm * 10) / 10;
	}, []);

	const handleTap = useCallback(() => {
		const now = Date.now();
		const timeSinceLastTap = now - lastTapTime;

		setLastTapTime(now);

		// Reset if pause is too long (> 2 seconds)
		if (timeSinceLastTap > 2000) {
			setTaps([now]);
			setBpm(0);
			return;
		}

		const newTaps = [...taps, now];
		// Keep only last 16 taps for rolling average accuracy vs responsiveness
		if (newTaps.length > 16) {
			newTaps.shift();
		}

		setTaps(newTaps);
		const newBpm = calculateBPM(newTaps);
		if (newBpm > 0) {
			setBpm(newBpm);
		}
	}, [taps, lastTapTime, calculateBPM]);

	const handleReset = () => {
		setTaps([]);
		setBpm(0);
		setLastTapTime(0);
	};

	// Handle spacebar for tapping
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code === "Space") {
				e.preventDefault(); // Prevent scrolling
				handleTap();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [handleTap]);

	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] max-w-2xl mx-auto text-center space-y-12">
			<div className="space-y-4">
				<h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
					BPM Counter
				</h1>
				<p className="text-gray-400 text-lg">
					Tap the button or press Space to the beat
				</p>
			</div>

			<div className="relative">
				{/* BPM Display */}
				<div className="flex items-start justify-center gap-2 relative z-10">
					<span className="text-8xl md:text-9xl font-black tabular-nums tracking-tighter text-white leading-none">
						{bpm > 0 ? (
							bpm.toFixed(0)
						) : (
							<span className="text-gray-700">--</span>
						)}
					</span>
					<span className="text-2xl font-medium text-gray-500 mt-4">BPM</span>
				</div>

				{/* Pulsing effect in background */}
				{bpm > 0 && (
					<motion.div
						animate={{
							scale: [1, 1.1, 1],
							opacity: [0.1, 0.3, 0.1],
						}}
						transition={{
							duration: 60 / bpm,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -z-10"
					/>
				)}
			</div>

			<div className="flex flex-col items-center gap-8">
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleTap}
					className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25 border-4 border-white/10 group relative overflow-hidden"
				>
					<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
					<span className="text-3xl font-bold text-white z-10">TAP</span>
				</motion.button>

				<button
					type="button"
					onClick={handleReset}
					className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
				>
					<FaRedo size={14} />
					<span className="text-sm font-medium">RESET</span>
				</button>
			</div>

			<div className="grid grid-cols-2 gap-8 text-center mt-8">
				<div className="bg-white/5 rounded-xl p-4 border border-white/10 min-w-[140px]">
					<div className="text-2xl font-bold text-purple-400">
						{taps.length}
					</div>
					<div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
						Taps
					</div>
				</div>
				<div className="bg-white/5 rounded-xl p-4 border border-white/10 min-w-[140px]">
					<div className="text-2xl font-bold text-pink-400">
						{bpm > 0 ? `${((60 / bpm) * 1000).toFixed(0)} ms` : "--"}
					</div>
					<div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
						Interval
					</div>
				</div>
			</div>
		</div>
	);
}
