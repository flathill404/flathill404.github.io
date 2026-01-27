"use client";

import { Midi } from "@tonejs/midi";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaDice, FaDownload, FaMusic, FaPlay, FaStop } from "react-icons/fa";
import * as Tone from "tone";

// ----------------------------------------------------------------------
// Constants & Logic
// ----------------------------------------------------------------------

type NoteLength = "4n" | "8n" | "8n." | "16n";

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

type SynthParam = {
	label: string;
	path: string;
	min: number;
	max: number;
	step: number;
	defaultValue: number;
	category?: "Synth" | "Filter";
};

const COMMON_ADSR: SynthParam[] = [
	{
		label: "Attack",
		path: "envelope.attack",
		min: 0.005,
		max: 2,
		step: 0.01,
		defaultValue: 0.005,
		category: "Synth",
	},
	{
		label: "Decay",
		path: "envelope.decay",
		min: 0.01,
		max: 2,
		step: 0.01,
		defaultValue: 0.3,
		category: "Synth",
	},
	{
		label: "Sustain",
		path: "envelope.sustain",
		min: 0,
		max: 1,
		step: 0.01,
		defaultValue: 0.0,
		category: "Synth",
	},
	{
		label: "Release",
		path: "envelope.release",
		min: 0.01,
		max: 5,
		step: 0.01,
		defaultValue: 1,
		category: "Synth",
	},
];

const FILTER_PARAMS: SynthParam[] = [
	{
		label: "Filter Freq",
		path: "filterEnvelope.baseFrequency",
		min: 50,
		max: 5000,
		step: 10,
		defaultValue: 200,
		category: "Filter",
	},
	{
		label: "Filter Res",
		path: "filter.Q",
		min: 0,
		max: 10,
		step: 0.1,
		defaultValue: 2,
		category: "Filter",
	},
	{
		label: "Filter Amt",
		path: "filterEnvelope.octaves",
		min: 0,
		max: 7,
		step: 0.1,
		defaultValue: 5,
		category: "Filter",
	},
	{
		label: "F. Attack",
		path: "filterEnvelope.attack",
		min: 0.005,
		max: 2,
		step: 0.01,
		defaultValue: 0.005,
		category: "Filter",
	},
	{
		label: "F. Decay",
		path: "filterEnvelope.decay",
		min: 0.01,
		max: 2,
		step: 0.01,
		defaultValue: 0.2,
		category: "Filter",
	},
	{
		label: "F. Sustain",
		path: "filterEnvelope.sustain",
		min: 0,
		max: 1,
		step: 0.01,
		defaultValue: 0.0,
		category: "Filter",
	},
	{
		label: "F. Release",
		path: "filterEnvelope.release",
		min: 0.01,
		max: 5,
		step: 0.01,
		defaultValue: 0.5,
		category: "Filter",
	},
];

const MONO_SYNTH_PARAMS = [...COMMON_ADSR, ...FILTER_PARAMS];

