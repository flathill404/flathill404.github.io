"use client";

import { Midi } from "@tonejs/midi";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaDice, FaDownload, FaMusic, FaPlay, FaStop } from "react-icons/fa";
import * as Tone from "tone";

// ----------------------------------------------------------------------
// Constants & Logic
// ----------------------------------------------------------------------

type NoteLength = "4n" | "8n" | "16n";

const KEYS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const SCALE_PATTERNS: Record<string, number[]> = {
	Major: [0, 2, 4, 5, 7, 9, 11],
	"Natural Minor": [0, 2, 3, 5, 7, 8, 10],
	"Harmonic Minor": [0, 2, 3, 5, 7, 8, 11],
	Dorian: [0, 2, 3, 5, 7, 9, 10],
	Phrygian: [0, 1, 3, 5, 7, 8, 10],
	Lydian: [0, 2, 4, 6, 7, 9, 11],
	Mixolydian: [0, 2, 4, 5, 7, 9, 10],
	Locrian: [0, 1, 3, 5, 6, 8, 10],
	"Major Pentatonic": [0, 2, 4, 7, 9],
	"Minor Pentatonic": [0, 3, 5, 7, 10],
	Blues: [0, 3, 5, 6, 7, 10],
	Chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
	// Japanese Modes
	Hirajoshi: [0, 2, 3, 7, 8],
	"In-Sen": [0, 1, 5, 7, 10],
	Iwato: [0, 1, 5, 6, 10],
};

const getScaleNotes = (
	rootKey: string,
	scaleType: string,
	octaves = 2,
): string[] => {
	const rootIndex = KEYS.indexOf(rootKey);
	if (rootIndex === -1) return [];

	const intervals = SCALE_PATTERNS[scaleType];
	const notes: string[] = [];

	// Base is 4th octave.
	const baseOctave = 4;

	for (let o = 0; o < octaves; o++) {
		const currentOctave = baseOctave + o;
		intervals.forEach((interval) => {
			const noteIndex = (rootIndex + interval) % 12;
			const octaveShift = Math.floor((rootIndex + interval) / 12);
			const finalOctave = currentOctave + octaveShift;
			notes.push(`${KEYS[noteIndex]}${finalOctave}`);
		});
	}

	// Add the high root note to resolve
	notes.push(`${KEYS[rootIndex]}${baseOctave + octaves}`);

	return notes;
};

interface MelodyNote {
	pitch: string;
	duration: NoteLength;
	time: number; // accumulated time in 16th notes
	id: string; // Unique ID for rendering
}

const BAR_OPTIONS = [0.5, 1, 2, 4];

