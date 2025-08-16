"use client";

import FrequencyTable from "./components/FrequencyTable";
import DelayTimeTable from "./components/DelayTimeTable";

export default function Utils() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <FrequencyTable />
        <DelayTimeTable />
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        {/* no contents */}
      </footer>
    </div>
  );
}