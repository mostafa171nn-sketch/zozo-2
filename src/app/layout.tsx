'use client'

import './globals.css'
import { AudioProvider } from './AudioProvider'
import { inter } from './layout.server'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  )
}
