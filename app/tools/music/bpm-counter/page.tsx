"use client";

import { useCallback, useEffect, useState } from "react";

export default function BPMCounterPage() {
	const [taps, setTaps] = useState<number[]>([]);
	const [bpm, setBpm] = useState<number>(0);
	const [lastTapTime, setLastTapTime] = useState<number>(0);

	const calculateBPM = useCallback((currentTaps: number[]) => {
		if (currentTaps.length < 2) return 0;

		const intervals = [];
		for (let i = 1; i < currentTaps.length; i++) {
			intervals.push(currentTaps[i] - currentTaps[i - 1]);
		}

		const averageInterval =
			intervals.reduce((a, b) => a + b, 0) / intervals.length;

		const calculatedBpm = 60000 / averageInterval;

		return Math.round(calculatedBpm * 10) / 10;
	}, []);

	const handleTap = useCallback(() => {
		const now = Date.now();
		const timeSinceLastTap = now - lastTapTime;

		setLastTapTime(now);

		if (timeSinceLastTap > 2000) {
			setTaps([now]);
			setBpm(0);
			return;
		}

		const newTaps = [...taps, now];
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

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code === "Space") {
				e.preventDefault();
				handleTap();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [handleTap]);

	return (
		<div className="text-center space-y-6">
			<h3 className="text-accent-yellow font-bold">♪ BPM Counter ♪</h3>
			<p className="text-sm text-accent-cyan">
				ボタンをタップ or スペースキーで計測
			</p>

			<div className="border-2 border-accent-cyan p-4">
				<div className="text-6xl font-bold text-accent-pink">
					{bpm > 0 ? bpm.toFixed(0) : "--"}
				</div>
				<div className="text-sm text-accent-cyan mt-1">BPM</div>
			</div>

			<button
				type="button"
				onClick={handleTap}
				className="w-32 h-32 border-4 border-accent-pink text-accent-yellow text-2xl font-bold active:scale-95 transition-transform hover:border-accent-cyan cursor-pointer"
			>
				TAP
			</button>

			<div>
				<button
					type="button"
					onClick={handleReset}
					className="text-sm text-gray-400 hover:text-accent-pink cursor-pointer"
				>
					[リセット]
				</button>
			</div>

			<div className="flex justify-center gap-6 text-sm">
				<div className="border border-accent-pink p-3">
					<div className="text-accent-cyan font-bold">{taps.length}</div>
					<div className="text-xs text-gray-400">Taps</div>
				</div>
				<div className="border border-accent-pink p-3">
					<div className="text-accent-cyan font-bold">
						{bpm > 0 ? `${((60 / bpm) * 1000).toFixed(0)} ms` : "--"}
					</div>
					<div className="text-xs text-gray-400">Interval</div>
				</div>
			</div>
		</div>
	);
}