export default function MelodyGenerator() {
	const [melody, setMelody] = useState<MelodyNote[]>([]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentNoteIndex, setCurrentNoteIndex] = useState<number | null>(null);

	const [selectedKey, setSelectedKey] = useState("C");
	const [selectedScale, setSelectedScale] =
		useState<keyof typeof SCALE_PATTERNS>("Major");
	const [tempo, setTempo] = useState(140);
	const [bars, setBars] = useState(1); // Default 1 bar

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

	const generateMelody = useCallback(() => {
		const scaleNotes = getScaleNotes(selectedKey, selectedScale);
		const newMelody: MelodyNote[] = [];
		let currentTime = 0;

		// 1 bar = 16 sixteenth notes
		const targetDuration = bars * 16;

		while (currentTime < targetDuration) {
			const pitch = scaleNotes[Math.floor(Math.random() * scaleNotes.length)];
			const remaining = targetDuration - currentTime;

			// Assume 4n=4, 8n=2.
			// If remaining >= 4, can pick 4n or 8n.
			// If remaining >= 2, can pick 8n.
			// (Simplification: skipping 16n for now as requested/implied style)

			let possibleDurations: NoteLength[] = [];
			if (remaining >= 4) possibleDurations = ["4n", "8n"];
			else if (remaining >= 2) possibleDurations = ["8n"];
			else {
				// Should not happen with 2 and 4 steps, but safety break
				break;
			}

			// Bias towards 4n slightly? or 50/50? Earlier code had 70% 8n bias logic.
			// Let's do random pick.
			const duration =
				possibleDurations[Math.floor(Math.random() * possibleDurations.length)];

			newMelody.push({
				pitch,
				duration,
				time: currentTime,
				id: crypto.randomUUID(),
			});

			currentTime += duration === "4n" ? 4 : 2;
		}

		setMelody(newMelody);
		setCurrentNoteIndex(null);
	}, [selectedKey, selectedScale, bars]);

	// Playback control
	const stopPlayback = useCallback(() => {
		Tone.Transport.stop();
		Tone.Transport.cancel();
		setIsPlaying(false);
		setCurrentNoteIndex(null);
		if (sequenceRef.current) {
			sequenceRef.current.dispose();
			sequenceRef.current = null;
		}
	}, []);

	const startPlayback = useCallback(() => {
		if (melody.length === 0) return;

		Tone.start();
		Tone.Transport.cancel(); // Clear previous events
		Tone.Transport.bpm.value = tempo;

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

		// Calculate total duration for loop
		const totalDuration = scheduledEvents.reduce((acc, event) => {
			return Math.max(acc, event.time + Tone.Time(event.duration).toSeconds());
		}, 0);

		const part = new Tone.Part((time, value) => {
			if (synthRef.current) {
				// Ensure note name doesn't contain weird chars if that happens, mainly '#' is fine
				synthRef.current.triggerAttackRelease(value.note, value.duration, time);
			}
			Tone.Draw.schedule(() => {
				setCurrentNoteIndex(value.index);
			}, time);
		}, scheduledEvents);

		part.loop = true;
		part.loopEnd = totalDuration;
		part.start(0);

		Tone.Transport.start();
		setIsPlaying(true);

		// Cleanup old ref if exists (though cancel should have handled events, the object persists)
		if (sequenceRef.current) {
			sequenceRef.current.dispose();
		}
		sequenceRef.current = part;
	}, [melody, tempo]);

	// Toggle Play/Stop
	const togglePlayback = () => {
		if (isPlaying) {
			stopPlayback();
		} else {
			startPlayback();
		}
	};

	// Auto-restart if melody changes while playing
	useEffect(() => {
		if (isPlaying) {
			startPlayback();
		}
	}, [isPlaying, startPlayback]);

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
		a.download = `${selectedKey}-${selectedScale.replace(/\s/g, "-").toLowerCase()}.mid`;
		a.click();
		URL.revokeObjectURL(url);
	};

	// Generate on first load
	useEffect(() => {
		generateMelody();
	}, [generateMelody]);

	return (
		<div className="min-h-screen bg-neutral-900 text-white p-8 font-sans flex flex-col items-center justify-center">
			<div className="w-full max-w-5xl bg-neutral-800 rounded-2xl shadow-2xl p-8 border border-neutral-700">
				<header className="mb-10 text-center">
					<h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent inline-flex items-center gap-4">
						<FaMusic className="text-cyan-400" />
						Melody Generator
					</h1>
					<p className="text-neutral-400 mt-2">
						Create, Play, and Export unique MIDI melodies using advanced scales.
					</p>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
					{/* Controls */}
					<div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-700 space-y-6 lg:col-span-1">
						<h3 className="text-lg font-bold text-white mb-4">Settings</h3>

						{/* Key Selection */}
						<div className="space-y-2">
							<span className="text-xs font-semibold uppercase text-neutral-500 tracking-wider block">
								Key
							</span>
							<div className="grid grid-cols-6 gap-1">
								{KEYS.map((k) => (
									<button
										type="button"
										key={k}
										onClick={() => setSelectedKey(k)}
										className={`px-1 py-2 rounded text-xs font-bold transition-all ${
											selectedKey === k
												? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
												: "bg-neutral-800 text-neutral-500 hover:bg-neutral-700 hover:text-neutral-300"
										}`}
									>
										{k}
									</button>
								))}
							</div>
						</div>

						{/* Scale Selection */}
						<div className="space-y-2">
							<label
								htmlFor="scale-select"
								className="text-xs font-semibold uppercase text-neutral-500 tracking-wider block"
							>
								Scale Type
							</label>
							<select
								id="scale-select"
								value={selectedScale}
								onChange={(e) =>
									setSelectedScale(
										e.target.value as keyof typeof SCALE_PATTERNS,
									)
								}
								className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
							>
								{Object.keys(SCALE_PATTERNS).map((s) => (
									<option key={s} value={s}>
										{s}
									</option>
								))}
							</select>
						</div>

						{/* Length (Bars) Selection */}
						<div className="space-y-2">
							<span className="text-xs font-semibold uppercase text-neutral-500 tracking-wider block">
								Length (Bars)
							</span>
							<div className="grid grid-cols-4 gap-2">
								{BAR_OPTIONS.map((b) => (
									<button
										type="button"
										key={b}
										onClick={() => setBars(b)}
										className={`px-2 py-2 rounded-lg text-sm font-medium transition-all ${
											bars === b
												? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
												: "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
										}`}
									>
										{b}
									</button>
								))}
							</div>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="tempo-slider"
								className="text-xs font-semibold uppercase text-neutral-500 tracking-wider"
							>
								Tempo (BPM)
							</label>
							<input
								id="tempo-slider"
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
							type="button"
							onClick={generateMelody}
							className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transform transition-all active:scale-95 flex items-center justify-center gap-2"
						>
							<FaDice className="text-xl" />
							Generate New
						</button>
					</div>

					{/* Visualizer & Actions */}
					<div className="lg:col-span-2 flex flex-col gap-6">
						<div className="bg-neutral-950 rounded-xl p-8 border border-neutral-800 min-h-[300px] flex items-center justify-center relative overflow-hidden group">
							{melody.length === 0 ? (
								<span className="text-neutral-600">
									Click Generate to start
								</span>
							) : (
								<div className="flex flex-wrap gap-3 justify-center items-center w-full max-w-2xl">
									{melody.map((note, idx) => (
										<div
											key={note.id}
											className={`
                                        relative w-12 h-20 rounded-lg flex items-end justify-center pb-2 text-xs font-bold transition-all duration-150 border border-white/5
                                        ${
																					currentNoteIndex === idx
																						? "bg-cyan-400 text-black scale-110 shadow-[0_0_20px_rgba(34,211,238,0.6)] z-10 border-cyan-300"
																						: "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
																				}
                                    `}
										>
											<span className="z-10">{note.pitch}</span>
											<div
												className="absolute bottom-0 left-0 w-full bg-white/10 rounded-b-lg mix-blend-overlay"
												style={{
													height: note.duration === "4n" ? "100%" : "50%",
												}}
											></div>
											{/* Note duration indicator */}
											<div
												className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${note.duration === "4n" ? "bg-cyan-500/50" : "bg-purple-500/50"}`}
											/>
										</div>
									))}
								</div>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<div className="flex justify-between items-end px-2">
								<div>
									<h2 className="text-2xl font-bold">
										{selectedKey} {selectedScale}
									</h2>
									<p className="text-neutral-500 text-sm">
										Generated Melody • {bars} {bars === 1 ? "Bar" : "Bars"} •{" "}
										{tempo} BPM
									</p>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<button
									type="button"
									onClick={togglePlayback}
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
									type="button"
									onClick={downloadMidi}
									disabled={melody.length === 0}
									className="py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600 hover:text-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<FaDownload /> Download MIDI
								</button>
							</div>
						</div>
					</div>
				</div>

				<footer className="text-center text-neutral-600 text-sm pt-8 border-t border-neutral-800">
					Powered by Tone.js & @tonejs/midi
				</footer>
			</div>
		</div>
	);
}
