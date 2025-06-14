"use client";
import { useCallback, useState } from "react";

const standardPitch = 440;
const ratio = 1.0594630943593;

const frequency = (n: number) => {
  return standardPitch * ratio ** n;
};

const DEFAULT_BPM = 144;

export default function Utils() {
  const [bpm, setBpm] = useState(DEFAULT_BPM);

  const delaytime = useCallback(
    (note: number) => {
      return (60 / bpm) * 1000 * note;
    },
    [bpm]
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Frequency */}
        <ul className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>Equal Temperament Frequency Table</li>
        </ul>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                {[
                  "A",
                  "A#",
                  "B",
                  "C",
                  "C#",
                  "D",
                  "D#",
                  "E",
                  "F",
                  "F#",
                  "G",
                  "G#",
                ].map((tone) => (
                  <th scope="col" className="px-6 py-3" key={tone}>
                    {tone}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((rank) => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                    key={rank}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {rank}
                    </th>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((step) => (
                      <td className="px-6 py-4" key={step}>
                        {frequency(12 * (rank - 4) + step).toFixed(3)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* --- */}

        {/* Delay Time */}
        <ul className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>
            Delay Time Table at{" "}
            <input
              className="w-12 bg-[#0a0a0a]"
              type="number"
              value={bpm}
              onChange={(e) => setBpm(e.target.value as unknown as number)}
            />{" "}
            BPM
          </li>
        </ul>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  Notes
                </th>
                <th scope="col" className="px-6 py-3">
                  Dotted
                </th>
                <th scope="col" className="px-6 py-3">
                  Triplets
                </th>
                <th scope="col" className="px-6 py-3">
                  Pre Delay
                </th>
                <th scope="col" className="px-6 py-3">
                  Decay Time
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                1 * 8,
                1 * 4,
                1 * 2,
                1, // 1/4th
                1 / 2,
                1 / 4,
                1 / 8,
                1 / 16,
                1 / 32,
                1 / 64,
                1 / 128,
              ].map((note) => {
                const label = (1 / note) * 4;

                // ms
                const notes = delaytime(note);
                const dotted = delaytime((note * 3) / 2);
                const triplets = delaytime((note * 2) / 3);
                const preDelay = delaytime(note / 2 ** 6);
                const decayTime = notes - preDelay;

                // Hz
                const notesHz = 1000 / notes;
                const dottedHz = 1000 / dotted;
                const tripletsHz = 1000 / triplets;

                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                    key={note}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      1/{label}th
                    </th>
                    <td className="px-6 py-4">
                      {notes.toFixed(2)} ms / {notesHz} Hz
                    </td>
                    <td className="px-6 py-4">
                      {dotted.toFixed(2)} ms / {dottedHz} Hz
                    </td>
                    <td className="px-6 py-4">
                      {triplets.toFixed(2)} ms / {tripletsHz} Hz
                    </td>
                    <td className="px-6 py-4">{preDelay.toFixed(2)} ms</td>
                    <td className="px-6 py-4">{decayTime.toFixed(2)} ms</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* --- */}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* no contents */}
      </footer>
    </div>
  );
}
