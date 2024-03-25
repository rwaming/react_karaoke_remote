import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <Suspense
          fallback={
            <div
              id='loading'
              className='flex h-screen w-screen items-center justify-center bg-dark text-light'>
              <p>Loading...</p>
            </div>
          }>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
