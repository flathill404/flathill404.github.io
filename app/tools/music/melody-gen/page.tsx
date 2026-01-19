"use client";

import { Midi } from "@tonejs/midi";
import { useEffect, useRef, useState } from "react";
import { FaDice, FaDownload, FaMusic, FaPlay, FaStop } from "react-icons/fa";
import * as Tone from "tone";

// Define note types and utilities
type NoteLength = "4n" | "8n" | "16n";
const SCALES = {
	"C Major": ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
	"G Major": ["G3", "A3", "B3", "C4", "D4", "E4", "F#4", "G4"],
	"A Minor": ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"],
	Pentatonic: ["C4", "D4", "E4", "G4", "A4", "C5"],
};

interface MelodyNote {
	pitch: string;
	duration: NoteLength;
	time: number; // accumulated time in 16th notes
}

export default function MelodyGenerator() {
	const [melody, setMelody] = useState<MelodyNote[]>([]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentNoteIndex, setCurrentNoteIndex] = useState<number | null>(null);
	const [scaleName, setScaleName] = useState<keyof typeof SCALES>("C Major");
	const [tempo, setTempo] = useState(120);
	const [length, setLength] = useState(8);

	// Refs for Tone.js objects to survive re-renders
	const synthRef = useRef<Tone.Synth | null>(null);
	const sequenceRef = useRef<Tone.Part | null>(null);

	useEffect(() => {
		// Initialize synth
		synthRef.current = new Tone.Synth().toDestination();

		return () => {
			// Cleanup
			if (sequenceRef.current) {
				sequenceRef.current.dispose();
			}
			if (synthRef.current) {
				synthRef.current.dispose();
			}
			Tone.Transport.stop();
		};
	}, []);

	const generateMelody = () => {
		const scale = SCALES[scaleName];
		const newMelody: MelodyNote[] = [];
		let currentTime = 0;

		for (let i = 0; i < length; i++) {
			const pitch = scale[Math.floor(Math.random() * scale.length)];
			// Simple duration logic for now: mostly 4n, some 8n
			const duration: NoteLength = Math.random() > 0.3 ? "4n" : "8n";

			newMelody.push({
				pitch,
				duration,
				time: currentTime,
			});

			// Advance time (simple approximation for visualization/logic)
			// In Tone.js Transport, we will schedule properly
			currentTime += duration === "4n" ? 4 : 2; // in 16th notes
		}
		setMelody(newMelody);
		setCurrentNoteIndex(null);
	};

	const playMelody = async () => {
		if (melody.length === 0) return;

		await Tone.start();
		Tone.Transport.cancel();
		Tone.Transport.bpm.value = tempo;

		if (isPlaying) {
			Tone.Transport.stop();
			setIsPlaying(false);
			setCurrentNoteIndex(null);
			return;
		}

		const events = melody.map((note, index) => ({
			time: `0:0:${note.time * 4}`, // Approximation assuming time was in 16th notes steps? Wait, let's simplify scheduling.
			note: note.pitch,
			duration: note.duration,
			index,
		}));

		// Better scheduling strategy: calculate exact start times based on accumulated duration
		let now = 0;
		const scheduledEvents = melody.map((note, index) => {
			const startTime = now;
			const noteDurationTime = Tone.Time(note.duration).toSeconds();
			now += noteDurationTime;
			return {
				time: startTime,
				note: note.pitch,
				duration: note.duration,
				index,
			};
		});

		const part = new Tone.Part((time, value) => {
			if (synthRef.current) {
				synthRef.current.triggerAttackRelease(value.note, value.duration, time);
			}
			Tone.Draw.schedule(() => {
				setCurrentNoteIndex(value.index);
			}, time);
		}, scheduledEvents);

		part.start(0);

		// Stop callback
		Tone.Transport.schedule((time) => {
			Tone.Draw.schedule(() => {
				setIsPlaying(false);
				setCurrentNoteIndex(null);
			}, time);
		}, now);

		Tone.Transport.start();
		setIsPlaying(true);
		sequenceRef.current = part;
	};

	const stopMelody = () => {
		Tone.Transport.stop();
		Tone.Transport.cancel();
		setIsPlaying(false);
		setCurrentNoteIndex(null);
	};

	const downloadMidi = () => {
		if (melody.length === 0) return;

		const midi = new Midi();
		const track = midi.addTrack();

		let now = 0;
		melody.forEach((note) => {
			track.addNote({
				midi: Tone.Frequency(note.pitch).toMidi(),
				time: now,
				duration: Tone.Time(note.duration).toSeconds(),
			});
			now += Tone.Time(note.duration).toSeconds();
		});

		const array = midi.toArray();
		const blob = new Blob([array as any], { type: "audio/midi" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "melody.mid";
		a.click();
		URL.revokeObjectURL(url);
	};

	// Generate on first load
	useEffect(() => {
		generateMelody();
	}, [scaleName, length]); // Re-generate when settings change? Maybe, or just let user click. Let's just do empty or initial.

	// Actually, let's generate one initially on mount only to not annoy user
	useEffect(() => {
		// Intentionally empty dep array for mount only if we wanted,
		// but putting dependencies in the other effect is safer for correctness if desired.
		// Let's just generate manually or once.
	}, []);

	return (
		<div className="min-h-screen bg-neutral-900 text-white p-8 font-sans flex flex-col items-center justify-center">
			<div className="w-full max-w-4xl bg-neutral-800 rounded-2xl shadow-2xl p-8 border border-neutral-700">
				<header className="mb-10 text-center">
					<h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent inline-flex items-center gap-4">
						<FaMusic className="text-cyan-400" />
						Melody Generator
					</h1>
					<p className="text-neutral-400 mt-2">
						Create, Play, and Export unique MIDI melodies instantly.
					</p>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
					{/* Controls */}
					<div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-700 space-y-6">
						<h3 className="text-lg font-bold text-white mb-4">Settings</h3>

						<div className="space-y-2">
							<label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">
								Scale
							</label>
							<div className="grid grid-cols-2 gap-2">
								{(Object.keys(SCALES) as Array<keyof typeof SCALES>).map(
									(s) => (
										<button
											key={s}
											onClick={() => setScaleName(s)}
											className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
												scaleName === s
													? "bg-purple-600 text-white shadow-lg shadow-purple-900/50"
													: "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
											}`}
										>
											{s}
										</button>
									),
								)}
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">
								Length (Notes)
							</label>
							<input
								type="range"
								min="4"
								max="32"
								step="4"
								value={length}
								onChange={(e) => setLength(Number(e.target.value))}
								className="w-full accent-cyan-400 h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
							/>
							<div className="flex justify-between text-xs text-neutral-400">
								<span>4</span>
								<span>{length} Notes</span>
								<span>32</span>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">
								Tempo (BPM)
							</label>
							<input
								type="range"
								min="60"
								max="200"
								step="10"
								value={tempo}
								onChange={(e) => setTempo(Number(e.target.value))}
								className="w-full accent-cyan-400 h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
							/>
							<div className="flex justify-between text-xs text-neutral-400">
								<span>60</span>
								<span>{tempo} BPM</span>
								<span>200</span>
							</div>
						</div>

						<button
							onClick={generateMelody}
							className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transform transition-all active:scale-95 flex items-center justify-center gap-2"
						>
							<FaDice className="text-xl" />
							Generate New
						</button>
					</div>

					{/* Visualizer & Actions */}
					<div className="md:col-span-2 flex flex-col gap-6">
						<div className="bg-neutral-950 rounded-xl p-6 border border-neutral-800 min-h-[200px] flex items-center justify-center relative overflow-hidden group">
							{melody.length === 0 ? (
								<span className="text-neutral-600">
									Click Generate to start
								</span>
							) : (
								<div className="flex flex-wrap gap-2 justify-center items-center w-full">
									{melody.map((note, idx) => (
										<div
											key={idx}
											className={`
                                        relative w-10 h-16 rounded-lg flex items-end justify-center pb-2 text-xs font-bold transition-all duration-150
                                        ${
																					currentNoteIndex === idx
																						? "bg-cyan-400 text-black scale-110 shadow-[0_0_20px_rgba(34,211,238,0.6)] z-10"
																						: "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
																				}
                                    `}
										>
											<span className="z-10">{note.pitch}</span>
											<div
												className="absolute bottom-0 left-0 w-full bg-white/10 rounded-b-lg"
												style={{
													height: note.duration === "4n" ? "100%" : "50%",
												}}
											></div>
										</div>
									))}
								</div>
							)}
						</div>

						<div className="grid grid-cols-2 gap-4">
							<button
								onClick={isPlaying ? stopMelody : playMelody}
								disabled={melody.length === 0}
								className={`
                            py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                            ${
															isPlaying
																? "bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30"
																: "bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600"
														}
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `}
							>
								{isPlaying ? (
									<>
										<FaStop /> Stop
									</>
								) : (
									<>
										<FaPlay /> Play
									</>
								)}
							</button>

							<button
								onClick={downloadMidi}
								disabled={melody.length === 0}
								className="py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600 hover:text-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<FaDownload /> Download MIDI
							</button>
						</div>
					</div>
				</div>

				<footer className="text-center text-neutral-600 text-sm">
					Powered by Tone.js & @tonejs/midi
				</footer>
			</div>
		</div>
	);
}
