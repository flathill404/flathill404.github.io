'use client'

const TONES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
const OCTAVES = Array.from({ length: 8 }, (_, i) => i) // 0-7
const STEPS = Array.from({ length: 12 }, (_, i) => i) // 0-11

const standardPitch = 440
const ratio = 1.0594630943593

const frequency = (n: number) => {
  return standardPitch * ratio ** n
}

const FrequencyTable = () => {
  return (
    <div className="flex flex-col items-center gap-8 sm:items-start">
      <ul className="text-center font-[family-name:var(--font-geist-mono)] text-sm sm:text-left">
        <li>Equal Temperament Frequency Table</li>
      </ul>

      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              {TONES.map((tone) => (
                <th scope="col" className="px-6 py-3" key={tone}>
                  {tone}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {OCTAVES.map((rank) => (
              <tr
                className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                key={rank}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
                >
                  {rank}
                </th>
                {STEPS.map((step) => (
                  <td className="px-6 py-4" key={step}>
                    {frequency(12 * (rank - 4) + step).toFixed(1)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FrequencyTable
