'use client'

import DelayTimeTable from './components/DelayTimeTable'
import FrequencyTable from './components/FrequencyTable'

export default function Utils() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <FrequencyTable />
        <DelayTimeTable />
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        {/* no contents */}
      </footer>
    </div>
  )
}
