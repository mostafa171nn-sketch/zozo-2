import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: 'For My Love 3/16/2026',
  icons: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=.9em font-size=90>❤️</text></svg>',
}

export const inter = Inter({ subsets: ['latin'] })

export default function LayoutServer() {
  return null
}

