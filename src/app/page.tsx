import { Footer } from './components/footer'
import { HomeMainContent } from './components/home-main-content'

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[32px_1fr_32px] items-center justify-items-center gap-16 p-8 pb-20">
      <div />
      <HomeMainContent />
      <Footer />
    </div>
  )
}