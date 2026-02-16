"use client";

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
	const [beat, setBeat] = useState(0);

	const synthRef = useRef<Tone.MembraneSynth | null>(null);
	const loopRef = useRef<Tone.Loop | null>(null);

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

	useEffect(() => {
		if (synthRef.current) {
			synthRef.current.volume.value = isMuted ? -Infinity : volume;
		}
	}, [volume, isMuted]);

	useEffect(() => {
		Tone.Transport.bpm.value = bpm;
	}, [bpm]);

	const togglePlay = async () => {
		if (!isPlaying) {
			await Tone.start();

			if (!loopRef.current) {
				loopRef.current = new Tone.Loop((time) => {
					const position = Tone.getTransport().position;
					const beatVal = Number(position.toString().split(":")[1]);
					const currentBeat = Math.floor(beatVal) % 4;

					Tone.getDraw().schedule(() => {
						setBeat(currentBeat);
					}, time);

					if (currentBeat === 0) {
						synthRef.current?.triggerAttackRelease("C4", "32n", time);
					} else {
						synthRef.current?.triggerAttackRelease("G3", "32n", time, 0.5);
					}
				}, "4n").start(0);
			}

			Tone.Transport.start();
			setIsPlaying(true);
		} else {
			Tone.Transport.stop();
			setBeat(0);
			Tone.Transport.position = 0;
			setIsPlaying(false);
		}
	};

	const adjustBpm = (amount: number) => {
		setBpm((prev) => Math.max(20, Math.min(300, prev + amount)));
	};

	return (
		<div className="text-center space-y-6">
			<h3 className="text-accent-yellow font-bold">♪ メトロノーム ♪</h3>
			<p className="text-sm text-accent-cyan">
				Web Audio APIを使ったメトロノーム
			</p>

			<div className="flex justify-center gap-3">
				{[0, 1, 2, 3].map((i) => (
					<div
						key={i}
						className={`w-4 h-12 border transition-all duration-75 ${
							beat === i && isPlaying
								? i === 0
									? "bg-accent-cyan border-accent-cyan shadow-[0_0_10px_#00ffff]"
									: "bg-accent-pink border-accent-pink shadow-[0_0_10px_#ff66cc]"
								: "bg-transparent border-gray-600"
						} ${beat === i && isPlaying ? "scale-110" : "scale-100"}`}
					/>
				))}
			</div>

			<div className="border-2 border-accent-pink p-4 space-y-4">
				<div>
					<span className="text-4xl font-bold text-accent-yellow">{bpm}</span>
					<span className="text-sm text-gray-400 ml-2">BPM</span>
				</div>

				<input
					type="range"
					min="20"
					max="300"
					value={bpm}
					onChange={(e) => setBpm(Number(e.target.value))}
					className="w-full accent-accent-cyan"
				/>

				<div className="flex justify-center gap-2">
					<button
						type="button"
						onClick={() => adjustBpm(-1)}
						className="w-10 h-10 border border-accent-cyan text-white flex items-center justify-center hover:bg-accent-cyan/20 cursor-pointer"
					>
						<FaMinus />
					</button>
					<button
						type="button"
						onClick={() => adjustBpm(-5)}
						className="px-3 h-10 border border-accent-cyan text-white flex items-center justify-center hover:bg-accent-cyan/20 text-sm cursor-pointer"
					>
						-5
					</button>
					<button
						type="button"
						onClick={() => adjustBpm(5)}
						className="px-3 h-10 border border-accent-cyan text-white flex items-center justify-center hover:bg-accent-cyan/20 text-sm cursor-pointer"
					>
						+5
					</button>
					<button
						type="button"
						onClick={() => adjustBpm(1)}
						className="w-10 h-10 border border-accent-cyan text-white flex items-center justify-center hover:bg-accent-cyan/20 cursor-pointer"
					>
						<FaPlus />
					</button>
				</div>
			</div>

			<button
				type="button"
				onClick={togglePlay}
				className={`w-16 h-16 border-2 flex items-center justify-center text-xl cursor-pointer ${
					isPlaying
						? "border-accent-pink text-accent-pink hover:bg-accent-pink/20"
						: "border-accent-cyan text-accent-cyan hover:bg-accent-cyan/20"
				}`}
			>
				{isPlaying ? <FaStop /> : <FaPlay className="ml-1" />}
			</button>

			<div className="flex items-center gap-3 justify-center">
				<button
					type="button"
					onClick={() => setIsMuted(!isMuted)}
					className="text-gray-400 hover:text-accent-pink cursor-pointer"
				>
					{isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
				</button>
				<input
					type="range"
					min="-60"
					max="0"
					value={volume}
					onChange={(e) => setVolume(Number(e.target.value))}
					className="w-32 accent-accent-pink"
					disabled={isMuted}
				/>
			</div>
		</div>
	);
}
