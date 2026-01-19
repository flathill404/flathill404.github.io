"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
	FaMinus,
	FaPlay,
	FaPlus,
	FaStop,
	FaVolumeMute,
	FaVolumeUp,
} from "react-icons/fa";
import * as Tone from "tone";

export default function MetronomePage() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [bpm, setBpm] = useState(120);
	const [volume, setVolume] = useState(-10);
	const [isMuted, setIsMuted] = useState(false);
	const [beat, setBeat] = useState(0); // 0-3 for 4/4

	const synthRef = useRef<Tone.MembraneSynth | null>(null);
	const loopRef = useRef<Tone.Loop | null>(null);

	// Initialize Tone.js
	useEffect(() => {
		const synth = new Tone.MembraneSynth({
			pitchDecay: 0.008,
			octaves: 2,
			oscillator: {
				type: "sine",
			},
			envelope: {
				attack: 0.001,
				decay: 0.1,
				sustain: 0,
				release: 0.1,
			},
		}).toDestination();

		synthRef.current = synth;

		return () => {
			synth.dispose();
			if (loopRef.current) {
				loopRef.current.dispose();
			}
		};
	}, []);

	// Update Volume
	useEffect(() => {
		if (synthRef.current) {
			synthRef.current.volume.value = isMuted ? -Infinity : volume;
		}
	}, [volume, isMuted]);

	// Update BPM
	useEffect(() => {
		Tone.Transport.bpm.value = bpm;
	}, [bpm]);

	const togglePlay = async () => {
		if (!isPlaying) {
			await Tone.start();

			// Create loop if not exists
			if (!loopRef.current) {
				loopRef.current = new Tone.Loop((time) => {
					// Logic for strong/weak beats
					// We'll track the visual beat in a state, but for audio precision we rely on Tone/Time
					// However, syncing React state to Tone loop at high BPM can be jitters.
					// We'll use Tone.Draw to sync visual
					const currentBeat =
						Math.floor(Tone.Transport.position.toString().split(":")[1] || 0) %
						4;

					Tone.Draw.schedule(() => {
						setBeat(currentBeat);
					}, time);

					if (currentBeat === 0) {
						synthRef.current?.triggerAttackRelease("C4", "32n", time);
					} else {
						synthRef.current?.triggerAttackRelease("G3", "32n", time, 0.5); // Lower velocity/pitch
					}
				}, "4n").start(0);
			}

			Tone.Transport.start();
			setIsPlaying(true);
		} else {
			Tone.Transport.stop();
			// Reset position
			setBeat(0);
			Tone.Transport.position = 0;
			setIsPlaying(false);
		}
	};

	const adjustBpm = (amount: number) => {
		setBpm((prev) => Math.max(20, Math.min(300, prev + amount)));
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] max-w-2xl mx-auto text-center space-y-12 px-4">
			<div className="space-y-4">
				<h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-600">
					Metronome
				</h1>
				<p className="text-gray-400 text-lg">
					Precision timing tool using Web Audio API
				</p>
			</div>

			{/* Visual Indicator */}
			<div className="relative w-full h-32 flex items-center justify-center">
				<div className="flex gap-4">
					{[0, 1, 2, 3].map((i) => (
						<motion.div
							key={i}
							className={`w-4 h-16 rounded-full transition-shadow duration-75 ${
								beat === i && isPlaying
									? i === 0
										? "bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.8)]"
										: "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
									: "bg-gray-800"
							}`}
							animate={{
								scale: beat === i && isPlaying ? 1.2 : 1,
							}}
						/>
					))}
				</div>
			</div>

			{/* Controls */}
			<div className="bg-[#111] p-8 rounded-3xl border border-white/10 shadow-2xl w-full max-w-md space-y-8">
				{/* BPM Control */}
				<div className="space-y-6">
					<div className="text-6xl font-black tabular-nums text-white flex items-center justify-center gap-2">
						{bpm}
						<span className="text-xl font-medium text-gray-500 mt-6">BPM</span>
					</div>

					<input
						type="range"
						min="20"
						max="300"
						value={bpm}
						onChange={(e) => setBpm(Number(e.target.value))}
						className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
					/>

					<div className="flex justify-center gap-4">
						<button
							onClick={() => adjustBpm(-1)}
							className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white transition-colors"
						>
							<FaMinus />
						</button>
						<button
							onClick={() => adjustBpm(-5)}
							className="px-4 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white transition-colors text-sm font-bold"
						>
							-5
						</button>
						<button
							onClick={() => adjustBpm(5)}
							className="px-4 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white transition-colors text-sm font-bold"
						>
							+5
						</button>
						<button
							onClick={() => adjustBpm(1)}
							className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white transition-colors"
						>
							<FaPlus />
						</button>
					</div>
				</div>

				{/* Play/Stop */}
				<button
					onClick={togglePlay}
					className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl text-white transition-all transform hover:scale-105 mx-auto shadow-lg ${
						isPlaying
							? "bg-red-500 shadow-red-500/20"
							: "bg-cyan-500 shadow-cyan-500/20"
					}`}
				>
					{isPlaying ? <FaStop /> : <FaPlay className="ml-1" />}
				</button>

				{/* Volume Control */}
				<div className="flex items-center gap-4 px-4">
					<button
						onClick={() => setIsMuted(!isMuted)}
						className="text-gray-400 hover:text-white transition-colors"
					>
						{isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
					</button>
					<input
						type="range"
						min="-60"
						max="0"
						value={volume}
						onChange={(e) => setVolume(Number(e.target.value))}
						className="flex-1 h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-gray-500"
						disabled={isMuted}
					/>
				</div>
			</div>
		</div>
	);
}
