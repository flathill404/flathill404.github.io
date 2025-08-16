'use client'

import { useState, useMemo } from 'react'

const DEFAULT_BPM = 144

const NOTES = [
  { label: '1/2th', value: 1 * 8 },
  { label: '1/4th', value: 1 * 4 },
  { label: '1/8th', value: 1 * 2 },
  { label: '1/16th', value: 1 },
  { label: '1/32th', value: 1 / 2 },
  { label: '1/64th', value: 1 / 4 },
  { label: '1/128th', value: 1 / 8 },
  { label: '1/256th', value: 1 / 16 },
  { label: '1/512th', value: 1 / 32 },
  { label: '1/1024th', value: 1 / 64 },
]

const DelayTimeTable = () => {
  const [bpm, setBpm] = useState(DEFAULT_BPM)

  const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBpm = parseInt(event.target.value, 10)
    if (!isNaN(newBpm)) {
      setBpm(newBpm)
    }
  }

  const delayTime = useMemo(() => {
    return (note: number) => (60 / bpm) * 1000 * note
  }, [bpm])

  return (
    <div className="flex flex-col items-center gap-8 sm:items-start">
      <ul className="text-center font-[family-name:var(--font-geist-mono)] text-sm sm:text-left">
        <li>
          Delay Time Table at{' '}
          <input
            className="w-12 bg-[#0a0a0a]"
            type="number"
            value={bpm}
            onChange={handleBpmChange}
          />{' '}
          BPM
        </li>
      </ul>

      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
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
            {NOTES.map(({ label, value }) => {
              const notes = delayTime(value)
              const dotted = delayTime((value * 3) / 2)
              const triplets = delayTime((value * 2) / 3)
              const preDelay = delayTime(value / 2 ** 6)
              const decayTime = notes - preDelay

              const notesHz = 1000 / notes
              const dottedHz = 1000 / dotted
              const tripletsHz = 1000 / triplets

              return (
                <tr
                  className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={value}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
                  >
                    {label}
                  </th>
                  <td className="px-6 py-4">
                    {notes.toFixed(2)} ms / {notesHz.toFixed(2)} Hz
                  </td>
                  <td className="px-6 py-4">
                    {dotted.toFixed(2)} ms / {dottedHz.toFixed(2)} Hz
                  </td>
                  <td className="px-6 py-4">
                    {triplets.toFixed(2)} ms / {tripletsHz.toFixed(2)} Hz
                  </td>
                  <td className="px-6 py-4">{preDelay.toFixed(2)} ms</td>
                  <td className="px-6 py-4">{decayTime.toFixed(2)} ms</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DelayTimeTable
