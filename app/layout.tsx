import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Fira_Code } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' })

export const metadata: Metadata = {
  title: 'DevBlog - Insights for Modern Developers',
  description: 'A modern blog covering web development, design systems, and software engineering best practices.',
}

export const viewport: Viewport = {
  themeColor: '#fcfcfc',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
