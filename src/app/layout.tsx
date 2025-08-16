import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'flathill404',
  description: "flathill404's personal website",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased dark`}>{children}</body>
    </html>
  )
}