const INSTRUMENT_PARAMS: Record<string, SynthParam[]> = {
	Sine: MONO_SYNTH_PARAMS,
	Square: MONO_SYNTH_PARAMS,
	Triangle: MONO_SYNTH_PARAMS,
	Sawtooth: MONO_SYNTH_PARAMS,
	FM: [
		{
			label: "Harmonicity",
			path: "harmonicity",
			min: 0.1,
			max: 10,
			step: 0.1,
			defaultValue: 3,
			category: "Synth",
		},
		{
			label: "Modulation Index",
			path: "modulationIndex",
			min: 0,
			max: 100,
			step: 1,
			defaultValue: 10,
			category: "Synth",
		},
		{
			label: "Attack",
			path: "envelope.attack",
			min: 0.005,
			max: 2,
			step: 0.01,
			defaultValue: 0.01,
			category: "Synth",
		},
		{
			label: "Release",
			path: "envelope.release",
			min: 0.01,
			max: 5,
			step: 0.01,
			defaultValue: 0.5,
			category: "Synth",
		},
	],
	AM: [
		{
			label: "Harmonicity",
			path: "harmonicity",
			min: 0.1,
			max: 10,
			step: 0.1,
			defaultValue: 3,
			category: "Synth",
		},
		{
			label: "Attack",
			path: "envelope.attack",
			min: 0.005,
			max: 2,
			step: 0.01,
			defaultValue: 0.01,
			category: "Synth",
		},
		{
			label: "Release",
			path: "envelope.release",
			min: 0.01,
			max: 5,
			step: 0.01,
			defaultValue: 0.5,
			category: "Synth",
		},
	],
	Duo: [
		{
			label: "Vibrato Amount",
			path: "vibratoAmount",
			min: 0,
			max: 1,
			step: 0.01,
			defaultValue: 0.5,
			category: "Synth",
		},
		{
			label: "Vibrato Rate",
			path: "vibratoRate",
			min: 0.1,
			max: 20,
			step: 0.1,
			defaultValue: 5,
			category: "Synth",
		},
		{
			label: "Harmonicity",
			path: "harmonicity",
			min: 0.1,
			max: 5,
			step: 0.1,
			defaultValue: 1.5,
			category: "Synth",
		},
	],
	Membrane: [
		{
			label: "Pitch Decay",
			path: "pitchDecay",
			min: 0,
			max: 0.5,
			step: 0.01,
			defaultValue: 0.05,
			category: "Synth",
		},
		{
			label: "Octaves",
			path: "octaves",
			min: 1,
			max: 10,
			step: 1,
			defaultValue: 10,
			category: "Synth",
		},
		{
			label: "Attack",
			path: "envelope.attack",
			min: 0.001,
			max: 0.5,
			step: 0.01,
			defaultValue: 0.001,
			category: "Synth",
		},
		{
			label: "Release",
			path: "envelope.release",
			min: 0.01,
			max: 2,
			step: 0.01,
			defaultValue: 1,
			category: "Synth",
		},
	],
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

const INSTRUMENTS = [
	{ id: "Triangle", label: "Triangle Wave" },
	{ id: "Sine", label: "Sine Wave" },
	{ id: "Square", label: "Square Wave" },
	{ id: "Sawtooth", label: "Sawtooth Wave" },
	{ id: "FM", label: "FM Synth" },
	{ id: "AM", label: "AM Synth" },
	{ id: "Duo", label: "Duo Synth" },
	{ id: "Membrane", label: "Membrane Synth" },
];

const createSynth = (type: string) => {
	// Basic waveforms use MonoSynth to have a Filter
	switch (type) {
		case "Sine":
			return new Tone.MonoSynth({ oscillator: { type: "sine" } });
		case "Square":
			return new Tone.MonoSynth({ oscillator: { type: "square" } });
		case "Sawtooth":
			return new Tone.MonoSynth({ oscillator: { type: "sawtooth" } });
		case "Triangle":
			return new Tone.MonoSynth({ oscillator: { type: "triangle" } });
		case "FM":
			return new Tone.FMSynth();
		case "AM":
			return new Tone.AMSynth();
		case "Duo":
			return new Tone.DuoSynth();
		case "Membrane":
			return new Tone.MembraneSynth();
		default:
			return new Tone.MonoSynth({ oscillator: { type: "triangle" } });
	}
};

const BAR_OPTIONS = [0.5, 1, 2, 4];

// Helper to set nested object properties by path
const setNestedProperty = (
	// biome-ignore lint/suspicious/noExplicitAny: Recursive object construction
	obj: Record<string, any>,
	path: string,
	value: number,
) => {
	const parts = path.split(".");
	let current = obj;
	for (let i = 0; i < parts.length - 1; i++) {
		if (!current[parts[i]]) current[parts[i]] = {};
		current = current[parts[i]];
	}
	current[parts[parts.length - 1]] = value;
};

export default function MelodyGenerator() {
	const [melody, setMelody] = useState<MelodyNote[]>([]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentNoteIndex, setCurrentNoteIndex] = useState<number | null>(null);

	const [selectedKey, setSelectedKey] = useState("F");
	const [selectedScale, setSelectedScale] =
		useState<keyof typeof SCALE_PATTERNS>("Natural Minor");
	const [selectedInstrument, setSelectedInstrument] = useState("Sine");
	// Store all params in a single object: { "envelope.attack": 0.1, ... }
	const [synthParams, setSynthParams] = useState<Record<string, number>>({});
	const [activeTab, setActiveTab] = useState<"Synth" | "Filter">("Synth");

	const [tempo, setTempo] = useState(140);
	const [bars, setBars] = useState(1); // Default 1 bar

	// Refs for Tone.js objects to survive re-renders
	const synthRef = useRef<
		| Tone.MonoSynth
		| Tone.FMSynth
		| Tone.AMSynth
		| Tone.DuoSynth
		| Tone.MembraneSynth
		| null
	>(null);
	const sequenceRef = useRef<Tone.Part | null>(null);

	// Initialize/Reset params when instrument changes
	useEffect(() => {
		const defaultParams: Record<string, number> = {};
		const paramsConfig = INSTRUMENT_PARAMS[selectedInstrument] || COMMON_ADSR;
		let hasFilter = false;
		paramsConfig.forEach((p) => {
			defaultParams[p.path] = p.defaultValue;
			if (p.category === "Filter") hasFilter = true;
		});
		setSynthParams(defaultParams);

		// Reset tab to Synth if current instrument has no filter
		if (!hasFilter && activeTab === "Filter") {
			setActiveTab("Synth");
		}
	}, [selectedInstrument, activeTab]);

	useEffect(() => {
		// Initialize synth
		// Dispose old one first if exists
		if (synthRef.current) {
			synthRef.current.dispose();
		}

		const synth = createSynth(selectedInstrument).toDestination();
		// Lower volume slightly for sharper synths
		synth.volume.value = -5;

		// Apply initial params
		// Let's just create it clean, and then the params effect will run and set values.

		synthRef.current = synth;

		return () => {
			// Cleanup
			if (sequenceRef.current) {
				sequenceRef.current.dispose();
			}
			if (synthRef.current) {
				synthRef.current.dispose();
			}
			Tone.getTransport().stop();
		};
	}, [selectedInstrument]);

	// Update synth params when state changes
	useEffect(() => {
		if (synthRef.current && Object.keys(synthParams).length > 0) {
			// biome-ignore lint/suspicious/noExplicitAny: Tone.js options are loosely typed
			const options: Record<string, any> = {};
			// Reconstruct nested options object
			Object.entries(synthParams).forEach(([path, value]) => {
				setNestedProperty(options, path, value);
			});

			// Apply to synth
			synthRef.current.set(options);
		}
	}, [synthParams]);

	const generateMelody = useCallback(() => {
		const scaleNotes = getScaleNotes(selectedKey, selectedScale);
		const newMelody: MelodyNote[] = [];
		let currentTime = 0;

		// 1 bar = 16 sixteenth notes
		const targetDuration = bars * 16;

		while (currentTime < targetDuration) {
			const pitch = scaleNotes[Math.floor(Math.random() * scaleNotes.length)];
			const remaining = targetDuration - currentTime;

			// Note steps: 4n=4, 8n.=3, 8n=2
			// If remaining >= 4, can pick 4n, 8n., 8n.
			// If remaining >= 3, can pick 8n., 8n.
			// If remaining >= 2, can pick 8n.

			let possibleDurations: NoteLength[] = [];
			if (remaining >= 4) possibleDurations = ["4n", "8n.", "8n"];
			else if (remaining >= 3) possibleDurations = ["8n.", "8n"];
			else if (remaining >= 2) possibleDurations = ["8n"];
			else {
				// If only 1 step left, we technically need 16n or rest, but let's break safely.
				// Or maybe force 16n?
				// Let's break to avoid infinite loop if 1 remaining, though practically should be aligned if starting from 0.
				break;
			}

			const duration =
				possibleDurations[Math.floor(Math.random() * possibleDurations.length)];

			newMelody.push({
				pitch,
				duration,
				time: currentTime,
				id: crypto.randomUUID(),
			});

			let step = 2; // Default 8n
			if (duration === "4n") step = 4;
			else if (duration === "8n.") step = 3;
			else if (duration === "8n") step = 2;
			else if (duration === "16n") step = 1;

			currentTime += step;
		}

		setMelody(newMelody);
		setCurrentNoteIndex(null);
	}, [selectedKey, selectedScale, bars]);

	// Playback control
	const stopPlayback = useCallback(() => {
		Tone.getTransport().stop();
		Tone.getTransport().cancel();
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
		Tone.getTransport().cancel(); // Clear previous events
		Tone.getTransport().bpm.value = tempo;

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
			const synth = synthRef.current;
			if (synth && !synth.disposed) {
				// Ensure note name doesn't contain weird chars if that happens, mainly '#' is fine
				synth.triggerAttackRelease(value.note, value.duration, time);
			}
			Tone.Draw.schedule(() => {
				setCurrentNoteIndex(value.index);
			}, time);
		}, scheduledEvents);

		part.loop = true;
		part.loopEnd = totalDuration;
		part.start(0);

		Tone.getTransport().start();
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
		// biome-ignore lint/suspicious/noExplicitAny: Uint8Array type mismatch with BlobPart in this env
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

	// Helper for visual height
	const getNoteHeight = (duration: NoteLength) => {
		if (duration === "4n") return "100%";
		if (duration === "8n.") return "75%";
		return "50%";
	};

	return (
		<div className="min-h-screen bg-neutral-900 text-white p-8 font-sans flex flex-col items-center justify-center">
			<div className="w-full max-w-7xl bg-neutral-800 rounded-2xl shadow-2xl p-8 border border-neutral-700">
				<header className="mb-10 text-center">
					<h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent inline-flex items-center gap-4">
						<FaMusic className="text-cyan-400" />
						Melody Generator
					</h1>
					<p className="text-neutral-400 mt-2">
						Create, Play, and Export unique MIDI melodies using advanced scales.
					</p>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
					{/* Left Panel: Composition Settings */}
					<div className="lg:col-span-3 bg-neutral-900/50 p-6 rounded-xl border border-neutral-700 space-y-6 h-fit">
						<h3 className="text-lg font-bold text-white mb-4 border-b border-neutral-700 pb-2">
							Composition
						</h3>

						{/* Key Selection */}
						<div className="space-y-2">
							<span className="text-xs font-semibold uppercase text-neutral-500 tracking-wider block">
								Key
							</span>
							<div className="grid grid-cols-4 gap-1">
								{KEYS.map((k) => (
									<button
										type="button"
										key={k}
										onClick={() => setSelectedKey(k)}
										className={`px-1 py-1.5 rounded text-xs font-bold transition-all ${
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

					{/* Center Panel: Visualization */}
					<div className="lg:col-span-6 flex flex-col gap-6">
						<div className="bg-neutral-950 rounded-xl p-8 border border-neutral-800 min-h-[400px] flex items-center justify-center relative overflow-hidden group">
							{melody.length === 0 ? (
								<div className="text-center">
									<FaMusic className="text-6xl text-neutral-800 mx-auto mb-4" />
									<span className="text-neutral-600">
										Configure settings and click Generate
									</span>
								</div>
							) : (
								<div className="flex flex-wrap gap-2 justify-center items-center w-full">
									{melody.map((note, idx) => (
										<div
											key={note.id}
											className={`
                                        relative w-10 h-16 rounded-lg flex items-end justify-center pb-2 text-[10px] font-bold transition-all duration-150 border border-white/5
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
													height: getNoteHeight(note.duration),
												}}
											></div>
											{/* Note duration indicator */}
											<div
												className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${
													note.duration === "4n"
														? "bg-cyan-500/50"
														: note.duration === "8n."
															? "bg-yellow-500/50"
															: "bg-purple-500/50"
												}`}
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

					{/* Right Panel: Sound Settings */}
					<div className="lg:col-span-3 bg-neutral-900/50 p-6 rounded-xl border border-neutral-700 space-y-6 h-fit">
						<h3 className="text-lg font-bold text-white mb-4 border-b border-neutral-700 pb-2">
							Sound Design
						</h3>

						{/* Instrument Selection */}
						<div className="space-y-2">
							<label
								htmlFor="instrument-select"
								className="text-xs font-semibold uppercase text-neutral-500 tracking-wider block"
							>
								Instrument
							</label>
							<select
								id="instrument-select"
								value={selectedInstrument}
								onChange={(e) => setSelectedInstrument(e.target.value)}
								className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
							>
								{INSTRUMENTS.map((inst) => (
									<option key={inst.id} value={inst.id}>
										{inst.label}
									</option>
								))}
							</select>
							<p className="text-xs text-neutral-500 mt-2">
								Select the synthesizer engine used for playback.
							</p>
						</div>

						{/* Advanced Parameters with Tabs */}
						<div className="space-y-4 pt-4 border-t border-neutral-700">
							<div className="flex bg-neutral-800 p-1 rounded-lg">
								<button
									type="button"
									onClick={() => setActiveTab("Synth")}
									className={`flex-1 py-1.5 text-xs font-bold rounded transition-all ${
										activeTab === "Synth"
											? "bg-neutral-600 text-white shadow"
											: "text-neutral-500 hover:text-neutral-300"
									}`}
								>
									Synth
								</button>
								<button
									type="button"
									onClick={() => setActiveTab("Filter")}
									disabled={
										!(
											INSTRUMENT_PARAMS[selectedInstrument] || COMMON_ADSR
										).some((p) => p.category === "Filter")
									}
									className={`flex-1 py-1.5 text-xs font-bold rounded transition-all ${
										activeTab === "Filter"
											? "bg-neutral-600 text-white shadow"
											: "text-neutral-500 hover:text-neutral-300 disabled:opacity-20 disabled:cursor-not-allowed"
									}`}
								>
									Filter
								</button>
							</div>

							<div className="h-[280px] overflow-y-auto pr-1 space-y-4 custom-scrollbar">
								{(INSTRUMENT_PARAMS[selectedInstrument] || COMMON_ADSR)
									.filter((p) => (p.category || "Synth") === activeTab)
									.map((param) => (
										<div key={param.path} className="space-y-1">
											<div className="flex justify-between text-xs text-neutral-400">
												<span>{param.label}</span>
												<span>
													{synthParams[param.path]?.toFixed(3) ??
														param.defaultValue}
												</span>
											</div>
											<input
												type="range"
												min={param.min}
												max={param.max}
												step={param.step}
												value={synthParams[param.path] ?? param.defaultValue}
												onChange={(e) => {
													const val = Number(e.target.value);
													setSynthParams((prev) => ({
														...prev,
														[param.path]: val,
													}));
												}}
												className="w-full accent-cyan-400 h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
											/>
										</div>
									))}
								{(INSTRUMENT_PARAMS[selectedInstrument] || COMMON_ADSR).filter(
									(p) => (p.category || "Synth") === activeTab,
								).length === 0 && (
									<p className="text-xs text-neutral-500 text-center py-4">
										No parameters available for this category.
									</p>
								)}
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
